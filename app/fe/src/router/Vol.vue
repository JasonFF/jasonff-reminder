

<template>
  <div class="container">
    <div id="kline1" style="height: 500px;width: 100%;background:#666;margin-top: 10px">

    </div>
  </div>
</template>
<script>
import {MACD, KDJ} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
const bitmexUrl = 'https://www.bitmex.com/api/udf/history?symbol=XBTUSD&resolution=D&from=1507961499&to=1539065559'
export default {
  name: 'Vol',
  data() {
    return {
      kline: {}
    }
  },
  mounted() {
    this.getKline().then(() => {
      this.strategy1()
    })
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
              data: this.kline.t.map(it => moment(it).format('MM-DD HH:mm:ss'))
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
                  data: this.kline.c
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
    getKline() {
      return this.$http(' https://easy-mock.com/mock/5bbc48ecd311bc04db2cc83e/coin/bitmexbtc').then(res => {
        this.kline = res.data
      })
    },
    // 主力资金情况
    strategy1() {
      let totalVol = 0
      let sVol = 0
      let sVolList = []
      this.kline.t.forEach((it, index) => {
        const vol = this.kline.v[index]
        const close = this.kline.c[index]
        const open = this.kline.o[index]
        totalVol += vol
        let perVol = totalVol / (index + 1)
        if (vol > perVol) {
          if (close > open) {
            sVol += vol
          } else {
            sVol -= vol
          }
        }
        sVolList.push(sVol)
      })
      this.initChart(sVolList)
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
