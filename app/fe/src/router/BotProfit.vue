<template>
  <div>
    <Row :gutter='16'>
      <Col style="margin-bottom: 10px" span="6" v-for="item in buttonIntervals" :key="item">
        <Button @click="getKline(item)" long>{{item}}</Button>
      </Col>
    </Row>
    <div>
      account: {{strategy1Data.account}}
    </div>
    <div>
      usdtAccount: {{strategy1Data.usdtAccount}}
    </div>
    <div>
      ta: {{strategy1Data.account + strategy1Data.usdtAccount * 6.9}}
    </div>
  </div>
</template>
<script>
export default {
  name: 'BotProfit',
  data() {
    return {
      kline: [],
      buttonIntervals: [
        '1min',
        '3min',
        '5min',
        '15min',
        '30min',
        '1hour',
        '4hour',
        '6hour',
        '1day',
      ],
      strategy1Data: {
        account: 10000,
        usdtAccount: 0,
        sellItems: []
      }
    }
  },
  methods: {
    getKline(type) {
      //   1417536000000, 时间戳
// 2370.16, 开
// 2380, 高
// 2352, 低
// 2367.37, 收
// 17259.83 交易量
      this.$http('http://api.zb.cn/data/v1/kline', {
        params: {
          market: 'usdt_qc',
          type: type,
          size: 1000
        }
      }).then(res => {
        this.kline = res.data.data
        this.strategy1Data = {
          account: 10000,
          usdtAccount: 0,
          sellItems: []
        }
        this.strategy1()
      })
    },
    strategy1() {
      let exchange = 6.84
      let maxPriceLevel = 0.15
      function getBuyLevel(price) {
        return (price - exchange)/5
      }
      let sellLevel = 0.01
      let perBuy = 100
      this.kline.forEach((it, index, _arr) => {
        const price = it[4]
        const buyLevel = getBuyLevel(price)
        const preItem = _arr[index - 1]
        if (!preItem) {
          return
        }
        if (it[4] < preItem[4] - buyLevel) {
          this.strategy1Data.account = this.strategy1Data.account - it[4] * perBuy
          this.strategy1Data.usdtAccount = this.strategy1Data.usdtAccount + perBuy
          this.strategy1Data.sellItems.push(it[4] + sellLevel)
        }
        this.strategy1Data.sellItems.forEach((sellItem, sellIndex) => {
          if (sellItem < it[4]) {
            this.strategy1Data.account = this.strategy1Data.account + it[4] * perBuy
            this.strategy1Data.usdtAccount = this.strategy1Data.usdtAccount - perBuy
            this.strategy1Data.sellItems[sellIndex] = 999999
          }
        })
      })
      // console.log(this.strategy1Data.account, this.strategy1Data.usdtAccount)
    }
  }
}
</script>
