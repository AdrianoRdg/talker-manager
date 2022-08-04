const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');
const generateToken = require('./crypto');
const { validateEmail, validatePassword } = require('./Middlewares/Loginvalidations');
const { validateAge } = require('./Middlewares/validateAge');
const { validateName } = require('./Middlewares/validateName');
const { validadeTalk, validateWatchedAt, validateRate } = require('./Middlewares/validateTalk');
const { validateToken } = require('./Middlewares/validateToken');

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

app.post('/login', validateEmail, validatePassword, generateToken);

app.post('/talker', validateToken, validateName, validateAge, validadeTalk, validateWatchedAt, 
validateRate, async (req, res) => {
  const getTalkers = JSON.parse(await fs.readFile(talkers));
  const newTalker = { ...req.body, id: getTalkers.length + 1 };
  const addTalker = [...getTalkers, newTalker];

  fs.writeFile(talkers, JSON.stringify(addTalker));

  res.status(201)
  .send(newTalker);
});

app.put('/talker/:id', validateToken, validateName, validateAge, validadeTalk, validateWatchedAt, 
validateRate, async (req, res) => {
  const { id } = req.params;
  const { name, age, talk: { watchedAt, rate } } = req.body;

  const getTalkers = JSON.parse(await fs.readFile(talkers));

  const talkerEdited = { name, age, talk: { watchedAt, rate }, id: Number(id) };

  const setEditedTalker = getTalkers.map((talker) => {
    if (talker.id === Number(id)) {
      return talkerEdited;
    }
    return talker;
  });

  fs.writeFile(talkers, JSON.stringify(setEditedTalker));

  res.status(200)
  .send(talkerEdited);
});

app.delete('/talker/:id', validateToken, async (req, res) => {
  const { id } = req.params;
  const getTalkers = JSON.parse(await fs.readFile(talkers));

  const deleteTalker = getTalkers.filter((talker) => talker.id !== Number(id));

  fs.writeFile(talkers, JSON.stringify(deleteTalker));
  console.log(deleteTalker);
  res.status(204).json(deleteTalker);
});