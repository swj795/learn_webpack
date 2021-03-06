# learn_webpack
learn and test webpack

### 初始化项目

```bash
npm init 
// 初始化项目
npm install --save-dev webpack webpac-cli
// 安装webpack webpack-cli 依赖包

```

不设置配置文件

```bash
npx webpack 指定文件 // 打包指定文件
```

npx webpack流程

1、寻找web pack.config.js文件 按照文件中配置进行打包

2、可以指定配置文件

```bash
npx webpack --config myConfig.js
```

--save-dev   - D 代表安装到开发环境 安装到devDependencies

--save 生产环境 安装到dependencies

### 开始配置 

创建配置文件

```bash
touch webpack.config.js
```

#### 配置出入口

```bash
module.exports = {
		mode: 'production',
		entry: './src/index.js',
		output: {
				filename:'index.js',
				path:path.resolve(__dirname,'dist')
		}
}
```

**__dirname 是当前执行文件的绝对路径**

Entry 代表需要打包的文件 如果打包多个文件则用数组来存储

output 代表打包的文件存在那里

#### 输入的使用场景

##### 分离应用程序和第三方库入口

webpack.config.js

```js
module.exports =  {
  entry: {
    main: './src/app.js',
    vendor: './src/vendor.js'
  }
}
```

webpack.prod.js

```js
module.exports = {
  output: {
    filename:'[name][hash:5].bundle.js'
  }
}
```

webpack.dev.js

```js
module.exports = {
  output:{
    filename:'[name][hash:5].bundle.js'
  }
}
```

##### 多页面应用程序

webpack.config.js

```js
module.exports = {
  entry: {
    pageOne: './src/pageOne/index.js',
    pageTwo: './src/pageTwo/index.js'
  }
}
```

#### 输出

将设置输出的文件名打包到dist文件中

```js
const path = require('path')

module.exports = {
  entry: {
    app: './src/app/index.js',
    vendor: './src/vendor/index.js'
  },
  output: {
    filename: '[name][hash:5].js',
    path: path.resolve(__dirname,'dist'),
    publicPath: 'https//cdn.com',
    clean:true
  }
}
// clean 清理以前打包之前的旧文件
// publicPath 自动添加到输出文件名的前面
// ./dist/app.js ./dist/vendor.js
```

有多个文件输出时，输出文件的名称用[name]占位符来替代

#### source map

打包后的代码与源码映射

```bash
devtool: 'eval-cheap-source-map'
```

#### devServer

提供一个web server 且具有实时加载功能

```js
devServer: {
  static: './dist'
}

// 将dist目录的文件server到localhost：8080下
```

#### denpendOn

```js
entry： {
  index: {
    import: './src/index.js',
  	dependOn: 'shared'
  },
    test: {
      import: './src/test.js',
      dependOn: 'shared'
    },
      shared:'lodash',
}

// 在多个chunk之间共享模块
```

#### splitChunksPlugin

将公共的依赖模块提取到一个入口或者提取一个新的生成chunk

```js
optimization: {
  splitChunksPlugin: {
    // cacheGroups 将第三方库存到缓存中，减少请求的次数
    cacheGroups: {
      test: /REX/,
      name: 'vendor',
      chunks: 'all',
    }

  }
}
```



#### Module模块

##### generator生成器

```js
module.exports = {
  module: {
    generator: {
      // asset 模块的generator选项
      asset: {
        // 打包之后的文件名 [打包之前的文件名][五位哈希值][扩展名]
        filename:'assets/[name][hash:5][ext]',
        outputPath: 'cdn-assets',
        // 最终打包目录为 dist/cdn-assets/assets/[name][hash:5][ext]
      }
    }
  }
}
```



#### parser解析器





#### loader

loader 对源代码进行转换，用来预处理文件

#### loader特性

1、loader可以同步，也可以异步

2、loader在node中运行

3、loader支持链式调用，链式的执行顺序是相反的

##### 加载css

需要先安装style- loader和css-loader

```bash
npm install --save-dev style-loader css-loader
```

设置配置

loader有俩个属性

1、test属性 识别出哪些文件会被转化

2、use属性 定义出进行转换时，使用那个loader

loader执行顺序：从下到上，从右到左

先执行css-loader ，再执行style-loader

```js
module: {
  rules:[
    {
      test: /\.css$/i,
      use:['style-loader','css-loader'],
    }
  ]
}
```

css打包最后打包到js中

##### Postcss-loader

允许使用js插件转换样式的工具，检查css，可以自动添加前缀，兼容浏览器

```js
module: {
  rules: [
    {
      test: /\.css$/i,
      use:['style-loader','css-loader',{
        loader:'postcss-loader',
        options: {
          postcssOptions: {
            plugins: [
              [
                'autoprefixer',
                {},
              ],
            ],
          }
        }
      }]
    }
  ]
}
```

这样设置plugins会有点不清晰，建议使用下面这种方式

在webpack.config.js中

```js
const path = require('path');

module.exports = {
  mode: 'production',
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: path.resolve(__dirname,'dist'),
  },
  module:{
    rules:[
    	{
        test: /\.css$/i,
        use:['style-loader','css-loader','postcss-loader'],
      },  
    ],
    generator: {
      asset: {
        filename:'assets/[name][hash:5][ext]',
        outputpath:'cdn-assets'
      },
    },
  },
}
```

在postcss.config.js

```js
module.exports = {
  plugin:[
				[
          'autoprefixer',
        ],
  ],
}
```

#### 解析

全局资源使用alias

```js
// webpack.config.js
const path = require('path');

module.exports = {
  resolve: {
    alias: {
      Components: path.resolve(__dirname,'src/components'),
      Template$: path.resolve(__dirname,'src/template')
    },
  },
}

// 别的文件中  使用别名
import Components from 'Components/component'

// 在给定的对象键后添加$，表示jing qu
```



### 执行命令的更改

在package.json中script更改

```json
"build": "webpack"
```

执行 npm run build 就相当于执行webpack

### 正则表达式： 

i忽略大小写

\ 转义符 

### pulgin

#### HtmlWebpackPlugin

在打包文件夹中自动生成一个html文件，在body中使用script标签引入webpack生成的bundle

```js
const HtmlWebpackPlugin = require('html-webpack-plugin')
const path = require('')

```

### 热更新

