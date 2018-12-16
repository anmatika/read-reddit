module.exports = {
  parser: 'babel-eslint',
  env: {
    node: true,
    mocha: true,
    jest: true,
    es6: true,
  },
  globals: {
    expect: true,
    window: true,
    document: true,
  },
  settings: {
    'import/resolver': {
      node: {
        paths: [__dirname],
      },
    },
  },
  plugins: ['prettier'],
  extends: ['strongloop'],
  rules: {
    indent: ['error', 2, { SwitchCase: 1 }],
    'no-await-in-loop': ['off'],
    'no-restricted-syntax': ['off']
  },
};
