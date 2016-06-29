/*
* возвращает название приложения которое хранится в package.json
*/

const config = require('../../config');

export function getConfig () {
  return config
}