<template>
<div style="height: 100%">
  <router-link to="/zb" class="navigation"></router-link>
  <div style="height: 100%" id="btcTrending">
  </div>
</div>
</template>
<script>
export default {
  name: 'BtcTrending',
  mounted() {
    
      const jsScript = document.createElement('script')
      jsScript.type="text/javascript"
      jsScript.src = "https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js"
      jsScript.innerHTML = `{
        "width": "100%",
        "height": "100%",
        "symbol": "COINBASE:BTCUSD",
        "locale": "en",
        "interval": "4h"
      }`
    document.getElementById('btcTrending').appendChild(jsScript)
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
