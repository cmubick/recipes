module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: [
    'plugin:vue/strongly-recommended',
    '@vue/standard',
  ],
  parserOptions: {
    ecmaVersion: 2020,
  },
  plugins: [
    'vue',
  ],
  rules: {
    'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
    semi: ['warn', 'never'],
    'vue/no-multiple-template-root': 0,
    'comma-dangle': ['warn', 'always-multiline'],
  },
}
