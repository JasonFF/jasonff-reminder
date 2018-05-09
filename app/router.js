'use strict';
const httpProxy = require('http-proxy-middleware');
const k2c = require('koa-connect');
const hbproxy = k2c(httpProxy({
  target: 'https://api.huobipro.com',
  changeOrigin: true,
  pathRewrite: {
    '^/hbapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const zbproxy = k2c(httpProxy({
  target: 'http://api.zb.com/',
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
  target: 'https://vip.zb.com/',
  changeOrigin: true,
  pathRewrite: {
    '^/zbotcapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const zbtradeproxy = k2c(httpProxy({
  target: 'https://trade.zb.com/',
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

const tigerapi = k2c(httpProxy({
  target: 'https://api.cointiger.com',
  changeOrigin: true,
  pathRewrite: {
    '^/tigerapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const tigerctcapi = k2c(httpProxy({
  target: 'https://www.cointiger.com',
  changeOrigin: true,
  pathRewrite: {
    '^/tigerctcapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const gatectcapi = k2c(httpProxy({
  target: 'https://gate.io',
  changeOrigin: true,
  pathRewrite: {
    '^/gatectcapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const gateapi = k2c(httpProxy({
  target: 'http://data.gateio.io',
  changeOrigin: true,
  pathRewrite: {
    '^/gateapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const blockapi = k2c(httpProxy({
  target: 'https://block.cc',
  changeOrigin: true,
  pathRewrite: {
    '^/blockapi/' : '/',     // rewrite path
  },
  onProxyRes (proxyRes, req, res) {
    proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    proxyRes.headers['Access-Control-Allow-Method'] = '*';
  },
}));

const aexapi = k2c(httpProxy({
  target: 'https://api.aex.com',
  changeOrigin: true,
  pathRewrite: {
    '^/aexapi/' : '/',     // rewrite path
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
  router.all('/hbotcapi/*', hbotcapi)
  router.all('/tigerapi/*', tigerapi)
  router.all('/tigerctcapi/*', tigerctcapi)
  router.all('/gatectcapi/*', gatectcapi)
  router.all('/gateapi/*', gateapi)
  router.all('/zbotcapi/*', zbotcapi)
  router.all('/blockapi/*', blockapi)
  router.all('/aexapi/*', aexapi)
  router.get(/^\/(?!public)/, controller.home.index);
};
