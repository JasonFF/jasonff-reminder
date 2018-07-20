<template>
  <div style="padding: 30px">
    <Row :gutter='16'>
      <Col style="margin-bottom: 10px" span="6" v-for="item in buttonIntervals" :key="item">
        <Button @click="getKline(item)" long>{{item}}</Button>
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

function calculateMA(dayCount, data) {
          var result = [];
          for (var i = 0, len = data.length; i < len; i++) {
              if (i < dayCount) {
                  result.push('-');
                  continue;
              }
              var sum = 0;
              for (var j = 0; j < dayCount; j++) {
                  sum += data[i - j][1]/1;
              }
              result.push((sum / dayCount).toFixed(2));
          }
          return result;
      }

export default {
  name: 'AverageChart',
  data() {
    return {
      klineData: [],
      buttonIntervals: [
        '1m',
        '3m',
        '5m',
        '15m',
        '30m',
        '1h',
        '2h',
        '4h',
        '6h',
        '8h',
        '12h',
        '1d',
      ]
    }
  },
  methods: {
    initKline1() {
      const data = this.klineData
      const time = data.map(it => {
        return moment(it[0]).format('MM-DD HH:mm')
      })
      
      var dataMA5 = calculateMA(5, data);
      var dataMA10 = calculateMA(10, data);
      var dataMA20 = calculateMA(20, data);
      const dataMA5_MA10 = dataMA5.map((it, index) => {
        return (it - dataMA10[index]).toFixed(2)
      })
      const dataMA5_MA20 = dataMA5.map((it, index) => {
        return (it - dataMA20[index]).toFixed(2)
      })
      const dataMA10_MA20 = dataMA10.map((it, index) => {
        return (it - dataMA20[index]).toFixed(2)
      })
      const option = {
          title: {
              text: '均线'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['MA5','MA10','MA20']
          },
          grid: {
              left: '3%',
              right: '4%',
              bottom: '3%',
              containLabel: true
          },
          toolbox: {
              feature: {
                  saveAsImage: {}
              }
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
          yAxis: {
              type: 'value'
          },
          series: [
            
              {
                  name:'MA5-MA10',
                  type:'line',
                  stack: 'value',
                  data: dataMA5_MA10
              },
              {
                  name:'MA5-MA20',
                  type:'line',
                  stack: 'value',
                  data: dataMA5_MA20
              },
              {
                  name:'MA10-MA20',
                  type:'line',
                  stack: 'value',
                  data: dataMA10_MA20
              }
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    getKline(interval) {
  //      [
  //   1499040000000,      // Open time
  //   "0.01634790",       // Open
  //   "0.80000000",       // High
  //   "0.01575800",       // Low
  //   "0.01577100",       // Close
  //   "148976.11427815",  // Volume
  //   1499644799999,      // Close time
  //   "2434.19055334",    // Quote asset volume
  //   308,                // Number of trades
  //   "1756.87402397",    // Taker buy base asset volume
  //   "28.46694368",      // Taker buy quote asset volume
  //   "17928899.62484339" // Ignore.
  // ]
  this.klineData = []
      this.$http('http://www.abichi.club/binanceapi/api/v1/klines', {
        params: {
          symbol: 'BTCUSDT',
          interval: interval,
          limit: 500
        }
      }).then(res => {
        this.klineData = res.data
        this.initKline1()
        console.log(res)
      })
    }
  }
}
</script>
