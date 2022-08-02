const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const generateToken = require('./crypto');

const app = express();
app.use(bodyParser.json());

const HTTP_OK_STATUS = 200;
const PORT = '3000';

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (_request, response) => {
  response.status(HTTP_OK_STATUS).send();
});

app.listen(PORT, () => {
  console.log('Online');
});

const talkers = 'talker.json';

app.get('/talker', async (_req, res) => {
  const verifyContent = await fs.readFile(talkers);
  const parseContent = await JSON.parse(verifyContent);

  if (parseContent.length > 0) {
    return res.status(200).send(parseContent);
  }

  return res.status(200).send([]);
});

app.get('/talker/:id', async (req, res) => {
  const { id } = req.params;
  const getTalkers = JSON.parse(await fs.readFile(talkers));

  const findTalkerById = getTalkers
    .find((talker) => talker.id === Number(id));

  if (findTalkerById) return res.status(200).send(findTalkerById);

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
});

app.post('/login', (req, res) => {
  const { email, password } = req.body;
  if (email && password) {
    const token = generateToken();
    return res.status(200).json({ token });
  }
  
  return res.status(404).json({ message: 'digite email ou senha validos' });
});
