<template>
  <div class="container">
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
        money
      </div>
      <div class="right">
        <cube-input
          v-model="money"
        ></cube-input>
      </div>
    </div>
    <div class="table-box">
      <table class="table-zb">
        <thead>
          <tr>
            <th>
              platform
            </th>
            <th>
              buy
            </th>
            <th>
              diff
            </th>
            <th>
              diffPercent
            </th>
            <th>
              profit
            </th>
          </tr>
        </thead>
        <thead>
          <tr>
            <td>hb</td>
            <td>{{hbPrice}}</td>
            <td>{{diffZbHb}}</td>
            <td>{{diffZbHbPercent}}</td>
            <td>{{hbPrice|getHbProfit(zbPrice, money)}}</td>
          </tr>
          <tr>
            <td>tidex</td>
            <td>{{tidexBuyHl}}</td>
            <td>{{diffZbTidex}}</td>
            <td>{{diffZbTidexPercent}}</td>
            <td>{{tidexBuyHl|getTidexProfit(zbPrice, money)}}</td>
          </tr>
          <tr>
            <td>exchange</td>
            <td>{{hlPrice}}</td>
            <td>{{diffZbHl}}</td>
            <td>{{diffZbHlPercent}}</td>
            <td> - </td>
          </tr>
        </thead>
      </table>
      <div style="font-size: 12px;margin:20px 0;">
        tidexBuy:{{tidexBuy}}
      </div>
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
      this.getTidexData()
    },
    data() {
      return {
        hbPrice: '',
        zbPrice: '',
        hlPrice: '',
        money: 50000,
        tidexBuy: '',
      }
    },
    filters: {
      getHbProfit(hb, zb, money) {
        const zbusdt = money/zb
        const hbusdt = zbusdt-20
        const hbMoney = hbusdt*hb
        return getFixed(hbMoney-money)
      },
      getTidexProfit(tidex, zb, money) {
        const zbusdt = money/zb
        const hbusdt = zbusdt-20
        const hbMoney = hbusdt*tidex*0.999
        return getFixed(hbMoney-money)
      },
    },
    computed: {
      diffZbHb() {
        return getFixed(this.hbPrice - this.zbPrice)
      },
      diffZbHbPercent() {
        return getFixed((this.hbPrice - this.zbPrice) / this.zbPrice * 100) + '%'
      },
      diffZbHl() {
        return getFixed(this.zbPrice - this.hlPrice)
      },
      diffZbHlPercent() {
        return getFixed((this.zbPrice - this.hlPrice) / this.hlPrice * 100) + '%'
      },
      tidexBuyHl() {
        return getFixed(this.tidexBuy * this.hlPrice)
      },
      diffZbTidex() {
        return getFixed(this.tidexBuyHl - this.zbPrice)
      },
      diffZbTidexPercent() {
        return getFixed((this.tidexBuyHl - this.zbPrice) / this.zbPrice * 100) + '%'
      }
    },
    methods: {
      getTidexData() {
        axios(`${baseUrl}/tidexapi/api/3/ticker/wusd_usdt`).then(res => {
          this.tidexBuy = res.data.wusd_usdt.buy
        })
      },
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
          this.hbPrice = res.data.data[4].price
        })
      }
    }
  }

</script>

<style lang="less" scoped>
.table-zb {
  width: 100%;
  text-align: center;
  th {
    padding: 10px 5px;
    font-weight: bold
  }
  td {
    padding: 10px 5px
  }
}
.container {
  padding: 20px 30px;
  background-color: #333;
  min-height: 100%;
  color: #fff;
}
  .item {
    line-height: 40px;
    border-bottom: 1px solid #ddd;
    padding: 10px 0;
    &:after {
      content: '';
      display: block;
      clear: both;
    }
    .left {
      float: left;
      width: 20%;
      text-align: right
    }
    .right {
      float: left;
      width: 60%;
      margin-left: 5%;
    }
  }

</style>
