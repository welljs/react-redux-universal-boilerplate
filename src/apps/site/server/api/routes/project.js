import * as project from '../actions/project';
import { default as handle } from '../../../../../common/server/middleware/apiHandler';
export default function designerRoutes (app) {
  app.route('/api/project/:id')
    .get(handle(req => project.load(req.params.id)))
}