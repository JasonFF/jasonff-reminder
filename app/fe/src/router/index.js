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
