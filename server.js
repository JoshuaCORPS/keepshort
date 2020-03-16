const mongoose = require('mongoose');
const dotenv = require('dotenv');

process.on('uncaughtException', err => {
  console.log(err.name, err.message);
  console.log('Uncaught Exception! Application is shutting down...');

  process.exit(1);
});

dotenv.config({ path: './config.env' });

const app = require('./app');

const DB = process.env.DATABASE.replace(
  '<password>',
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: true
  })
  .then(() => console.log('DB CONNECTED SUCCESSFULLY.'));

const hostname = process.env.IP;
const port = process.env.PORT;

const server = app.listen(port, hostname, () => {
  console.log(`SERVER IS RUNNING AT http://${hostname}:${port}`);
});

process.on('unhandledRejection', err => {
  console.log(err.name, err.message);
  console.log('Unhandled Rejection Application is shutting down...');

  server.close(() => {
    process.exit(1);
  });
});

process.on('SIGTERM', err => {
  console.log('SIGTERM! Application is shutting down gracefully...');
  server.close(() => {
    console.log('Process Terminated');
  });
});
