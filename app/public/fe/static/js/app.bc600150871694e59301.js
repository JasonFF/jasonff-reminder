webpackJsonp([1],{"+skl":function(t,e){},BUqm:function(t,e){},NHnr:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var i=n("7+uW"),s={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var a=n("VU/8")({name:"app"},s,!1,function(t){n("BUqm")},null,null).exports,c=n("/ocq"),r={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  my wechat: dfq_qjb\n")])},staticRenderFns:[]},_=n("VU/8")({name:"Home"},r,!1,null,null,null).exports,o=n("mtWM"),l=n.n(o),d=n("hU7x"),u=n.n(d),v=n("M4fF"),h=n.n(v),b="http://www.abichi.club";function f(t){return t.toFixed(3)}var m={name:"Home",created:function(){this.getZbData(),this.getHbOtcData(),this.getHL(),this.getZbDepth(),this.getZbOtcData(),this.testReminder()},data:function(){return{hbPrice:"",hbPrice_b:"",zbPrice:"",hlPrice:"",money:5e4,zbAsks:[],zbBids:[],zbPrice_s:"",btc_qc:"",btc_usdt:"",eos_qc:"",eos_usdt:"",zbOtcPrice_b:"",zbOtcPrice_s:"",btcQcAsks:[],btcQcBids:[],btcUsdtAsks:[],btcUsdtBids:[]}},filters:{getProfit:function(t,e,n,i){return f((n/e*(arguments.length>4&&void 0!==arguments[4]?arguments[4]:1)-i)*t-n)},diff:function(t,e){return f(t-e)},getRatio:function(t,e){return f(t/e)},getRatioDynamic:function(t,e){return f(t/h.a.get(e,"0"))},getQcDiff:function(t,e){return f(t-e)}},methods:{testReminder:function(){Notification.requestPermission(function(t){new Notification("Here I am!",{body:"Thanks for clicking that button. Hope you liked.",icon:"https://cdn2.iconfinder.com/data/icons/ios-7-style-metro-ui-icons/512/MetroUI_HTML5.png",dir:"auto"})})},getZbDepth:function(){var t=this;l()(b+"/zbapi/data/v1/depth?market=usdt_qc&size=50").then(function(e){t.zbAsks=e.data.asks.filter(function(t){return t[1]>=5e3}).reverse(),t.zbBids=e.data.bids.filter(function(t){return t[1]>=5e3})}),l()(b+"/zbapi/data/v1/depth?market=btc_qc&size=50").then(function(e){t.btcQcAsks=e.data.asks.filter(function(t){return t[1]>=1.5}).reverse(),t.btcQcBids=e.data.bids.filter(function(t){return t[1]>=1.5})}),l()(b+"/zbapi/data/v1/depth?market=btc_usdt&size=50").then(function(e){t.btcUsdtAsks=e.data.asks.filter(function(t){return t[1]>=1}).reverse(),t.btcUsdtBids=e.data.bids.filter(function(t){return t[1]>=1})})},getHL:function(){var t=this;u()("https://api.money.126.net/data/feed/FX_USDCNY",null,function(e,n){t.hlPrice=n.FX_USDCNY.price})},getZbData:function(){var t=this;l()(b+"/zbapi/data/v1/allTicker").then(function(e){t.zbPrice=e.data.usdtqc.sell,t.zbPrice_s=e.data.usdtqc.buy,t.btc_qc=e.data.btcqc.last,t.btc_usdt=e.data.btcusdt.last,t.eos_qc=e.data.eosqc.last,t.eos_usdt=e.data.eosusdt.last})},getHbOtcData:function(){var t=this;l()(b+"/hbotcapi/",{params:{country:0,currency:1,payMethod:0,currPage:1,coinId:2,tradeType:0,merchant:1,online:1}}).then(function(e){t.hbPrice=e.data.data[5].price}),l()(b+"/hbotcapi/",{params:{country:0,currency:1,payMethod:0,currPage:1,coinId:2,tradeType:1,merchant:1,online:1}}).then(function(e){t.hbPrice_b=e.data.data[5].price})},getZbOtcData:function(){var t=this;l()(b+"/zbotcapi/otc/trade/qc_cny",{params:{type:2}}).then(function(e){var n=e.data,i=/\d\.\d{2,3}/g;n.match(i)[1]<1.5?t.zbOtcPrice_b=n.match(i)[1]:t.zbOtcPrice_b=n.match(i)[2]}),l()(b+"/zbotcapi/otc/trade/qc_cny",{params:{type:1}}).then(function(e){var n=e.data,i=/\d\.\d{2,3}/g;n.match(i)[1]<1.5?t.zbOtcPrice_s=n.match(i)[1]:t.zbOtcPrice_s=n.match(i)[2]})}}},y={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("router-link",{staticClass:"navigation",attrs:{to:"/bitcny"}}),t._v(" "),n("div",{staticClass:"item"},[n("div",{staticClass:"left"},[t._v("\n      zb\n    ")]),t._v(" "),n("div",{staticClass:"right"},[t._v("\n      "+t._s(t.zbPrice)+"/"+t._s(t.zbPrice_s)+"\n    ")])]),t._v(" "),n("div",{staticClass:"item"},[n("div",{staticClass:"left"},[t._v("\n      zbotc\n    ")]),t._v(" "),n("div",{staticClass:"right"},[t._v("\n      "+t._s(t.zbOtcPrice_b)+"/"+t._s(t.zbOtcPrice_s)+"\n    ")])]),t._v(" "),n("div",{staticClass:"item"},[n("div",{staticClass:"left"},[t._v("\n      money\n    ")]),t._v(" "),n("div",{staticClass:"right"},[n("input",{directives:[{name:"model",rawName:"v-model",value:t.money,expression:"money"}],attrs:{type:"text"},domProps:{value:t.money},on:{input:function(e){e.target.composing||(t.money=e.target.value)}}})])]),t._v(" "),n("div",{staticClass:"table-box"},[n("table",{staticClass:"table-zb"},[t._m(0),t._v(" "),n("thead",[n("tr",[n("td",[t._v("hb")]),t._v(" "),n("td",[t._v(t._s(t.hbPrice))]),t._v(" "),n("td",[t._v(t._s(t._f("getRatio")(t.hbPrice,t.zbOtcPrice_s)))]),t._v(" "),n("td",[t._v(t._s(t._f("getProfit")(t.hbPrice,t.zbPrice,t.money,20,t.zbOtcPrice_b)))])]),t._v(" "),n("tr",[n("td",[t._v("hb to zb")]),t._v(" "),n("td",[t._v(t._s(t.hbPrice_b))]),t._v(" "),n("td",[t._v(t._s(t._f("getRatio")(t.hbPrice_b,t.zbOtcPrice_b)))]),t._v(" "),n("td",[t._v(t._s(t._f("getProfit")(t.zbPrice_s,t.hbPrice_b,t.money,20,t.zbOtcPrice_s)))])]),t._v(" "),n("tr",[n("td",[t._v("exchange")]),t._v(" "),n("td",[t._v(t._s(t.hlPrice))]),t._v(" "),n("td",[t._v(t._s(t._f("diff")(t.zbPrice,t.hlPrice)))]),t._v(" "),n("td",[t._v(" - ")])])])])]),t._v(" "),n("div",{staticStyle:{height:"20px"}}),t._v(" "),n("hr"),t._v(" "),n("div",{staticClass:"clearBoth"},[n("div",{staticStyle:{width:"50%",float:"left"}},[n("table",{staticClass:"table-zb"},[t._m(1),t._v(" "),n("tbody",t._l(t.zbAsks,function(e){return n("tr",[n("td",[t._v(t._s(e[0]))]),t._v(" "),n("td",[t._v(t._s(e[1]))])])}))])]),t._v(" "),n("div",{staticStyle:{width:"50%",float:"left"}},[n("table",{staticClass:"table-zb"},[t._m(2),t._v(" "),n("tbody",t._l(t.zbBids,function(e){return n("tr",[n("td",[t._v(t._s(e[0]))]),t._v(" "),n("td",[t._v(t._s(e[1]))])])}))])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("\n            platform\n          ")]),this._v(" "),e("th",[this._v("\n            price\n          ")]),this._v(" "),e("th",[this._v("\n            refer\n          ")]),this._v(" "),e("th",[this._v("\n            profit\n          ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("ask")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("bid")])])])}]};var p=n("VU/8")(m,y,!1,function(t){n("c3pG")},"data-v-3fb45714",null).exports;function g(t){return t?t.toFixed(3):""}var x={name:"Tiger",created:function(){this.get_btc_bitcny(),this.get_tusd_btc(),this.getHL(),this.get_bitcny_price()},filters:{getPercent:function(t){var e=t.open;return g((t.close-e)/e*100)},getFixed:g},data:function(){return{btc_bitcny:{},tusd_btc:{},btc_tusd:{},hlPrice:"",bitcnyPrice:{buy:"",sell:""},money:1e4}},computed:{btc_tusd_cny:function(){return this.hlPrice&&this.btc_tusd.open?{open:this.hlPrice*this.btc_tusd.open,close:this.hlPrice*this.btc_tusd.close}:{}},bitcnyAmount:function(){return this.money&&this.bitcnyPrice?this.money/this.bitcnyPrice.buy:0},btcAmount:function(){if(this.bitcnyAmount&&this.btc_bitcny.close)return this.bitcnyAmount/this.btc_bitcny.close*.999},tusdAmount:function(){if(this.btcAmount&&this.tusd_btc.close)return this.btcAmount/this.tusd_btc.close*.999},tusdPrice:function(){if(this.tusdAmount)return this.money/this.tusdAmount}},methods:{get_bitcny_price:function(){var t=this;l()("http://www.abichi.club/tigerctcapi/exchange/api/ctc/config?").then(function(e){t.bitcnyPrice.buy=e.data.buyPrice,t.bitcnyPrice.sell=e.data.sellPrice,console.log(e)})},get_btc_tusd:function(t){return{open:1/t.open,close:1/t.close}},getHL:function(){var t=this;u()("https://api.money.126.net/data/feed/FX_USDCNY",null,function(e,n){t.hlPrice=n.FX_USDCNY.price})},get_btc_bitcny:function(){var t=this;l()("http://www.abichi.club/tigerapi/exchange/trading/api/market/detail",{params:{api_key:"fbe68a0e-cfed-4afc-b98c-699d937ba7fd",symbol:"btcbitcny"}}).then(function(e){t.btc_bitcny=e.data.data.trade_ticker_data.tick})},get_tusd_btc:function(){var t=this;l()("http://www.abichi.club/tigerapi/exchange/trading/api/market/detail",{params:{api_key:"fbe68a0e-cfed-4afc-b98c-699d937ba7fd",symbol:"tusdbtc"}}).then(function(e){t.tusd_btc=e.data.data.trade_ticker_data.tick,t.btc_tusd=t.get_btc_tusd(t.tusd_btc)})}}},j={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("table",{staticClass:"table-tiger"},[t._m(0),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("\n          btc_bitcny\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t.btc_bitcny.close)+"\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t._f("getPercent")(t.btc_bitcny))+" %\n        ")])]),t._v(" "),n("tr",[n("td",[t._v("\n          tusd_btc\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t.tusd_btc.close)+"\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t._f("getPercent")(t.tusd_btc))+" %\n        ")])]),t._v(" "),n("tr",[n("td",[t._v("\n          btc_tusd\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t._f("getFixed")(t.btc_tusd.close))+"\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t._f("getPercent")(t.btc_tusd))+" %\n        ")])]),t._v(" "),n("tr",[n("td",[t._v("\n          btc_tusd_cny\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t._f("getFixed")(t.btc_tusd_cny.close))+"\n        ")]),t._v(" "),n("td",[t._v("\n          "+t._s(t._f("getPercent")(t.btc_tusd_cny))+" %\n        ")])])])]),t._v(" "),n("div",[t._v("\n    bitcny price: "+t._s(t.bitcnyPrice.buy)+"|"+t._s(t.bitcnyPrice.sell)+"\n  ")])])},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("\n          coin\n        ")]),this._v(" "),e("th",[this._v("\n          price\n        ")]),this._v(" "),e("th",[this._v("\n          percent\n        ")])])])}]};var w=n("VU/8")(x,j,!1,function(t){n("OF4Q")},null,null).exports;var k={name:"Bitcny",data:function(){return{tiger_buy:"",tiger_sell:"",aex_buy:"",aex_sell:"",zb_buy:"",zb_sell:"",cnc:""}},filters:{getMulti:function(t,e){return(t*e).toFixed(3)}},created:function(){this.getZbData(),this.getAexPrice(),this.getAexCncPrice()},methods:{loadIframe:function(t){var e={};try{e=JSON.parse(this.$refs.iframe.contentWindow.document.getElementsByTagName("pre")[0].innerHTML)}catch(t){}this.tiger_buy=e.buyPrice,this.tiger_sell=e.sellPrice},getAexPrice:function(){var t=this;l()("http://www.abichi.club/aexquaapi/marketCenter/market/v0/depth?symbol=aex_bitcnycnc").then(function(e){t.aex_buy=e.data.asks[0][0],t.aex_sell=e.data.bids[0][0]})},getAexCncPrice:function(){var t=this;l()("http://www.abichi.club/aexctcapi/trade/c2c/order_list_c2c.php?order_type=1&market=CNY&coin=CNC&page=0").then(function(e){t.cnc=e.data.data.ord_list[0].pice/1,console.log(e)})},getZbData:function(){var t=this;l()("http://www.abichi.club/zbapi/data/v1/allTicker").then(function(e){t.zb_buy=e.data.bitcnyqc.sell,t.zb_sell=e.data.bitcnyqc.buy})}}},z={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("router-link",{staticClass:"navigation",attrs:{to:"/zb"}}),t._v(" "),n("table",{staticClass:"table-zb",staticStyle:{width:"88%"}},[t._m(0),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("aex_buy")]),t._v(" "),n("td",[t._v(t._s(t.aex_buy))])]),t._v(" "),n("tr",[n("td",[t._v("aex_sell")]),t._v(" "),n("td",[t._v(t._s(t.aex_sell))])]),t._v(" "),n("hr"),t._v(" "),n("tr",[n("td",[t._v("aex_cny_buy")]),t._v(" "),n("td",[t._v(t._s(t._f("getMulti")(t.cnc,t.aex_buy)))])]),t._v(" "),n("tr",[n("td",[t._v("aex_cny_sell")]),t._v(" "),n("td",[t._v(t._s(t._f("getMulti")(t.cnc,t.aex_sell)))])]),t._v(" "),n("tr",[n("td",[t._v("tiger_buy")]),t._v(" "),n("td",[t._v(t._s(t.tiger_buy))])]),t._v(" "),n("tr",[n("td",[t._v("tiger_sell")]),t._v(" "),n("td",[t._v(t._s(t.tiger_sell))])]),t._v(" "),n("hr"),t._v(" "),n("tr",[n("td",[t._v("zb_buy")]),t._v(" "),n("td",[t._v(t._s(t.zb_buy))])]),t._v(" "),n("tr",[n("td",[t._v("zb_sell")]),t._v(" "),n("td",[t._v(t._s(t.zb_sell))])]),t._v(" "),n("tr",[n("td",[t._v("cnc")]),t._v(" "),n("td",[t._v(t._s(t.cnc))])])])]),t._v(" "),n("iframe",{ref:"iframe",staticStyle:{display:"none"},attrs:{src:"http://www.abichi.club/tigerctcapi/exchange/api/ctc/config",frameborder:"0"},on:{load:t.loadIframe}})],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("type")]),this._v(" "),e("th",[this._v("price")])])])}]};var C=n("VU/8")(k,z,!1,function(t){n("Tb4J")},"data-v-16a54ec4",null).exports,P=n("//Fk"),B=n.n(P),F=n("XLwt"),A=n.n(F),S=n("PJh5"),q=n.n(S),E={name:"BtcChart",data:function(){return{size:100,btc_usdt_amount:0,btc_qc_amount:0,avg:0,mid:0}},created:function(){var t=this;B.a.all([this.getUsdtKLine(),this.getBtcKLine()]).then(function(e){var n=e[0].data.data,i=e[1].data.data,s=[],a=[],c=[],r=[],_=0;n.forEach(function(t){_+=t[4]/1}),t.avg=_/n.length,i.forEach(function(t){r.push(t[4])}),n.forEach(function(e,n){a.push(q()(e[0]).format("MM-DD HH:mm:ss")),c.push(e[4]);var i=e[4]/1-t.avg;0==n?s.push(i):s.push(1*s[n-1]+i)}),t.getChart([c,s,r],a,"usdt")})},methods:{getChart:function(t,e,n){var i=A.a.init(document.getElementById(n)),s={title:{text:"btc usdt",x:"center",y:0},dataZoom:[{id:"dataZoomX",type:"slider",xAxisIndex:[0,1,2],filterMode:"filter",start:0,end:100,zoomLock:!1},{type:"inside"}],tooltip:{trigger:"axis",axisPointer:{animation:!1}},grid:[{x:"7%",y:"7%",width:"85%",height:"20%"},{x:"7%",y:"32%",width:"85%",height:"30%"},{x:"7%",y:"67%",width:"85%",height:"25%"}],xAxis:[{gridIndex:0,data:e},{gridIndex:1,data:e},{gridIndex:2,data:e}],yAxis:[{gridIndex:0,min:"dataMin",max:"dataMax"},{gridIndex:1,min:"dataMin",max:"dataMax"},{gridIndex:2,min:"dataMin",max:"dataMax"}],series:[{name:"pnl",type:"line",xAxisIndex:0,yAxisIndex:0,showSymbol:!1,hoverAnimation:!1,data:t[0]},{name:"commission",type:"line",xAxisIndex:1,yAxisIndex:1,showSymbol:!1,hoverAnimation:!1,data:t[1]},{name:"net pnl",type:"line",xAxisIndex:2,yAxisIndex:2,showSymbol:!1,hoverAnimation:!1,data:t[2]}]};i.setOption(s)},getBtcKLine:function(){return l()("http://www.abichi.club/zbapi/data/v1/kline",{params:{market:"btc_qc",type:"1day"}})},getUsdtKLine:function(){return l()("http://www.abichi.club/zbapi/data/v1/kline",{params:{market:"usdt_qc",type:"1day"}})}}},M={render:function(){this.$createElement;this._self._c;return this._m(0)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{padding:"0 10%"}},[this._v("\n  btcChart\n  "),e("div",{staticStyle:{width:"100%",height:"900px"},attrs:{id:"usdt"}})])}]},O=n("VU/8")(E,M,!1,null,null,null).exports,R=n("fZjL"),U=n.n(R),D={name:"Flow",created:function(){this.getBlockData()},filters:{getNet:function(t,e){return((t-e)/1e4).toFixed(3)}},data:function(){return{zb:{},all:{}}},methods:{getBlockData:function(){var t=this;l()("http://www.abichi.club/blockapi/api/v1/exchange/flow",{params:{size:50,orderby:-1,sortType:"netflow_1h"}}).then(function(e){var n={},i={inflow_1d:0,inflow_1h:0,inflow_1w:0,inflow_30m:0,outflow_1d:0,outflow_1h:0,outflow_1w:0,outflow_30m:0};e.data.data.list.forEach(function(t){"zb-com"==t.name&&(n=t),U()(i).forEach(function(e){i[e]+=t[e]})}),t.zb=n,t.all=i})}}},N={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("router-link",{staticClass:"navigation",attrs:{to:"/zb"}}),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("div",[n("table",{staticClass:"table-zb"},[t._m(0),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("30min")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.zb.inflow_30m,t.zb.outflow_30m)))])]),t._v(" "),n("tr",[n("td",[t._v("1h")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.zb.inflow_1h,t.zb.outflow_1h)))])]),t._v(" "),n("tr",[n("td",[t._v("1d")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.zb.inflow_1d,t.zb.outflow_1d)))])]),t._v(" "),n("tr",[n("td",[t._v("1w")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.zb.inflow_1w,t.zb.outflow_1w)))])])])])]),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("div",[n("table",{staticClass:"table-zb"},[t._m(1),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("30min")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.all.inflow_30m,t.all.outflow_30m)))])]),t._v(" "),n("tr",[n("td",[t._v("1h")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.all.inflow_1h,t.all.outflow_1h)))])]),t._v(" "),n("tr",[n("td",[t._v("1d")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.all.inflow_1d,t.all.outflow_1d)))])]),t._v(" "),n("tr",[n("td",[t._v("1w")]),t._v(" "),n("td",[t._v(t._s(t._f("getNet")(t.all.inflow_1w,t.all.outflow_1w)))])])])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("zb")]),this._v(" "),e("th")])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("all")]),this._v(" "),e("th")])])}]};var H=n("VU/8")(D,N,!1,function(t){n("QuRx")},"data-v-2607ddb8",null).exports,I={name:"Qt",created:function(){this.getUsdtKLine()},data:function(){return{time:null}},methods:{getUsdtKLine:function(){return l()("http://www.abichi.club/zbapi/data/v1/kline",{params:{market:"usdt_qc",type:"1hour",since:this.time}}).then(function(t){})}}},L={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",[n("input",{directives:[{name:"model",rawName:"v-model",value:t.time,expression:"time"}],attrs:{type:"text"},domProps:{value:t.time},on:{input:function(e){e.target.composing||(t.time=e.target.value)}}}),t._v(" "),n("button",[t._v("get")]),t._v("\n  qt\n")])},staticRenderFns:[]},T=n("VU/8")(I,L,!1,null,null,null).exports,V={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  usdt\n")])},staticRenderFns:[]},X=n("VU/8")({name:"Usdt"},V,!1,null,null,null).exports,$="http://www.abichi.club";function K(t){if(t.toString().length>10)return t.toFixed(10)/1}var Z={name:"Aex",data:function(){return{bitcnyCnc_buy:"",bitcnyCnc_buy_amount:"",bitcnyCnc_sell:"",bitcnyCnc_sell_amount:"",btcCnc_buy:"",btcCnc_buy_amount:"",btcCnc_sell:"",btcCnc_sell_amount:"",btcBitcny_buy:"",btcBitcny_buy_amount:"",btcBitcny_sell:"",btcBitcny_sell_amount:"",startAmount:10}},computed:{positiveFinal:function(){var t=this.startAmount,e=this.btcCnc_buy,n=this.btcBitcny_sell,i=this.bitcnyCnc_sell;if(!e||!n||!i)return 0;var s=K(t/e);if(s>this.btcCnc_buy_amount)return console.log(s),0;var a=K(s*n);if(s>this.btcBitcny_sell_amount)return 0;var c=K(a*i);return a>this.bitcnyCnc_sell_amount?0:c},reverseFinal:function(){var t=this.startAmount,e=this.bitcnyCnc_buy,n=this.btcBitcny_buy,i=this.btcCnc_sell;if(!e||!n||!i)return 0;var s=K(t/e);if(s>this.bitcnyCnc_buy_amount)return 0;var a=K(s/n);if(a>this.btcBitcny_buy_amount)return 0;var c=K(a*i);return a>this.btcCnc_sell_amount?0:c}},created:function(){console.log("created")},methods:{update:function(){this.getBitcnyCnc(),this.getBtcCnc(),this.getBtcBitcny()},getBitcnyCnc:function(){var t=this;l()($+"/aexquaapi/marketCenter/market/v0/depth?symbol=aex_bitcnycnc").then(function(e){t.bitcnyCnc_buy=e.data.asks[0][0],t.bitcnyCnc_buy_amount=e.data.asks[0][1],t.bitcnyCnc_sell=e.data.bids[0][0],t.bitcnyCnc_sell_amount=e.data.bids[0][1]})},getBtcCnc:function(){var t=this;l()($+"/aexquaapi/marketCenter/market/v0/depth?symbol=aex_btccnc").then(function(e){t.btcCnc_buy=e.data.asks[0][0],t.btcCnc_buy_amount=e.data.asks[0][1],t.btcCnc_sell=e.data.bids[0][0],t.btcCnc_sell_amount=e.data.bids[0][1]})},getBtcBitcny:function(){var t=this;l()($+"/aexquaapi/marketCenter/market/v0/depth?symbol=aex_btcbitcny").then(function(e){t.btcBitcny_buy=e.data.asks[0][0],t.btcBitcny_sell=e.data.bids[0][0],t.btcBitcny_buy_amount=e.data.asks[0][1],t.btcBitcny_sell_amount=e.data.bids[0][1]})}}},Q={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"aex-container"},[n("div",{staticStyle:{height:"50px"}}),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("Row",[n("Col",{attrs:{span:"20",offset:"2"}},[n("table",{staticClass:"jf-table text-center reverse-table"},[n("thead",[n("tr",[n("th",[t._v("bitcny_cnc")]),t._v(" "),n("th",[t._v("price")]),t._v(" "),n("th",{staticStyle:{"border-right":"1px solid #555"}},[t._v("amount")]),t._v(" "),n("th",[t._v("btc_cnc")]),t._v(" "),n("th",[t._v("price")]),t._v(" "),n("th",{staticStyle:{"border-right":"1px solid #555"}},[t._v("amount")]),t._v(" "),n("th",[t._v("btc_bitcny")]),t._v(" "),n("th",[t._v("price")]),t._v(" "),n("th",[t._v("amount")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("buy")]),t._v(" "),n("td",[t._v(t._s(t.bitcnyCnc_buy))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.bitcnyCnc_buy_amount))]),t._v(" "),n("td",[t._v("buy")]),t._v(" "),n("td",[t._v(t._s(t.btcCnc_buy))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.btcCnc_buy_amount))]),t._v(" "),n("td",[t._v("buy")]),t._v(" "),n("td",[t._v(t._s(t.btcBitcny_buy))]),t._v(" "),n("td",[t._v(t._s(t.btcBitcny_buy_amount))])]),t._v(" "),n("tr",[n("td",[t._v("sell")]),t._v(" "),n("td",[t._v(t._s(t.bitcnyCnc_sell))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.bitcnyCnc_sell_amount))]),t._v(" "),n("td",[t._v("sell")]),t._v(" "),n("td",[t._v(t._s(t.btcCnc_sell))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.btcCnc_sell_amount))]),t._v(" "),n("td",[t._v("sell")]),t._v(" "),n("td",[t._v(t._s(t.btcBitcny_sell))]),t._v(" "),n("td",[t._v(t._s(t.btcBitcny_sell_amount))])])])])])],1),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("Row",[n("Col",{attrs:{span:"20",offset:"2"}},[n("table",{staticClass:"jf-table text-center reverse-table"},[n("thead",[n("tr",[n("th",[t._v("type")]),t._v(" "),n("th",[t._v("cnc")]),t._v(" "),n("th",{attrs:{colspan:"3"}},[t._v("btc")]),t._v(" "),n("th",{attrs:{colspan:"3"}},[t._v("bitcny")]),t._v(" "),n("th",{attrs:{colspan:"3"}},[t._v("cnc")]),t._v(" "),n("th",[t._v("final")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("positive cycle")]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.startAmount))]),t._v(" "),n("td",[t._v("buy")]),t._v(" "),n("td",[t._v(t._s(t.btcCnc_buy))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.btcCnc_buy_amount))]),t._v(" "),n("td",[t._v("sell")]),t._v(" "),n("td",[t._v(t._s(t.btcBitcny_sell))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.btcBitcny_sell_amount))]),t._v(" "),n("td",[t._v("sell")]),t._v(" "),n("td",[t._v(t._s(t.bitcnyCnc_sell))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.bitcnyCnc_sell_amount))]),t._v(" "),n("td",[t._v(t._s(t.positiveFinal))])])])])])],1),t._v(" "),n("Row",[n("Col",{attrs:{span:"20",offset:"2"}},[n("table",{staticClass:"jf-table text-center reverse-table"},[n("thead",[n("tr",[n("th",[t._v("type")]),t._v(" "),n("th",[t._v("cnc")]),t._v(" "),n("th",{attrs:{colspan:"3"}},[t._v("bitcny")]),t._v(" "),n("th",{attrs:{colspan:"3"}},[t._v("btc")]),t._v(" "),n("th",{attrs:{colspan:"3"}},[t._v("cnc")]),t._v(" "),n("th",[t._v("final")])])]),t._v(" "),n("tbody",[n("tr",[n("td",[t._v("reverse cycle")]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.startAmount))]),t._v(" "),n("td",[t._v("buy")]),t._v(" "),n("td",[t._v(t._s(t.bitcnyCnc_buy))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.bitcnyCnc_buy_amount))]),t._v(" "),n("td",[t._v("buy")]),t._v(" "),n("td",[t._v(t._s(t.btcBitcny_buy))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.btcBitcny_buy_amount))]),t._v(" "),n("td",[t._v("sell")]),t._v(" "),n("td",[t._v(t._s(t.btcCnc_sell))]),t._v(" "),n("td",{staticStyle:{"border-right":"1px solid #555"}},[t._v(t._s(t.btcCnc_sell_amount))]),t._v(" "),n("td",[t._v(t._s(t.reverseFinal))])])])])])],1)],1)},staticRenderFns:[]};var W=n("VU/8")(Z,Q,!1,function(t){n("l1dH")},"data-v-0c0897e4",null).exports,Y="http://www.abichi.club",G={name:"OkEo",data:function(){return{ft:{},ticker:{}}},computed:{fttoticker:function(){return(this.ft.last-this.ticker.last).toFixed(3)},fttotickerPer:function(){return((this.ft.last-this.ticker.last)/this.ticker.last*100).toFixed(3)},tickertoft:function(){return(this.ticker.last-this.ft.last).toFixed(3)},tickertoftPer:function(){return((this.ticker.last-this.ft.last)/this.ft.last*100).toFixed(3)}},created:function(){var t=this;this.getFTData().then(function(e){t.ft=e.data.ticker}),this.getTickerData().then(function(e){t.ticker=e.data.ticker})},methods:{getFTData:function(){return l()(Y+"/okexapi/api/v1/future_ticker.do?symbol=eos_usd&contract_type=quarter")},getTickerData:function(){return l()(Y+"/okexapi/api/v1/ticker.do?symbol=eos_usdt")}}},J={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"container"},[n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("Row",[n("Col",{attrs:{span:"12",offset:"2"}},[n("h3",[t._v("现货："+t._s(t.ticker.last))])])],1),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("Row",[n("Col",{attrs:{span:"12",offset:"2"}},[n("h3",[t._v("合约："+t._s(t.ft.last))])])],1),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("Row",[n("Col",{attrs:{span:"12",offset:"2"}},[n("h3",[t._v("合约-现货："+t._s(t.fttoticker)+" / "+t._s(t.fttotickerPer)+"%")])])],1),t._v(" "),n("div",{staticStyle:{height:"30px"}}),t._v(" "),n("Row",[n("Col",{attrs:{span:"12",offset:"2"}},[n("h3",[t._v("现货-合约："+t._s(t.tickertoft)+" / "+t._s(t.tickertoftPer)+"%")])])],1)],1)},staticRenderFns:[]};var tt=n("VU/8")(G,J,!1,function(t){n("c6Y0")},"data-v-247a20e1",null).exports;function et(t,e){for(var n=[],i=0,s=e.length;i<s;i++)if(i<t)n.push("-");else{for(var a=0,c=0;c<t;c++)a+=e[i-c][1]/1;n.push((a/t).toFixed(2))}return n}var nt={name:"AverageChart",data:function(){return{klineData:[],buttonIntervals:["1m","3m","5m","15m","30m","1h","2h","4h","6h","8h","12h","1d"]}},methods:{initKline1:function(){var t=this.klineData,e=t.map(function(t){return q()(t[0]).format("MM-DD HH:mm")}),n=et(5,t),i=et(10,t),s=et(20,t),a={title:{text:"均线"},tooltip:{trigger:"axis"},legend:{data:["MA5","MA10","MA20"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},toolbox:{feature:{saveAsImage:{}}},dataZoom:[{type:"inside",start:90,end:100},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],xAxis:{type:"category",boundaryGap:!1,data:e},yAxis:{type:"value"},series:[{name:"MA5-MA10",type:"line",stack:"value",data:n.map(function(t,e){return(t-i[e]).toFixed(2)})},{name:"MA5-MA20",type:"line",stack:"value",data:n.map(function(t,e){return(t-s[e]).toFixed(2)})},{name:"MA10-MA20",type:"line",stack:"value",data:i.map(function(t,e){return(t-s[e]).toFixed(2)})}]};A.a.init(document.getElementById("kline1")).setOption(a)},getKline:function(t){var e=this;this.klineData=[],this.$http("http://www.abichi.club/binanceapi/api/v1/klines",{params:{symbol:"BTCUSDT",interval:t,limit:500}}).then(function(t){e.klineData=t.data,e.initKline1(),console.log(t)})}}},it={render:function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{padding:"30px"}},[n("Row",{attrs:{gutter:16}},t._l(t.buttonIntervals,function(e){return n("Col",{key:e,staticStyle:{"margin-bottom":"10px"},attrs:{span:"6"}},[n("Button",{attrs:{long:""},on:{click:function(n){t.getKline(e)}}},[t._v(t._s(e))])],1)})),t._v(" "),n("Row",[n("Col",{attrs:{span:"24"}},[n("div",{staticStyle:{width:"100%",height:"500px"},attrs:{id:"kline1"}})])],1)],1)},staticRenderFns:[]},st=n("VU/8")(nt,it,!1,null,null,null).exports;i.default.use(c.a);var at=new c.a({mode:"history",routes:[{path:"/",name:"Home",component:_},{path:"/aex",name:"Aex",component:W},{path:"/usdt",name:"Usdt",component:X},{path:"/zb",name:"zb",component:p},{path:"/bitcny",name:"bitcny",component:C},{path:"/tiger",name:"tiger",component:w},{path:"/chart",name:"chart",component:O},{path:"/flow",name:"flow",component:H},{path:"/qt",name:"qt",component:T},{path:"/okeo",name:"OkEo",component:tt},{path:"/averagechart",name:"AverageChart",component:st}]}),ct=n("BTaQ"),rt=n.n(ct);n("+skl");i.default.use(rt.a),i.default.config.productionTip=!1,i.default.prototype.$http=l.a,new i.default({el:"#app",router:at,template:"<App/>",components:{App:a}})},OF4Q:function(t,e){},QuRx:function(t,e){},Tb4J:function(t,e){},c3pG:function(t,e){},c6Y0:function(t,e){},l1dH:function(t,e){},uslO:function(t,e,n){var i={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function s(t){return n(a(t))}function a(t){var e=i[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}s.keys=function(){return Object.keys(i)},s.resolve=a,t.exports=s,s.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.bc600150871694e59301.js.map