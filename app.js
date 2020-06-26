const express = require('express');
const bodyParser = require('body-parser');
const cookies = require('cookie-parser');
const helmet = require('helmet');

const app = express();

const { PORT } = require('./config');
const { connectDB } = require('./connectdb');
const routeAll = require('./routes/routes');
const { createUser, login } = require('./controllers/users');

const errorHandler = require('./errors/errorHandler');
const auth = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { rateLimit } = require('./middlewares/rateLimiter');

connectDB();

app.use(cookies());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(requestLogger);
app.use(rateLimit);
app.use(helmet());

// crash-test проверка работы pm2
app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUser);
app.post('/signin', login);
app.use(auth);
app.use('/', routeAll);

app.use(errorLogger);
app.use(errorHandler);

app.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Server listening on port ${PORT}`);
});
