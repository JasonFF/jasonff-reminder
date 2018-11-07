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
            <th>-0.02/-0.01|+0.01/+0.02</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>macd-dea</td>
            <td>{{nowIndicator.macd.dea | parseMacd}}</td>
            <td>{{perIndicator.maxMacd.dea | parseMacd}}</td>
            <td>{{perIndicator.minMacd.dea | parseMacd}}</td>
            <td>{{macdB.dea | parseMacd}} / {{macdT.dea| parseMacd}}</td>
            <td>{{nowIndicator.macd.dea | getStatus(perIndicator.minMacd.dea, perIndicator.maxMacd.dea)}}</td>
          </tr>
          <tr>
            <td>macd-diff</td>
            <td>{{nowIndicator.macd.diff | parseMacd}}</td>
            <td>{{perIndicator.maxMacd.diff | parseMacd}}</td>
            <td>{{perIndicator.minMacd.diff | parseMacd}}</td>
            <td>{{macdB.diff | parseMacd}} / {{macdT.diff| parseMacd}}</td>
            <td>{{nowIndicator.macd.diff | getStatus(perIndicator.minMacd.diff, perIndicator.maxMacd.diff)}}</td>
          </tr>
          <tr>
            <td>macd-bar</td>
            <td>{{nowIndicator.macd.bar | parseMacd}}</td>
            <td>{{perIndicator.maxMacd.bar | parseMacd}}</td>
            <td>{{perIndicator.minMacd.bar | parseMacd}}</td>
            <td>{{macdB.bar | parseMacd}} / {{macdT.bar| parseMacd}}</td>
            <td>{{nowIndicator.macd.bar | getStatus(perIndicator.minMacd.bar, perIndicator.maxMacd.bar)}}</td>
          </tr>
          <tr>
            <td>rsi-r6</td>
            <td>{{nowIndicator.rsi.r6 | getFixed(2)}}</td>
            <td>{{perIndicator.maxRsi.r6 | getFixed(2)}}</td>
            <td>{{perIndicator.minRsi.r6 | getFixed(2)}}</td>
            <td>{{`${rsiB.r6} | ${rsiT.r6}`}}</td>
            <td>{{nowIndicator.rsi.r6 | getStatus(perIndicator.minRsi.r6, perIndicator.maxRsi.r6)}}</td>
          </tr>
          <tr>
            <td>rsi-r12</td>
            <td>{{nowIndicator.rsi.r12 | getFixed(2)}}</td>
            <td>{{perIndicator.maxRsi.r12 | getFixed(2)}}</td>
            <td>{{perIndicator.minRsi.r12 | getFixed(2)}}</td>
            <td>{{`${rsiB.r12} | ${rsiT.r12}`}}</td>
            <td>{{nowIndicator.rsi.r12 | getStatus(perIndicator.minRsi.r12, perIndicator.maxRsi.r12)}}</td>
          </tr>
          <tr>
            <td>rsi-r24</td>
            <td>{{nowIndicator.rsi.r24 | getFixed(2)}}</td>
            <td>{{perIndicator.maxRsi.r24 | getFixed(2)}}</td>
            <td>{{perIndicator.minRsi.r24 | getFixed(2)}}</td>
            <td>{{`${rsiB.r24} | ${rsiT.r24}`}}</td>
            <td>{{nowIndicator.rsi.r24 | getStatus(perIndicator.minRsi.r24, perIndicator.maxRsi.r24)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <!-- <div>
      <h3 style="text-align: center">{{strategy1Data.totalProfit.toFixed(2)}}</h3>
      <table class="mytable">
        <thead>
          <tr>
            <th colspan="5">buy</th>
          </tr>
          <tr>
            <th>index</th>
            <th>time</th>
            <th>closeTime</th>
            <th>open</th>
            <th>close</th>
            <th>amount</th>
            <th>finish</th>
            <th>profit</th>
            <th>indicator</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in strategy1Data.toSellItems">
            <td>{{index + 1}}</td>
            <td>{{item.time|getTime}}</td>
            <td>{{item.closeTime|getTime}}</td>
            <td>{{item.open}}</td>
            <td>{{item.close}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.finish}}</td>
            <td>{{item.profit}}</td>
            <td>{{item.nowRsi6}}</td>
          </tr>
        </tbody>
         <thead>
          <tr>
            <th colspan="5">sell</th>
          </tr>
          <tr>
            <th>index</th>
            <th>time</th>
            <th>closeTime</th>
            <th>open</th>
            <th>close</th>
            <th>amount</th>
            <th>finish</th>
            <th>profit</th>
            <th>indicator</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(item, index) in strategy1Data.toBuyItems">
            <td>{{index + 1}}</td>
            <td>{{item.time|getTime}}</td>
            <td>{{item.closeTime|getTime}}</td>
            <td>{{item.open}}</td>
            <td>{{item.close}}</td>
            <td>{{item.amount}}</td>
            <td>{{item.finish}}</td>
            <td>{{item.profit}}</td>
            <td>{{item.nowRsi6}}</td>
          </tr>
        </tbody>
      </table>
    </div> -->
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px">

    </div>
    
  </div>
</template>
<script>
import {MACD, KDJ, BOLL, RSI} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
function getProfit(item, direct, kline) {
      if (item.finish) {
        return (direct * (item.close - item.open) * item.amount).toFixed(2)
      } else {
        return (direct * (kline[kline.length-1][4] - item.open) * item.amount).toFixed(2)
      }
    }
export default {
  name: 'BotProfit',
  filters: {
    getTime(val) {
      return val?moment(val).format('MM-DD HH:mm:ss'):''
    },
    parseMacd(val) {
      return val?(val*1000000).toFixed(0):''
    },
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
        toSellItems: [],
        toBuyItems: [],
        totalProfit: 0
      },
      // macd: {},
      // kdj: {},
      // boll: {},
      // rsi: {},
      minItems: [],
      maxItems: [],
      perIndicator: {
        maxMacd: {},
        minMacd: {},
        maxKdj: {},
        minKdj: {},
        maxRsi: {},
        minRsi: {}
      },
      nowIndicator: {
        macd: {},
        kdj: {},
        rsi: {}
      },
    }
  },
  mounted() {
    window.$$vue = this
  },
  computed: {
    macd() {
      return MACD(this.kline.map(it => it[4]))
    },
    macdT() {
      const macd = MACD(this.kline.map((it, index, __arr) => {
        if (index == __arr.length-1) {
          return it[4] + 0.02
        }
        return it[4]
      }))
      if (macd.deas.length) {
        return {
          dea: (macd.deas[this.kline.length-1]).toFixed(6),
          diff: (macd.diffs[this.kline.length-1]).toFixed(6),
          bar: (macd.bars[this.kline.length-1]).toFixed(6),
        }
      }
      return {
        dea: '',
        diff: '',
        bar: '',
      }
    },
    macdB() {
      const macd = MACD(this.kline.map((it, index, __arr) => {
        if (index == __arr.length-1) {
          return it[4] - 0.02
        }
        return it[4]
      }))
      if (macd.deas.length) {
        return {
          dea: (macd.deas[this.kline.length-1]).toFixed(6),
          diff: (macd.diffs[this.kline.length-1]).toFixed(6),
          bar: (macd.bars[this.kline.length-1]).toFixed(6),
        }
      }
      return {
        dea: '',
        diff: '',
        bar: '',
      }
    },
    kdj() {
      return KDJ(this.kline.map(it => [it[2], it[3], it[4]]))
    },
    boll() {
      return BOLL(this.kline.map(it => it[4]))
    },
    rsi() {
      return RSI(this.kline.map(it => it[4]))
    },
    rsiT() {
      const rsi2 = RSI(this.kline.map((it, index, __arr) => {
        if (index == __arr.length-1) {
          return it[4] + 0.02
        }
        return it[4]
      }))
      const rsi1 = RSI(this.kline.map((it, index, __arr) => {
        if (index == __arr.length-1) {
          return it[4] + 0.01
        }
        return it[4]
      }))
      if (rsi1.rsi6) {
        return {
          r6: `${(rsi1.rsi6[this.kline.length -1]/1).toFixed(2)}/${(rsi2.rsi6[this.kline.length -1]/1).toFixed(2)}`,
          r12: `${(rsi1.rsi12[this.kline.length -1]/1).toFixed(2)}/${(rsi2.rsi12[this.kline.length -1]/1).toFixed(2)}`,
          r24: `${(rsi1.rsi24[this.kline.length -1]/1).toFixed(2)}/${(rsi2.rsi24[this.kline.length -1]/1).toFixed(2)}`,
        }
      }
      return {
        r6: '',
        r12: '',
        r24: ''
      }
      
    },
    rsiB() {
      const rsi2 = RSI(this.kline.map((it, index, __arr) => {
        if (index == __arr.length-1) {
          return it[4] - 0.02
        }
        return it[4]
      }))
      const rsi1 = RSI(this.kline.map((it, index, __arr) => {
        if (index == __arr.length-1) {
          return it[4] - 0.01
        }
        return it[4]
      }))
      if (rsi1.rsi6) {
        return {
           r6: `${(rsi2.rsi6[this.kline.length -1]/1).toFixed(2)}/${(rsi1.rsi6[this.kline.length -1]/1).toFixed(2)}`,
          r12: `${(rsi2.rsi12[this.kline.length -1]/1).toFixed(2)}/${(rsi1.rsi12[this.kline.length -1]/1).toFixed(2)}`,
          r24: `${(rsi2.rsi24[this.kline.length -1]/1).toFixed(2)}/${(rsi1.rsi24[this.kline.length -1]/1).toFixed(2)}`,
        }
      }
      return {
        r6: '',
        r12: '',
        r24: ''
      }
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
              type: 'value',
              max: 'dataMax',
              min: 'dataMin'
            },
            {
                name: 'barSum',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
            },
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
      }).then(res => {
        
        this.parseData()
        // this.strategy2()
        this.strategy6()
      })
    },
    // 差值策略
    strategy1() {
      let strategyData = {
        toSellItems: [],
        toBuyItems: []
      }
      
      this.kline.forEach((it, index) => {
        if (index == 0) {
          return
        }
        const price = it[4]
        const prePrice = this.kline[index-1][4]
        const perBuy = 100
        const perSell = 100
        let buyDiff = 0.000
        let sellDiff = 0.000
        const toSellLevel = 0.01
        const toBuyLevel = 0.01

        const nowDea = this.macd.deas[index]
        const minDea = -0.0005
        const maxDea = 0.0005
        const nowK = this.kdj.k[index]
        const minK = 15
        const maxK = 85

        if (nowDea < minDea && nowK < minK && price < prePrice - buyDiff) {
          strategyData.toSellItems.push({
            time: it[0],
            open: price,
            close:  (price + toSellLevel).toFixed(4),
            finish: false,
            profit: 0,
            amount: perBuy,
            nowDea: nowDea,
            minDea: minDea,
            maxDea: maxDea,
            nowK: nowK,
            minK: minK,
            maxK: maxK
          })
        }

        strategyData.toSellItems.forEach((sellItem, sellIndex) => {
          if (sellItem.finish) {
            return
          }
          if (sellItem.close < price) {
            strategyData.toSellItems[sellIndex].finish = true
            strategyData.toSellItems[sellIndex].closeTime = it[0]
          }
        })

        if (nowDea > maxDea && nowK > maxK && price > prePrice + sellDiff) {
          strategyData.toBuyItems.push({
            time: it[0],
            open: price,
            close: (price - toBuyLevel).toFixed(4),
            finish: false,
            profit: 0,
            amount: perSell,
            nowDea: nowDea,
            minDea: minDea,
            maxDea: maxDea,
            nowK: nowK,
            minK: minK,
            maxK: maxK
          })
        }

        strategyData.toBuyItems.forEach((buyItem, buyIndex) => {
          if (buyItem.finish) {
            return
          }
          if (buyItem.close > price) {
            strategyData.toBuyItems[buyIndex].finish = true
            strategyData.toBuyItems[buyIndex].closeTime = it[0]
          }
        })
      })
      let totalProfit = 0
      this.strategy1Data = {
        toBuyItems: strategyData.toBuyItems.map(it => {
          const profit = getProfit(it, -1, this.kline)
          totalProfit += profit/1
          return {
            ...it,
            profit
          }
        }),
        toSellItems: strategyData.toSellItems.map(it => {
          const profit = getProfit(it, 1, this.kline)
          totalProfit += profit/1
          return {
            ...it,
            profit
          }
        }),
        totalProfit
      }
      console.log(strategyData)
    },
    // RSI策略
    strategy2() {
      let strategyData = {
        toSellItems: [],
        toBuyItems: []
      }
      
      this.kline.forEach((it, index) => {
        if (index == 0) {
          return
        }
        const price = it[4]
        const prePrice = this.kline[index-1][4]
        const perBuy = 100
        const perSell = 100
        let buyDiff = 0.000
        let sellDiff = 0.000
        const toSellLevel = 0.01
        const toBuyLevel = 0.01

        // const nowDea = this.macd.deas[index]
        // const minDea = -0.0005
        // const maxDea = 0.0005
        // const nowK = this.kdj.k[index]
        // const minK = 15
        // const maxK = 85

        const nowRsi6 = this.rsi.rsi6[index]
        const minRsi6 = 20
        const maxRsi6 = 80

        if (nowRsi6 < minRsi6 && price < prePrice - buyDiff) {
          strategyData.toSellItems.push({
            time: it[0],
            open: price,
            close:  (price + toSellLevel).toFixed(4),
            finish: false,
            profit: 0,
            amount: perBuy,
            nowRsi6
          })
        }

        strategyData.toSellItems.forEach((sellItem, sellIndex) => {
          if (sellItem.finish) {
            return
          }
          if (sellItem.close < price) {
            strategyData.toSellItems[sellIndex].finish = true
            strategyData.toSellItems[sellIndex].closeTime = it[0]
          }
        })

        if (nowRsi6 > maxRsi6 && price > prePrice + sellDiff) {
          strategyData.toBuyItems.push({
            time: it[0],
            open: price,
            close: (price - toBuyLevel).toFixed(4),
            finish: false,
            profit: 0,
            amount: perSell,
            nowRsi6
          })
        }

        strategyData.toBuyItems.forEach((buyItem, buyIndex) => {
          if (buyItem.finish) {
            return
          }
          if (buyItem.close > price) {
            strategyData.toBuyItems[buyIndex].finish = true
            strategyData.toBuyItems[buyIndex].closeTime = it[0]
          }
        })
      })
      let totalProfit = 0
      this.strategy1Data = {
        toBuyItems: strategyData.toBuyItems.map(it => {
          const profit = getProfit(it, -1, this.kline)
          totalProfit += profit/1
          return {
            ...it,
            profit
          }
        }),
        toSellItems: strategyData.toSellItems.map(it => {
          const profit = getProfit(it, 1, this.kline)
          totalProfit += profit/1
          return {
            ...it,
            profit
          }
        }),
        totalProfit
      }
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
    },
    parseData() {
      const period = 40
      let maxItems = []
      let minItems = []
      let preHighIndex = 0
      this.kline.forEach((it, index, _arr) => {
        const itemPrice = it[4]
        let maxItem = index
        let minItem = index
        
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
            preHighIndex = thatIndex
          }
        }
        if (maxItem) {
          maxItems.push(maxItem)
        }
        if (minItem) {
          minItems.push(minItem)
        }
      })
      this.minItems = minItems
      this.maxItems = maxItems
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
      let MinRsi = {
        r6: 0,
        r12: 0,
        r24: 0
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
      let MaxRsi = {
        r6: 0,
        r12: 0,
        r24: 0
      }
      minItems.forEach(i => {
        MinKdj.k += this.kdj.k[i]
        MinKdj.d += this.kdj.d[i]
        MinKdj.j += this.kdj.j[i]
        MinMacd.diff += this.macd.diffs[i]
        MinMacd.dea += this.macd.deas[i]
        MinMacd.bar += this.macd.bars[i]
        MinRsi.r6 += this.rsi.rsi6[i]
        MinRsi.r12 += this.rsi.rsi12[i]
        MinRsi.r24 += this.rsi.rsi24[i]
      })
      maxItems.forEach(i => {
        MaxKdj.k += this.kdj.k[i]
        MaxKdj.d += this.kdj.d[i]
        MaxKdj.j += this.kdj.j[i]
        MaxMacd.diff += this.macd.diffs[i]
        MaxMacd.dea += this.macd.deas[i]
        MaxMacd.bar += this.macd.bars[i]
        MaxRsi.r6 += this.rsi.rsi6[i]
        MaxRsi.r12 += this.rsi.rsi12[i]
        MaxRsi.r24 += this.rsi.rsi24[i]
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
        diff: MaxMacd.diff/maxItems.length,
        dea: MaxMacd.dea/maxItems.length,
        bar: MaxMacd.bar/maxItems.length
      }
      const perMinRsi = {
        r6: MinRsi.r6/minItems.length,
        r12: MinRsi.r12/minItems.length,
        r24: MinRsi.r24/minItems.length,
      }
      const perMaxRsi = {
        r6: MaxRsi.r6/maxItems.length,
        r12: MaxRsi.r12/maxItems.length,
        r24: MaxRsi.r24/maxItems.length,
      }
      this.perIndicator = {
        maxKdj: perMaxKdj,
        minKdj: perMinKdj,
        maxMacd: perMaxMacd,
        minMacd: perMinMacd,
        maxRsi: perMaxRsi,
        minRsi: perMinRsi
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
        },
        rsi: {
          r6: this.rsi.rsi6[maxLength],
          r12: this.rsi.rsi12[maxLength],
          r24: this.rsi.rsi24[maxLength]
        }
      }

    }
  }
}
</script>
<style lang="less" scoped>
  .container {
    padding: 20px 5px;
    background-color: #333;
    min-height: 100%;
    color: #fff;
    button {
      background: #ccc
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
