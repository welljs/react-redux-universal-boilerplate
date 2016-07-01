import project from './project';
import user from './user';

export default function routes (app) {
  project(app);
  user(app);
}