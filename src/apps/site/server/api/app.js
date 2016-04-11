import express from 'express';
import routes from './routes';
import bodyParser from 'body-parser';
import config from '../config';
const app = express();
routes(app);
const {apiPort:port} = config;
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(`API is running on port ${port}`);
});