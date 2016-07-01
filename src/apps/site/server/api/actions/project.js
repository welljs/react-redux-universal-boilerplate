export function load () {
  return new Promise (resolve => {
    resolve({name: 'Example project', description: 'React/Redux application boilerplate'});
  });
}