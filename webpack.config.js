// webpack.config.js 파일은 굉장히 오래된 JavaScript 코드만 이해 할 수 있다.
// Webpack configuration에는 두 가지 요구사항이 있다.
// 첫번째는 Entry로, Entry는 우리가 처리하고자 하는 파일을 말함. 현재 프로젝트의 경우 client/js/main.js를 말함
// 두번째는 output로, 작업이 끝난 후 그 결과물을 처리하는 코드

const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const path = require("path");

module.exports = {
    entry: { 
        main: "./src/client/js/main.js",
        videoPlayer: "./src/client/js/videoPlayer.js",
    },
    mode: 'development', // development, production 두 가지 모드가있는데 기본값은 production이다. 개발중일땐 development 모드로 설정, 완성하면 production
    watch: true,
    plugins: [new MiniCssExtractPlugin({
        filename: "css/styles.css",
        })
    ],
    output: {
        filename:"js/[name].js", //.................................................................................................................................................................................................................................................................................................. 결과물로 저장될 파일 이름
        path: path.resolve(__dirname, "assets"), // 결과물을 저장할 경로 * 절대경로를 요구
        clean: true, // output folder의 build를 시작하기 전에 clean 해주는 것
    },
    module: {
        // rules는 우리가 각각의 파일 종류에 따라 어떤 전환을 할 건지 결정하는 것, (배열이다)
        rules: [
            {
                test: /\.js$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            ['@babel/preset-env', { targets: "defaults" }]
                        ],
                    },
                },
            },
            {
                test: /\.scss$/,
                // 여러가지 loader를 사용할 때 주의할 점
                // 제일 마지막에 적용할 loader 부터 작성해줘야함 (사용할 loader 순서를역순으로 작성해줘야함)
                // 이유 : webpack은 뒤에서부터 시작하기 때문
                use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
            }
        ],
    },
};