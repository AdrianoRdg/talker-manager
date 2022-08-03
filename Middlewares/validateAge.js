function validateAge(req, res, next) {
  const { age } = req.body;
  const minAge = 18;

  if (!age) {
    return res.status(400)
    .json({ message: 'O campo "age" é obrigatório' });
  }

  if (age && Number(age) < minAge) {
    return res.status(400)
    .json({ message: 'A pessoa palestrante deve ser maior de idade' });
  }

  next();
}

module.exports = { validateAge };