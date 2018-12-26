'use strict';
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa-connect');
const hbproxy = k2c(httpProxy({
  target: 'https://api.huobi.pro/',
  changeOrigin: true,
  pathRewrite: {
    '^/hbapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const zbapi = k2c(httpProxy({
  target: 'http://api.zb.cn/',
  changeOrigin: true,
  pathRewrite: {
    '^/zbapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const zbotcapi = k2c(httpProxy({
  target: 'https://vip.zb.cn/',
  changeOrigin: true,
  pathRewrite: {
    '^/zbotcapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
    proxyRes.headers['Access-Control-Allow-Credentials'] = false;
    proxyRes.headers['X-Frame-Options'] = '*'
  },
}));

const zbtradeproxy = k2c(httpProxy({
  target: 'https://trade.zb.cn/',
  changeOrigin: true,
  pathRewrite: {
    '^/zbtradeapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const hbotcapi = k2c(httpProxy({
  target: 'https://otc-api.huobipro.com/v1/otc/trade/list/public',
  changeOrigin: true,
  pathRewrite: {
    '^/hbotcapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const okexapi = k2c(httpProxy({
  target: 'https://www.okex.com',
  changeOrigin: true,
  pathRewrite: {
    '^/okexapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const aicoin = k2c(httpProxy({
  target: 'https://www.aicoin.net.cn',
  changeOrigin: true,
  pathRewrite: {
    '^/aicoin/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

// https://www.bitmex.com/

const bitmexapi = k2c(httpProxy({
  target: 'https://www.bitmex.com',
  changeOrigin: true,
  pathRewrite: {
    '^/bitmexapi/' : '/',     // rewrite path
  },
  onProxyReq (proxyReq) {
    proxyReq.setHeader("Referer", 'https://static.bitmex.com/')
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
  router.all('/zbapi/*', zbapi)
  router.all('/zbtradeapi/*', zbtradeproxy)
  router.all('/hbotcapi/*', hbotcapi)
  router.all('/zbotcapi/*', zbotcapi)
  router.all('/zbotcapistr/*', controller.zbotcapistr.index)
  router.all('/okexapi/*', okexapi)
  router.all('/aicoin/*', aicoin)
  router.all('/bitmexapi/*', bitmexapi)
  router.get(/^\/(?!public)/, controller.home.index);
};
