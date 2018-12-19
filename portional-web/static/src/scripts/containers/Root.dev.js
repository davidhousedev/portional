import React from 'react';
import { hot, setConfig } from 'react-hot-loader';
import DevTools from './DevTools';
import RootRouter from './root-router';

setConfig({ logLevel: 'debug', pureSFC: true });

const Root = () => (
  <div>
    <DevTools/>
    <RootRouter />
  </div>
);

export default hot(module)(Root);
