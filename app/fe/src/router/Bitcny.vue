<template>
  <div class="container">
    <router-link to="/zb" class="navigation">
    </router-link>
    <div>
      tiger_buy: <span class="contentSpan">{{tiger_buy}}</span>
    </div>
    <div>
      tiger_sell: <span class="contentSpan">{{tiger_sell}}</span>
    </div>
    <div>
      zb_buy: <span class="contentSpan">{{zb_buy}}</span>
    </div>
    <div>
      zb_sell: <span class="contentSpan">{{zb_sell}}</span>
    </div>
    <iframe style="display: none" src="http://www.abichi.club/tigerctcapi/exchange/api/ctc/config" ref="iframe" @load="loadIframe" frameborder="0"></iframe>
    
  </div>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://www.abichi.club'

function getFixed(val) {
  return val.toFixed(3)
}

export default {
  name: 'Bitcny',
  data() {
    return {
      tiger_buy: '',
      tiger_sell: '',
      aex_buy: '',
      aex_sell: '',
      zb_buy: '',
      zb_sell: '',
      cnc: '',
    }
  },
  created() {
    this.getZbData()
  },
  methods: {
    loadIframe(e) {
      let loadJson = {}
      try {
        loadJson = JSON.parse(this.$refs.iframe.contentWindow.document.getElementsByTagName('pre')[0].innerHTML)
      } catch(e) {}
      this.tiger_buy = loadJson.buyPrice
      this.tiger_sell = loadJson.sellPrice
    },
    getAexPrice() {
      axios(`${baseUrl}/aexquaapi/marketCenter/market/v0/depth?symbol=aex_bitcnycnc`).then(res => {
        console.log(res)
      })
    },
    getAexCncPrice() {
      axios(`${baseUrl}/aexctcapi/trade/c2c/order_list_c2c.php?order_type=1&market=CNY&coin=CNC&page=0`).then(res => {
        console.log(res)
      })
    },
    getZbData() {
      axios(`${baseUrl}/zbapi/data/v1/allTicker`).then(res => {
        this.zb_buy = res.data.bitcnyqc.sell
        this.zb_sell = res.data.bitcnyqc.buy
      })
    }
  }
}
</script>

<style lang="less" scoped>
.navigation {
  position: absolute;
  right: 20px;
  top: 20px;
  width: 50px;
  height: 50px;
  background-color: #ddd;
}
.contentSpan {
  margin-left: 20px
}
.table-zb {
  width: 100%;
  text-align: center;
  th {
    padding: 10px 5px;
    font-weight: bold
  }
  td {
    padding: 10px 5px
  }
}
.container {
  padding: 20px 30px;
  background-color: #333;
  min-height: 100%;
  color: #fff;
}
  .item {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    .left {
      float: left;
      width: 20%;
      text-align: right
    }
    .right {
      float: left;
      width: 60%;
      margin-left: 5%;
    }
  }

</style>
