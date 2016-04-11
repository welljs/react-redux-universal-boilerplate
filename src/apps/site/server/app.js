import Express from 'express';
import compression from 'compression';
import http from 'http';
import favicon from 'serve-favicon';
import Path from 'path';
import chalk from 'chalk';
import httpProxy from 'http-proxy';

import { parseModel } from './middleware';
import { checkAuth, RenderPage } from '../../../common/server/middleware';
import { appName } from '../../../common/utils/helpers';
import { default as routes } from '../routes';

//todo сделать индивидуальным для проекта
import reducer from '../../../common/reducers/reducer';

const proxy = httpProxy.createServer({
  target: 'http://127.0.0.1:3030/api'
});

proxy.on('error', (error, req, res) => {
  let json;
  if (error.code !== 'ECONNRESET') {
    console.error('proxy error', error);
  }
  if (!res.headersSent) {
    res.writeHead(500, {'content-type': 'application/json'});
  }

  json = {error: 'proxy_error', reason: error.message};
  res.end(JSON.stringify(json));
});


const renderPage = RenderPage({ routes, reducer });
const app = new Express();
const server = new http.Server(app);
const serverPort = process.env.PORT;
const staticRoot = Path.join(__dirname,  '../../../../', `statics/${appName()}`);

app.use(compression());
app.use(favicon(Path.join(staticRoot, 'favicon_.ico')));
app.use(Express.static(staticRoot));

app.use('/api', (req, res) => {
  proxy.web(req, res)
});


app.use(checkAuth, renderPage);


app.use((req, res, next)=>{
  console.log('sss');
  res.status(404).send('not_found');
});

server.listen(serverPort, (err) => {
  if (err)
    return console.render(chalk.red(err));
  console.log(chalk.green('Server is running on port:'), serverPort);
});
