import * as project from '../actions/project';
import { default as handle } from '../../../../../common/server/middleware/apiHandler';

export default function projectRoutes (app) {
  app.route('/api/project/:name').get(handle(req => project.load(req.params.name)))
}