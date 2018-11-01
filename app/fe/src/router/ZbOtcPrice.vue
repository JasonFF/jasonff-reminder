<template>
  <div>
    <Row>
      <Upload style="width: 100%;" :beforeUpload="beforeUpload" action="//jsonplaceholder.typicode.com/posts/">
        <Button long icon="ios-cloud-upload-outline">upload</Button>
      </Upload>
    </Row>
    <div id="kline1" style="height: 500px;width: 100%;background:#ccc;margin-top: 10px"></div>
  </div>
</template>
<script>
import echarts from 'echarts'
  export default {
    name: 'ZbOtcPrice',
    data() {
      return {
        priceData: []
      }
    },
    methods: {
      initChart(data) {
        const timeList = [this.priceData[0][0], ...this.priceData.filter(it => !!it[1]).map(it => it[3])]
        const dataList = this.priceData.filter(it => !!it[1])
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
              name: 'kline',
              type: 'value',
              max: 'dataMax',
              min: 'dataMin'
            },
            // {
            //   name: 'barSum',
            //   max: 'dataMax',
            //   min: 'dataMin',
            //   type: 'value',
            // },
          ],
          series: [
            {
              name: 'min',
              type: 'line',
              data: dataList.map(it => it[0])
            },
            {
              name: 'max',
              type: 'line',
              data: dataList.map(it => it[1])
            },
            {
              name: 'price',
              type: 'line',
              data: dataList.map(it => it[2])
            },
            {
              name: 'mid',
              type: 'line',
              data: dataList.map(it => {
                const val = ((it[0]/1 + it[1]/1)/2).toFixed(3)
                console.log(val)
                return val/1
              })
            },
            // {
            //   name: 'barSum',
            //   type: 'line',
            //   yAxisIndex: 1,
            //   data: data
            // },
          ]
        };
        const kline1 = echarts.init(document.getElementById('kline1'));
        kline1.setOption(option);
      },
      beforeUpload(val) {
        var reader = new FileReader();
        reader.onload = (e) => {
          this.priceData = e.target.result.split('|').map(it => {
            return it.split(',')
          })
          this.initChart()
        };
        reader.readAsText(val);
        return false
      },
    }

  }

</script>
