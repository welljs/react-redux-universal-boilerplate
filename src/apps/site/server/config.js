const {HOST, PORT} = process.env;
export default {
  protocol: 'http',
  host: HOST || 'localhost',
  port: PORT,
  apiPort: 3030
};