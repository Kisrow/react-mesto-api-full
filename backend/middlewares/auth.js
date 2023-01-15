const jwt = require('jsonwebtoken');
const { IncorrectAuthError } = require('../erorrs/incorrect-auth');

const { NODE_ENV, JWT_SECRET } = process.env;

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  let payload;

  try {
    payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'default-secret');
  } catch (err) {
    return next(new IncorrectAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
