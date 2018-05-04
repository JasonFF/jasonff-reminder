<template>
  <div class="container">
    <router-link to="/zb" class="navigation"></router-link>
    <div style="height: 30px"></div>
    <div>
      <table class="table-zb">
        <thead>
          <tr>
            <th>zb</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30min</td>
            <td>{{zb.inflow_30m|getNet(zb.outflow_30m)}}</td>
          </tr>
          <tr>
            <td>1h</td>
            <td>{{zb.inflow_1h|getNet(zb.outflow_1h)}}</td>
          </tr>
          <tr>
            <td>1d</td>
            <td>{{zb.inflow_1d|getNet(zb.outflow_1d)}}</td>
          </tr>
          <tr>
            <td>1w</td>
            <td>{{zb.inflow_1w|getNet(zb.outflow_1w)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
    <div style="height: 30px"></div>
    <div>
      <table class="table-zb">
        <thead>
          <tr>
            <th>all</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>30min</td>
            <td>{{all.inflow_30m|getNet(all.outflow_30m)}}</td>
          </tr>
          <tr>
            <td>1h</td>
            <td>{{all.inflow_1h|getNet(all.outflow_1h)}}</td>
          </tr>
          <tr>
            <td>1d</td>
            <td>{{all.inflow_1d|getNet(all.outflow_1d)}}</td>
          </tr>
          <tr>
            <td>1w</td>
            <td>{{all.inflow_1w|getNet(all.outflow_1w)}}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
import axios from 'axios'
const baseUrl = 'http://www.abichi.club'
import _ from 'lodash'

export default {
  name: 'Flow',
  created() {
    this.getBlockData()
  },
  filters: {
    getNet(inflow, outflow) {
      return ((inflow-outflow)/10000).toFixed(3)
    }
  },
  data() {
    return {
      zb: {

      },
      all: {

      }
    }
  },
  methods: {
    getBlockData() {
        axios(`${baseUrl}/blockapi/api/v1/exchange/flow`, {
          params: {
            size: 50,
            orderby: -1,
            sortType: 'netflow_1h'
          }
        }).then(res => {
          let zb = {}
          let result = {
            inflow_1d: 0,
            inflow_1h: 0,
            inflow_1w: 0,
            inflow_30m: 0,
            outflow_1d: 0,
            outflow_1h: 0,
            outflow_1w: 0,
            outflow_30m: 0,
          }
          res.data.data.list.forEach(it => {
            if(it.name == 'zb-com') {
              zb = it
            }
            Object.keys(result).forEach(it1 => {
              result[it1] += it[it1]
            })
          })

          this.zb = zb
          this.all = result
        })
      },
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
</style>

