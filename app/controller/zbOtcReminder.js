'use strict';

const Controller = require('egg').Controller;

class ZbOtcReminder extends Controller {
  async login(ctx) {
    console.log(this.ctx.session)
    const body = ctx.request.body
    if (body.password == '88888888') {
      ctx.session = {
        key: 'success',
        maxAge: 24 * 3600 * 1000, // 1 天
        httpOnly: true,
        encrypt: true,
      }
      ctx.body = {
        status: 1
      }
      return
    }
    ctx.body = {
      status: 0
    }
  }
  async logout(ctx) {
    ctx.session = null
    ctx.body = {
      status: 1
    }
  }
  async getList() {
    this.ctx.service.zbOtcReminder.checkLogin().then(res => {
      this.ctx.body = res
    }).catch(e => {
      
    })
  }
}

module.exports = ZbOtcReminder;
