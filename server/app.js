import Express from 'express';
import compression from 'compression';
import http from 'http';
import favicon from 'serve-favicon';
import Path from 'path';
import PrettyError from 'pretty-error';
import { checkAuth, renderPage } from './middleware';
import { assets } from './helpers';


const app = new Express();
const server = new http.Server(app);
const pretty = new PrettyError();
const serverPort = process.env.PORT;

app.use(favicon(Path.join(__dirname, '../static', 'favicon.ico')));


app.use(compression());
app.use(Express.static(assets.root));
app.use(checkAuth, renderPage);

server.listen(serverPort, (err) => {
  if (err)
    return pretty.render(err);
  console.info('Server is running on port:', serverPort);
});