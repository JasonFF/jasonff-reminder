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
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px">

    </div>
    
  </div>
</template>
<script>
import {MACD, KDJ, BOLL, RSI, OBV2, MA, OBV} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
    function getExact(val) {
      if (!val) {
        return 0
      }
      if ((val/1).toString() === 'NaN') {
        return 0
      }
      if (val.toString().split('.')[1]&&val.toString().split('.')[1].length > 8) {
        return val.toFixed(7)/1
      }
      return val
    }
export default {
  name: 'BotProfit',
  filters: {
    getScienceNum(val) {
      if (!val) {
        return val
      }
      const num = val/1
      const numstr = num.toString()
      if (numstr === 'NaN') {
        return ''
      }
      let zLength = (numstr.split('.')[0].replace('-','')).length
      if (Math.abs(num) < 1) {
        let xStr = numstr.split('.')[1]
        let xLength = xStr.length
        let xStrNumLength = (xStr/1).toString().length
        return ((num * Math.pow(10, xLength-xStrNumLength + 1))).toFixed(2) + '<-' + (xLength-xStrNumLength + 1) +'>'
      } 
      if (!zLength || zLength < 3) {
        return num.toFixed(2)
      }
      return (num/Math.pow(10, zLength-1)).toFixed(2) + '<' + (zLength-1)+'>'
    },
    getTime(val) {
      return val?moment(val).format('MM-DD HH:mm:ss'):''
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
    }
  },
  mounted() {
    window.$$vue = this
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
              data:['kline','indicator'] 
          },
          grid: {
              left: '6%',
              right: '6%',
              bottom: '6%',
              containLabel: false
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
                name: 'indicator',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
            },
          ],
          series: [
              {
                  name:'kline',
                  type:'line',
                  data: this.kline.map(it=> it[4])
              },
              {
                  name:'barSum',
                  type:'line',
                  yAxisIndex:1,
                  // data: OBV2(this.klineObj.o,this.klineObj.c,this.klineObj.h,this.klineObj.l,this.klineObj.v,)
                  data: OBV(this.klineObj.c, this.klineObj.v)
              },
              {
                  name:'barSumma',
                  type:'line',
                  yAxisIndex:1,
                  data: MA(OBV(this.klineObj.c,this.klineObj.v,), parseInt(this.kline.length/10))
              },
              {
                  name:'klinema',
                  type:'line',
                  data: MA(this.kline.map(it=> it[4]),  parseInt(this.kline.length/10))
              },
              
              
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    // botProfit() {
    //   let obv = OBV2(this.klineObj.o,this.klineObj.c,this.klineObj.h,this.klineObj.l,this.klineObj.v,)
    //   let obvma = MA(obv, 100)
    //   let kline = this.kline.map(it => it[4])
    //   let klinema = MA(kline, 30)
    //   let totalMoney = 10000
    //   let totalCoin = 10000/kline[0]
    //   kline.forEach((it,index) => {
    //     let price = it
    //     if (obv[index] > obvma[index] && obv[index-1] < obvma[index-1]) {
    //       totalCoin = totalCoin + 0.3*totalMoney/price
    //       totalMoney = 0.7*totalMoney
    //     }
    //     if (obv[index] < obvma[index] && obv[index-1] > obvma[index-1]) {
    //       totalMoney = totalMoney + 0.3*totalCoin * price
    //       totalCoin = 0.7*totalCoin
    //     }
    //   })
    //   let profit = ((totalMoney + totalCoin * kline[kline.length - 1]-20000)/20000 * 100).toFixed(2) + '%'
    //   console.log(profit)
    // },
    botProfit() {
      let kline = this.kline.map(it => it[4])
      // let klinema = MA(kline, 30)
      let rsi6 = RSI(kline).rsi6
      let totalMoney = 10000
      let totalCoin = 10000/kline[0]
      kline.forEach((price,index) => {

        if (rsi6 < 20) {
          totalCoin = totalCoin + 0.1*totalMoney/price
          totalMoney = 0.9*totalMoney
        }
        if (rsi6 > 80) {
          totalMoney = totalMoney + 0.1*totalCoin * price
          totalCoin = 0.9*totalCoin
        }
      })
      let profit = ((totalMoney + totalCoin * kline[kline.length - 1]-20000)/20000 * 100).toFixed(2) + '%'
      console.log(profit)
    },
    getPercent(list, index = 0) {
      let firstVal = list[index]
      return list.map(it => {
        return ((it - firstVal) / Math.abs(firstVal) * 100).toFixed(2)
      })
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
      this.$http('http://13.230.68.110/zbapi/data/v1/kline', {
        params: {
          market: market,
          type: type,
          size: 1000
        }
      }).then(res => {
        this.kline = res.data.data
      }).then(res => {
        this.parseData(res)
      })
    },
    
    parseData() {
      let o = []
      let c = []
      let h = []
      let l = []
      let v = []
        this.kline.forEach(it => {
          o.push(it[1])
          c.push(it[4])
          h.push(it[2])
          l.push(it[3])
          v.push(it[5])
        })
        this.klineObj = {
          o,
          c,
          h,
          l,
          v
        }
        this.initChart()
        this.botProfit()
    },
  }
}
</script>
<style lang="less" scoped>
  .container {
    padding: 20px 5px;
    background-color: #333;
    min-height: 100%;
    color: #fff;
    overflow: hidden;
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
