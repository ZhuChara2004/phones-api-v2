module.exports = {
  extends: [
    'airbnb-base',
    'plugin:jest/recommended',
  ],
  rules: {
    "jest/valid-expect": "off",
  },
  plugins: [
    'import',
    'jest',
  ],
  env: {
    node: true,
    'jest/globals': true,
  },
};
