export function load () {
  return new Promise (resolve => {
    resolve({name: 'John Doe', age: 87});
  });
}

export function login () {
  return new Promise (resolve => {
    //emulating latency
    setTimeout(() => {
      resolve({name: 'John Doe', age: 87});  
    }, 1000);
  });
}