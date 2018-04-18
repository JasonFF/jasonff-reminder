<template>
  <div id="index">
    <header class="px-5 py-2 grey darken-3">
      <h1 class="grey lighten-5 px-3" style="display: inline">A.BI.CHI</h1>
    </header>
    <div style="padding: 30px 0;">
      <v-layout>
        <v-flex xs12 sm6 offset-sm3>
          <v-card>
            <v-card-title primary-title>
              <div>
                <h3 class="headline mb-0">BTC-USDT</h3>
                <div>Located two hours south of Sydney in the
                  <br>Southern Highlands of New South Wales, ...</div>
              </div>
            </v-card-title>
            <v-card-actions>
              <v-btn flat color="orange">update</v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </div>
  </div>
</template>
<script>
import axios from '@/axios'
  export default {
    name: 'Index',
    mounted() {
      this.getDeepMarket()
    },
    methods: {
      getDeepMarket() {
        axios('/hbapi/market/depth', {
          params: {
            symbol: 'btcusdt',
            type: 'step0'
          }
        }).then(res => {
          console.log(res)
        })
      }
    }
  }

</script>
