const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs/promises');

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