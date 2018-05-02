import Vue from 'vue'
import Router from 'vue-router'
import Home from './Home'
import Zb from './Zb'
import Tiger from './Tiger'
import ZbBitCNY from './ZbBitCNY'

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
      path: '/bitcny',
      name: 'bitcny',
      component: ZbBitCNY
    },
    {
      path: '/tiger',
      name: 'tiger',
      component: Tiger
    }
  ]
})
