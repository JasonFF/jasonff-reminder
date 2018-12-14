<template>
  <div class="container">
    <router-link to="/botprofit" class="navigation"></router-link>
    <router-link to="/strategy" @click.native="sendData" class="navigation-second"></router-link>
    <div class="item">
      <div class="left">
        zb
      </div>
      <div class="right">
        {{zbPrice[0]}}/{{zbPrice[1]}}
      </div>
    </div>
    
    <div class="item">
      <div class="left">
        zbotc
      </div>
      <div class="right">
        {{zbOtcPrice[0]}}/{{zbOtcPrice[1]}}
      </div>
    </div>
    
    <div class="item">
      <div class="left">
        husd
      </div>
      <div class="right">
        {{husdPrice[0]}} || {{zbHusdPrice}} || {{zbHusdPrice|diff(hlPrice)}} 
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
            <td>zb -> hb</td>
            <td>{{hbPrice[0]}}</td>
            <td>{{hbPrice[0]|getRatio(zbOtcPrice[0]/1+0.001)}}</td>
          </tr>
          <tr>
            <td>hb -> zb</td>
            <td>{{hbPrice[1]}}</td>
            <td>{{hbPrice[1]|getRatio(zbOtcPrice[0])}}</td>
          </tr>
          <tr>
            <td>exchange</td>
            <td>{{hlPrice}}</td>
            <td>{{zbPrice[0]|diff(hlPrice)}}</td>
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
                <th colspan="2">asks</th>
              </tr>
              <tr>
                <th>price</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in zbAsks">
                <td>{{item[0]}}</td>
                <td style="text-align: right;padding-right: 10px">{{item[1]}}</td>
              </tr>
            </tbody>
          </table>
        </Col>
        <Col span="12">
          <table class="table-zb">
            <thead>
              <tr>
                <th colspan="2">bids</th>
              </tr>
              <tr>
                <th>price</th>
                <th>amount</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in zbBids">
                <td>{{item[0]}}</td>
                <td style="text-align: right;padding-right: 10px">{{item[1]}}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
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
                <th>count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in okBuyList">
                <td>{{item.price}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.amount}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.count}}</td>
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
                <th>count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in okSellList">
                <td>{{item.price}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.amount}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.count}}</td>
              </tr>
            </tbody>
          </table>
        </Col>
      </Row>
      

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
                <th>count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in _hbBuyList">
                <td>{{item.price}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.amount}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.count}}</td>
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
                <th>count</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="item in _hbSellList">
                <td>{{item.price}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.amount}}</td>
                <td style="text-align: right;padding-right: 10px">{{item.count}}</td>
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
  import cheerio from 'cheerio'
import { randomBytes } from 'crypto';

  function getFixed(val) {
    return val.toFixed(3)
  }

function _getZbOtc(type) {
  return new Promise((resovle, reject) => {
    setTimeout(() => {
      resovle(axios(`${baseUrl}/zbotcapistr/otc/trade/qc_cny`, {
        params: {
          type
        }
      }))
    }, 1000);
  })
}

function parseContent(content) {
  console.log('parseContent')
  const $ = cheerio.load(content)
  const numberList = $('.c2c-table tbody tr td.num').map((i, el) => {
    return $(el).text().replace(/QC/ig, '') / 1
  }).get()
  const priceList = $('.c2c-table tbody tr td.price').map((i, el) => {
    return $(el).text().split('CNY')[0] / 1
  }).get()
  let totalPrice = 0;
  let totalNum = 0
  priceList.forEach((price, i) => {
    totalPrice += price * numberList[i]
    totalNum += numberList[i]
  })
  return (totalPrice / totalNum).toFixed(4)
}

