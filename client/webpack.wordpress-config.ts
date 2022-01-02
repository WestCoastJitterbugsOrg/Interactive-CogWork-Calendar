import path from "path";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import { DefinePlugin } from "webpack";
import ESLintPlugin from "eslint-webpack-plugin";
import ZipPlugin from "zip-webpack-plugin";
import { WebpackConfiguration } from "webpack-dev-server";

module.exports = (env: any) => {
  return {
    entry: path.join(__dirname, "src", "index.tsx"),
    output: {
      path: path.join(__dirname, "build"),
      filename: "wcjcal.js",
      clean: env.production,
    },
    resolve: {
      extensions: [".tsx", ".ts", ".js"],
    },
    devtool: !env.production && "source-map",
    mode: env.production ? "production" : "development",
    performance: {
      // We don't want to do code splitting because it makes it harder to load the scripts in the wordpress plugin,
      // So we let the asset sizes be larger than recommended in order to remove warnings
      // 1024 ** 2 bytes == 1 MiB
      maxEntrypointSize: 1024 ** 2,  
      maxAssetSize: 1024 ** 2
    },
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: ["babel-loader"],
        },
        {
          test: /\.(ts|tsx)$/,
          exclude: /node_modules/,
          use: ["ts-loader"],
        },
        {
          test: /\.(css)$/,
          use: [
            env.production ? MiniCssExtractPlugin.loader : "style-loader",
            "css-loader",
            "postcss-loader",
          ],
        },
      ],
    },
    externals: {
      react: "React",
      "react-dom": "ReactDOM",
      jquery: "jQuery",
    },
    plugins: [
      new MiniCssExtractPlugin({
        filename: "wcjcal.css",
      }),
      new CopyWebpackPlugin({
        patterns: ["public/wcj-calendar.php"],
      }),
      new DefinePlugin({ API_URL: `"${env.API_URL}"` }),
      new ESLintPlugin({}),
      new ZipPlugin({ filename: "wcjcal.zip" }),
    ],
  } as WebpackConfiguration;
};