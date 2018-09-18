<template>
  <div class="container">
    <router-link to="/zb" class="navigation"></router-link>
    <Row :gutter='16' style="padding: 30px 20px 20px;margin-top: 50px">
      <Col style="margin-bottom: 10px" span="8" v-for="item in buttonIntervals" :key="item">
        <Button @click="getKline(item)" long>{{item}}</Button>
      </Col>
    </Row>
    <div>
      <table class="mytable">
        <thead>
          <tr>
            <th>type</th>
            <th>now</th>
            <th>max</th>
            <th>min</th>
            <th>status</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>macd-dea</td>
            <td>{{nowIndicator.macd.dea | getFixed(6)}}</td>
            <td>{{perIndicator.maxMacd.dea | getFixed(6)}}</td>
            <td>{{perIndicator.minMacd.dea | getFixed(6)}}</td>
            <td>{{nowIndicator.macd.dea | getStatus(perIndicator.minMacd.dea, perIndicator.maxMacd.dea)}}</td>
          </tr>
          <tr>
            <td>macd-diff</td>
            <td>{{nowIndicator.macd.diff | getFixed(6)}}</td>
            <td>{{perIndicator.maxMacd.diff | getFixed(6)}}</td>
            <td>{{perIndicator.minMacd.diff | getFixed(6)}}</td>
            <td>{{nowIndicator.macd.diff | getStatus(perIndicator.minMacd.diff, perIndicator.maxMacd.diff)}}</td>
          </tr>
          <tr>
            <td>macd-bar</td>
            <td>{{nowIndicator.macd.bar | getFixed(6)}}</td>
            <td>{{perIndicator.maxMacd.bar | getFixed(6)}}</td>
            <td>{{perIndicator.minMacd.bar | getFixed(6)}}</td>
            <td>{{nowIndicator.macd.bar | getStatus(perIndicator.minMacd.bar, perIndicator.maxMacd.bar)}}</td>
          </tr>
          <tr>
            <td>kdj-k</td>
            <td>{{nowIndicator.kdj.k | getFixed(2)}}</td>
            <td>{{perIndicator.maxKdj.k | getFixed(2)}}</td>
            <td>{{perIndicator.minKdj.k | getFixed(2)}}</td>
            <td>{{nowIndicator.kdj.k | getStatus(perIndicator.minKdj.k, perIndicator.maxKdj.k)}}</td>
          </tr>
          <tr>
            <td>kdj-d</td>
            <td>{{nowIndicator.kdj.d | getFixed(2)}}</td>
            <td>{{perIndicator.maxKdj.d | getFixed(2)}}</td>
            <td>{{perIndicator.minKdj.d | getFixed(2)}}</td>
            <td>{{nowIndicator.kdj.d | getStatus(perIndicator.minKdj.d, perIndicator.maxKdj.d)}}</td>
          </tr>
          <tr>
            <td>kdj-j</td>
            <td>{{nowIndicator.kdj.j | getFixed(2)}}</td>
            <td>{{perIndicator.maxKdj.j | getFixed(2)}}</td>
            <td>{{perIndicator.minKdj.j | getFixed(2)}}</td>
            <td>{{nowIndicator.kdj.j | getStatus(perIndicator.minKdj.j, perIndicator.maxKdj.j)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    
  </div>
</template>
<script>
import {MACD, KDJ} from '@/tools/indicator.js'
export default {
  name: 'BotProfit',
  filters: {
    getFixed(val, level) {
      return (val?val/1:0).toFixed(level)
    },
    getStatus(val, min, max) {
      if (val/1 < min/1) {
        return -1
      }
      if (val/1 > max/1) {
        return 1
      }
      return 0
    }
  },
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
      macd: {},
      kdj: {},
      minItems: [],
      maxItems: [],
      perIndicator: {
        maxMacd: {},
        minMacd: {},
        maxKdj: {},
        minKdj: {}
      },
      nowIndicator: {
        macd: {},
        kdj: {}
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
      this.$http('http://www.abichi.club/zbapi/data/v1/kline', {
        params: {
          market: 'usdt_qc',
          type: type,
          size: 1000
        }
      }).then(res => {
        this.kline = res.data.data
        this.macd = MACD(this.kline.map(it => it[4]))
        this.kdj = KDJ(this.kline.map(it => [it[2], it[3], it[4]]))
        this.parseData()
        // this.strategy4()
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
    },
    strategy3() {
      let strategyData = {
          account: 10000,
          usdtAccount: 0,
          sellItems: []
        }
      this.kline.forEach((it, index) => {
        const price = it[4]
        const minJ = 0
        const maxJ = 88
        const nowJ = this.kdj.j[index]
        const perBuy = 1000
        
        if (nowJ < minJ) {
          if ((strategyData.account - price * perBuy)>0) {
            strategyData.account = strategyData.account - price * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
          }
        }
        if (nowJ > maxJ) {
          if ((strategyData.usdtAccount) > 0) {
            strategyData.account = strategyData.account + price * strategyData.usdtAccount
            strategyData.usdtAccount = 0
          }
        }
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.95).toFixed(2)
        console.log(strategyData)
    },
    strategy4() {
      let strategyData = {
          account: 10000,
          usdtAccount: 0,
          sellItems: []
        }
      this.kline.forEach((it, index) => {
        if (index == 0) {
          return
        }
        const price = it[4]
        const minDea = -0.003
        const maxDea = 0
        const minJ = 15
        const maxJ = 60
        const nowJ = this.kdj.j[index]
        const nowDea = this.macd.deas[index]
        const beforeDea = this.macd.deas[index-1]
        const perBuy = parseInt(10000/price)
        
        if (nowDea < minDea && nowDea > beforeDea) {
          if ((strategyData.account - price * perBuy)>0) {
            strategyData.account = strategyData.account - price * perBuy
            strategyData.usdtAccount = strategyData.usdtAccount + perBuy
          }
        }
        if (nowDea > maxDea && nowDea < beforeDea) {
          if ((strategyData.usdtAccount) > 0) {
            strategyData.account = strategyData.account + price * strategyData.usdtAccount
            strategyData.usdtAccount = 0
          }
        }
      })
      strategyData.profit = (strategyData.account + strategyData.usdtAccount * 6.95).toFixed(2)
        console.log(strategyData)
    },
    parseData() {
      const period = 66
      let maxItems = []
      let minItems = []
      this.kline.forEach((it, index, _arr) => {
        const itemPrice = it[4]
        let maxItem = index
        let minItem = index
        for (let i = 0; i < period; i++) {
          if (maxItem == null && minItem == null) {
            break
          }
          const thatIndex = index - i + period / 2
          if (index == thatIndex) {
            continue
          }
          if (thatIndex < 0 || thatIndex > _arr.length-1) {
            maxItem = null
            minItem = null
            continue
          }
          const thatPrice = _arr[thatIndex][4]
          if (itemPrice < thatPrice) {
            maxItem = null
          } else {
            minItem = null
          }
        }
        if (maxItem) {
          maxItems.push(maxItem)
        }
        if (minItem) {
          minItems.push(minItem)
        }
      })
      this.minItems = minItems
      this.maxItems = maxItems

      let MinMacd = {
        diff: 0,
        dea: 0,
        bar: 0
      }
      let MinKdj = {
        k: 0,
        d: 0,
        j: 0
      }
      let MaxMacd = {
        diff: 0,
        dea: 0,
        bar: 0
      }
      let MaxKdj = {
        k: 0,
        d: 0,
        j: 0
      }
      minItems.forEach(i => {
        MinKdj.k = MinKdj.k + this.kdj.k[i]
        MinKdj.d = MinKdj.d + this.kdj.d[i]
        MinKdj.j = MinKdj.j + this.kdj.j[i]
        MinMacd.diff = MinMacd.diff + this.macd.diffs[i]
        MinMacd.dea = MinMacd.dea + this.macd.deas[i]
        MinMacd.bar = MinMacd.bar + this.macd.bars[i]
      })
      maxItems.forEach(i => {
        MaxKdj.k = MaxKdj.k + this.kdj.k[i]
        MaxKdj.d = MaxKdj.d + this.kdj.d[i]
        MaxKdj.j = MaxKdj.j + this.kdj.j[i]
        MaxMacd.diff = MaxMacd.diff + this.macd.diffs[i]
        MaxMacd.dea = MaxMacd.dea + this.macd.deas[i]
        MaxMacd.bar = MaxMacd.bar + this.macd.bars[i]
      })
      const perMinKdj = {
        k: MinKdj.k/minItems.length,
        d: MinKdj.d/minItems.length,
        j: MinKdj.j/minItems.length
      }
      const perMaxKdj = {
        k: MaxKdj.k/maxItems.length,
        d: MaxKdj.d/maxItems.length,
        j: MaxKdj.j/maxItems.length
      }
      const perMinMacd = {
        diff: MinMacd.diff/minItems.length,
        dea: MinMacd.dea/minItems.length,
        bar: MinMacd.bar/minItems.length
      }
      const perMaxMacd = {
        diff: MaxMacd.diff/minItems.length,
        dea: MaxMacd.dea/minItems.length,
        bar: MaxMacd.bar/minItems.length
      }
      this.perIndicator = {
        maxKdj: perMaxKdj,
        minKdj: perMinKdj,
        maxMacd: perMaxMacd,
        minMacd: perMinMacd
      }
      const maxLength = this.kline.length-1
      this.nowIndicator = {
        macd: {
          dea: this.macd.deas[maxLength],
          diff: this.macd.diffs[maxLength],
          bar: this.macd.bars[maxLength]
        },
        kdj: {
          k: this.kdj.k[maxLength],
          d: this.kdj.d[maxLength],
          j: this.kdj.j[maxLength]
        }
      }

    }
  }
}
</script>
<style lang="less" scoped>
  .container {
    padding: 20px 30px;
    background-color: #333;
    min-height: 100%;
    color: #fff;
  }
    .navigation {
    position: absolute;
    right: 20px;
    top: 20px;
    width: 50px;
    height: 50px;
    background-color: #ddd;
  }

.mytable {
  width: 100%;
  text-align: center;
  td, th {
    padding: 5px 0
  }
}
</style>
