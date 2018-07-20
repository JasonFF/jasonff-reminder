<template>
  <div>
    AverageChart
  </div>
</template>
<script>
export default {
  name: 'AverageChart',
  created() {
    this.getKline()
  },
  methods: {
    getKline() {
      this.$http('https://api.binance.com/api/v1/klines', {
        params: {
          symbol: 'BTCUSDT',
          interval: '6h',
          limit: 1000
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>
