'use strict';
import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom/server';
import serialize from 'serialize-javascript';
import DocumentMeta from 'react-document-meta';

export default class Html extends Component {
  static propTypes = {
    assets: PropTypes.object,
    component: PropTypes.node,
    store: PropTypes.object
  };

  render() {
    const { assets, component, store } = this.props;
    const content = component ? ReactDOM.renderToString( component ) : '';
    const clientData = { store: store.getState() };
    return (
      <html>
        <head>
          {DocumentMeta.renderAsReact()}

          <link rel="shortcut icon" href="/favicon.ico" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          {/* styles (will be present only in production with webpack extract text plugin) */}
          {
            Object.keys(assets.styles).map((style, key) =>{
              return <link href={ assets.styles[style] } key={`styles-key-${key}`} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>
            }
          )}
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}></div>
          <script dangerouslySetInnerHTML={{__html: `window.__initialData=${serialize(clientData)};`}} charSet="UTF-8"></script>
          <script src={ assets.javascript['vendors'] } key={`scripts-key-vendors`} charSet="UTF-8"></script>
          <script src={ assets.javascript['app'] } key={`scripts-key-app`} charSet="UTF-8"></script>
        </body>
      </html>
    );
  }
}
