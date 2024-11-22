const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  transpileDependencies: ["vuetify"],

  // Custom Webpack configuration
  configureWebpack: {
    plugins: [
      new (require("webpack").DefinePlugin)({
        "process.env": {
          VUE_APP_API_TOKEN: JSON.stringify(process.env.VUE_APP_API_TOKEN),
          VUE_APP_SERVER_URL: JSON.stringify(process.env.VUE_APP_SERVER_URL),
          VUE_APP_GITHUB_CLIENT_ID: JSON.stringify(
            process.env.VUE_APP_GITHUB_CLIENT_ID
          ),
          VUE_APP_GITHUB_CLIENT_SECRET: JSON.stringify(
            process.env.VUE_APP_GITHUB_CLIENT_SECRET
          ),
          VUE_APP_GITHUB_CALLBACK_URL: JSON.stringify(
            process.env.VUE_APP_GITHUB_CALLBACK_URL
          ),
        },
      }),
    ],
  },
});
