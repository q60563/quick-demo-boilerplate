var Express = require('express'),
    webpack = require('webpack'),
    webpackMiddleware = require('webpack-dev-middleware'),
    webpackHotMiddleware = require('webpack-hot-middleware');

var config = require('./webpack.config');
    
var host = process.env.HOST || 'localhost',
    port = process.env.PORT || 3000,
    compiler = webpack(config),
    middleware = webpackMiddleware(compiler, {
    contentBase: 'src',
    publicPath: config.output.publicPath,
    stats: {
        colors: true,      
        hash: false,
        timings: true,
        chunks: false,
        chunkModules: false,
        modules: false
        }
    });

var app = new Express();

app.use(middleware);
app.use(webpackHotMiddleware(compiler));
app.get('*', function response(req, res) {
    res.write(middleware.fileSystem.readFileSync(path.join(__dirname, 'build/index.html')));
    res.end();
});

app.listen(port, function onAppListening(err) {
    if (err) {
        console.error(err);
    } else {
        console.info('==> Listening on port %s.', port);
        console.info('==> Open up http://0.0.0.0:%s/ in your browser.', port);
    }
});
