import React from 'react';
import RecipesPage from './recipes-page';
import { hot, setConfig } from 'react-hot-loader';

setConfig({ logLevel: 'debug', pureSFC: true });

const Root = () => (
  <div>
    <RecipesPage />
  </div>
);

export default hot(module)(Root);
