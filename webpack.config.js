const path = require('path');

//exporting as function do you cau use webpack --env setup in package.json
//url : https://webpack.js.org/configuration/configuration-types/#exporting-a-function

//make css , scss in seperate file for optimazation;
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = function(env){
  const isProduction = env === 'PROD';
  const CSSExtract = new ExtractTextPlugin('styles.css');

  return {
    entry: ['babel-polyfill','./src/index.js'],
    output: {
      path: path.join(__dirname, 'public'),
      filename: 'bundle.js'
    },
    module: {
      rules: [{
        loader: 'babel-loader',
        test: /\.js$/,
        exclude: /node_modules/
      }, {
        test: /\.s?css$/,
        use: CSSExtract.extract({
          use:[
          //'style-loader', no longer need for inline-css 
            // 'css-loader',
            // 'sass-loader' those need to be used in the object with options for 
            //source map to point to the right file
            {
              loader:'css-loader',
              options:{
                sourceMap:true
              }
            },
            {
              loader:'sass-loader',
              options:{
                sourceMap:true
              }
            }
          ]
        })
      }]
    },
    plugins:[
      CSSExtract
    ],
    //more options for dev tools in production: https://webpack.js.org/configuration/devtool/ 
    //devtool: isProduction ?'source-map':'cheap-module-eval-source-map',
    devtool: isProduction ?'source-map':'inline-source-map', //inline source map should show css/scss in correct files (cheap-module-eval-source-map is buggy)
    devServer: {
      contentBase: path.join(__dirname, 'public'),
      port: 2000, // open app in localhost:2000
      historyApiFallback: true, //fallback not existing urls to index
      open:true,
    }
  };
};
