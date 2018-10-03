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
            <td>exchange</td>
            <td>{{hlPrice}}</td>
            <td>{{zbPrice|diff(hlPrice)}}</td>
          </tr>
        </thead>
      </table>
    </div>
    <div style="height: 20px;"></div>
    <hr>
    <div class="table-box">
      <Row>
        <Col span="12">
          <table class="table-zb">
            <thead>
              <tr>
                <th colspan="2">buy</th>
              </tr>
              <tr>
                <th>price</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in okBuyList">
                <td>{{item.price}}</td>
                <td style="text-align: right;padding-right: 20px">{{item.amount}}</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span="12">
          <table class="table-zb">
            <thead>
              <tr>
                <th colspan="2">sell</th>
              </tr>
              <tr>
                <th>price</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in okSellList">
                <td>{{item.price}}</td>
                <td style="text-align: right;padding-right: 20px">{{item.amount}}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      

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
      this.getZbOtcData()
      this.getOkexData()
    },
    computed: {
      strategy() {
        const hldiff = this.zbPrice - this.hlPrice
        const qcTrend = (1 - this.zbOtcPrice_b) * 10
        return (1 - (qcTrend/1 + hldiff * 5) / 2).toFixed(3)
      },
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
        okBuyList: [],
        okSellList: []
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
      getOkexData() {
        axios(`${baseUrl}/okexapi/v3/c2c/tradingOrders/book?side=buy&baseCurrency=usdt&quoteCurrency=cny&userType=all&paymentMethod=all`).then(res => {
          const list = res.data.data.buy
          let resultObj = {}
          let resultList = []
          list.forEach(it => {
            if (resultObj[`$${it.price}`]) {
              resultObj[`$${it.price}`] += it.availableAmount
            } else {
              resultObj[`$${it.price}`] = it.availableAmount
            }
          })
          Object.keys(resultObj).forEach(it => {
            resultList.push({
              price: it.replace('$',''),
              amount: ((resultObj[it]/1).toFixed(0)/1).toLocaleString()
            })
          })
          this.okBuyList = resultList
          console.log(resultList)
        })
        axios(`${baseUrl}/okexapi/v3/c2c/tradingOrders/book?side=sell&baseCurrency=usdt&quoteCurrency=cny&userType=all&paymentMethod=all`).then(res => {
          const list = res.data.data.sell
          let resultObj = {}
          let resultList = []
          list.forEach(it => {
            if (resultObj[`$${it.price}`]) {
              resultObj[`$${it.price}`] += it.availableAmount
            } else {
              resultObj[`$${it.price}`] = it.availableAmount
            }
          })
          Object.keys(resultObj).forEach(it => {
            resultList.push({
              price: it.replace('$',''),
              amount: ((resultObj[it]/1).toFixed(0)/1).toLocaleString()
            })
          })
          this.okSellList = resultList
          console.log(resultList)
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
            if (str.match(reg)[i] < 1.1 && str.match(reg)[i] > 0.85) {
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
            if (str.match(reg)[i] < 1.1 && str.match(reg)[i] > 0.85) {
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
