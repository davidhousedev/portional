if (process.env.NODE_ENV === 'production') {
  console.log('importing prod state');
  module.exports = require('./state.prod');
} else {
  console.log('import dev state');
  module.exports = require('./state.dev');
}
