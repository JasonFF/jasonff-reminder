<template>
  <div class="container">
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>

<script>
import {RSI, MACD, OBV2, MA, OBV} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
import _ from 'lodash'
import stockList from './stock.json'
export default {
  data() {
    return {
      kline: {},
    }
  },
  mounted() {
    this.getKline().then(res => {
      this.initChart()
    })
  },
  methods: {
    getATR() {
      let topRange = 0
      return this.kline.c.map((it, index) => {
        let range = this.kline.h[index] - this.kline.l[index]
        if (topRange < range) {
          topRange = range
        }
        if (index < 300) {
          return 0
        }
        if (topRange == 0) {
          return 0
        }
        return range / topRange
      })
    },
    getKline() {
      return new Promise(resolve => {
        let kline = {
          o: [],
          c: [],
          h: [],
          l: [],
          v: [],
          t: []
        }
        stockList.map(it => {
          kline.t.push(moment(it[1]).unix())
          kline.o.push(it[2])
          kline.c.push(it[3])
          kline.h.push(it[4])
          kline.l.push(it[5])
          kline.v.push(it[8])
        })
        this.kline = kline
        resolve()
      })
    },
    getOBV2() {
      return OBV2(this.kline.o, this.kline.c, this.kline.h, this.kline.l, this.kline.v)
    },
    initChart(data) {
        const option = {
          title: {
              text: 'indicator'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['kline','indicator', 'atr'],
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
              start: 0,
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
                name: 'indicator',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                show: false,
                // max: _.max(data),
                // min: _.min(data),
            },
            {
                name: 'atr',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                // show: false,
                // max: _.max(data),
                // min: _.min(data),
            }
          ],
          series: [
              {
                  name:'kline',
                  type:'line',
                  yAxisIndex:0,
                  data: this.kline.c
              },
              {
                  name:'indicator',
                  type:'line',
                  yAxisIndex:1,
                  data: this.getOBV2()
              },
              {
                name:'atr',
                type:'line',
                yAxisIndex:2,
                color: "#ca8622",
                data: MA(this.getATR(), 200)
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
  }

</style>
