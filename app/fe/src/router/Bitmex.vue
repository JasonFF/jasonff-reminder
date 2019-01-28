<template>
  <div class="container">
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>

<script>
import {RSI, MACD, OBV} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      kline: {},
      market: '',
      time: '周',
      type: '5',
      indicatorList: [],
      buttonMarkets: [
        'XBTUSD', "ETHUSD"
      ],
    }
  },
  mounted() {
    
    this.getKline().then(() => {
      this.getIndicator().then(this.initChart)
    })
  },
  methods: {
    getIndicator() {
      return this.$http({
        url: 'http://13.230.68.110/bitmexapi/api/v1/trade?symbol=.XBTUSDPI2H&count=500&columns=price&reverse=true'
      }).then(res => res.data).then(res => {
        let result = {}
        res.forEach((it, index) => {
          let time = moment(it.timestamp).valueOf()
          result[`$${time}`] = it.price
        })
        let indicatorList = []
        this.kline.t.forEach((it, index) => {
          let time = moment(it * 1000).valueOf()
          if (result[`$${time}`]) {
            indicatorList.push(result[`$${time}`])
          }
          return indicatorList.push(0)
        })
        this.indicatorList = indicatorList
      })
    },
    getKline(timearr=[0, 60]) {
      // const storeKline = window.localStorage.getItem('kline')
      // if (storeKline) {
      //   return Promise.resolve(JSON.parse(storeKline))
      // }
      return this.$http({
        url: 'http://13.230.68.110/bitmexapi/api/udf/history', 
        params: {
          symbol: 'XBTUSD',
          resolution: 60,
          from: moment().subtract(timearr[1], 'days').unix(),
          to: moment().subtract(timearr[0], 'days').unix()
        }
      }).then(res => res.data).then(res => {
        this.kline = res
        // window.localStorage.setItem('kline', JSON.stringify(res))
        return res
      })
    },
    initChart(data) {
        const option = {
          title: {
              text: 'obv'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['kline','obv', 'indicator'],
              top: '3%'
          },
          grid: {
              top: '15%',
              left: '13%',
              right: '14%',
              bottom: '13%',
              // containLabel: true
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
              data: this.kline.t.map(it => moment(it*1000).format('MM-DD HH:mm:ss'))
          },
          yAxis: [
            {
              name: 'kline',
              type: 'value',
              max: 'dataMax',
              min: 'dataMin',
              // max: _.max(this.kline.c),
              // min: _.min(this.kline.c),
            },
            {
                name: 'obv',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                show: false,
                // max: _.max(data),
                // min: _.min(data),
            },
            {
                name: 'indicator',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                show: false,
                // max: _.max(data),
                // min: _.min(data),
            }
          ],
          series: [
              {
                  name:'kline',
                  type:'line',
                  data: this.kline.c
              },
              {
                  name:'obv',
                  type:'line',
                  yAxisIndex:1,
                  color: '#228B22',
                  data: this.indicatorList
                  // data: OBV(this.kline.c.map((it, index) => {return [it, this.kline.v[index]]}), this.kline.c.length-1)
                  // data: this.getPercent(data, data.length - 1)
                  // data: this.getPercent(data, data.length - 1).map((it, index) => {
                  //   let basePrice = this.kline.c[data.length - 1]
                  //   return basePrice * (1 + it) / 100
                  // })
              }
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    }
  }
}
</script>

<style scoped lang="less">
  .container {
    overflow: hidden;
    padding: 20px 5px;
    background-color: #333;
    min-height: 100%;
    color: #fff;
    button {
      background: #ccc
    }
  }

</style>
