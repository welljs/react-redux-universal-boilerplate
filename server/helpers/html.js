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
            assets.styles.map((style, key) =>{
              return <link href={assets.styles[style]} key={`styles-key-${key}`} media="screen, projection" rel="stylesheet" type="text/css" charSet="UTF-8"/>
            }
          )}

          {/* (will be present only in development mode) */}
          {/* outputs a <style/> tag with all bootstrap styles + App.scss + it could be CurrentPage.scss. */}
          {/* can smoothen the initial style flash (flicker) on page load in development mode. */}
          {/* ideally one could also include here the style for the current page (Home.scss, About.scss, etc) */}
          { Object.keys(assets.styles).length === 0 ? <style dangerouslySetInnerHTML={{__html: bootstrapConfig}}/> : null }
        </head>
        <body>
          <div id="content" dangerouslySetInnerHTML={{__html: content}}></div>
          <script dangerouslySetInnerHTML={{__html: `window.__data=${serialize(clientData)};`}} charSet="UTF-8"></script>
          {
            assets.scripts.map(index => {
              return <script src={ assets.scripts[index] } key={`scripts-key-${index}`} charSet="UTF-8"></script>
            })
          }
        </body>
      </html>
    );
  }
}
