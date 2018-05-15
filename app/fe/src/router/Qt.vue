<template>
  <div>
    <input v-model="time" type="text">
    <button>get</button>
    qt
  </div>
</template>
<script>
import axios from 'axios'
  const baseUrl = 'http://www.abichi.club'
  import echarts from 'echarts'
  import moment from 'moment'
export default {
  name: 'Qt',
  created() {
    this.getUsdtKLine()
  },
  data() {
    return {
      time: null
    }
  },
  methods: {
    getUsdtKLine() {
        return axios(`${baseUrl}/zbapi/data/v1/kline`, {
          params: {
            market: 'usdt_qc',
            type: '1hour',
            since: this.time
          }
        })
      }
  }
}
</script>
