module.exports = {
  presets: [
    ["@babel/preset-env", {
      "modules": false
    }]
  ],
  plugins: ["transform-vue-jsx", "@babel/plugin-transform-runtime", "dynamic-import-node"]
}
