import path from 'path';

// eslint-disable-next-line import/no-anonymous-default-export
export default (env) => (config) => {
  config.resolve.alias[process.env.npm_package_name] = path.resolve('.');
  return config;
};
