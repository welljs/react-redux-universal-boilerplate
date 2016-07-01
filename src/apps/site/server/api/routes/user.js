import * as user from '../actions/user';
import { default as handle } from '../../../../../common/server/middleware/apiHandler';
export default function designerRoutes (app) {
  app.get('/api/user/login', handle(req => user.login(req.params.id)));
  app.get('/api/user/load', handle(req => user.load(req.params.id)));
}