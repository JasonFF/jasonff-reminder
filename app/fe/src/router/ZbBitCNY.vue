<template>
  <div class="container">
    <router-link to="/zb" class="navigation">
      
    </router-link>
    <div class="item">
      <div class="left">
        bitCNY
      </div>
      <div class="right">
        {{bitCNYPrice}}
      </div>
    </div>
    <div>
      <div style="width: 50%;float:left">
        <table class="table-zb">
        <thead>
          <tr>
            <th>ask</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in zbAsks">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
          </tr>
        </tbody>
      </table>
      </div>
      <div style="width: 50%; float: left">
        <table class="table-zb">
        <thead>
          <tr>
            <th>bid</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in zbBids">
            <td>{{item[0]}}</td>
            <td>{{item[1]}}</td>
          </tr>
        </tbody>
      </table>
      </div>
      
    </div>
  </div>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://www.abichi.club'

function getFixed(val) {
  return val.toFixed(3)
}

export default {
  name: 'ZbBitCNY',
  data() {
    return {
      bitCNYPrice: '',
      zbAsks: [],
      zbBids:[]
    }
  },
  created() {
    this.getBitCNY()
    this.getZbDepth()
  },
  methods: {
    getBitCNY() {
      axios(`${baseUrl}/zbapi/data/v1/ticker`, {
          params: {
            market: 'bitCNY_qc',
          }
        }).then(res => {
          console.log(res)
          this.bitCNYPrice = res.data.ticker.sell
        })
    },
    getZbDepth() {
        axios(`${baseUrl}/zbapi/data/v1/depth?market=bitCNY_qc&size=50`).then(res => {
          this.zbAsks = res.data.asks.filter(it => {
            return it[1] >= 30000
          })
          this.zbBids = res.data.bids.filter(it => {
            return it[1] >= 30000
          })
        })
      },
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
