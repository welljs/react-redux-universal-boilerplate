export default function parseError (err, body) {
  if (body && Object.keys(body).length) {
    return body;
  }
  if (err instanceof Error) {
    return err.response ? err.response.text : err.toString();
  }
  else {
    return err
  }
}