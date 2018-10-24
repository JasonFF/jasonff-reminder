import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import Zb from './Zb'
import AverageChart from './AverageChart'
import BotProfit from './BotProfit'
import BtcTrending from './BtcTrending'
import Vol from './Vol'
import Strategy from './Strategy'
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
      path: '/zb',
      name: 'zb',
      component: Zb
    },
    {
      path: '/averagechart',
      name: 'AverageChart',
      component: AverageChart
    },
    {
      path: '/botprofit',
      name: 'BotProfit',
      component: BotProfit
    },
    {
      path: '/btctrending',
      name: 'BtcTrending',
      component: BtcTrending
    },
    {
      path: '/vol',
      name: 'Vol',
      component: Vol
    },
    {
      path: '/strategy',
      name: 'Strategy',
      component: Strategy
    }
  ]
})
