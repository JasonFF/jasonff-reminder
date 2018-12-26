const axios = require('axios')
const moment = require('moment')

axios({
  url: 'https://www.bitmex.com/api/udf/history', 
        params: {
          symbol: 'XBTUSD',
          resolution: 5,
          from: moment().subtract(14, 'days').unix(),
          to: moment().unix()
        }
}).then(res => {
  console.log(res)
})