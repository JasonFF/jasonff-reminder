<template>
<div style="height: 100%">
  <router-link to="/zb" class="navigation"></router-link>
  <div style="height: 50%" id="btcTrending">
  </div>
  <div style="height: 50%" id="usdTrending"></div>
</div>
</template>
<script>
export default {
  name: 'BtcTrending',
  mounted() {
      const jsScript1 = document.createElement('script')
      jsScript1.type="text/javascript"
      jsScript1.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
      jsScript1.innerHTML = `{
        "width": "100%",
        "height": "100%",
        "symbol": "COINBASE:BTCUSD",
        "locale": "en",
        "interval": "4h"
      }`
      document.getElementById('btcTrending').appendChild(jsScript1)
      const jsScript2 = document.createElement('script')
      jsScript2.type="text/javascript"
      jsScript2.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
      jsScript2.innerHTML = `{
        "width": "100%",
        "height": "100%",
        "symbol": "FX_IDC:USDCNY",
        "locale": "en",
        "interval": "4h"
      }`
      document.getElementById('usdTrending').appendChild(jsScript2)
  }
}
</script>
<style lang="less" scoped>
.navigation {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
    background-color: #ddd;
  }

</style>
