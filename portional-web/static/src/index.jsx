import React from 'react'
import { render } from 'react-dom'
import Root from './scripts/containers/Root';

require('./styles/main.scss');

let reactRoot = document.createElement('div');
reactRoot.id = 'react-root';
let bodyRoot = document.getElementsByTagName('body');
bodyRoot[0].appendChild(reactRoot);

render(<Root />, document.getElementById('react-root'));
