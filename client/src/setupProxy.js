import { createProxyMiddleware } from 'http-proxy-middleware';

module.exports = function (app) {
  app.use(
    '/api', // Specify the path you want to proxy (e.g., /api)
    createProxyMiddleware({
      target: 'http://localhost:8080', // Specify the target server where requests should be forwarded
      changeOrigin: true,
    })
  );
};
