import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import Zb from './Zb'
import Tiger from './Tiger'
import Bitcny from './Bitcny'
import Chart from './Chart'
import Flow from './Flow'
import Qt from './Qt'
import Usdt from './Usdt'

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
      path: '/usdt',
      name: 'Usdt',
      component: Usdt
    },
    {
      path: '/zb',
      name: 'zb',
      component: Zb
    },
    {
      path: '/bitcny',
      name: 'bitcny',
      component: Bitcny
    },
    {
      path: '/tiger',
      name: 'tiger',
      component: Tiger
    },
    {
      path: '/chart',
      name: 'chart',
      component: Chart
    },
    {
      path: '/flow',
      name: 'flow',
      component: Flow
    },
    {
      path: '/qt',
      name: 'qt',
      component: Qt
    }
  ]
})
