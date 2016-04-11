export function get (id) {
  return new Promise((resolve, reject) => {
    let timer = setTimeout(()=>{
      clearTimeout(timer);
      resolve({status: 'ok', data: {id}});
    }, 150);
  });
}