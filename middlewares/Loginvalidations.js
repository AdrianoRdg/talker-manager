 function validateEmail(req, res, next) {
  const { email } = req.body;
  const regexEmail = /\S+@\S+.com/;

  if (!email) {
    return res.status(400)
    .json({ message: 'O campo "email" é obrigatório' });
  }

  if (!regexEmail.test(email)) {
    return res.status(400)
    .json({ message: 'O "email" deve ter o formato "email@email.com"' });
  }
  
  next();
}

function validatePassword(req, res, next) {
  const { password } = req.body;
  const passwordLength = 6;
  const isPasswordValid = !password ? false : password.length >= passwordLength;

  if (!password) return res.status(400).json({ message: 'O campo "password" é obrigatório' });
  
  if (!isPasswordValid) {
    return res.status(400)
    .json({ message: 'O "password" deve ter pelo menos 6 caracteres' });
  }

  next();
}

module.exports = { validateEmail, validatePassword };