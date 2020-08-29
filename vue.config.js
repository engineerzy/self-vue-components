const path = require('path');

module.exports = {
	// 打包出口配置修改，本地开发时出口为 ‘/’，线上出口为 /open/entry/
	publicPath: process.env.NODE_ENV === 'production' ? '/open/entry/' : '/',
	lintOnSave: false,
	// 本地开发接口代理
	devServer: {
		port: 80,
		proxy: {
			'/api': {
				target: 'https://www.ceshi112.com/',
				ws: true,
				changeOrigin: true,
				secure:false,
				pathRewrite:{
					'^/api':''
				}
			},
		},
  },
  // pluginOptions: {
  //   'style-resource-loader': {
  //     preProcessor: 'less',
  //     patterns: [
  //       path.resolve(__dirname,'./src/assets/styles/variable.less')
  //     ]
  //   }
  // },
  // configureWebpack: {
  //   resolve: {
  //     alias: {
  //       '@': path.resolve(__dirname, './src')
  //     },
  //     extensions: ['.vue', '.js', '.jsx', '.json']
  //   },
  //   module: {
  //     rules: [
  //       {
  //         test: /.less$/,
  //         use: [
  //           'style-loader',
  //           'css-loader',
  //           'less-loader',
  //           {
  //             loader: 'style-resources-loader',
  //             options: {
  //               patterns: [
  //                 path.resolve(__dirname, './src/assets/styles/variable.less')
  //               ],
  //               injector: 'append'
  //             }
  //           }
  //         ]
  //       }
  //     ]
  //   }
  // },
 
	chainWebpack: (config) => {
		// 配置全局less变量
		const types = ['vue', 'vue-modules', 'normal-modules', 'normal'];
		types.forEach((type) => {
			config.module
				.rule('less')
				.oneOf(type)
				.use('style-resource')
				.loader('style-resources-loader')
				.options({
					patterns: [
						path.resolve(
							__dirname,
							'./src/assets/styles/variable.less'
						),
					],
        });
        // config.module
				// .rule('less')
				// .oneOf(type)
				// .use('postcss')
				// .loader('postcss-loader')
		});
		// 增加路径别名
    config.resolve.alias.set('@', path.resolve(__dirname, './src'))
	},
};
