import * as projects from '../actions/projects';
import { default as handle } from '../../../../../common/server/middleware/apiHandler';
export default function (app) {
  app.get('/api/projects', handle(req => projects.load({limit: req.params.limit})));
}