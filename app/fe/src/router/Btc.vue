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
    <Row :gutter="16" style="padding: 10px 20px 20px;margin-top: 20px">
      <Col span="8">
        <Button long @click="chooseOkEos">eos季度</Button>
      </Col>
      <Col span="8">
        <Button long @click="chooseOkXrp">xrp季度</Button>
      </Col>
    </Row>
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>

<script>
import {RSI, MACD, OBV} from '@/tools/indicator.js'
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
    chooseOkEos() {
      this.$http({
        url: 'http://13.230.68.110/okexapi/v2/futures/pc/market/klineData.do?symbol=f_usd_eos&type=5min&contractType=quarter&limit=10000&coinVol=1'
      }).then(res => {
        this.kline = {
          t: res.data.data.map(it => it[0]/1000),
          c: res.data.data.map(it => it[4]),
          v: res.data.data.map(it => it[5])
        }
        this.initChart()
      })
    },
    chooseOkXrp() {
      this.$http({
        url: 'http://13.230.68.110/okexapi/v2/futures/pc/market/klineData.do?symbol=f_usd_xrp&type=5min&contractType=quarter&limit=10000&coinVol=1'
      }).then(res => {
        this.kline = {
          t: res.data.data.map(it => it[0]/1000),
          c: res.data.data.map(it => it[4]),
          v: res.data.data.map(it => it[5])
        }
        this.initChart()
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
          totalResult += ( vol * res.c[index] *((res.c[index] - res.o[index]) >= 0?1:-1)) 
          return totalResult
        })
        let resultData = totalList
        this.initChart(resultData)
      })
    },
    getIndicator(obv) {
      let result = 0
      return obv.map((it, index) => {
        if (index == 0) {
          return 0
        }
        let indicator = this.kline.c[index] == this.kline.c[index -1] ? 0: (Math.abs(it - obv[index - 1]) / (this.kline.c[index] - this.kline.c[index - 1]))
        result = result + indicator
        return result
      })

    },
    getDK() {
      let d = 0
      let k = 0
      
     return this.kline.c.map((it,index, _arr) => {
        if (index > 0) {
          if (it > _arr[index - 1]) {
            d += this.kline.v[index]
          }
          if (it < _arr[index - 1]) {
            k += this.kline.v[index]
          }
        }
        if (d > 10 && k > 10) {
          return d / k
        }
        return 0
      })
    },
    getKline(timearr=[0, 7]) {
      // const storeKline = window.localStorage.getItem('kline')
      // if (storeKline) {
      //   return Promise.resolve(JSON.parse(storeKline))
      // }
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
    getPercent(list, index = 0) {
      let firstVal = list[index]
      return list.map(it => {
        return ((it - firstVal) / Math.abs(firstVal) * 100).toFixed(2)
      })
    },
    initChart(data) {
        const option = {
          title: {
              text: 'obv'
          },
          tooltip: {
              trigger: 'axis'
          },
          legend: {
              data:['kline','obv', 'indicator'],
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
                name: 'obv',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                show: false,
                // max: _.max(data),
                // min: _.min(data),
            },
            {
                name: 'indicator',
                max: 'dataMax',
                min: 'dataMin',
                type: 'value',
                show: false,
                // max: _.max(data),
                // min: _.min(data),
            }
          ],
          series: [
              {
                  name:'kline',
                  type:'line',
                  data: this.kline.c
              },
              {
                  name:'obv',
                  type:'line',
                  yAxisIndex:1,
                  color: '#228B22',
                  data: OBV(this.kline.c.map((it, index) => {return [it, this.kline.v[index]]}), this.kline.c.length-1)
                  // data: this.getPercent(data, data.length - 1)
                  // data: this.getPercent(data, data.length - 1).map((it, index) => {
                  //   let basePrice = this.kline.c[data.length - 1]
                  //   return basePrice * (1 + it) / 100
                  // })
              },
              // {
              //     name:'indicator',
              //     type:'line',
              //     yAxisIndex:2,
              //     color: '#483D8B',
              //     // data: this.getDK()
              //     // data: this.getIndicator(OBV(this.kline.c.map((it, index) => {return [it, this.kline.v[index]]})), this.kline.c.length-1)
              // },
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
    button {
      background: #ccc
    }
  }

</style>
