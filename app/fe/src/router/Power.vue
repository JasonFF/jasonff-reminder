<template>
  <div class="container">
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
    <Row :gutter='16' style="padding: 10px 20px;margin-top: 10px">
      <Col style="margin-bottom: 10px" span="8" v-for="item in buttonMarkets" :key="item">
        <Button :class="{active: item == market}" @click="chooseBtn(item)" long>{{item}}</Button>
      </Col>
    </Row>
    <Row :gutter="16" style="text-align: center">

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
    <Row :gutter="16" style="padding: 20px 20px 0">
      <Col span="8">
        <Button long @click="chooseOkEos">eos季度</Button>
      </Col>
      <Col span="8">
        <Button long @click="chooseOkXrp">xrp季度</Button>
      </Col>
    </Row>
    <h1 style="text-align: center">
      {{zj.topVol.toFixed(2)}} / {{zj.totalVol.toFixed(2)}} / {{zj.percent.toFixed(2)}}
    </h1>
    
  </div>
</template>

<script>
import {RSI, MACD, OBV2, MA, OBV} from '@/tools/indicator.js'
import echarts from 'echarts'
import moment from 'moment'
import _ from 'lodash'
export default {
  data() {
    return {
      kline: {},
      market: '',
      time: '周',
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
    // this.parseData()
  },
  methods: {
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
    chooseOkEos() {
      this.$http({
        url: 'http://www.abichi.club/okexapi/v2/futures/pc/market/klineData.do?symbol=f_usd_eos&type=1min&contractType=quarter&limit=10000&coinVol=1'
      }).then(res => {
        this.kline = {
          t: res.data.data.map(it => it[0]/1000),
          o: res.data.data.map(it => it[1]),
          h: res.data.data.map(it => it[2]),
          l: res.data.data.map(it => it[3]),
          c: res.data.data.map(it => it[4]),
          v: res.data.data.map(it => it[5])
        }
        this.initChart()
      })
    },
    chooseOkXrp() {
      this.$http({
        url: 'http://www.abichi.club/okexapi/v2/futures/pc/market/klineData.do?symbol=f_usd_xrp&type=1min&contractType=quarter&limit=10000&coinVol=1'
      }).then(res => {
        this.kline = {
          t: res.data.data.map(it => it[0]/1000),
          o: res.data.data.map(it => it[1]),
          h: res.data.data.map(it => it[2]),
          l: res.data.data.map(it => it[3]),
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
    getKlineByTime() {
      return Promise.all([6,5,4,3,2,1].map((it, index) => {
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
    getVolRank() {
      let vItemList = this.kline.v.map((it,index) => {
        return {
          v: it,
          index: index
        }
      })
      vItemList.sort((a,b) => {
        return b.v - a.v
      })
      // console.log(vItemList)
      let zVolTotal = 0
      let topTotal = 0
      const {h,l,o,c,v} = this.kline
      vItemList.forEach((it, index) => {

        let duokongrange = h[index] - l[index]

        if (duokongrange == 0) {
          zVolTotal = zVolTotal + 0
          topTotal = topTotal + 0
        } else {
          let duo = h[index] - o[index]
          let kong = o[index] - l[index]
          let duoPercent = duo / duokongrange
          let kongPercent = kong / duokongrange
          let totalVol = v[index]
          zVolTotal = zVolTotal + duoPercent * totalVol - kongPercent * totalVol
          if (index < vItemList.length / 5) {
            topTotal = topTotal + duoPercent * totalVol - kongPercent * totalVol
          }
        }
      })
      this.zj = {
        topVol: topTotal,
        totalVol: zVolTotal,
        percent: topTotal/zVolTotal
      }
      // console.log(topTotal, zVolTotal, topTotal/zVolTotal)
    },
    getKline(timearr=[0, 7]) {
      // const storeKline = window.localStorage.getItem('kline')
      // if (storeKline) {
      //   return Promise.resolve(JSON.parse(storeKline))
      // }
      return this.$http({
        url: 'http://www.abichi.club/bitmexapi/api/udf/history', 
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
    getOBV2() {
      return OBV2(this.kline.o, this.kline.c, this.kline.h, this.kline.l, this.kline.v)
    },
    // getRsiIndicator() {
    //   let {rsi6, rsi24} = RSI(this.kline.c)
      
    //   return this.kline.c.map((it, index) => {
    //     if (index == 0) {
    //       return 0
    //     }
    //     if (rsi6[index] < rsi24[index] && rsi6[index] < rsi6[index - 1] && rsi24[index] > 65) {
    //       return 1
    //     }
    //     if (rsi6[index] > rsi24[index] && rsi6[index] > rsi6[index - 1] && rsi24[index] < 35) {
    //       return -1
    //     }
    //     return 0
    //   })

    // },
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
                  yAxisIndex:0,
                  data: this.kline.c
              },
              {
                  name:'obv',
                  type:'line',
                  yAxisIndex:1,
                  data: this.getOBV2()
              },
              // {
              //   name:'indicator',
              //   type:'line',
              //   yAxisIndex:2,
              //   color: "#ca8622",
              //   data: this.getRsiIndicator()
              // }
          ]
      };
      const kline1 = echarts.init(document.getElementById('kline1'));
      kline1.setOption(option);
      this.getVolRank()
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
