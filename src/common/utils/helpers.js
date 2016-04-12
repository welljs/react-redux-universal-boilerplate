/*
* возвращает название приложения которое хранится в package.json
*/
export function appName () {
  return __SERVER__ ?  process.env.APPNAME : __APPNAME__;
}