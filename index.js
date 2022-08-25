const express = require('express');
const bodyParser = require('body-parser');
const generateToken = require('./crypto');
const { validateEmail, validatePassword } = require('./Middlewares/Loginvalidations');
const { validateAge } = require('./Middlewares/validateAge');
const { validateName } = require('./Middlewares/validateName');
const { validadeTalk, validateWatchedAt, validateRate } = require('./Middlewares/validateTalk');
const { validateToken } = require('./Middlewares/validateToken');
const { getTalkersByQuery, getAllTalkers, getTalkerById,
        addTalker, updateTalker, deleteTalker } = require('./controllers/talkersController');

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

app.get('/talker/search', validateToken, getTalkersByQuery);

app.get('/talker', getAllTalkers);

app.get('/talker/:id', getTalkerById);

app.post('/login', validateEmail, validatePassword, generateToken);

app.post('/talker', validateToken, validateName, validateAge, validadeTalk, 
validateWatchedAt, validateRate, addTalker);

app.put('/talker/:id', validateToken, validateName, validateAge, validadeTalk, 
validateWatchedAt, validateRate, updateTalker);

app.delete('/talker/:id', validateToken, deleteTalker);
