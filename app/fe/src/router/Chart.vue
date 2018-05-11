<template>
  <div>
    btcChart
    <div style="width: 500px;height: 300px" id="usdt2"></div>
    <div style="width: 500px;height: 300px" id="usdt1"></div>
    
    <div style="width: 500px;height: 300px" id="btc"></div>
  </div>
</template>
<script>
  import axios from 'axios'
  const baseUrl = 'http://www.abichi.club'
  import echarts from 'echarts'
  import moment from 'moment'

  export default {
    name: 'BtcChart',
    data() {
      return {
        size: 100,
        btc_usdt_amount: 0,
        btc_qc_amount: 0
      }
    },
    created() {
      Promise.all([this.getUsdtKLine(), this.getBtcKLine()]).then(res => {
        const usdtData = res[0].data.data
        const btcData = res[1].data.data
        let usdtAmount = []
        let timeX = []
        let usdt = []
        let btc = []
        btcData.forEach(it => {
          btc.push(it[4])
        })
        usdtData.forEach((it, index) => {
          timeX.push(moment(it[0]).format('MM-DD HH:mm:ss'))
          usdt.push(it[4])
          const price = it[4]/1 - 6.51
          if (index == 0) {
            usdtAmount.push(price)
          } else {
            usdtAmount.push(usdtAmount[index-1]+price)
          }
        })
        this.getChart(usdtAmount, timeX, 'usdt1')
        this.getChart(usdt, timeX, 'usdt2')
        this.getChart(btc, timeX, 'btc')
      })
      
      
    },
    methods: {
      getChart(data, time,container) {
        var myChart = echarts.init(document.getElementById(container));
        const option = {
            xAxis: {
                type: 'category',
                data: time
            },
            yAxis: {
                type: 'value',
                min: 'dataMin',
                max: 'dataMax'
            },
            series: [{
                data,
                type: 'line'
            }]
        };
        myChart.setOption(option);

      },
      getBtcKLine() {
        return axios(`${baseUrl}/zbapi/data/v1/kline`, {
          params: {
            market: 'btc_qc',
            type: '1day',

          }
        })
      },
      getUsdtKLine() {
        return axios(`${baseUrl}/zbapi/data/v1/kline`, {
          params: {
            market: 'usdt_qc',
            type: '1day',
          }
        })
      }
    }
  }

</script>
