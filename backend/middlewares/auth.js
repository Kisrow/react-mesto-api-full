const jwt = require('jsonwebtoken');
const { IncorrectAuthError } = require('../erorrs/incorrect-auth');

// const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new IncorrectAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
