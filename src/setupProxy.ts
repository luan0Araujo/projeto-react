import { createProxyMiddleware } from 'http-proxy-middleware';

export default function(app:any) {
  app.use(
    createProxyMiddleware({
      target: 'https://ngn-api.herokuapp.com',
      changeOrigin: true,
    })
  );
};