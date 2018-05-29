'use strict';

const Controller = require('egg').Controller;
var phantomjs = require('phantomjs');

class PhantomPageController extends Controller {
  async index() {
    const url = this.ctx.queries.url
    this.ctx.body = url
  }
}

module.exports = PhantomPageController;
