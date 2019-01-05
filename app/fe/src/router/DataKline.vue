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
import _ from 'lodash'
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
    function getRandomTrue() {
      
      return Math.floor(Math.random()*1000) < 495
    }
export default {
  filters: {
  },
  data() {
    return {
      betData: (() => {
        let dataList = []

        for (let i = 0; i < 100; i++) {
          dataList = dataList.concat(BETDATA[`$${i}`])
        }
        dataList = dataList.reverse()
        return dataList.map(it => {
          if (it.maxRate > 10000) {
            it.maxRate = 10000
          }
          return it
        })
      })()
    }
  },
  mounted() {
    
    let downCount = 0
    let resultArr = []
    for (let i = 0; i < 40000;i++) {
      let result = Math.floor(Math.random()*1000)
      // if (result>=990) {
      //   resultArr.push(downCount)
      // } else {
        if (result < 495) {
          downCount--
        } else {
          downCount++
        }
        resultArr.push(downCount)
      // }
      
    }
    // this.parseProfit(resultArr)
    // this.initChart(resultArr)
    this.initChart(this.getMidCount(this.betData.map(it => it.maxRate)))
    // this.initChart(this.betData.map(it => it.maxRate))
  },
  methods: {
    parseProfit(dataList) {
      let ma = BOLL(dataList, 500).mid
      let result = 0
      dataList.forEach((it, i) => {
        if (i <= 300 ) {
          return
        }
        if (it < ma[i]) {
          result = result + (dataList[i+1] - it)
        } else {
          // result--
        }
      })
      console.log(result)
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
                  // data
                  data
              },
              {
                  name:'barSum',
                  type:'line',
                  yAxisIndex:1,
                  data: this.getIndicator(data)
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    getIndicator(list) {
      // const result = KDJ(list.map((it, index)=>[it,it,it])).k
      // const result = MACD(list).deas
      // const result = RSI(list).rsi6
      const result = BOLL(list, 300).mid
      // const result = MA(list, 1)
      return result
    },
    getMidCount(list, period) {
      let downCount = 0
      let upCount = 0
      let result = []
      list.forEach((it, index) => {
        // if (it < 101) {
        //   result.push((downCount - upCount).toFixed(4))
        //   return
        // } 
        if (it < 200) {
          downCount++
        } else {
          upCount++
        }
        result.push((downCount - upCount).toFixed(4))
      })
      let total = 0
      result.forEach(it => {
        total = total + it/1
      })
      let average = total / result.length
      return result.map(it => (it - average).toFixed(1)/1)
    },
    downCount() {


      var config = {
         downCount: { label: 'downCount', value: 0, type: 'number' },
         calBet: { label: 'calBet', value: 1, type: 'number' },
      }
      var getMaxHighAndMinLow = function (ticks) {
        var maxHigh = ticks[0][0], minLow = ticks[0][1];
        for (var i = 0; i < ticks.length; i++) {
          var t = ticks[i], high = t[0], low = t[1];
          if (high > maxHigh) {
            maxHigh = high;
          }
          if (low < minLow) {
            minLow = low;
          }
        }
        return [maxHigh, minLow];
      };
      var kdj = function (ticks) {
        var nineDaysTicks = [], days = 9, rsvs = [];
        var ks = [], ds = [], js = [];
        var lastK, lastD, curK, curD;
        var maxAndMin, max, min;
        for (var i = 0; i < ticks.length; i++) {
          var t = ticks[i], close = t[2];
          nineDaysTicks.push(t);
          maxAndMin = getMaxHighAndMinLow(nineDaysTicks);
          max = maxAndMin[0];
          min = maxAndMin[1];
          if (max == min) {
            rsvs.push(0);
          } else {
            rsvs.push((close - min) / (max - min) * 100);
          }
          if (nineDaysTicks.length == days) {
            nineDaysTicks.shift();
          }
          if (i == 0) {
            lastK = lastD = rsvs[i];
          }
          curK = 2 / 3 * lastK + 1 / 3 * rsvs[i];
          ks.push(curK);
          lastK = curK;
    
          curD = 2 / 3 * lastD + 1 / 3 * curK;
          ds.push(curD);
          lastD = curD;
    
          js.push(3 * curK - 2 * curD);
        }
        return {"k": ks, "d": ds, "j": js};
      };
      function main () {
        var baseBet = 0.1
        var downCount = config.downCount.value
        var calBet = config.calBet.value
        var endPoint = undefined
        engine.on('GAME_STARTING', function () {
          log.info('starting: ' + downCount + ' cal: ' + calBet)


          if (downCount >= toStartPoint) {
            if (endPoint === undefined) {
              endPoint = toEndPoint
            }
          }
          if (endPoint !== undefined && downCount <= endPoint) {
            endPoint = undefined
            calBet = 1
          }

          if (endPoint !== undefined) {
            var toBet = parseInt(calBet)
            
            engine.bet(( toBet * baseBet).toFixed(5)/1, 2)
            .then(function (res){
              log.info('bet: ' + engine.getStatus());
            })
            .catch(function (err) {
              log.error('Bet fail');
            })
          }
          
          
        })

        engine.on('GAME_ENDED', function () {
          var history = engine.getHistory()
          var firstHistory = history[0]
          if (firstHistory.crash < 200) {
            downCount++
          } else {
            downCount--
          }
          log.info(firstHistory.crash + ' downCount: ' + downCount )
          if (endPoint !== undefined) {
            if (downCount >= 50) {
              calBet = 6
            }
            if (calBet >= 6) {
              if (downCount < 30) {
                calBet = 5
              }
              return
            }
            if (downCount >= 30) {
              calBet = 5
            }
            if (calBet >= 5) {
              if (downCount < 20) {
                calBet = 4
              }
              return
            }
            if (downCount >= 20) {
              calBet = 4
            }
            if (calBet >= 4) {
              if (downCount < 10) {
                calBet = 3
              }
              return
            }
            if (downCount >= 10) {
              calBet = 3
            }
            if (calBet >= 3) {
              if (downCount < 0) {
                calBet = 2
              }
              return
            }
            if (downCount >= 0) {
              calBet = 2
            }
            if (calBet >= 2) {
              if (downCount < -10) {
                calBet = 1
              }
              return
            }
            if (downCount >= -10) {
              calBet = 1
            }
            if (calBet >= 1) {
              return
            }
          }
        })
      }

    },
    getDataInChrome() {

      let resultData = {}
        for (let i = 0; i < 100; i++) {
            setTimeout(function(){
                  getData(i+1).then(res => {
                    resultData[`$${i}`] = res
                    window.localStorage.setItem('result', JSON.stringify(resultData))
                })
            }, 500 * i)
        }
        function getData(page) {
            return fetch('https://webapi.bc.game/crash/result/history/', {
                method: 'POST',
                headers: {
                  'content-type': 'application/json;charset=UTF-8'
                },
                body: `{"page":${page},"pageSize":20}`
            }).then(res => res.json()).then(res => res.data.list)
        }

    },
    getListInChrome() {
      let result = JSON.parse(window.localStorage.getItem('result'))
      let dataList = []
      for (let i = 0; i < 100; i++) {
        dataList = dataList.concat(result[`$${i}`])
      }
      dataList = dataList.reverse()
      
      let downCount = 0
      let upCount = 0
      let downCountList = []
      dataList.forEach((it, index) => {
        if (it.maxRate < 200) {
          downCount++
        } else {
          upCount++
        }
        downCountList.push((downCount - upCount).toFixed(4))
      })
      let totalCount = 0
      downCountList.forEach(it => {
        totalCount = totalCount + it/1
      })
      let perCount = totalCount / downCountList.length
      console.log(downCountList[downCountList.length -1], perCount, downCountList)
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
