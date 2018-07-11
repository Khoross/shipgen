const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');
const { compose } = require('react-app-rewired');
const rewireSass = require('react-app-rewire-scss');

module.exports = function(config, env) {
  const rewires = compose(
    rewireMobX
    //,rewireSass
    );

  config.resolve.alias['~'] = path.resolve('./src');

  return rewires(config, env);
}