import path from "path";
import { Configuration, HotModuleReplacementPlugin } from "webpack";
import HtmlWebpackPlugin from "html-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import EslintPlugin from "eslint-webpack-plugin";
import ForkTsCheckerWebpackPlugin from "fork-ts-checker-webpack-plugin";
import { Configuration as WebpackDevServerConfiguration } from "webpack-dev-server";

interface devConfiguration extends Configuration {
  devServer?: WebpackDevServerConfiguration;
}

const config: devConfiguration = {
  mode: "development",
  output: {
    publicPath: "/",
  },
  entry: "./src/index.tsx",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/i,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: [
              "@babel/preset-env",
              "@babel/preset-react",
              "@babel/preset-typescript",
            ],
          },
        },
      },
      {
        test: /\.(sa|sc|c)ss$/,
        use: ["style-loader", "css-loader"],
      },
      // {
      //   test: /\.(jpe?g|png|gif|svg)$/i,
      //   loader: "file-loader",
      //   options: {
      //     name: "assets/images/[name].[ext]",
      //   },
      // },
    ],
  },
  resolve: {
    alias: {
      Components: path.resolve(__dirname, "./src/components/"),
      Api: path.resolve(__dirname, "./src/service/api/"),
      Interface: path.resolve(__dirname, "./src/service/interface/"),
      Utils: path.resolve(__dirname, "./src/service/utils/"),
      Assets: path.resolve(__dirname, "./src/assets/"),
      Pages: path.resolve(__dirname, "./src/pages/"),
      Data: path.resolve(__dirname, "./src/service/data/"),
      Layout: path.resolve(__dirname, "./src/layout/"),
      Redux: path.resolve(__dirname, "./src/redux/"),
    },
    fallback: {
      buffer: require.resolve("buffer"),
    },
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "public/index.html",
    }),
    new HotModuleReplacementPlugin(),
    new ForkTsCheckerWebpackPlugin({
      async: false,
    }),
    new EslintPlugin({
      extensions: ["js", "jsx", "ts", "tsx"],
    }),
    // new CopyWebpackPlugin({
    //   patterns: [{ from: "src/assets", to: "assets" }],
    // }),
  ],
  devtool: "inline-source-map",
  devServer: {
    // static: path.join(__dirname, "build"),

    historyApiFallback: true, //에러방지 react-router cannot GET {url}
    port: 3800,
    open: true,
    // hot: true,
    // proxy: {
    //   "/protect": {
    //     // /api로 시작하는 경로일 경우, ex) /api/rest/myInfo
    //     target: "https://api-20-196-193-208.vurix.kr", //'https://api-20-196-193-208.vurix.kr/', // 요청 url 앞에 target을 붙여주기, ex) http://localhost:8080/api/rest/myInfo    // pathRewrite: { '/api': '/' }, // /api에 해당하는 url을 없애기, ex) http://localhost:8080/rest/myInfo,
    //     secure: false, // disable SSL verification
    //     changeOrigin: true, // for vhosted sites, changes host header to match to target's host
    //   },
    // },
  },
};

export default config;
