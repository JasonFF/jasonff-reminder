<template>
  <div class="container">
    <router-link to="/bitcny" class="navigation"></router-link>
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
        usdt
      </div>
      <div class="right">
        buy: 
        <p>
          
        </p>
      </div>
    </div>
    <div class="item">
      <div class="left">
        money
      </div>
      <div class="right">
        <input type="text" v-model="money">
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
            <!-- <th>
              diffPercent
            </th> -->
            <th>
              profit
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>hb</td>
            <td>{{hbPrice}}</td>
            <td>{{hbPrice|getRatio(zbOtcPrice_s)}}</td>
            <!-- <td>{{diffZbHbPercent}}</td> -->
            <td>{{hbPrice|getProfit(zbPrice, money, 20, zbOtcPrice_b)}}</td>
          </tr>
          <tr>
            <td>hb to zb</td>
            <td>{{hbPrice_b}}</td>
            <td>{{hbPrice_b|getRatio(zbOtcPrice_b)}}</td>
            <!-- <td>{{diffZbHbPercent}}</td> -->
            <td>{{zbPrice_s|getProfit(hbPrice_b, money, 20, zbOtcPrice_s)}}</td>
          </tr>
          <tr>
            <td>gate</td>
            <td>{{gatePrice_s}}</td>
            <td>{{gatePrice_s|getRatio(zbOtcPrice_s)}}</td>
            <!-- <td>{{diffZbHbPercent}}</td> -->
            <td>{{gatePrice_s|getProfit(zbPrice, money, 20, zbOtcPrice_b)}}</td>
          </tr>
          <tr>
            <td>gate to zb</td>
            <td>{{gatePrice_b}}</td>
            <td>{{gatePrice_b|getRatio(zbOtcPrice_b)}}</td>
            <!-- <td>{{}}</td> -->
            <td>{{zbPrice_s|getProfit(gatePrice_b, money, 20, zbOtcPrice_s)}}</td>
          </tr>
          <tr>
            <td>exchange</td>
            <td>{{hlPrice}}</td>
            <td>{{zbPrice|diff(hlPrice)}}</td>
            <!-- <td>{{diffZbHlPercent}}</td> -->
            <td> - </td>
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
      this.getGateCtcData()
      this.getZbOtcData()
      this.getAexData()
    },
    data() {
      return {
        hbPrice: '',
        hbPrice_b: '',
        zbPrice: '',
        hlPrice: '',
        money: 50000,
        zbAsks: [],
        zbBids: [],
        zbPrice_s: '',
        gatePrice_b: '',
        gatePrice_s: '',
        btc_qc: '',
        btc_usdt: '',
        eos_qc: '',
        eos_usdt: '',
        zbOtcPrice_b: '',
        zbOtcPrice_s: '',
        btcQcAsks: [],
        btcQcBids: [],
        btcUsdtAsks: [],
        btcUsdtBids: [],
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
      getZbDepth() {
        axios(`${baseUrl}/zbapi/data/v1/depth?market=usdt_qc&size=50`).then(res => {
          this.zbAsks = res.data.asks.filter(it => {
            return it[1] >= 5000
          }).reverse()
          this.zbBids = res.data.bids.filter(it => {
            return it[1] >= 5000
          })
        })
        axios(`${baseUrl}/zbapi/data/v1/depth?market=btc_qc&size=50`).then(res => {
          this.btcQcAsks = res.data.asks.filter(it => {
            return it[1] >= 1.5
          }).reverse()
          this.btcQcBids = res.data.bids.filter(it => {
            return it[1] >= 1.5
          })
        })
        axios(`${baseUrl}/zbapi/data/v1/depth?market=btc_usdt&size=50`).then(res => {
          this.btcUsdtAsks = res.data.asks.filter(it => {
            return it[1] >= 1
          }).reverse()
          this.btcUsdtBids = res.data.bids.filter(it => {
            return it[1] >= 1
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
          this.btc_qc = res.data.btcqc.last
          this.btc_usdt = res.data.btcusdt.last
          this.eos_qc = res.data.eosqc.last
          this.eos_usdt = res.data.eosusdt.last
        })
      },
      getGateCtcData() {
        axios(`${baseUrl}/gatectcapi/json_svr/query_push/`, {
          params: {
            u: 13,
            c: 64975,
            type: 'push_order_list',
            symbol: 'USDT_CNY'
          }
        }).then(res => {
          this.gatePrice_b = res.data.push_order[18].rate
          this.gatePrice_s = res.data.push_order[22].rate
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
          if (str.match(reg)[1] < 1.5) {
            this.zbOtcPrice_b = str.match(reg)[1]
          } else {
            this.zbOtcPrice_b = str.match(reg)[2]
          }

        })
        axios(`${baseUrl}/zbotcapi/otc/trade/qc_cny`, {
          params: {
            type: 1
          }
        }).then(res => {
          const str = res.data;
          const reg = /\d\.\d{2,3}/g;
          if (str.match(reg)[1] < 1.5) {
            this.zbOtcPrice_s = str.match(reg)[1]
          } else {
            this.zbOtcPrice_s = str.match(reg)[2]
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
