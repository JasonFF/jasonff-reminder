<template>
  <div class="aex-container">
    <div style="height: 50px"></div>
    <!-- <h1 class="text-center">JasonFF's trading system</h1> -->
    <div style="height: 30px"></div>
    <Row>
      <Col span="20" offset="2">
      <table class="jf-table text-center reverse-table">
        <thead>
          <tr>
            <th>bitcny_cnc</th>
            <th>price</th>
            <th style="border-right: 1px solid #555">amount</th>
            <th>btc_cnc</th>
            <th>price</th>
            <th style="border-right: 1px solid #555">amount</th>
            <th>btc_bitcny</th>
            <th>price</th>
            <th>amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>buy</td>
            <td>{{bitcnyCnc_buy}}</td>
            <td style="border-right: 1px solid #555">{{bitcnyCnc_buy_amount}}</td>
            <td>buy</td>
            <td>{{btcCnc_buy}}</td>
            <td style="border-right: 1px solid #555">{{btcCnc_buy_amount}}</td>
            <td>buy</td>
            <td>{{btcBitcny_buy}}</td>
            <td>{{btcBitcny_buy_amount}}</td>
          </tr>
          <tr>
            <td>sell</td>
            <td>{{bitcnyCnc_sell}}</td>
            <td style="border-right: 1px solid #555">{{bitcnyCnc_sell_amount}}</td>
            <td>sell</td>
            <td>{{btcCnc_sell}}</td>
            <td style="border-right: 1px solid #555">{{btcCnc_sell_amount}}</td>
            <td>sell</td>
            <td>{{btcBitcny_sell}}</td>
            <td>{{btcBitcny_sell_amount}}</td>
          </tr>
        </tbody>
      </table>
      </Col>

    </Row>
    <div style="height: 30px"></div>
    <Row>
      <Col span="20" offset="2">
      <table class="jf-table text-center reverse-table">
        <thead>
          <tr>
            <th>type</th>
            <th>cnc</th>
            <th colspan="3">btc</th>
            <th colspan="3">bitcny</th>
            <th colspan="3">cnc</th>
            <th>final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>positive cycle</td>
            <td style="border-right: 1px solid #555">{{startAmount}}</td>
            <td>buy</td>
            <td>{{btcCnc_buy}}</td>
            <td style="border-right: 1px solid #555">{{btcCnc_buy_amount}}</td>
            <td>sell</td>
            <td>{{btcBitcny_sell}}</td>
            <td style="border-right: 1px solid #555">{{btcBitcny_sell_amount}}</td>
            <td>sell</td>
            <td>{{bitcnyCnc_sell}}</td>
            <td style="border-right: 1px solid #555">{{bitcnyCnc_sell_amount}}</td>
            <td>{{positiveFinal}}</td>
          </tr>
        </tbody>
      </table>
      </Col>
    </Row>
    <Row>
      <Col span="20" offset="2">
      <table class="jf-table text-center reverse-table">
        <thead>
          <tr>
            <th>type</th>
            <th>cnc</th>
            <th colspan="3">bitcny</th>
            <th colspan="3">btc</th>
            <th colspan="3">cnc</th>
            <th>final</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>reverse cycle</td>
            <td style="border-right: 1px solid #555">{{startAmount}}</td>
            <td>buy</td>
            <td>{{bitcnyCnc_buy}}</td>
            <td style="border-right: 1px solid #555">{{bitcnyCnc_buy_amount}}</td>
            <td>buy</td>
            <td>{{btcBitcny_buy}}</td>
            <td style="border-right: 1px solid #555">{{btcBitcny_buy_amount}}</td>
            <td>sell</td>
            <td>{{btcCnc_sell}}</td>
            <td style="border-right: 1px solid #555">{{btcCnc_sell_amount}}</td>
            <td>{{reverseFinal}}</td>
          </tr>
        </tbody>
      </table>
      </Col>
    </Row>
  </div>
