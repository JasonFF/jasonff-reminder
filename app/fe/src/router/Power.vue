<template>
  <div class="container">
    <Row :gutter='16' style="padding: 0 20px;">
      <Col style="margin-bottom: 10px" span="8" v-for="item in buttonMarkets" :key="item">
        <Button :class="{active: item == market}" @click="chooseBtn(item)" long>{{item}}</Button>
      </Col>
    </Row>
    <Row :gutter="16" style="text-align: center">
      <Col span="12" offset="6">
        <Input v-model="weekNum"></Input>
      </Col>
    </Row>
    <router-link to="/zb" class="navigation"></router-link>
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
    <h1 style="text-align: center">{{requestTime}}</h1>
    <div id="kline2" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>

<script>
import {RSI, MACD, OBV2, MA, OBV, OBV3} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      kline: {},
      market: '',
      weekNum: 5,
      requestTime: '',
      time: '月',
      type: '1',
      buttonMarkets: [
        'XBTUSD', "ETHUSD"
      ],
      zj: {
        topVol: 0,
        totalVol: 0,
        percent: 0
      }
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      const storeWeekNum = window.localStorage.getItem('weekNum')
      if (storeWeekNum) {
        this.weekNum = storeWeekNum
      }
    },
    parseData(timearr) {
      return this.getKline(timearr).then(res => {
        this.kline = res
        // console.log(rsi)
        let totalResult = 0
        let totalList = this.kline.c.map((it, index) => {
          let vol = res.v[index]
          if (res.c[index] == res.o[index]) {
            totalResult += 0
          } else {
            totalResult += ( vol * res.c[index] *((res.c[index] - res.o[index]) > 0?1:-1))
          }
           
          return totalResult
        })
        let resultData = totalList
        this.initChart(resultData)
      })
    },
    chooseBtn(item) {
      this.market = item
      let time = this.time
      if (time == '日') {
        this.parseData([0, 1])
        return
      }
      if (time == '周') {
        this.parseData([0, 7])
        return
      }
      if (time == '月') {
        window.localStorage.setItem('weekNum', this.weekNum)
        this.getKlineByTime()
      }
    },
    getKlineByTime() {
      this.requestTime = 0
      const weekNum = this.weekNum
      let numList = []
      for (let i = weekNum; i > 0; i--) {
        numList.push(i)
      }
      return Promise.all(numList.map((it, index) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(this.getKline([(it - 1) * 7, it * 7]).then((res) => {
              this.requestTime ++ 
              return res
            }))
          }, (1000 * index));
        })
      })).then(res => {
        let result = res[0]
        console.log(res)
        res.forEach(it => {
          result.c = result.c.concat(it.c)
          result.h = result.h.concat(it.h)
          result.l = result.l.concat(it.l)
          result.o = result.o.concat(it.o)
          result.t = result.t.concat(it.t)
          result.v = result.v.concat(it.v)
        })
        return result
      }).then(res => {
        this.kline = res
        this.initChart()
        this.initStressChart()
      })
    },
    
    getKline(timearr=[0, 7]) {
      return this.$http({
        url: 'http://13.230.68.110/bitmexapi/api/udf/history', 
        params: {
          symbol: this.market,
          resolution: this.type,
          from: moment().subtract(timearr[1], 'days').unix(),
          to: moment().subtract(timearr[0], 'days').unix()
        }
      }).then(res => res.data).then(res => {
        // window.localStorage.setItem('kline', JSON.stringify(res))
        return res
      })
    },
    getOBV2() {
      return OBV2(this.kline.o, this.kline.c, this.kline.h, this.kline.l, this.kline.v)
    },
    initChart() {
      const time = this.kline.t.filter((it, index) => {
        return index % (2 * this.weekNum) == 0
      })
      const kline = this.kline.c.filter((it, index) => {
        return index % (2 * this.weekNum) == 0
      })
      const obv2 = this.getOBV2().filter((it, index) => {
        return index % (2 * this.weekNum) == 0
      })
        const option = {
          title: {
              text: 'indicator'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['kline','indicator', 'indicatorPrice'],
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
              data: time.map(it => moment(it*1000).format('MM-DD HH:mm:ss'))
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
          ],
          series: [
              {
                  name:'kline',
                  type:'line',
                  yAxisIndex:0,
                  data: kline
              },
              {
                  name:'indicator',
                  type:'line',
                  yAxisIndex:1,
                  data: obv2
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
    initStressChart() {
      const time = this.kline.t.filter((it, index) => {
        return index % (2 * this.weekNum) == 0
      })
      let xRange = []
      let yValue = []
      let xRangeObj = {}
      
      this.kline.c.forEach((it,index) => {
        if (xRangeObj[`$${parseInt(it)}`]) {
          xRangeObj[`$${parseInt(it)}`] = xRangeObj[`$${parseInt(it)}`] + this.kline.v[index]
        } else {
          xRangeObj[`$${parseInt(it)}`] = this.kline.v[index]
        }
      })
      let xRangeObjList = Object.keys(xRangeObj).map(key => {
        return {
          price: key.replace('$', ''),
          vol: xRangeObj[key]
        }
      }).sort((a,b) => {
        return a.price - b.price
      }).forEach(it => {
        xRange.push(it.price)
        yValue.push(it.vol)
      })
        const option = {
          title: {
              text: 'stress'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['vol'],
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
              data: xRange
          },
          yAxis: [
            {
              name: 'vol',
              type: 'value',
              max: 'dataMax',
              min: 'dataMin',
              // max: _.max(this.kline.c),
              // min: _.min(this.kline.c),
            },
          ],
          series: [
              {
                  name:'vol',
                  type:'line',
                  yAxisIndex:0,
                  data: yValue
              }
          ]
      };
      const kline2 = echarts.init(document.getElementById('kline2'));
      kline2.setOption(option);
    }
  }
}
</script>

<style scoped lang="less">
.navigation {
    position: absolute;
    right: 20px;
    top: 10px;
    width: 50px;
    height: 50px;
    background-color: #ddd;
  }
  .container {
    overflow: hidden;
    padding: 50px 5px;
    background-color: #333;
    min-height: 100%;
    color: #fff;
    button {
      background: #ccc
    }
  }

</style>
