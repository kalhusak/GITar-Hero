import React from 'react';
import ReactDOM from 'react-dom';
import createStore from './store/createStore';
import App from './containers/App';
import './main.scss';

// ========================================================
// Store Instantiation
// ========================================================
const store = createStore();

// ========================================================
// Render Setup
// ========================================================
const MOUNT_NODE = document.getElementById('root');

let render = () => {
  ReactDOM.render(
    <App store={store} />, MOUNT_NODE);
};

// ========================================================
// Developer Tools Setup
// ========================================================
if (__DEV__) {
  if (window.devToolsExtension) {
    window.devToolsExtension.open();
  }
}

// This code is excluded from production bundle
if (__DEV__) {
  if (module.hot) {
    // Development render functions
    const renderApp = render;
    const renderError = (error) => {
      const RedBox = require('redbox-react').default;

      ReactDOM.render(
        <RedBox error={error} />, MOUNT_NODE);
    };

    // Wrap render in try/catch
    render = () => {
      try {
        renderApp();
      } catch (error) {
        renderError(error);
      }
    };
  }
}

// ========================================================
// Go!
// ========================================================
render();
