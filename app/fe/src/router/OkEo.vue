<template>
  <div class="container">
    <div style="height: 30px"></div>
    <Row>
      <Col span="12" offset="2"><h3>现货：{{ticker.last}}</h3></Col>
    </Row>
    <div style="height: 30px"></div>
    <Row>
      <Col span="12" offset="2"><h3>合约：{{ft.last}}</h3></Col>
    </Row>
    <div style="height: 30px"></div>
    <Row>
      <Col span="12" offset="2"><h3>合约-现货：{{fttoticker}} / {{fttotickerPer}}%</h3></Col>
    </Row>
    <div style="height: 30px"></div>
    <Row>
      <Col span="12" offset="2"><h3>现货-合约：{{tickertoft}} / {{tickertoftPer}}%</h3></Col>
    </Row>
  </div>
</template>
<script>
import axios from 'axios'
const BaseUrl = 'http://www.abichi.club'
export default {
  name: 'OkEo',
  data() {
    return {
      ft: {},
      ticker: {}
    }
  },
  computed: {
    fttoticker() {
      return (this.ft.last - this.ticker.last).toFixed(3)
    },
    fttotickerPer() {
      return ((this.ft.last - this.ticker.last)/this.ticker.last*100).toFixed(3)
    },
    tickertoft() {
      return (this.ticker.last - this.ft.last).toFixed(3)
    },
    tickertoftPer() {
      return ((this.ticker.last - this.ft.last)/this.ft.last*100).toFixed(3)
    }
  },
  created() {
    this.getFTData().then(res => {
      this.ft = res.data.ticker
    })
    this.getTickerData().then(res => {
      this.ticker = res.data.ticker
    })
  },
  methods: {
    getFTData() {
      return axios(`${BaseUrl}/okexapi/api/v1/future_ticker.do?symbol=eos_usd&contract_type=quarter`)
    },
    getTickerData() {
      return axios(`${BaseUrl}/okexapi/api/v1/ticker.do?symbol=eos_usdt`)
    }
  }
}
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  background: #333;
  color: #fff
}
</style>
