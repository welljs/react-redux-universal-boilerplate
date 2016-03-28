'use strict';
export default function redirect (props, path, query) {
  if ( __SERVER__ )
    props.push(null, path, query);
  else
    props.history.replaceState(null, path, query);
}