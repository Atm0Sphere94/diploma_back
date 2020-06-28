const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const UnauthorizedError = require('../errors/UnauthorizedError');
const BadRequestError = require('../errors/badRequestError');
const ConflictError = require('../errors/conflictError');

const { JWT_SECRET } = require('../config');
// GET /users/me - возвращает пользователя по _id
const getUser = (async (req, res, next) => {
  try {
    const user = await User.findById(req.user._id)
      .orFail(() => new NotFoundError('Not found this ID'));
    return res.send(user);
  } catch (err) {
    return next(err);
  }
});
// POST /signup - Создание пользователя
const createUser = (async (req, res, next) => {
  try {
    const {
      name, email, password,
    } = req.body;
    const hash = await bcrypt.hash(password, 10);
    const user = await User.create({
      name, email, password: hash,
    });
    return res.status(201).send({
      data: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
    }); // данные всех полей должны приходить в теле запроса (кроме пароля)
  } catch (err) {
    if (err.name === 'ValidationError') {
      return next(new BadRequestError(err.message));
    }
    // eslint-disable-next-line eqeqeq
    if (err.code == '11000') {
      return next(new ConflictError('This email already exsists'));
    }
    return next(err); // passes the data to error handler
  }
});

// login - получает из запроса почту и пароль и проверяет их
const login = (async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const tokenExpires = '3600000 * 24 * 7'; // in ms 1 hour * 24 in a day * 7days in week
    const user = await User.findUserByEmail(email, password);
    const token = await jwt.sign(
      { _id: user._id },
      JWT_SECRET,
      { expiresIn: '7d' },
    );
    res.cookie('jwt', token, JWT_SECRET, { // JWT после создания должен быть отправлен клиенту
      maxAge: tokenExpires,
      httpOnly: true,
      secure: true,
      sameSite: true,
    });
    res.status(200).send({ token });
  } catch (err) {
    next(new UnauthorizedError(err.message)); // passes the data to error handler
  }
});

module.exports = {
  getUser,
  createUser,
  login,
};
