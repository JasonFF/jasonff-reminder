<template>
  <div class="container">
    <h1 style="text-align: center">
      {{market}} - {{type}}
    </h1>
    <router-link to="/zb" class="navigation"></router-link>
    <Row :gutter='16' style="padding: 10px 20px 20px;margin-top: 10px">
      <Col style="margin-bottom: 10px" span="8" v-for="item in buttonMarkets" :key="item">
        <Button :class="{active: item == market}" @click="getKline(item, null)" long>{{item}}</Button>
      </Col>
    </Row>
    <Row :gutter='16' style="padding: 0 20px 20px;margin-top: 0px">
      <Col style="margin-bottom: 10px" span="8" v-for="item in buttonIntervals" :key="item">
        <Button :class="{active: item == type}" @click="getKline(null, item)" long>{{item}}</Button>
      </Col>
    </Row>
    
    <div>
      <table class="mytable">
        <thead>
          <tr>
            <th>type</th>
            <th>now</th>
            <th>max</th>
            <th>min</th>
            <th>buy</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>macd-dea</td>
            <td>{{nowIndicator.macd.dea | getFixed(6)}}</td>
            <td>{{perIndicator.maxMacd.dea | getFixed(6)}}</td>
            <td>{{perIndicator.minMacd.dea | getFixed(6)}}</td>
            <td>{{perIndicator.buyMacd.dea | getFixed(6)}}</td>
            <td>{{nowIndicator.macd.dea | getStatus(perIndicator.minMacd.dea, perIndicator.maxMacd.dea)}}</td>
          </tr>
          <tr>
            <td>macd-diff</td>
            <td>{{nowIndicator.macd.diff | getFixed(6)}}</td>
            <td>{{perIndicator.maxMacd.diff | getFixed(6)}}</td>
            <td>{{perIndicator.minMacd.diff | getFixed(6)}}</td>
            <td>{{perIndicator.buyMacd.diff | getFixed(6)}}</td>
            <td>{{nowIndicator.macd.diff | getStatus(perIndicator.minMacd.diff, perIndicator.maxMacd.diff)}}</td>
          </tr>
          <tr>
            <td>macd-bar</td>
            <td>{{nowIndicator.macd.bar | getFixed(6)}}</td>
            <td>{{perIndicator.maxMacd.bar | getFixed(6)}}</td>
            <td>{{perIndicator.minMacd.bar | getFixed(6)}}</td>
            <td>{{perIndicator.buyMacd.bar | getFixed(6)}}</td>
            <td>{{nowIndicator.macd.bar | getStatus(perIndicator.minMacd.bar, perIndicator.maxMacd.bar)}}</td>
          </tr>
          <tr>
            <td>kdj-k</td>
            <td>{{nowIndicator.kdj.k | getFixed(2)}}</td>
            <td>{{perIndicator.maxKdj.k | getFixed(2)}}</td>
            <td>{{perIndicator.minKdj.k | getFixed(2)}}</td>
            <td>{{perIndicator.buyKdj.k | getFixed(2)}}</td>
            <td>{{nowIndicator.kdj.k | getStatus(perIndicator.minKdj.k, perIndicator.maxKdj.k)}}</td>
          </tr>
          <tr>
            <td>kdj-d</td>
            <td>{{nowIndicator.kdj.d | getFixed(2)}}</td>
            <td>{{perIndicator.maxKdj.d | getFixed(2)}}</td>
            <td>{{perIndicator.minKdj.d | getFixed(2)}}</td>
            <td>{{perIndicator.buyKdj.d | getFixed(2)}}</td>
            <td>{{nowIndicator.kdj.d | getStatus(perIndicator.minKdj.d, perIndicator.maxKdj.d)}}</td>
          </tr>
          <tr>
            <td>kdj-j</td>
            <td>{{nowIndicator.kdj.j | getFixed(2)}}</td>
            <td>{{perIndicator.maxKdj.j | getFixed(2)}}</td>
            <td>{{perIndicator.minKdj.j | getFixed(2)}}</td>
            <td>{{perIndicator.buyKdj.j | getFixed(2)}}</td>
            <td>{{nowIndicator.kdj.j | getStatus(perIndicator.minKdj.j, perIndicator.maxKdj.j)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div id="kline1" style="height: 500px;width: 100%;background:#666;margin-top: 10px">

    </div>
    
  </div>
</template>
<script>
import {MACD, KDJ} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
export default {
  name: 'BotProfit',
  filters: {
    getFixed(val, level) {
      return (val?val/1:0).toFixed(level)
    },
    getStatus(val, min, max) {
      if (val/1 < min/1) {
        return -1
      }
      if (val/1 > max/1) {
        return 1
      }
      return 0
    }
  },
  data() {
    return {
      type: '',
      market: 'usdt_qc',
      kline: [],
      buttonMarkets: [
        'usdt_qc',
        'btc_usdt',
        'eth_usdt',
        'eos_usdt'
      ],
      buttonIntervals: [
        '1min',
        '3min',
        '5min',
        '15min',
        '30min',
        '1hour',
        '2hour',
        '4hour',
        '6hour',
        '1day',
      ],
      strategy1Data: {
        account: 10000,
        usdtAccount: 0,
        sellItems: []
      },
      macd: {},
      kdj: {},
      minItems: [],
      maxItems: [],
      buyItems: [],
      perIndicator: {
        maxMacd: {},
        minMacd: {},
        maxKdj: {},
        minKdj: {},
        buyMacd: {},
        buyKdj: {}
      },
      nowIndicator: {
        macd: {},
        kdj: {}
      },
    }
  },
  methods: {
    initChart(data) {
        const option = {
          title: {
              text: '均线'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['kline','barSum']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          dataZoom: [{
              type: 'inside',
              start: 90,
              end: 100
          }, {
              start: 0,
              end: 10,
              handleIcon: 'M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z',
              handleSize: '80%',
              handleStyle: {
                  color: '#fff',
                  shadowBlur: 3,
                  shadowColor: 'rgba(0, 0, 0, 0.6)',
                  shadowOffsetX: 2,
                  shadowOffsetY: 2
              }
          }],
          xAxis: {
              type: 'category',
              boundaryGap: false,
              data: this.kline.map(it => moment(it[0]).format('MM-DD HH:mm:ss'))
          },
          yAxis: [
            {
              name: 'kline',
              type: 'log',
              max: 'dataMax',
              min: 'dataMin'
            },
            {
                name: 'barSum',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
            }
          ],
          series: [
              {
                  name:'kline',
                  type:'line',
                  data: this.kline.map(it => it[4])
              },
              {
                  name:'barSum',
                  type:'line',
                  yAxisIndex:1,
                  data: data
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    getKline(market, type) {
      if (market) {
        this.market = market
      } else {
        market = this.market
      }
      if (type) {
        this.type = type
      } else {
        type = this.type
      }

      //   1417536000000, 时间戳
// 2370.16, 开
// 2380, 高
// 2352, 低
// 2367.37, 收
// 17259.83 交易量
      this.$http('http://www.abichi.club/zbapi/data/v1/kline', {
        params: {
          market: market,
          type: type,
          size: 1000
        }
      }).then(res => {
        this.kline = res.data.data
        this.macd = MACD(this.kline.map(it => it[4]))
        this.kdj = KDJ(this.kline.map(it => [it[2], it[3], it[4]]))
        this.parseData()
        this.strategy6()
      })
    },
    strategy1() {
      let sellLevel = 0.01
      const buyDea = -0.00132
      let perBuy = 100
      let strategyData = {
        account: 10000,
        usdtAccount: 0,
        sellItems: []
      }
      this.kline.forEach((it, index, _arr) => {
        const price = it[4]
        const deas = this.macd.deas
        if (deas[index] < buyDea) {
          if ((strategyData.account - it[4] * perBuy)>0) {
            strategyData.account = strategyData.account - it[4] * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
            strategyData.sellItems.push(it[4] + sellLevel)
          }
        }
        strategyData.sellItems.forEach((sellItem, sellIndex) => {
          if (strategyData.usdtAccount - perBuy < 0) {
            return
          }
          if (sellItem == 999999) {
            return
          }
          if (sellItem < price ) {
            strategyData.account = strategyData.account + sellItem * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount - perBuy
            strategyData.sellItems[sellIndex] = 999999
          }
        })
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.85).toFixed(2)
      console.log(strategyData)
    },
    strategy2() {
      let sellLevel = 0.0005
      const buyDea = -0.0001
      const sellDea = 0.0001
      let perBuy = 100
      let strategyData = {
        account: 10000,
        usdtAccount: 0,
        sellItems: []
      }
      let perBuyDea = null
      let buyFinish = false
      let sellFinish = false
      let perSellDea = null
      this.kline.forEach((it, index, _arr) => {
        const price = it[4]
        const deas = this.macd.deas
        const nowDea = deas[index]
        if (nowDea < buyDea && !buyFinish) {
          sellFinish = false
          if (perBuyDea == null) {
            return perBuyDea = nowDea
          }
          if (perBuyDea < nowDea) {
            if ((strategyData.account - it[4] * perBuy)>0) {
              strategyData.account = strategyData.account - it[4] * perBuy
              strategyData.usdtAccount = strategyData.usdtAccount + perBuy
              buyFinish = true
              // strategyData.sellItems.push(it[4] + sellLevel)
            }
            
            perBuyDea = null
          } else {
            perBuyDea = nowDea
          }
        } else {
          perBuyDea = null
        }
        if (nowDea > sellDea && !sellFinish) {
          buyFinish = false
          if (perSellDea == null) {
            return perSellDea = nowDea
          }
          if (perSellDea > nowDea) {
            if ((strategyData.usdtAccount - perBuy) > 0) {
              strategyData.account = strategyData.account + it[4] * perBuy
              strategyData.usdtAccount = strategyData.usdtAccount - perBuy
              sellFinish = true
            }
            perSellDea = null
          } else {
            perSellDea = nowDea
          }
        } else {
          perSellDea = null
        }
        // strategyData.sellItems.forEach((sellItem, sellIndex) => {
        //   if (strategyData.usdtAccount - perBuy < 0) {
        //     return
        //   }
        //   if (deas[index] > sellDea ) {
            // strategyData.account = strategyData.account + it[4] * perBuy
            // strategyData.usdtAccount = strategyData.usdtAccount - perBuy
            // strategyData.sellItems[sellIndex] = 999999
        //   }
        // })
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.85).toFixed(2)
      console.log(strategyData)
    },
    strategy3() {
      let strategyData = {
          account: 10000,
          usdtAccount: 0,
          sellItems: []
        }
      this.kline.forEach((it, index) => {
        const price = it[4]
        const minJ = 0
        const maxJ = 88
        const nowJ = this.kdj.j[index]
        const perBuy = 1000
        
        if (nowJ < minJ) {
          if ((strategyData.account - price * perBuy)>0) {
            strategyData.account = strategyData.account - price * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
          }
        }
        if (nowJ > maxJ) {
          if ((strategyData.usdtAccount) > 0) {
            strategyData.account = strategyData.account + price * strategyData.usdtAccount
            strategyData.usdtAccount = 0
          }
        }
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.95).toFixed(2)
        console.log(strategyData)
    },
    strategy4() {
      let strategyData = {
          account: 10000,
          usdtAccount: 0,
          sellItems: []
        }
      this.kline.forEach((it, index) => {
        if (index == 0) {
          return
        }
        const price = it[4]
        const minDea = -0.003
        const maxDea = 0
        const minJ = 15
        const maxJ = 60
        const nowJ = this.kdj.j[index]
        const nowDea = this.macd.deas[index]
        const beforeDea = this.macd.deas[index-1]
        const perBuy = parseInt(10000/price)
        
        if (nowDea < minDea && nowDea > beforeDea) {
          if ((strategyData.account - price * perBuy)>0) {
            strategyData.account = strategyData.account - price * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
          }
        }
        if (nowDea > maxDea && nowDea < beforeDea) {
          if ((strategyData.usdtAccount) > 0) {
            strategyData.account = strategyData.account + price * strategyData.usdtAccount
            strategyData.usdtAccount = 0
          }
        }
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.95).toFixed(2)
        console.log(strategyData)
    },
    strategy5() {
      function getStatus(val, min, max) {
        if (val > max) {
          return 1
        }
        if (val < min) {
          return -1
        }
        return 0
      }
      let strategyData = {
          account: 10000,
          usdtAccount: 0,
          sellItems: [],
          sellCounts: []
        }
      this.kline.forEach((it, index) => {
        const price = it[4]
        const indicator = {
          dea: getStatus(this.macd.deas[index], this.perIndicator.minMacd.dea, this.perIndicator.maxMacd.dea),
          diff: getStatus(this.macd.diffs[index], this.perIndicator.minMacd.diff, this.perIndicator.maxMacd.diff),
          bar: getStatus(this.macd.bars[index], this.perIndicator.minMacd.bar, this.perIndicator.maxMacd.bar),
          k: getStatus(this.kdj.k[index], this.perIndicator.minKdj.k, this.perIndicator.maxKdj.k),
          d: getStatus(this.kdj.d[index], this.perIndicator.minKdj.d, this.perIndicator.maxKdj.d),
          j: getStatus(this.kdj.j[index], this.perIndicator.minKdj.j, this.perIndicator.maxKdj.j),
        }
        
        let buyLevel = 0

        Object.keys(indicator).forEach(key => {
          const val = indicator[key]
          buyLevel = buyLevel - val
        })
        const perBuy = 200

        if (indicator.dea == -1 && indicator.diff == -1 && indicator.bar == -1) {
          if ((strategyData.account - price * perBuy)>0) {
            strategyData.account = strategyData.account - price * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
            // strategyData.sellItems.push(it[4] + sellLevel)
            // strategyData.sellCounts.push(perBuy)
          }
        }
        if (indicator.dea + indicator.diff + indicator.bar > 1) {
          strategyData.account = strategyData.account + price * strategyData.usdtAccount
          strategyData.usdtAccount = 0
        } 
        
        const profit = (strategyData.account + strategyData.usdtAccount * 6.9).toFixed(2)
        if (profit < 10000) {
          console.log(profit)
        }

        // strategyData.sellItems.forEach((sellItem, sellIndex) => {
        //   const sellCounts = strategyData.sellCounts[sellIndex]
        //   if (strategyData.usdtAccount - sellCounts < 0) {
        //     return
        //   }
        //   if (sellCounts == 0) {
        //     return
        //   }
        //   if (sellItem < price ) {
        //     strategyData.account = strategyData.account + sellItem * sellCounts
        //     strategyData.usdtAccount = strategyData.usdtAccount - sellCounts
        //     strategyData.sellItems[sellIndex] = 999999
        //     strategyData.sellCounts[sellIndex] = 0
        //   }
        // })
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.9).toFixed(2)
        console.log(strategyData)
    },
    // 能量对决
    strategy6() {
      let barsTotalList = []
      let barsTotal = 0
      this.macd.bars.forEach(it => {
        barsTotal += it
        barsTotalList.push(barsTotal.toFixed(4))
      })
      this.initChart(barsTotalList)
      console.log(barsTotalList, barsTotal)
    },
    parseData() {
      const period = 66
      let maxItems = []
      let minItems = []
      let buyItems = []
      let preHighIndex = 0
      this.kline.forEach((it, index, _arr) => {
        const itemPrice = it[4]
        let maxItem = index
        let minItem = index
        let buyItem = null
        
        for (let i = 0; i < period; i++) {
          if (maxItem == null && minItem == null) {
            break
          }
          const thatIndex = index - i + period / 2
          if (index == thatIndex) {
            continue
          }
          if (thatIndex < 0 || thatIndex > _arr.length-1) {
            maxItem = null
            minItem = null
            continue
          }
          const thatPrice = _arr[thatIndex][4]
          if (itemPrice < thatPrice) {
            maxItem = null
          } else {
            minItem = null
          }
          if (itemPrice < thatPrice - 0.01 && thatIndex > index && index > preHighIndex) {
            buyItem = index
            preHighIndex = thatIndex
          }
        }
        if (maxItem) {
          maxItems.push(maxItem)
        }
        if (minItem) {
          minItems.push(minItem)
        }
        if (buyItem) {
          buyItems.push(buyItem)
        }
      })
      this.minItems = minItems
      this.maxItems = maxItems
      this.buyItems = buyItems
      let MinMacd = {
        diff: 0,
        dea: 0,
        bar: 0
      }
      let MinKdj = {
        k: 0,
        d: 0,
        j: 0
      }
      let MaxMacd = {
        diff: 0,
        dea: 0,
        bar: 0
      }
      let MaxKdj = {
        k: 0,
        d: 0,
        j: 0
      }
      let BuyKdj = {
        k: 0,
        d: 0,
        j: 0
      }
      let BuyMacd = {
        diff: 0,
        dea: 0,
        bar: 0
      }
      minItems.forEach(i => {
        MinKdj.k = MinKdj.k + this.kdj.k[i]
        MinKdj.d = MinKdj.d + this.kdj.d[i]
        MinKdj.j = MinKdj.j + this.kdj.j[i]
        MinMacd.diff = MinMacd.diff + this.macd.diffs[i]
        MinMacd.dea = MinMacd.dea + this.macd.deas[i]
        MinMacd.bar = MinMacd.bar + this.macd.bars[i]
      })
      maxItems.forEach(i => {
        MaxKdj.k = MaxKdj.k + this.kdj.k[i]
        MaxKdj.d = MaxKdj.d + this.kdj.d[i]
        MaxKdj.j = MaxKdj.j + this.kdj.j[i]
        MaxMacd.diff = MaxMacd.diff + this.macd.diffs[i]
        MaxMacd.dea = MaxMacd.dea + this.macd.deas[i]
        MaxMacd.bar = MaxMacd.bar + this.macd.bars[i]
      })
      buyItems.forEach(i => {
        BuyKdj.k = BuyKdj.k + this.kdj.k[i]
        BuyKdj.d = BuyKdj.d + this.kdj.d[i]
        BuyKdj.j = BuyKdj.j + this.kdj.j[i]
        BuyMacd.diff = BuyMacd.diff + this.macd.diffs[i]
        BuyMacd.dea = BuyMacd.dea + this.macd.deas[i]
        BuyMacd.bar = BuyMacd.bar + this.macd.bars[i]
      })
      const perMinKdj = {
        k: MinKdj.k/minItems.length,
        d: MinKdj.d/minItems.length,
        j: MinKdj.j/minItems.length
      }
      const perMaxKdj = {
        k: MaxKdj.k/maxItems.length,
        d: MaxKdj.d/maxItems.length,
        j: MaxKdj.j/maxItems.length
      }
      const perMinMacd = {
        diff: MinMacd.diff/minItems.length,
        dea: MinMacd.dea/minItems.length,
        bar: MinMacd.bar/minItems.length
      }
      const perMaxMacd = {
        diff: MaxMacd.diff/minItems.length,
        dea: MaxMacd.dea/minItems.length,
        bar: MaxMacd.bar/minItems.length
      }
      const perBuyMacd = {
        diff: BuyMacd.diff/buyItems.length,
        dea: BuyMacd.dea/buyItems.length,
        bar: BuyMacd.bar/buyItems.length
      }
      const perBuyKdj = {
        k: BuyKdj.k/buyItems.length,
        d: BuyKdj.d/buyItems.length,
        j: BuyKdj.j/buyItems.length
      }
      this.perIndicator = {
        maxKdj: perMaxKdj,
        minKdj: perMinKdj,
        maxMacd: perMaxMacd,
        minMacd: perMinMacd,
        buyKdj: perBuyKdj,
        buyMacd: perBuyMacd
      }
      const maxLength = this.kline.length-1
      this.nowIndicator = {
        macd: {
          dea: this.macd.deas[maxLength],
          diff: this.macd.diffs[maxLength],
          bar: this.macd.bars[maxLength]
        },
        kdj: {
          k: this.kdj.k[maxLength],
          d: this.kdj.d[maxLength],
          j: this.kdj.j[maxLength]
        }
      }

    }
  }
}
</script>
<style lang="less" scoped>
  .container {
    padding: 20px 30px;
    background-color: #333;
    min-height: 100%;
    color: #fff;
    button {
      background: #999
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

.mytable {
  width: 100%;
  text-align: center;
  td, th {
    padding: 5px 0
  }
}
</style>
