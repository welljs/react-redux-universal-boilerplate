import project from './project';
import user from './user';
import {default as projects} from './projects';

export default function routes (app) {
  project(app);
  user(app);
  projects(app);
}