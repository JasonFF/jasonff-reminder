<template>
  <div style="padding: 0 10%">
    btcChart
    <div style="width: 100%;height: 900px" id="usdt"></div>
    <!-- {{avg}}
    <div style="width: 100%;height: 300px" id="usdt1"></div>
    <div style="width: 100%;height: 300px" id="btc"></div> -->
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
        btc_qc_amount: 0,
        avg: 0,
        mid: 0
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
        let minUsdt = 10000
        let maxUsdt = 0
        let usdtAmountMid = []
        let usdtDataTotalPrice = 0
        usdtData.forEach(it => {
          usdtDataTotalPrice += it[4] / 1
        })
        this.avg = usdtDataTotalPrice / usdtData.length
        btcData.forEach(it => {
          btc.push(it[4])
        })
        usdtData.forEach((it, index) => {
          timeX.push(moment(it[0]).format('MM-DD HH:mm:ss'))
          usdt.push(it[4])
          const price = it[4] / 1 - this.avg
          if (index == 0) {
            usdtAmount.push(price)
          } else {
            usdtAmount.push(usdtAmount[index - 1] * 1 + price)
          }
        })
        this.getChart([usdt, usdtAmount, btc], timeX, 'usdt')
        // this.getChart(usdt, timeX, 'usdt2')
        // this.getChart(btc, timeX, 'btc')
      })


    },
    methods: {
      getChart(data, timeX,container) {
        var myChart = echarts.init(document.getElementById(container));
        
const option = {
    title: {
        text: 'btc usdt',
        x: 'center',
        y: 0
    },
    dataZoom: [
            {
                id: 'dataZoomX',
                type: 'slider',
                xAxisIndex: [0, 1, 2],
                filterMode: 'filter',
                start: 0,
                end: 100,
                zoomLock: false,
            }, {
                type: 'inside',
            },
        ],
    tooltip : {
        trigger: 'axis',
        axisPointer: {
            animation: false,
        },
    },
    grid: [
        {x: '7%', y: '7%', width: '85%', height: '20%'},
        {x: '7%', y: '32%', width: '85%', height: '30%'},
        {x: '7%', y: '67%', width: '85%', height: '25%'}
    ],
    xAxis: [
        {
          gridIndex: 0,
          data: timeX
        },
        {gridIndex: 1,data: timeX},
        {gridIndex: 2,data: timeX},
    ],
    yAxis: [
        {gridIndex: 0, min: 'dataMin', max: 'dataMax'},
        {gridIndex: 1, min: 'dataMin', max: 'dataMax'},
        {gridIndex: 2, min: 'dataMin', max: 'dataMax'},
    ],
    series: [
        {
            name: 'pnl',
            type: 'line',
            xAxisIndex: 0,
            yAxisIndex: 0,
            showSymbol: false,
            hoverAnimation: false,
            data: data[0]
        },
        {
            name: 'commission',
            type: 'line',
            xAxisIndex: 1,
            yAxisIndex: 1,
            showSymbol: false,
            hoverAnimation: false,
            data: data[1]
        },
        {
            name: 'net pnl',
            type: 'line',
            xAxisIndex: 2,
            yAxisIndex: 2,
            showSymbol: false,
            hoverAnimation: false,
            data: data[2]
        },
        
    ]
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
