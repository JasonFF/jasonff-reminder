<template>
  <div class="container">
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
        money
      </div>
      <div class="right">
        <cube-input
          v-model="money"
        ></cube-input>
      </div>
    </div>
    <div>
      <table class="table-zb">
        <thead>
          <tr>
            <th>coin</th>
            <th>to qc</th>
            <th>to usdt</th>
            <th>price</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>btc</td>
            <td>{{btc_qc}}</td>
            <td>{{btc_usdt}}</td>
            <th>{{btc_qc|getRatio(btc_usdt)}}</th>
          </tr>
          <tr>
            <td>eth</td>
            <td>{{eth_qc}}</td>
            <td>{{eth_usdt}}</td>
            <th>{{eth_qc|getRatio(eth_usdt)}}</th>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="height: 20px;"></div>
    <hr>
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
              diff
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
            <td>{{hbPrice|diff(zbPrice)}}</td>
            <!-- <td>{{diffZbHbPercent}}</td> -->
            <td>{{hbPrice|getProfit(zbPrice, money, 20, zbOtcPrice_b)}}</td>
          </tr>
          <tr>
            <td>gate</td>
            <td>{{gatePrice_s}}</td>
            <td>{{gatePrice_s|diff(zbPrice)}}</td>
            <!-- <td>{{diffZbHbPercent}}</td> -->
            <td>{{gatePrice_s|getProfit(zbPrice, money, 20, zbOtcPrice_b)}}</td>
          </tr>
          <tr>
            <td>gate to zb</td>
            <td>{{gatePrice_b}}</td>
            <td>{{zbPrice_s|diff(gatePrice_b)}}</td>
            <!-- <td>{{}}</td> -->
            <td>{{zbPrice_s|getProfit(gatePrice_b, money, 15, zbOtcPrice_s)}}</td>
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
    <hr>
    <div class="clearBoth" style="font-size: 12px">
      <div style="width: 50%;float:left">
        <table class="table-zb">
        <thead>
          <tr>
            <th>ask</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in btcQcAsks">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{item[0]|getRatio(btc_usdt)}}</td>
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
          <tr v-for="item in btcQcBids">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{item[0]|getRatio(btc_usdt)}}</td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
    <hr>
    <div class="clearBoth" style="font-size: 12px">
      <div style="width: 50%;float:left">
        <table class="table-zb">
        <thead>
          <tr>
            <th>ask</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in btcUsdtAsks">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{btc_qc|getRatio(item[0])}}</td>
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
          <tr v-for="item in btcUsdtBids">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{btc_qc|getRatio(item[0])}}</td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
    <hr>
    <div class="clearBoth" style="font-size: 12px">
      <div style="width: 50%;float:left">
        <table class="table-zb">
        <thead>
          <tr>
            <th>ask</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in btcQcAsks">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{item[0]|getRatioDynamic(btcUsdtAsks[index])}}</td>
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
          <tr v-for="(item, index) in btcQcBids">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
            <td>{{item[0]|getRatioDynamic(btcUsdtBids[index])}}</td>
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
    },
    data() {
      return {
        hbPrice: '',
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
        eth_qc: '',
        eth_usdt: '',
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
        const fromusdt = money/from * qcFee
        const tousdt = fromusdt-fee
        const toMoney = tousdt*to
        return getFixed(toMoney-money)
      },
      diff(to, from) {
        return getFixed(to - from)
      },
      getRatio(val1, val2) {
        return getFixed(val1/val2)
      },
      getRatioDynamic(val1, val2) {
        const _v2 = _.get(val2, '0')
        return getFixed(val1/_v2)
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
          console.log(res)
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
          this.eth_qc = res.data.ethqc.last
          this.eth_usdt = res.data.ethusdt.last
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
            coinId: 2,
            tradeType: 0,
            currentPage: 1,
            payWay: '',
            country: '',
            merchant: 1,
            online: 1,
            range: 0
          }
        }).then(res => {
          this.hbPrice = res.data.data[4].price
        })
      },
      getZbOtcData() {
        axios(`${baseUrl}/zbotcapi/otc/trade/qc_cny`, {
          params: {
            type: 2
          }
        }).then(res => {
          const str = res.data;
          const reg = /\d\.\d{3}/g;
          this.zbOtcPrice_b = str.match(reg)[1]
        })
        axios(`${baseUrl}/zbotcapi/otc/trade/qc_cny`, {
          params: {
            type: 1
          }
        }).then(res => {
          const str = res.data;
          const reg = /\d\.\d{3}/g;
          this.zbOtcPrice_s = str.match(reg)[1]
        })
      }
    }
  }

</script>

<style lang="less" scoped>
.clearBoth {
  &:after{
    content: '';
    display:block;
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
