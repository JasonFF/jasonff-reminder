<template>
  <div class="container">
    <router-link to="/bitcny" class="navigation">
      
    </router-link>
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
        money
      </div>
      <div class="right">
        <cube-input
          v-model="money"
        ></cube-input>
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
            <td>{{hbPrice|getProfit(zbPrice, money, 20)}}</td>
          </tr>
          <tr>
            <td>gate</td>
            <td>{{gatePrice_s}}</td>
            <td>{{gatePrice_s|diff(zbPrice)}}</td>
            <!-- <td>{{diffZbHbPercent}}</td> -->
            <td>{{gatePrice_s|getProfit(zbPrice, money, 20)}}</td>
          </tr>
          <tr>
            <td>gate to zb</td>
            <td>{{gatePrice_b}}</td>
            <td>{{zbPrice_s|diff(gatePrice_b)}}</td>
            <!-- <td>{{}}</td> -->
            <td>{{zbPrice_s|getProfit(gatePrice_b, money, 15)}}</td>
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
    <div style="margin: 10px 0; border-top: 1px solid #ddd;border-bottom: 1px solid #ddd;padding: 10px 0;">
      <p>
        bitCNY: {{bitCNYPrice}}
      </p>
      <div style="height: 10px"></div>
      <p>
        usdt_bitCNY: {{usdt_bitCNY}}
      </p>
      <div style="height: 10px"></div>
      <p>
        diffExchange: {{UCDiffExchange}}
      </p>
    </div>
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
      this.getBitCNY()
      this.getGateCtcData()
    },
    data() {
      return {
        hbPrice: '',
        zbPrice: '',
        hlPrice: '',
        money: 50000,
        zbAsks: [],
        zbBids: [],
        bitCNYPrice: '',
        zbPrice_s: '',
        gatePrice_b: '',
        gatePrice_s: ''
      }
    },
    filters: {
      getProfit(to, from, money, fee) {
        const fromusdt = money/from
        const tousdt = fromusdt-fee
        const toMoney = tousdt*to
        return getFixed(toMoney-money)
      },
      diff(to, from) {
        return getFixed(to - from)
      }
    },
    computed: {
      usdt_bitCNY() {
        if (this.zbPrice && this.bitCNYPrice) {
          return getFixed(this.zbPrice/this.bitCNYPrice)
        }
      },
      UCDiffExchange() {
        if (this.usdt_bitCNY && this.hlPrice) {
          return getFixed(this.usdt_bitCNY - this.hlPrice)
        }
      }
    },
    methods: {
      getBitCNY() {
        axios(`${baseUrl}/zbapi/data/v1/ticker`, {
            params: {
              market: 'bitCNY_qc',
            }
          }).then(res => {
            this.bitCNYPrice = res.data.ticker.sell
          })
      },
      getZbDepth() {
        axios(`${baseUrl}/zbapi/data/v1/depth?market=usdt_qc&size=50`).then(res => {
          this.zbAsks = res.data.asks.filter(it => {
            return it[1] >= 5000
          })
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
        axios(`${baseUrl}/zbapi/data/v1/ticker`, {
          params: {
            market: 'usdt_qc',
          }
        }).then(res => {
          this.zbPrice = res.data.ticker.sell
          this.zbPrice_s = res.data.ticker.buy
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
