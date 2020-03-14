const mongoose = require('mongoose');
const dotenv = require('dotenv');

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
