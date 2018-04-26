<template>
  <div>
    home
  </div>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://www.abichi.club'

export default {
  name: 'Home',
  created() {
    this.getZbData()
    this.getHbOtcData()
  },
  methods: {
    getZbData() {
      axios(`${baseUrl}/zbapi/ticket`,{
        params: {
          market: 'usdt_qc',
        }
      }).then(res => {
        console.log(res)
      })
    },
    getHbOtcData() {
      axios(`${baseUrl}/hbotcapi/`,{
        params: {
          coinId: 2,
          tradeType: 0,
          currentPage: 1,
          payWay: '',
          country: '',
          merchant: 1,
          online: 1,
          range: 0
        }
      }).then(res => {
        console.log(res)
      })
    }
  }
}
</script>

