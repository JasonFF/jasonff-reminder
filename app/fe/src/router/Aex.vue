<template>
  <div>
    <ul>
      <li>bitcnyCnc_buy: {{bitcnyCnc_buy}}</li>
      <li>bitcnyCnc_buy_amount: {{bitcnyCnc_buy_amount}}</li>
      <li>bitcnyCnc_sell: {{bitcnyCnc_sell}}</li>
      <li>bitcnyCnc_sell_amount: {{bitcnyCnc_sell_amount}}</li>
      <li>btcCnc_buy: {{btcCnc_buy}}</li>
      <li>btcCnc_buy_amount: {{btcCnc_buy_amount}}</li>
      <li>btcCnc_sell: {{btcCnc_sell}}</li>
      <li>btcCnc_sell_amount: {{btcCnc_sell_amount}}</li>
      <li>btcBitcny_buy: {{btcBitcny_buy}}</li>
      <li>btcBitcny_buy_amount: {{btcBitcny_buy_amount}}</li>
      <li>btcBitcny_sell: {{btcBitcny_sell}}</li>
      <li>btcBitcny_sell_amount: {{btcBitcny_sell_amount}}</li>
    </ul>
    <div>
      正循环：cnc => btc => bitcny => cnc
    </div>
    <div>
      
    </div>
  </div>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://www.abichi.club'
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
    }
  },
  created() {
    this.getBitcnyCnc()
    this.getBtcCnc()
    this.getBtcBitcny()
  },
  methods: {
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
