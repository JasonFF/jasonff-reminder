import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import Zb from './Zb'
import BotProfit from './BotProfit'
import Strategy from './Strategy'
import ZbOtcPrice from './ZbOtcPrice'
import OtherPriceParse from './OtherPriceParse'
import MyAccount from './MyAccount/MyAccount'
import MAIndex from './MyAccount/Index'
import Btc from './Btc'
import DataKline from './DataKline'
import Bitmex from './Bitmex'
import Power from './Power'
import Stock from './Stock'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home
    },
    {
      path: '/dataKline',
      name: 'DataKline',
      component: DataKline
    },
    {
      path: '/bitmex',
      name: 'Bitmex',
      component: Bitmex
    },
    {
      path: '/power',
      name: 'Power',
      component: Power
    },
    {
      path: '/stock',
      name: 'Stock',
      component: Stock
    },
    {
      path: '/btc',
      name: 'Btc',
      component: Btc
    },
    {
      path: '/myaccount',
      name: 'MyAccount',
      component: MyAccount,
      children: [
        {
          path: 'index',
          name: 'MAIndex',
          component: MAIndex
        }
      ]
    },
    {
      path: '/zb',
      name: 'zb',
      component: Zb
    },
    {
      path: '/botprofit',
      name: 'BotProfit',
      component: BotProfit
    },
    {
      path: '/strategy',
      name: 'Strategy',
      component: Strategy
    },
    {
      path: '/zbotcprice',
      name: 'ZbOtcPrice',
      component: ZbOtcPrice
    },
    {
      path: '/otherpriceparse',
      name: 'OtherPriceParse',
      component: OtherPriceParse
    }
  ]
})
