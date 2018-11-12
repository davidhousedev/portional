import React from 'react';
import Page from './page';
import { hot, setConfig } from 'react-hot-loader';

setConfig({ logLevel: 'debug', pureSFC: true });

const Root = () => (
  <div>
    <Page />
  </div>
);

export default hot(module)(Root);
