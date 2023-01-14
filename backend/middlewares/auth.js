const jwt = require('jsonwebtoken');
const { IncorrectAuthError } = require('../erorrs/incorrect-auth');

module.exports = (req, res, next) => {
  // const { authorization } = req.headers;
  const token = req.cookies.jwt;

  // if (!authorization || !authorization.startsWith('Bearer ')) {
  //   next(new IncorrectAuthError('Необходима авторизация'));
  // }

  // const token = authorization.replace('Bearer ', '');
  let payload;

  try {
    payload = jwt.verify(token, 'some-secret-key');
  } catch (err) {
    return next(new IncorrectAuthError('Необходима авторизация'));
  }

  req.user = payload;

  next();
};
