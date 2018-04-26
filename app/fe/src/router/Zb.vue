<template>
  <div class="container">

    <div class="item">

      <div class="left">
        hb
      </div>
      <div class="right">
        {{hbPrice}}
      </div>
    </div>
    <div class="item">
      <div class="left">
        zb
      </div>
      <div class="right">
        {{zbPrice}}
      </div>
    </div>
    <div class="item">
      <div class="left">
        diff
      </div>
      <div class="right">
        {{diff}}
      </div>
    </div>
    <div class="item">
      <div class="left">
        percent
      </div>
      <div class="right">
        {{diffPercent}}
      </div>
    </div>
    <div class="item-small">
      <div>
        exchange rate: {{hlPrice}}
      </div>
      <div>
        diff: {{diffZbHl}}
      </div>
      <div>
        percent: {{diffZbHlPercent}}
      </div>
    </div>
    <div class="item"></div>
    <div class="item">
      <div style="height: 100%;display:flex;flex-direction:column;justify-content: center">
        <cube-input v-model="money" ></cube-input>
      </div>
    </div>
    <div class="item-small">
      <div>income: {{income}}</div>
      <div>percent: {{incomePercent}}</div>
    </div>
  </div>
</template>
<script>
  import axios from 'axios'
  import jsonp from 'jsonp'
  const baseUrl = 'http://www.abichi.club'

  function getFixed(val) {
    return val.toFixed(3)
  }

  export default {
    name: 'Home',
    created() {
      this.getZbData()
      this.getHbOtcData()
      this.getHL()
    },
    data() {
      return {
        hbPrice: '',
        zbPrice: '',
        hlPrice: '',
        money: 50000
      }
    },
    computed: {
      diff() {
        return getFixed(this.hbPrice - this.zbPrice)
      },
      diffPercent() {
        return getFixed((this.hbPrice - this.zbPrice) / this.zbPrice * 100) + '%'
      },
      diffZbHl() {
        return getFixed(this.zbPrice - this.hlPrice)
      },
      diffZbHlPercent() {
        return getFixed((this.zbPrice - this.hlPrice) / this.hlPrice * 100) + '%'
      },
      income() {
        const zbusdt = this.money/this.zbPrice
        const hbusdt = zbusdt-20
        const hbMoney = hbusdt*this.hbPrice
        return getFixed(hbMoney-this.money)
      },
      incomePercent() {
        return getFixed(this.income/this.money*100)+'%'
      }
    },
    methods: {
      getHL() {
        jsonp("https://api.money.126.net/data/feed/FX_USDCNY", null, (err, data) => {
          this.hlPrice = data.FX_USDCNY.price
        })
      },
      getZbData() {
        axios(`${baseUrl}/zbapi/data/v1/ticker`, {
          params: {
            market: 'usdt_qc',
          }
        }).then(res => {
          this.zbPrice = res.data.ticker.sell
        })
      },
      getHbOtcData() {
        axios(`${baseUrl}/hbotcapi/`, {
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
          this.hbPrice = res.data.data[1].price
        })
      }
    }
  }

</script>

<style lang="less" scoped>
  .container {
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    background-color: #333;
    color: #fff;
  }

  .item {
    display: flex;
    flex-direction: row;
    justify-content: center;
    height: 8%;
    font-size: 18px;
    boder-bottom: 1px solid #eee;
  }

  .left {
    width: 20%;
    text-align: right;
    margin-right: 5%;
  }

  .right {
    width: 60%;
    text-align: left
  }

  .item-small {
    display: flex;
    flex-direction: row;
    justify-content: space-around
  }

</style>
