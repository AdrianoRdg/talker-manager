function validadeTalk(req, res, next) {
  const { talk } = req.body;

  if (!talk) {
    return res.status(400)
    .json({ message: 'O campo "talk" é obrigatório' });
  }

  next();
}

function validateWatchedAt(req, res, next) {
  const { talk: { watchedAt } } = req.body;
  const dateRegex = /^\d{2}\/\d{2}\/\d{4}$/;
  
  if (!watchedAt) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" é obrigatório' });
  }
  
  if (!dateRegex.test(watchedAt)) {
    return res.status(400)
    .json({ message: 'O campo "watchedAt" deve ter o formato "dd/mm/aaaa"' });
  }
  
  next();
}

function validateRate(req, res, next) {
  const { talk: { rate } } = req.body;

  if (rate === undefined) {
    return res.status(400)
    .json({ message: 'O campo "rate" é obrigatório' });
  }

  const rateNumber = Number(rate);

  if (!Number.isInteger(rateNumber) || rateNumber < 1 || rateNumber > 5) {
    return res.status(400)
    .json({ message: 'O campo "rate" deve ser um inteiro de 1 à 5' });
  }

  next();
}

module.exports = { validadeTalk, validateWatchedAt, validateRate };