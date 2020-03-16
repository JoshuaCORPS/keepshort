const path = require('path');
const express = require('express');

const xss = require('xss-clean');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');

const AppError = require('./utils/AppError');
const errorHandler = require('./controllers/errorController');
const urlRouter = require('./routes/urlRouter');
const app = express();

const limiter = rateLimit({
  max: 100,
  windowMs: 60 * 60 * 1000,
  message: 'Too many requests! Try again after an hour.'
});

// Security Middlewares
app.use(helmet());
app.use('/', limiter);

// SET VIEW ENGINE
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.json({ limit: '10kb' }));

// Security Middleware = prevent xss attacks
app.use(xss());

// Routes
app.use('/', urlRouter);

app.all('*', (req, res, next) => {
  return next(new AppError('Page not found!', 404));
});

app.use(errorHandler);

app.disable('x-powered-by');

module.exports = app;
