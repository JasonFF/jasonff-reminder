<template>
  <div>
    <Row :gutter='16'>
      <Col style="margin-bottom: 10px" span="6" v-for="item in buttonIntervals" :key="item">
        <Button @click="getKline(item)" long>{{item}}</Button>
      </Col>
    </Row>
    
  </div>
</template>
<script>
import {MACD} from '@/tools/indicator.js'
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
      },
      macd: {}
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
        this.macd = MACD(this.kline.map(it => it[4]))
        this.strategy1()
      })
    },
    strategy1() {
      let sellLevel = 0.01
      const buyDea = -0.00132
      let perBuy = 100
      let strategyData = {
        account: 10000,
        usdtAccount: 0,
        sellItems: []
      }
      this.kline.forEach((it, index, _arr) => {
        const price = it[4]
        const deas = this.macd.deas
        if (deas[index] < buyDea) {
          if ((strategyData.account - it[4] * perBuy)>0) {
            strategyData.account = strategyData.account - it[4] * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
            strategyData.sellItems.push(it[4] + sellLevel)
          }
        }
        strategyData.sellItems.forEach((sellItem, sellIndex) => {
          if (strategyData.usdtAccount - perBuy < 0) {
            return
          }
          if (sellItem == 999999) {
            return
          }
          if (sellItem < price ) {
            strategyData.account = strategyData.account + sellItem * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount - perBuy
            strategyData.sellItems[sellIndex] = 999999
          }
        })
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.85).toFixed(2)
      console.log(strategyData)
    },
    strategy2() {
      let sellLevel = 0.0005
      const buyDea = -0.0001
      const sellDea = 0.0001
      let perBuy = 100
      let strategyData = {
        account: 10000,
        usdtAccount: 0,
        sellItems: []
      }
      let perBuyDea = null
      let buyFinish = false
      let sellFinish = false
      let perSellDea = null
      this.kline.forEach((it, index, _arr) => {
        const price = it[4]
        const deas = this.macd.deas
        const nowDea = deas[index]
        if (nowDea < buyDea && !buyFinish) {
          sellFinish = false
          if (perBuyDea == null) {
            return perBuyDea = nowDea
          }
          if (perBuyDea < nowDea) {
            if ((strategyData.account - it[4] * perBuy)>0) {
              strategyData.account = strategyData.account - it[4] * perBuy
              strategyData.usdtAccount = strategyData.usdtAccount + perBuy
              buyFinish = true
              // strategyData.sellItems.push(it[4] + sellLevel)
            }
            
            perBuyDea = null
          } else {
            perBuyDea = nowDea
          }
        } else {
          perBuyDea = null
        }
        if (nowDea > sellDea && !sellFinish) {
          buyFinish = false
          if (perSellDea == null) {
            return perSellDea = nowDea
          }
          if (perSellDea > nowDea) {
            if ((strategyData.usdtAccount - perBuy) > 0) {
              strategyData.account = strategyData.account + it[4] * perBuy
              strategyData.usdtAccount = strategyData.usdtAccount - perBuy
              sellFinish = true
            }
            perSellDea = null
          } else {
            perSellDea = nowDea
          }
        } else {
          perSellDea = null
        }
        // strategyData.sellItems.forEach((sellItem, sellIndex) => {
        //   if (strategyData.usdtAccount - perBuy < 0) {
        //     return
        //   }
        //   if (deas[index] > sellDea ) {
            // strategyData.account = strategyData.account + it[4] * perBuy
            // strategyData.usdtAccount = strategyData.usdtAccount - perBuy
            // strategyData.sellItems[sellIndex] = 999999
        //   }
        // })
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.85).toFixed(2)
      console.log(strategyData)
    }
  }
}
</script>
