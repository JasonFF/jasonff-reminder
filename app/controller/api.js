'use strict';

const Controller = require('egg').Controller;

class ApiController extends Controller {
  async index() {
    this.ctx.body = 'api'
  }
}

module.exports = ApiController;
