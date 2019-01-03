<template>
  <div class="container">
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px">

    </div>
    
  </div>
</template>
<script>
import {MACD, KDJ, BOLL, RSI, MA} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
import BETDATA from './BETDATA'
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
  filters: {
  },
  data() {
    return {
      betData: (() => {
        let dataList = []

        for (let i = 0; i < 100; i++) {
          dataList = dataList.concat(BETDATA[`$${i+1}`])
        }
        dataList = dataList.reverse()
        return dataList.map(it => {
          if (it.maxRate > 10000) {
            it.maxRate = 10000
          }
          return it
        }).slice(1950,1980)
      })()
    }
  },
  mounted() {
    this.initChart(this.betData)
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
              data: data.map((it, index) => index)
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
                  data: data.map(it => it.maxRate)
              },
              {
                  name:'barSum',
                  type:'line',
                  yAxisIndex:1,
                  data: this.getIndicator(data.map(it => it.maxRate))
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    getIndicator(list) {
      // const result = KDJ(list.map((it, index)=>[it,it,it])).k
      const result = MACD(list).diffs
      // const result = RSI(list).rsi6
      // const result = BOLL(list).mid
      // const result = MA(list, 20)
      return result
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
