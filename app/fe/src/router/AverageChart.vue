<template>
  <div style="padding: 30px">
    <Row :gutter='16'>
      <Col style="margin-bottom: 10px" span="6" v-for="item in buttonIntervals" :key="item">
        <Button @click="initData(item)" long>{{item}}</Button>
      </Col>
    </Row>
    <Row>
      <Col span="24">
        <div id="kline1" style="width: 100%; height: 500px"></div>
      </Col>
    </Row>
    
  </div>
</template>
<script>
import moment from 'moment'
import echarts from 'echarts'
import { resolve } from 'url';

function getPrice(it) {
  return it[2]/2 + it[3]/2
}

export default {
  name: 'AverageChart',
  data() {
    return {
      klineData: [],
      btcTop: 20093,
      ethTop: 1424,
      eosTop: 23.28,
      kline: {},
      buttonIntervals: [
        '1min',
        '3min',
        '5min',
        '15min',
        '30min',
        '1hour',
        '4hour',
        '6hour',
        '1day',
      ]
    }
  },
  methods: {
    getProfit(targetArr, priceArr) {
      let account = 10000
      let usdtAccount = 0
      let perBuy = 100
      let operateTime = 0
      let perBuyPrice = 100
      targetArr.forEach((it, i) => {
        const price = priceArr[i]
        if (it < 0) {
          if (account > perBuy * price) {
            account = account - perBuy * price
            usdtAccount = usdtAccount + perBuy
            operateTime++
            perBuyPrice = price
          }
        }
        if (it > 0) {
          if (usdtAccount > perBuy) {
            if (price < perBuyPrice) {
              return
            }
            account = account + perBuy * price
            usdtAccount = usdtAccount - perBuy
            operateTime++
          }
        }
      })
      console.log(account, usdtAccount, operateTime, account + usdtAccount * 7)
    },
    initKline() {
      const {usdt_qc, btc_qc, btc_usdt, eos_qc, eos_usdt} = this.kline
      const time = usdt_qc.map(it => {
        // return it[0]
        return moment(it[0]).format('MM-DD HH:mm')
      })
      const usdtQc = usdt_qc.map((it, index) => {
        return getPrice(it)
      })
      const usdtBtc = btc_qc.map((it, i) => {
        return (usdtQc[i] - getPrice(it)/getPrice(btc_usdt[i])).toFixed(4)
      })
      const usdtEos = eos_qc.map((it, i) => {
        return (usdtQc[i] - getPrice(it)/getPrice(eos_usdt[i])).toFixed(4)
      })
      this.getProfit(usdtBtc, usdtQc)
      const option = {
          title: {
              text: '均线'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['usdt','usdt(btc)', 'usdt(eos)']
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
              data: time
          },
          yAxis: [
            {
              name: 'price',
              type: 'log',
              max: 'dataMax',
              min: 'dataMin'
            },
            {
                name: 'diff',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
            }
          ],
          series: [
              {
                  name:'usdt',
                  type:'line',
                  data: usdtQc
              },
              {
                  name:'usdt(btc)',
                  type:'line',
                  yAxisIndex:1,
                  data: usdtBtc
              },
              {
                  name:'usdt(eos)',
                  yAxisIndex:1,
                  type:'line',
                  data: usdtEos
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    initKline1() {
      const {usdt_qc} = this.kline
      const time = usdt_qc.map(it => {
        // return it[0]
        return moment(it[0]).format('MM-DD HH:mm')
      })
      let highPrice = 0;
      let lowPrice = 100;
      const usdtQc = usdt_qc.map((it, index) => {
        if (it[2] > highPrice) {
          highPrice = it[2]
        }
        if (it[3] < lowPrice) {
          lowPrice = it[3]
        }
        return getPrice(it)
      })

      const rsv = usdt_qc.map((it) => {
        return (it[4] - lowPrice) / (highPrice - lowPrice) * 100
      })
      
      const option = {
          title: {
              text: '均线'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['usdt','rsv']
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
              data: time
          },
          yAxis: [
            {
              name: 'price',
              type: 'log',
              max: 'dataMax',
              min: 'dataMin'
            },
            {
                name: 'diff',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
            }
          ],
          series: [
              {
                  name:'usdt',
                  type:'line',
                  data: usdtQc
              },
              {
                  name:'rsv',
                  type:'line',
                  yAxisIndex:1,
                  data: rsv
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    getKline(interval, symbol) {
//   1417536000000, 时间戳
// 2370.16, 开
// 2380, 高
// 2352, 低
// 2367.37, 收
// 17259.83 交易量
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          this.$http('http://api.zb.cn/data/v1/kline', {
            params: {
              market: symbol,
              type: interval,
              size: 1000
            }
          }).then(res => {
            this.kline[symbol] = res.data.data
            // return res.data.data
            resolve(res.data.data)
          })
        }, 1000);
        
      }) 
    },
    initData(interval) {
        this.getKline(interval, "usdt_qc").then(() => {
          return this.getKline(interval, "btc_qc")
        }).then(() => {
          return this.getKline(interval, "btc_usdt")
        }).then(() => {
          return this.getKline(interval, 'eos_qc')
        }).then(() => {
          return this.getKline(interval, 'eos_usdt')
        }).then(res => {
          this.initKline()
        })
        // this.getKline(interval, "usdt_qc").then(res => {
        //   this.initKline1()
        // })

    }
  }
}
</script>
