export default function parseError (err, body) {
  if (body && Object.keys(body).length) {
    return body;
  }
  if (err instanceof Error) {
    return err.message;
  }
  else {
    return err
  }
}