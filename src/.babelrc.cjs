// CommonJS format is used because babel-loader calls Babel synchronously.
module.exports = (api, ...other) => {
  const isCli = api.caller((caller) => caller?.name === '@babel/cli');
  const isLoader = api.caller((caller) => caller?.name === 'babel-loader');

  if (isCli) {
    // Ignore tests and demo app files from library builds.
    return {
      ignore: ['**/*.test.js', 'App.js', 'index.js', 'setupTests.js'],
    };
  }

  if (isLoader) {
    return {};
  }

  api.caller((caller) => {
    console.warn('Unknown caller', caller);
  });

  return {};
};
