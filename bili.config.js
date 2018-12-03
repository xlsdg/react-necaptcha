'use strict';

module.exports = {
  input: 'src/necaptcha.jsx',
  outDir: 'dist',
  // config: '',
  format: ['cjs', 'umd', 'umd-min', 'es'],
  moduleName: 'NECaptcha',
  global: {
    'react': 'React'
  },
  filename: '[name][suffix].js',
  name: 'necaptcha',
  // inline: false,
  // cwd: '',
  // external: [
  //   'react'
  // ],
  banner: false,
  postcss: {
    modules: true
  },
  js: 'babel',
  // plugin: ['vue'],
  target: 'browser',
  jsx: 'react',
  // objectAssign: undefined,
  // exports: 'auto',
  // replace: {},
  // alias: {},
  pretty: true
  // env: {},
  // virtualModules: {},
  // sizeLimit: {},
  // extendOptions: {},
};
