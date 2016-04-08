import Express from 'express';
import compression from 'compression';
import http from 'http';
import favicon from 'serve-favicon';
import Path from 'path';
import chalk from 'chalk';

import { parseModel } from './middleware';
import { checkAuth, RenderPage } from '../../../common/server/middleware';
import { appName } from '../../../common/utils/helpers';
import { default as routes } from '../routes';

//todo сделать индивидуальным для проекта
import reducer from '../../../common/reducers/reducer';


const renderPage = RenderPage({ routes, reducer });
const app = new Express();
const server = new http.Server(app);
const serverPort = process.env.PORT;
const staticRoot = Path.join(__dirname,  '../../../../', `statics/${appName()}`);

app.use(compression());
app.use(favicon(Path.join(staticRoot, 'favicon_.ico')));
app.use(Express.static(staticRoot));
app.use(checkAuth, renderPage);


app.get('/project/:id', (req, res, next) => {
  console.log('propopopop');
  setTimeout(()=>{
    res.send({id: req.params.id, name: 'superProject'})
  }, 150);
});

app.get('/designer/:id', (req, res, next) => {
  setTimeout(()=>{
    res.send({id: req.params.id, name: 'Ivan Ivanov'})
  }, 350);
});

app.use((req, res, next)=>{
  console.log('sss');
  res.status(404).send('not_found');
});

server.listen(serverPort, (err) => {
  if (err)
    return console.render(chalk.red(err));
  console.log(chalk.green('Server is running on port:'), serverPort);
});
