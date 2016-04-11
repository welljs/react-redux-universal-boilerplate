import { project } from '../actions/index';
import { default as handle } from '../../../../../common/server/middleware/apiHandler';
export default function designerRoutes (app) {
  app.route('/api/project/:id')
    .get(handle(req => project.get(req.params.id)))
}