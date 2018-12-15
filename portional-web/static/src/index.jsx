import React from 'react';
import { render } from 'react-dom';
import Root from './scripts/containers/Root';
import { Provider } from 'react-redux';

import configureStore from './scripts/store/state';


require('./styles/main.scss');
let reactRoot = document.createElement('div');
reactRoot.id = 'react-root';
let bodyRoot = document.getElementsByTagName('body');
bodyRoot[0].appendChild(reactRoot);

render(
  (
    <Provider store={configureStore()}>
      <Root />
    </Provider>
  ),
  document.getElementById('react-root')
);
