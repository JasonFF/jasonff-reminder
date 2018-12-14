'use strict';

const Controller = require('egg').Controller;

class zbController extends Controller {
  async index() {
    console.log(this.ctx.request)
    const res = await this.ctx.curl(`https://vip.zb.cn/${this.ctx.request.url.replace('/zbotcapistr/', '')}`, {
      dataType: 'text',
      headers: {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/71.0.3578.80 Safari/537.36'
      }
    })
    this.ctx.body = res
  }
}

module.exports = zbController;
