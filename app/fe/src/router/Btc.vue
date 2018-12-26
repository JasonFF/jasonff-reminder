<template>
  <div>
    
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>

<script>
import {RSI, MACD} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      kline: {}
    }
  },
  mounted() {
    this.parseData()
  },
  methods: {
    parseData() {
      return this.getKline().then(res => {
        this.kline = res
        const rsi = RSI(res.c)
        const macd = MACD(res.c)
        // console.log(rsi)
        let totalResult = 0
        let rsiIndicator = rsi.rsi6
        let totalList = rsiIndicator.map((it, index) => {
          let inIt = it > 50 ? it : (100 - it)
          let vol = res.v[index]
          totalResult += ( vol * res.c[index] *((res.c[index] - res.o[index]) > 0?1:-1)) 
          return totalResult
        })
        let minTotal = _.min(totalList)
        let resultData = totalList.map((it, index) => {
          return it
        })
        
        this.initChart(resultData)
      })
    },
    getKline() {
      // const storeKline = window.localStorage.getItem('kline')
      // if (storeKline) {
      //   return Promise.resolve(JSON.parse(storeKline))
      // }
      return this.$http({
        url: 'http://www.abichi.club/bitmexapi/api/udf/history', 
        params: {
          symbol: 'XBTUSD',
          resolution: 5,
          from: moment().subtract(7, 'days').unix(),
          to: moment().unix()
        }
      }).then(res => res.data).then(res => {
        // window.localStorage.setItem('kline', JSON.stringify(res))
        return res
      })
    },
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
              data: this.kline.t.map(it => moment(it*1000).format('MM-DD HH:mm:ss'))
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
  }
}
</script>

<style>

</style>
