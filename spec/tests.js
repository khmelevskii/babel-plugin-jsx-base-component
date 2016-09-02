var Base = require('../src/index');

require('babel-core/register')({
  presets: ['babel-preset-react'],
  plugins: [Base],
  cache: false,
});

require('./test/basic');
require('./test/exists');
require('./test/component');
