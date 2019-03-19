// npm install --save vue-axios
//  sass 依赖 $ npm install sass-loader node-sass --save-dev
// npm install better-scroll --save    npm install --save vue-axios
// const url="https://api.zhuishushenqi.com/book/by-categories?gender=male&type=hot&major=%E5%A5%87%E5%B9%BB&minor=&start=0&limit=20"
module.exports = {
    configureWebpack: {
        devServer: {
            proxy: {
                "/api": {
                    target: "https://api.zhuishushenqi.com",
                    pathRewrite: {
                        "^/api": ""
                    },
                    changeOrigin: true
                },
               
                // '/content': {
                //   target: 'http://chapter2.zhuishushenqi.com',
                //   changeOrigin: true,
                //   pathRewrite: {
                //     '^/content': ''
                //   }
                // } ,
                '/content':{
                  target:'http://chapterup.zhuishushenqi.com',
                  changeOrigin:true,
                  pathRewrite:{
                    '^/content':'http://chapterup.zhuishushenqi.com'
                  }
                }
            }
        }
    }
}