function getZbOtc() {
  return Promise.all([_getZbOtc(1), _getZbOtc(2)]).then(res => {
    return [parseContent(res[0].data.data), parseContent(res[1].data.data)]
  })
}


  export default {
    name: 'Home',
    created() {
      this.getZbData()
      this.getAllHbOtcData()
      this.getHL()
      this.getZbOtcData()
      this.getOkexData()
      this.getHusdData()
    },
    computed: {
      zbHusdPrice() {
        return (this.zbPrice[1]/this.zbOtcPrice[0]/this.husdPrice[0]).toFixed(4)
      },
      _hbBuyList() {
        const list = this.hbBuyList.sort((a, b) => {
          return  b.price - a.price
        })
          let resultObj = {}
          let resultList = []
          let resultCount = {}
          list.forEach(it => {
            if (resultObj[`$${it.price}`]) {
              resultObj[`$${it.price}`] += it.tradeCount
              resultCount[`$${it.price}`] += 1
            } else {
              resultObj[`$${it.price}`] = it.tradeCount
              resultCount[`$${it.price}`] = 1
            }
          })
          Object.keys(resultObj).forEach(it => {
            resultList.push({
              price: it.replace('$',''),
              amount: ((resultObj[it]/1).toFixed(0)/1).toLocaleString(),
              count: resultCount[it]
            })
          })
          return resultList
      },
      _hbSellList() {
        const list = this.hbSellList.sort((a, b) => {
          return a.price - b.price
        })
          let resultObj = {}
          let resultList = []
          let resultCount = {}
          list.forEach(it => {
            if (resultObj[`$${it.price}`]) {
              resultObj[`$${it.price}`] += it.tradeCount
              resultCount[`$${it.price}`] += 1
            } else {
              resultObj[`$${it.price}`] = it.tradeCount
               resultCount[`$${it.price}`] = 1
            }
          })
          Object.keys(resultObj).forEach(it => {
            resultList.push({
              price: it.replace('$',''),
              amount: ((resultObj[it]/1).toFixed(0)/1).toLocaleString(),
              count: resultCount[it]
            })
          })
          return resultList
      }
    },
    data() {
      return {
        hbPrice: [],
        zbPrice: [],
        hlPrice: '',
        zbAsks: [],
        zbBids: [],
        zbOtcPrice: [],
        okBuyList: [],
        okSellList: [],
        hbBuyList: [],
        hbSellList: [],
        husdPrice: [],
      }
    },
    filters: {
      diff(to, from) {
        return getFixed(to - from)
      },
      getRatio(val1, val2) {
        return getFixed(val1 / val2)
      },
    },
    methods: {
      getHusdData() {
        axios(`${baseUrl}/hbapi/market/detail/merged?symbol=usdthusd`).then(res => {
          this.husdPrice = [res.data.tick.bid[0], res.data.tick.ask[0]]
        })
      },
      sendData() {
        window.localStorage.setItem('zbData', JSON.stringify({
          zbPrice: `${this.zbPrice[0]} / ${this.zbPrice[1]}`,
          qc: `${this.zbOtcPrice[0]} / ${this.zbOtcPrice[1]}`,
          otc: `${this.hbPrice[0]} / ${this.hbPrice[1]}`
        }))
      },
      getOkexData() {
        axios(`${baseUrl}/okexapi/v3/c2c/tradingOrders/book?side=buy&baseCurrency=usdt&quoteCurrency=cny&userType=all&paymentMethod=all`).then(res => {
          const list = res.data.data.buy
          let resultObj = {}
          let resultCount = {}
          let resultList = []
          list.forEach(it => {
            if (resultObj[`$${it.price}`]) {
              resultObj[`$${it.price}`] += it.availableAmount
              resultCount[`$${it.price}`] += 1
            } else {
              resultObj[`$${it.price}`] = it.availableAmount
              resultCount[`$${it.price}`] = 1
            }
          })
          Object.keys(resultObj).forEach(it => {
            resultList.push({
              price: it.replace('$',''),
              amount: ((resultObj[it]/1).toFixed(0)/1).toLocaleString(),
              count: resultCount[it]
            })
          })
          this.okBuyList = resultList
        })
        axios(`${baseUrl}/okexapi/v3/c2c/tradingOrders/book?side=sell&baseCurrency=usdt&quoteCurrency=cny&userType=all&paymentMethod=all`).then(res => {
          const list = res.data.data.sell
          let resultObj = {}
          let resultCount = {}
          let resultList = []
          list.forEach(it => {
            if (resultObj[`$${it.price}`]) {
              resultObj[`$${it.price}`] += it.availableAmount
              resultCount[`$${it.price}`] += 1
            } else {
              resultObj[`$${it.price}`] = it.availableAmount
              resultCount[`$${it.price}`] = 1
            }
          })
          Object.keys(resultObj).forEach(it => {
            resultList.push({
              price: it.replace('$',''),
              amount: ((resultObj[it]/1).toFixed(0)/1).toLocaleString(),
              count: resultCount[it]
            })
          })
          this.okSellList = resultList
        })
      },
      getHL() {
        jsonp("https://api.money.126.net/data/feed/FX_USDCNY", null, (err, data) => {
          this.hlPrice = data.FX_USDCNY.price
        })
      },
      getZbData() {
        axios(`${baseUrl}/zbapi/data/v1/depth?market=usdt_qc&size=100`).then(res => {
          this.zbAsks = res.data.asks.reverse().filter(it => it[1] > 5000)
          this.zbBids = res.data.bids.filter(it => it[1] > 5000)
          this.zbPrice = [res.data.bids[0][0], res.data.asks[0][0]]
        })
      },
      getAllHbOtcData() {
        this.hbBuyList = []
        this.hbSellList = []
        for (let i = 0; i < 3; i++) {
          this.getHbOtcData(i + 1).then(res => {
            this.hbBuyList = this.hbBuyList.concat(res[0].data.data)
            this.hbSellList = this.hbSellList.concat(res[1].data.data)
            this.hbPrice = [this.hbBuyList[5].price, this.hbSellList[5].price]
          })
        }
      },
      getHbOtcData(pageIndex) {
           return Promise.all([axios(`${baseUrl}/hbotcapi/`, {
            params: {
              country: 0,
              currency: 1,
              payMethod: 0,
              currPage: pageIndex || 1,
              coinId: 2,
              tradeType: 0,
              merchant: 1,
              online: 1,
            }
          }), axios(`${baseUrl}/hbotcapi/`, {
            params: {
              country: 0,
              currency: 1,
              payMethod: 0,
              currPage: pageIndex || 1,
              coinId: 2,
              tradeType: 1,
              merchant: 1,
              online: 1
            }
          })])
      },
      getZbOtcData() {
        getZbOtc().then(prices => {
          this.zbOtcPrice = prices
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
  .navigation-second {
    position: absolute;
    right: 20px;
    top: 80px;
    width: 50px;
    height: 50px;
    background-color: #ddd;
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
      padding: 10px 0px;
      font-weight: bold
    }
    td {
      padding: 10px 0px
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
