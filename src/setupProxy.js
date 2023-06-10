const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/HomeView/user',
    createProxyMiddleware({
      target: 'https://bcontrol-web-api.azurewebsites.net/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Expenses/user',
    createProxyMiddleware({
      target: 'https://bcontrol-web-api.azurewebsites.net/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Expenses/user/:id/view',
    createProxyMiddleware({
      target: 'https://bcontrol-web-api.azurewebsites.net/api/',
      changeOrigin: true,
    })
  );
  app.use(
    '/Expenses/user/:id/:date',
    createProxyMiddleware({
      target: 'https://bcontrol-web-api.azurewebsites.net/api/',
      changeOrigin: true,
    })
  );

};