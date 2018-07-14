const rewireMobX = require('react-app-rewire-mobx');
const path = require('path');
const { compose } = require('react-app-rewired');
const rewireSass = require('react-app-rewire-scss');
const reactAppRewireBuildDev = require('react-app-rewire-build-dev');

/* config-overrides.js */

const options = {
  outputPath : './devBuild'
}

  //reactAppRewireBuildDev(config, env, options);

module.exports = function(config, env) {
  config = rewireMobX(config, env);
  config = reactAppRewireBuildDev(config, env, options)
  config.resolve.alias['~'] = path.resolve('./src');

  return config;
}