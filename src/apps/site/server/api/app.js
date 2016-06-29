import express from 'express';
import chalk from 'chalk';
import routes from './routes';
import bodyParser from 'body-parser';

import {getConfig} from '../../../../common/utils/helpers';
const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
routes(app);
const {'default': {apiPort:port}} = getConfig();
app.listen(port, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log(chalk.blue(`API is running on port`), port);
});