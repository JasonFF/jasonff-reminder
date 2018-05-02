<template>
  <div class="container">
    <table class="table-tiger">
      <thead>
        <tr>
          <th>
            coin
          </th>
          <th>
            price
          </th>
          <th>
            percent
          </th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <td>
            btc_bitcny
          </td>
          <td>
            {{btc_bitcny.close}}
          </td>
          <td>
            {{btc_bitcny|getPercent}} %
          </td>
        </tr>
        <tr>
          <td>
            tusd_btc
          </td>
          <td>
            {{tusd_btc.close}}
          </td>
          <td>
            {{tusd_btc|getPercent}} %
          </td>
        </tr>
        <tr>
          <td>
            btc_tusd
          </td>
          <td>
            {{btc_tusd.close|getFixed}}
          </td>
          <td>
            {{btc_tusd|getPercent}} %
          </td>
        </tr>
        <tr>
          <td>
            btc_tusd_cny
          </td>
          <td>
            {{btc_tusd_cny.close|getFixed}}
          </td>
          <td>
            {{btc_tusd_cny|getPercent}} %
          </td>
        </tr>
      </tbody>
    </table>
    <div>
      bitcny price: 
    </div>
  </div>
</template>
<script>
import axios from 'axios'
import jsonp from 'jsonp'
const baseUrl = 'http://www.abichi.club'

function getFixed(val) {
  if (!val) {
    return ''
  }
  return val.toFixed(3)
}

export default {
  name: 'Tiger',
  created() {
    this.get_btc_bitcny()
    this.get_tusd_btc()
    this.getHL()
    this.get_bitcny_price()
  },
  filters: {
    getPercent(coinObj) {
      const open = coinObj.open
      const close = coinObj.close
      return getFixed((close - open) / open * 100)
    },
    getFixed
  },
  data() {
    return {
      btc_bitcny: {},
      tusd_btc: {},
      btc_tusd: {},
      hlPrice: ''
    }
  },
  computed: {
    btc_tusd_cny() {
      if (!this.hlPrice||!this.btc_tusd.open) {
        return {}
      }
      return {
        open: this.hlPrice*this.btc_tusd.open,
        close: this.hlPrice*this.btc_tusd.close
      }
    }
  },
  methods: {
    get_bitcny_price() {
      axios(`${baseUrl}/tigerapi/exchange/api/ctc/config?`).then(res => {
        console.log(res)
      })
    },
    get_btc_tusd(tusd_btc) {
      const open = 1 / tusd_btc.open
      const close = 1 / tusd_btc.close
      return {
        open,
        close
      }
    },
    getHL() {
      jsonp("https://api.money.126.net/data/feed/FX_USDCNY", null, (err, data) => {
        this.hlPrice = data.FX_USDCNY.price
      })
    },
    get_btc_bitcny() {
      axios(`${baseUrl}/tigerapi/exchange/trading/api/market/detail`, {
        params: {
          api_key: 'fbe68a0e-cfed-4afc-b98c-699d937ba7fd',
          symbol: 'btcbitcny'
        }
      }).then(res => {
        this.btc_bitcny = res.data.data.trade_ticker_data.tick
      })
    },
    get_tusd_btc() {
      axios(`${baseUrl}/tigerapi/exchange/trading/api/market/detail`, {
        params: {
          api_key: 'fbe68a0e-cfed-4afc-b98c-699d937ba7fd',
          symbol: 'tusdbtc'
        }
      }).then(res => {
        this.tusd_btc = res.data.data.trade_ticker_data.tick
        this.btc_tusd = this.get_btc_tusd(this.tusd_btc) 
      })
    }
  }
}
</script>
<style lang="less">
.container {
  min-height: 100%;
  background: #333;
  color: #fff;
  padding: 20px 30px;
}
.table-tiger {
  width: 100%;
  text-align: center;
  th {
    padding: 10px 5px;
    font-weight: bold
  }
  td {
    padding: 10px 5px;
  }
}
</style>

