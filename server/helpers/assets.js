import Path from 'path';
const root = '/assets';

function styles (files) {
  return files.map((file) => {
    return Path.join(root, `css/${file}.css`);
  })
}

function scripts (files) {
  return files.map((file) => {
    return Path.join(root, `js/${file}.js`);
  })
}

export default {
  root,
  'styles': styles(['main']),
  'scripts': scripts(['vendors', 'app'])
}