</template>
<script>
  import axios from 'axios'
  const baseUrl = 'http://www.abichi.club'
  function getExact(val) {
    if (val.toString().length > 10) {
      return val.toFixed(10)/1
    }
  }
  export default {
    name: 'Aex',
    data() {
      return {
        bitcnyCnc_buy: '',
        bitcnyCnc_buy_amount: '',
        bitcnyCnc_sell: '',
        bitcnyCnc_sell_amount: '',
        btcCnc_buy: '',
        btcCnc_buy_amount: '',
        btcCnc_sell: '',
        btcCnc_sell_amount: '',
        btcBitcny_buy: '',
        btcBitcny_buy_amount: '',
        btcBitcny_sell: '',
        btcBitcny_sell_amount: '',
        startAmount: 10
      }
    },
    computed: {
      positiveFinal() {
        const start = this.startAmount
        const btcCnc_buy = this.btcCnc_buy
        const btcBitcny_sell = this.btcBitcny_sell
        const bitcnyCnc_sell = this.bitcnyCnc_sell
        if (!btcCnc_buy || !btcBitcny_sell || !bitcnyCnc_sell) {
          return 0
        }
        const btcAmount = getExact(start/btcCnc_buy)
        if (btcAmount > this.btcCnc_buy_amount) {
          console.log(btcAmount)
          return 0
        }
        const bitcnyAmount = getExact(btcAmount * btcBitcny_sell)
        if (btcAmount > this.btcBitcny_sell_amount) {
          return 0
        }
        const final = getExact(bitcnyAmount * bitcnyCnc_sell)
        if (bitcnyAmount > this.bitcnyCnc_sell_amount) {
          return 0
        }
        return final
      },
      reverseFinal() {
        const start = this.startAmount
        const bitcnyCnc_buy = this.bitcnyCnc_buy
        const btcBitcny_buy = this.btcBitcny_buy
        const btcCnc_sell = this.btcCnc_sell
        if (!bitcnyCnc_buy || !btcBitcny_buy || !btcCnc_sell) {
          return 0
        }
        const bitcnyAmount = getExact(start/bitcnyCnc_buy)
        if (bitcnyAmount > this.bitcnyCnc_buy_amount) {
          return 0
        }
        const btcAmount = getExact(bitcnyAmount/btcBitcny_buy)
        if (btcAmount > this.btcBitcny_buy_amount) {
          return 0
        }
        const final = getExact(btcAmount * btcCnc_sell)
        if (btcAmount > this.btcCnc_sell_amount) {
          return 0
        }
        return final
      }
    },
    created() {
      console.log('created')
      // setInterval(this.update, 1000)
    },
    methods: {
      update() {
        this.getBitcnyCnc()
        this.getBtcCnc()
        this.getBtcBitcny()
      },
      getBitcnyCnc() {
        axios(`${baseUrl}/aexquaapi/marketCenter/market/v0/depth?symbol=aex_bitcnycnc`).then(res => {
          this.bitcnyCnc_buy = res.data.asks[0][0]
          this.bitcnyCnc_buy_amount = res.data.asks[0][1]
          this.bitcnyCnc_sell = res.data.bids[0][0]
          this.bitcnyCnc_sell_amount = res.data.bids[0][1]
        })
      },
      getBtcCnc() {
        axios(`${baseUrl}/aexquaapi/marketCenter/market/v0/depth?symbol=aex_btccnc`).then(res => {
          this.btcCnc_buy = res.data.asks[0][0]
          this.btcCnc_buy_amount = res.data.asks[0][1]
          this.btcCnc_sell = res.data.bids[0][0]
          this.btcCnc_sell_amount = res.data.bids[0][1]
        })
      },
      getBtcBitcny() {
        axios(`${baseUrl}/aexquaapi/marketCenter/market/v0/depth?symbol=aex_btcbitcny`).then(res => {
          this.btcBitcny_buy = res.data.asks[0][0]
          this.btcBitcny_sell = res.data.bids[0][0]
          this.btcBitcny_buy_amount = res.data.asks[0][1]
          this.btcBitcny_sell_amount = res.data.bids[0][1]
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .aex-container {
    background-color: #333;
    color: #eee;
    min-height: 100%
  }
</style>