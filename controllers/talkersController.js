const fs = require('fs/promises');

const talkers = 'talker.json';

async function getTalkersByQuery(req, res) {
  const { q } = req.query;
  const getTalkers = JSON.parse(await fs.readFile(talkers));
  
  if (!q) return res.status(200).send(getTalkers);

  const searchTalker = getTalkers.filter((talker) => talker.name.includes(q));

  if (!searchTalker) return res.status(200).send([]);

  res.status(200).send(searchTalker);
}

async function getAllTalkers(_req, res) {
  const verifyContent = await fs.readFile(talkers);
  const parseContent = await JSON.parse(verifyContent);

  if (parseContent.length > 0) {
    return res.status(200).send(parseContent);
  }

  return res.status(200).send([]);
}

async function getTalkerById(req, res) {
  const { id } = req.params;
  const getTalkers = JSON.parse(await fs.readFile(talkers));

  const findTalkerById = getTalkers
    .find((talker) => talker.id === Number(id));

  if (findTalkerById) return res.status(200).send(findTalkerById);

  return res.status(404).json({ message: 'Pessoa palestrante não encontrada' });
}

async function addTalker(req, res) {
  const getTalkers = JSON.parse(await fs.readFile(talkers));
  const newTalker = { ...req.body, id: getTalkers.length + 1 };
  const addingTalker = [...getTalkers, newTalker];

  fs.writeFile(talkers, JSON.stringify(addingTalker));

  res.status(201)
  .send(newTalker);
}

async function updateTalker(req, res) {
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
}

async function deleteTalker(req, res) {
  const { id } = req.params;
  const getTalkers = JSON.parse(await fs.readFile(talkers));

  const deletingTalker = getTalkers.filter((talker) => talker.id !== Number(id));

  fs.writeFile(talkers, JSON.stringify(deletingTalker));
  console.log(deletingTalker);
  res.status(204).json(deletingTalker);
}

module.exports = { 
  getTalkersByQuery, 
  getAllTalkers,
  getTalkerById,
  addTalker,
  updateTalker,
  deleteTalker,
};