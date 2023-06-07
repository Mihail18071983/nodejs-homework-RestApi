module.exports = {
  env: {
    commonjs: true,
    es2021: true,
    node: true,
    jest: true,
  },
  extends: ["standard", "prettier"],
  parserOptions: {
    ecmaVersion: 12,
  },
  rules: { "no-unused-vars": ["warn", { "vars": "all", "args": "none" }] },
  globals: {
    describe: "readonly",
    it: "readonly",
    expect: "readonly",
  },
};
