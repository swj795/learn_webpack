const path = require('path');

module.exports = {
    mode: 'production',
    entry: './src/index.js',
    output: {
        filename: 'index.js',
        path:path.resolve(__dirname,'dist'),
    },
    module: {
        rules: [
            // 打包图片的配置
            {
                test: /\.(png|svg|jpg|gif|jepg)$/i,
                type:'asset/resource',
            },
            // 打包css样式的配置
            {
                test: /\.css$/i,
                use: ['style-loader','css-loader',
                    {
                        loader: 'postcss-loader',
                      },
                ],
            }
        ],
        generator: {
            asset: {
                filename: 'assets/[name][hash:5][ext]',
                // publicPath: './assets',
                outputPath: 'cdn-assets'
            }
        }
    }
}