const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');
const { compose } = require('react-app-rewired');

module.exports = function(config, env) {
  const rewires = compose(
    rewireMobX);

  config.resolve.alias['~'] = path.resolve('./src');

  return rewires(config, env);
}