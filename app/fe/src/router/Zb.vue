<template>
  <div class="container">
    <router-link to="/botprofit" class="navigation"></router-link>
    <div class="item">
      <div class="left">
        zb
      </div>
      <div class="right">
        {{zbPrice}}/{{zbPrice_s}}
      </div>
    </div>
    <div class="item">
      <div class="left">
        zbotc
      </div>
      <div class="right">
        {{zbOtcPrice_b}}/{{zbOtcPrice_s}}
      </div>
    </div>
    <div class="item">
      <div class="left">
        strategy
      </div>
      <div class="right">
        <div>
          {{strategy}}
        </div>
      </div>
    </div>
    <div class="table-box">
      <table class="table-zb">
        <thead>
          <tr>
            <th>
              platform
            </th>
            <th>
              price
            </th>
            <th>
              refer
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>hb</td>
            <td>{{hbPrice}}</td>
            <td>{{hbPrice|getRatio(zbOtcPrice_s)}}</td>
          </tr>
          <tr>
            <td>hb to zb</td>
            <td>{{hbPrice_b}}</td>
            <td>{{hbPrice_b|getRatio(zbOtcPrice_b)}}</td>
          </tr>
          <tr>
            <td>aex</td>
            <td>{{aexUsdtPrice}}</td>
            <td>{{aexUsdtRefer}}</td>
          </tr>
          <tr>
            <td>aex_r</td>
            <td>{{aexUsdtPrice}}</td>
            <td>{{aexUsdtRefer_r}}</td>
          </tr>
          <tr>
            <td>exchange</td>
            <td>{{hlPrice}}</td>
            <td>{{zbPrice|diff(hlPrice)}}</td>
          </tr>
        </thead>
      </table>
    </div>
    <div style="height: 20px;"></div>
    <hr>

    <div class="clearBoth">
      <div style="width: 50%;float:left">
        <table class="table-zb">
          <thead>
            <tr>
              <th>ask</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in zbAsks">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </tbody>
        </table>
      </div>
      <div style="width: 50%; float: left">
        <table class="table-zb">
          <thead>
            <tr>
              <th>bid</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="item in zbBids">
              <td>{{item[0]}}</td>
              <td>{{item[1]}}</td>
            </tr>
          </tbody>
        </table>
      </div>

    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import jsonp from 'jsonp'
  const baseUrl = 'http://www.abichi.club'
  import _ from 'lodash'

  function getFixed(val) {
    return val.toFixed(3)
  }

  export default {
    name: 'Home',
    created() {
      this.getZbData()
      this.getHbOtcData()
      this.getHL()
      this.getZbDepth()
      this.getZbOtcData()
      this.getAexData()
      this.getAexCnc()
    },
    computed: {
      strategy() {
        const hldiff = this.zbPrice - this.hlPrice
        const qcTrend = (1 - this.zbOtcPrice_b) * 10
        return (1 - (qcTrend/1 + hldiff * 5) / 2).toFixed(3)
      },
      aexUsdtRefer() {
        return (this.aexUsdtPrice * this.aexCncBuyPrice / this.zbOtcPrice_s).toFixed(3)
      },
      aexUsdtRefer_r() {
        return (this.aexUsdtPrice / this.aexCncSellPrice / this.zbOtcPrice_b).toFixed(3)
      }
    },
    data() {
      return {
        hbPrice: '',
        hbPrice_b: '',
        zbPrice: '',
        hlPrice: '',
        zbAsks: [],
        zbBids: [],
        zbPrice_s: '',
        zbOtcPrice_b: '',
        zbOtcPrice_s: '',
        btcUsdtAsks: [],
        btcUsdtBids: [],
        aexUsdtPrice: '',
        aexCncBuyPrice: '',
        aexCncSellPrice: ''
      }
    },
    filters: {
      getProfit(to, from, money, fee, qcFee = 1) {
        const fromusdt = money / from * qcFee
        const tousdt = fromusdt - fee
        const toMoney = tousdt * to
        return getFixed(toMoney - money)
      },
      diff(to, from) {
        return getFixed(to - from)
      },
      getRatio(val1, val2) {
        return getFixed(val1 / val2)
      },
      getRatioDynamic(val1, val2) {
        const _v2 = _.get(val2, '0')
        return getFixed(val1 / _v2)
      },
      getQcDiff(val1, val2) {
        return getFixed(val1 - val2)
      }
    },
    methods: {
      getAexData() {
        axios( `${baseUrl}/aexctcapi/trade/getTradeList30.php?coinname=USDT&mk_type=CNC&grade=0`).then(res => {
          
          this.aexUsdtPrice = res.data.tradeStr[0][1]
        })
      },
      getAexCnc() {
        axios( `${baseUrl}/aexctcapi/trade/c2c/order_list_c2c.php?order_type=1&market=CNY&coin=CNC&page=0`).then(res => {
          
          this.aexCncBuyPrice = res.data.data.ord_list[1].pice
        })
        axios( `${baseUrl}/aexctcapi/trade/c2c/order_list_c2c.php?order_type=2&market=CNY&coin=CNC&page=0`).then(res => {
          
          this.aexCncSellPrice = res.data.data.ord_list[1].pice
        })
      },
      getZbDepth() {
        axios(`${baseUrl}/zbapi/data/v1/depth?market=usdt_qc&size=50`).then(res => {
          this.zbAsks = res.data.asks.filter(it => {
            return it[1] >= 5000
          }).reverse()
          this.zbBids = res.data.bids.filter(it => {
            return it[1] >= 5000
          })
        })
      },
      getHL() {
        jsonp("https://api.money.126.net/data/feed/FX_USDCNY", null, (err, data) => {
          this.hlPrice = data.FX_USDCNY.price
        })
      },
      getZbData() {
        axios(`${baseUrl}/zbapi/data/v1/allTicker`).then(res => {
          this.zbPrice = res.data.usdtqc.sell
          this.zbPrice_s = res.data.usdtqc.buy
        })
      },
      getHbOtcData() {
        axios(`${baseUrl}/hbotcapi/`, {
          params: {
            country: 0,
            currency: 1,
            payMethod: 0,
            currPage: 1,
            coinId: 2,
            tradeType: 0,
            merchant: 1,
            online: 1,
          }
        }).then(res => {
          this.hbPrice = res.data.data[5].price
        })
        axios(`${baseUrl}/hbotcapi/`, {
          params: {
            country: 0,
            currency: 1,
            payMethod: 0,
            currPage: 1,
            coinId: 2,
            tradeType: 1,
            merchant: 1,
            online: 1
          }
        }).then(res => {
          this.hbPrice_b = res.data.data[5].price
        })

      },
      getZbOtcData() {
        axios(`${baseUrl}/zbotcapi/otc/trade/qc_cny`, {
          params: {
            type: 2
          }
        }).then(res => {
          const str = res.data;
          const reg = /\d\.\d{2,3}/g;
          for (let i = 1; i < 10; i++) {
            if (str.match(reg)[i] < 1.5 && str.match(reg)[i] > 0.8) {
              this.zbOtcPrice_b = str.match(reg)[i]
              break
            }
          }

        })
        axios(`${baseUrl}/zbotcapi/otc/trade/qc_cny`, {
          params: {
            type: 1
          }
        }).then(res => {
          const str = res.data;
          const reg = /\d\.\d{2,3}/g;
          for (let i = 1; i < 10; i++) {
            if (str.match(reg)[i] < 1.5 && str.match(reg)[i] > 0.8) {
              this.zbOtcPrice_s = str.match(reg)[i]
              break
            }
          }

        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .clearBoth {
    &:after {
      content: '';
      display: block;
      clear: both;
    }
  }

  .navigation {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
    background-color: #ddd;
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
