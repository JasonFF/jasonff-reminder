<template>
  <div>
    <Row :gutter="16">
      <Col v-for="item in markets" span="6" :key="item">
        <Button long @click="getKlineParse(item)">{{item}}</Button>
      </Col>
    </Row>
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
import indicator from '@/tools/indicator.js'
import moment from 'moment'
  export default {
    name: 'OtherPriceParse',
    data() {
      return {
        markets: [
          'btc', 'eth', 'eos'
        ]
      }
    },
    methods: {
      getKline(market, index) {
        // 1417536000000, 时间戳
        // 2370.16, 开
        // 2380, 高
        // 2352, 低
        // 2367.37, 收
        // 17259.83 交易量
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            this.$http('http://13.230.68.110/zbapi/data/v1/kline', {
              params: {
                market: market,
                type: '5min',
                size: 1000
              }
            }).then(res => {
              resolve(res.data.data)
            })
          }, 1000 * index)
        }) 
      },
      getKlineParse(market) {
        Promise.all([this.getKline(`${market}_qc`, 0), this.getKline(`${market}_usdt`, 1), this.getKline('usdt_qc', 2)]).then(res => {
          const qcList = res[0]
          const usdtList = res[1]
          const usdtqc = res[2]
          let diffList = qcList.map((it,index) => {
            return (usdtqc[index][4] - (it[4]/usdtList[index][4])).toFixed(4)/1
          })
          let maList = indicator.MACD(diffList)
          console.log(diffList, maList)
          let barSum = 0
          this.initChart(usdtqc, maList.bars.map(it => {
            barSum += it
            return barSum.toFixed(4)
          }))
        })
        
      },
      initChart(priceList, diffList) {
        const timeList = priceList.map(it => moment(it[0]).format('MM-DD HH:mm:ss'))
        const option = {
          title: {
            text: '均线'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data: ['kline', 'barSum']
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
            data: timeList
          },
          yAxis: [{
              name: 'price',
              type: 'value',
              max: 'dataMax',
              min: 'dataMin'
            },
            {
              name: 'diff',
              max: 'dataMax',
              min: 'dataMin',
              type: 'value',
            },
          ],
          series: [
            {
              name: 'price',
              type: 'line',
              data: priceList.map(it => it[4])
            },
            {
              name: 'barSum',
              type: 'line',
              yAxisIndex: 1,
              data: diffList
            },
          ]
        };
        const kline1 = echarts.init(document.getElementById('kline1'));
        kline1.setOption(option);
      },
    }
  }
</script>
