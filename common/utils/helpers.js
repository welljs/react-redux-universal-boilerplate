export function appName () {
  return __SERVER__ ?  process.env.APPNAME : __ENV__.APPNAME;
}