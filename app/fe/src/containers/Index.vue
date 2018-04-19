<template>
  <div id="index">
    <header class="px-5 py-2 grey darken-3">
      <h1 class="grey lighten-5 px-3" style="display: inline">A.BI.CHI</h1>
    </header>
    <div id="chart1" style="width: 100%;height: 1000px"></div>
    <div style="padding: 30px 0;">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">BTC-USDT</h3>
                <div>Located two hours south of Sydney in the
                  <br>Southern Highlands of New South Wales, ...</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">update</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
  import axios from '@/axios'
  import echarts from 'echarts'
  import moment from 'moment'
  export default {
    name: 'Index',
    mounted() {
      // this.getDeepMarket()
      this.getKline().then(res => {
        const myChart = echarts.init(document.getElementById('chart1'))
        let timeData = res.map(it => moment(it.id*1000).format('MM-DD hh:mm'))
        let qsData = res.map(it => it.qs)
        let zfData = res.map(it => it.zf)
        let zfqsData = res.map(it => it.zf/it.qs)
        var option = {
          tooltip: {
            trigger: 'axis',
            axisPointer: {
              animation: false
            },

            // formatter: function (a) {
            //     return (
            //         a[0]['axisValueLabel'] + "<br>" +
            //         '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[0]['color'] + '"></span>' +
            //         a[0]['seriesName'] + ': ' + a[0]['value'] + 'value' + "<br>" +
            //         '<span style="display: inline-block; margin-right: 5px; border-radius: 10px; width: 9px; height: 9px; background-color: ' + a[1]['color'] + '"></span>' +
            //         a[1]['seriesName'] + ': ' + a[1]['value'] + '万小时'
            //     );
            // }
          },
          color: ['#fbad0b', '#0696ff', '#4ecb73'],
          axisPointer: {
            link: {
              xAxisIndex: 'all'
            }
          },
          legend: {
            show: true,
            data: ['qs', 'zf', 'zfqs']
          },
          grid: [{
            left: '9%',
            right: '4%',
            top: '30',
            height: '160',
          }, {
            left: '9%',
            right: '4%',
            top: '240',
            height: '160',
          }, {
            left: '9%',
            right: '4%',
            top: '450',
            height: '160',
          }, ],
          dataZoom: [{
            type: 'slider',
            // top: baseTop + gridHeight * 4 + 20,
            xAxisIndex: [0, 1, 2]
          }],
          xAxis: [{
              type: 'category',
              boundaryGap: true,
              axisLine: {
                onZero: true,
                lineStyle: {
                  color: '#888888'
                }
              },
              data: timeData,
              axisLabel: {
                textStyle: {
                  color: '#888888',
                  fontSize: '10'
                },
              },

            },
            {
              gridIndex: 1,
              type: 'category',
              boundaryGap: true,
              axisLine: {
                onZero: true,
                lineStyle: {
                  color: '#888888'
                }
              },
              data: timeData,

            },
            {
              gridIndex: 2,
              type: 'category',
              boundaryGap: true,
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#888888'
                }
              },
              data: timeData,
              axisLabel: {
                textStyle: {
                  color: '#888888',
                  fontSize: '10'
                },
              },
            }
          ],
          yAxis: [{
              name: '',
              type: 'value',
              nameTextStyle: {
                color: '#888888',
                fontSize: 10
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#e6e6e6'
                }
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#888888'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#888888',
                  fontSize: '10'
                },
              },
            },
            {
              gridIndex: 1,
              name: '',
              type: 'value',
              nameTextStyle: {
                color: '#888888',
                fontSize: 10
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#888888'
                }
              },
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#e6e6e6'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#888888',
                  fontSize: '10'
                },
              },
            },
            {
              gridIndex: 2,
              name: '',
              type: 'value',
              nameTextStyle: {
                color: '#888888',
                fontSize: 10
              },
              inverse: false,
              splitLine: {
                lineStyle: {
                  type: 'dashed',
                  color: '#e6e6e6'
                }
              },
              axisLine: {
                onZero: false,
                lineStyle: {
                  color: '#888888'
                }
              },
              axisLabel: {
                textStyle: {
                  color: '#888888',
                  fontSize: '10'
                },
              },
            }
          ],
          series: [{
              name: '单位量带动的涨幅',
              type: 'line',
              data: qsData,
            },
            {
              name: '涨幅',
              type: 'line',
              xAxisIndex: 1,
              yAxisIndex: 1,
              data: zfData,

            },
            {
              name: 'zfqs',
              type: 'line',
              xAxisIndex: 2,
              yAxisIndex: 2,
              data: zfqsData,
            }
          ]
        };
        myChart.setOption(option);
      })
    },
    methods: {
      getDeepMarket() {
        axios('/hbapi/market/depth', {
          params: {
            symbol: 'btcusdt',
            type: 'step0',
            
          }
        }).then(res => {
          console.log(res)
        })
      },
      getKline() {
        return axios('/hbapi/market/history/kline', {
          params: {
            symbol: 'eosusdt',
            period: '60min',
            size: 100
          }
        }).then(res => {
          let qs = res.data.data.map(it => {
            return {
              ...it,
              qs: ((it.close - it.open) / it.amount) ,
              zf: (it.close - it.open).toFixed(3) / 1
            }
          })

          console.log(qs)
          return qs.reverse()
        })
      }
    }
  }

</script>
