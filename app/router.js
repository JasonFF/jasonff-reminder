'use strict';
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa-connect');
const proxy = k2c(httpProxy({
  target: 'https://api.huobipro.com',
  changeOrigin: true,
  pathRewrite: {
    '^/hbapi/*' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));
/**
 * @param {Egg.Application} app - egg application
 */
module.exports = app => {
  const { router, controller } = app;
  router.all('/hbapi/*', proxy)
  router.get('/*', controller.home.index);
};
