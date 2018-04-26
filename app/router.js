'use strict';
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa-connect');
const hbproxy = k2c(httpProxy({
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

const zbproxy = k2c(httpProxy({
  target: 'http://api.zb.com/data/v1',
  changeOrigin: true,
  pathRewrite: {
    '^/zbapi/*' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const zbtradeproxy = k2c(httpProxy({
  target: 'https://trade.zb.com/api',
  changeOrigin: true,
  pathRewrite: {
    '^/zbtradeapi/*' : '/',     // rewrite path
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
  router.all('/hbapi/*', hbproxy)
  router.all('/zbapi/*', zbproxy)
  router.all('/zbtradeapi/*', zbtradeproxy)
  router.get(/^\/(?!public)/, controller.home.index);
};
