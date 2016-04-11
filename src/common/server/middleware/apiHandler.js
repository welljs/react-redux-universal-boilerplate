export default function apiHandler (cb) {
  return function (req, res, next) {
    const promise = cb(req);
    if (typeof promise.then !== 'function' ) {
      return res.status(500).send('bad_callback');
    }
    else {
      promise
        .then(result => res.send(result))
        .catch( reason => res.status(500).send(reason) );
    }
  }
}