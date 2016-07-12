export function load (name) {
  return new Promise (resolve => {
    setTimeout(() => {
      resolve({name, description: 'Example project'});
    }, 500);
  });
}