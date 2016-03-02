import React, { Component } from 'react';

export default function connectData ( fetchData, fetchDataDeferred ) {
  return function (WrappedComponent) {
    return class ConnectData extends Component {
      static fetchData = fetchData;
      static fetchDataDeferred = fetchDataDeferred;
      render () {
        return <WrappedComponent { ...this.props} />
      }
    }
  }
}