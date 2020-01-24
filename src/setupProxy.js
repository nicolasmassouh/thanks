const proxy = require('http-proxy-middleware');
module.exports = function(app) {
	app.use(
		'/slack',
		proxy({
			target: 'https://slack.com',
			changeOrigin: true,
			pathRewrite: {'^/slack' : ''},
		})
	);
};
