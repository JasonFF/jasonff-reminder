<template>
  <div class="container">
    <Row :gutter='16' style="padding: 10px 20px 20px;margin-top: 10px">
      <Col style="margin-bottom: 10px" span="8" v-for="item in buttonMarkets" :key="item">
        <Button :class="{active: item == market}" @click="chooseBtn(item)" long>{{item}}</Button>
      </Col>
    </Row>
    <Row :gutter="16" style="text-align: center;margin-bottom: 10px">

      <Col span="12" >
        <RadioGroup size="large" v-model="time" type="button">
          <Radio label="日">日</Radio>
          <Radio label="周">周</Radio>
          <Radio label="月">月</Radio>
        </RadioGroup>
      </Col>

      <Col span="12">
        <RadioGroup size="large" v-model="type" type="button">
          <Radio label="1">1</Radio>
          <Radio label="5">5</Radio>
          <Radio label="60">60</Radio>
        </RadioGroup>
      </Col>
    </Row>
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
      kline: {},
      market: '',
      time: '周',
      type: '5',
      buttonMarkets: [
        'XBTUSD', "ETHUSD"
      ],
    }
  },
  mounted() {
    // this.parseData()
  },
  methods: {
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
        this.getKlineByTime()
      }
    },
    parseData(timearr) {
      return this.getKline(timearr).then(res => {
        this.kline = res
        // console.log(rsi)
        let totalResult = 0
        let totalList = this.kline.c.map((it, index) => {
          let vol = res.v[index]
          totalResult += ( vol * res.c[index] *((res.c[index] - res.o[index]) > 0?1:-1)) 
          return totalResult
        })
        let resultData = totalList
        this.initChart(resultData)
      })
    },
    getKlineByTime() {
      return Promise.all([4,3,2,1].map((it, index) => {
        return new Promise(resolve => {
          setTimeout(() => {
            resolve(this.getKline([(it - 1) * 7, it * 7]))
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
        // console.log(rsi)
        let totalResult = 0
        let totalList = this.kline.c.map((it, index) => {
          let vol = res.v[index]
          totalResult += ( vol * res.c[index] *((res.c[index] - res.o[index]) > 0?1:-1)) 
          return totalResult
        })
        let resultData = totalList
        this.initChart(resultData)
      })
    },
    getIndicator(kline, data) {
      const period = 12 / 5 * 60
      return data.map((it, index) => {
        if (index - period < 0) {
          return 0
        }
        let totalData = 0
        let totalKline = 0
        for (let i = 0; i < period; i++) {
          totalData += data[index - i]/1
          totalKline += kline[index - i]/1
        }
        return totalKline / (Math.abs(totalData) * kline[index - 1])
      })

    },
    getKline(timearr=[0, 7]) {
      // const storeKline = window.localStorage.getItem('kline')
      // if (storeKline) {
      //   return Promise.resolve(JSON.parse(storeKline))
      // }
      return this.$http({
        url: 'http://localhost:7001/bitmexapi/api/udf/history', 
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
    getPercent(list, index = 0) {
      let firstVal = list[index]
      return list.map(it => {
        return ((it - firstVal) / Math.abs(firstVal) * 100).toFixed(2)
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
              min: 'dataMin',
              // max: _.max(this.kline.c),
              // min: _.min(this.kline.c),
            },
            {
                name: 'indicator',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                // max: _.max(data),
                // min: _.min(data),
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
                  data: this.getPercent(data, data.length - 1)
                  // data: this.getPercent(data, data.length - 1).map((it, index) => {
                  //   let basePrice = this.kline.c[data.length - 1]
                  //   return basePrice * (1 + it) / 100
                  // })
              },
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
    },
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
    button {
      background: #ccc
    }
  }

</style>
