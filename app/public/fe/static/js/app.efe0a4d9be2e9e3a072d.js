webpackJsonp([1],{"+rTK":function(t,e){},"+skl":function(t,e){},BUqm:function(t,e){},KtYF:function(t,e,a){(function(t){var e,a,n,i=(e=function(t,e,a){return(t*(a-1)+2*e)/(a+1)},a=function(t){for(var e=t[0][0],a=t[0][1],n=0;n<t.length;n++){var i=t[n],s=i[0],r=i[1];s>e&&(e=s),r<a&&(a=r)}return[e,a]},{OBV:function(t){for(var e,a=[],n=t.length,i=0;i<n;i++){var s=0,r=t[i];if(0!=i){var d=a[i-1];s=r[0]>=e[0]?d+r[1]:d-r[1]}a.push(s),e=r}return a},MACD:function(t){for(var a,n,i=[],s=[],r=[],d=[],c=[],o=0;o<t.length;o++){var u=t[o];0==o?(i.push(u),s.push(u),d.push(0)):(i.push(e(i[o-1],u,12)),s.push(e(s[o-1],u,26))),r.push(i[o]-s[o]),0!=o&&d.push((a=d[o-1],n=r[o],(8*a+2*n)/10)),c.push(2*(r[o]-d[o]))}return{diffs:r,deas:d,bars:c}},KDJ:function(t){for(var e,n,i,s,r,d,c,o=[],u=[],l=[],f=[],h=[],v=0;v<t.length;v++){var m=t[v],_=m[2];o.push(m),(d=(r=a(o))[0])==(c=r[1])?u.push(0):u.push((_-c)/(d-c)*100),9==o.length&&o.shift(),0==v&&(e=n=u[v]),i=2/3*e+1/3*u[v],l.push(i),e=i,s=2/3*n+1/3*i,f.push(s),n=s,h.push(3*i-2*s)}return{k:l,d:f,j:h}},BOLL:function(t){for(var e=0,a=0,n=[],i=[],s=[],r=0;r<t.length;r++){var d,c,o,u;e+=t[r],r>=19?(d=(e-=a)/20,i.push(d),a=t[o=r-19],u=t.slice(o,o+20).reduce(function(t,e){return t+Math.pow(e-d,2)},0),c=Math.sqrt(u/20),n.push(d+2*c),s.push(d-2*c)):(n.push(-1),i.push(-1),s.push(-1))}return{upper:n,mid:i,lower:s}},RSI:function(t){for(var e=t[0],a=[6,12,24],n={},i=0;i<t.length;i++){for(var s=t[i],r=Math.max(s-e,0),d=Math.abs(s-e),c=0;c<a.length;c++){var o=a[c];n.hasOwnProperty("rsi"+o)?(n["lastSm"+o]=(r+(o-1)*n["lastSm"+o])/o,n["lastSa"+o]=(d+(o-1)*n["lastSa"+o])/o,0!=n["lastSa"+o]?n["rsi"+o].push(n["lastSm"+o]/n["lastSa"+o]*100):n["rsi"+o].push(0)):(n["lastSm"+o]=n["lastSa"+o]=0,n["rsi"+o]=[0])}e=s}return{rsi6:n.rsi6,rsi12:n.rsi12,rsi24:n.rsi24}},MA:n=function(t,e){for(var a=0,i=[],s=0;s<t.length;s++)a+=t[s],n=a/e,i.push(n);return i}});t&&(t.exports=i)}).call(e,a("3IRH")(t))},NHnr:function(t,e,a){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var n=a("7+uW"),i={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{attrs:{id:"app"}},[e("router-view")],1)},staticRenderFns:[]};var s=a("VU/8")({name:"app"},i,!1,function(t){a("BUqm")},null,null).exports,r=a("/ocq"),d={render:function(){var t=this.$createElement;return(this._self._c||t)("div",[this._v("\n  my wechat: dfq_qjb\n")])},staticRenderFns:[]},c=a("VU/8")({name:"Home"},d,!1,null,null,null).exports,o=a("mtWM"),u=a.n(o),l=a("hU7x"),f=a.n(l),h=a("M4fF"),v=a.n(h),m="http://www.abichi.club";function _(t){return t.toFixed(3)}var p={name:"Home",created:function(){this.getZbData(),this.getHbOtcData(),this.getHL(),this.getZbDepth(),this.getZbOtcData(),this.getAexData(),this.getAexCnc()},computed:{strategy:function(){var t=this.zbPrice-this.hlPrice;return(1-(10*(1-this.zbOtcPrice_b)/1+5*t)/2).toFixed(3)},aexUsdtRefer:function(){return(this.aexUsdtPrice*this.aexCncBuyPrice/this.zbOtcPrice_s).toFixed(3)},aexUsdtRefer_r:function(){return(this.aexUsdtPrice/this.aexCncSellPrice/this.zbOtcPrice_b).toFixed(3)}},data:function(){return{hbPrice:"",hbPrice_b:"",zbPrice:"",hlPrice:"",zbAsks:[],zbBids:[],zbPrice_s:"",zbOtcPrice_b:"",zbOtcPrice_s:"",btcUsdtAsks:[],btcUsdtBids:[],aexUsdtPrice:"",aexCncBuyPrice:"",aexCncSellPrice:""}},filters:{getProfit:function(t,e,a,n){return _((a/e*(arguments.length>4&&void 0!==arguments[4]?arguments[4]:1)-n)*t-a)},diff:function(t,e){return _(t-e)},getRatio:function(t,e){return _(t/e)},getRatioDynamic:function(t,e){return _(t/v.a.get(e,"0"))},getQcDiff:function(t,e){return _(t-e)}},methods:{getAexData:function(){var t=this;u()(m+"/aexctcapi/trade/getTradeList30.php?coinname=USDT&mk_type=CNC&grade=0").then(function(e){t.aexUsdtPrice=e.data.tradeStr[0][1]})},getAexCnc:function(){var t=this;u()(m+"/aexctcapi/trade/c2c/order_list_c2c.php?order_type=1&market=CNY&coin=CNC&page=0").then(function(e){t.aexCncBuyPrice=e.data.data.ord_list[1].pice}),u()(m+"/aexctcapi/trade/c2c/order_list_c2c.php?order_type=2&market=CNY&coin=CNC&page=0").then(function(e){t.aexCncSellPrice=e.data.data.ord_list[1].pice})},getZbDepth:function(){var t=this;u()(m+"/zbapi/data/v1/depth?market=usdt_qc&size=50").then(function(e){t.zbAsks=e.data.asks.filter(function(t){return t[1]>=5e3}).reverse(),t.zbBids=e.data.bids.filter(function(t){return t[1]>=5e3})})},getHL:function(){var t=this;f()("https://api.money.126.net/data/feed/FX_USDCNY",null,function(e,a){t.hlPrice=a.FX_USDCNY.price})},getZbData:function(){var t=this;u()(m+"/zbapi/data/v1/allTicker").then(function(e){t.zbPrice=e.data.usdtqc.sell,t.zbPrice_s=e.data.usdtqc.buy})},getHbOtcData:function(){var t=this;u()(m+"/hbotcapi/",{params:{country:0,currency:1,payMethod:0,currPage:1,coinId:2,tradeType:0,merchant:1,online:1}}).then(function(e){t.hbPrice=e.data.data[5].price}),u()(m+"/hbotcapi/",{params:{country:0,currency:1,payMethod:0,currPage:1,coinId:2,tradeType:1,merchant:1,online:1}}).then(function(e){t.hbPrice_b=e.data.data[5].price})},getZbOtcData:function(){var t=this;u()(m+"/zbotcapi/otc/trade/qc_cny",{params:{type:2}}).then(function(e){for(var a=e.data,n=/\d\.\d{2,3}/g,i=1;i<10;i++)if(a.match(n)[i]<1.5&&a.match(n)[i]>.8){t.zbOtcPrice_b=a.match(n)[i];break}}),u()(m+"/zbotcapi/otc/trade/qc_cny",{params:{type:1}}).then(function(e){for(var a=e.data,n=/\d\.\d{2,3}/g,i=1;i<10;i++)if(a.match(n)[i]<1.5&&a.match(n)[i]>.8){t.zbOtcPrice_s=a.match(n)[i];break}})}}},g={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("router-link",{staticClass:"navigation",attrs:{to:"/botprofit"}}),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"left"},[t._v("\n      zb\n    ")]),t._v(" "),a("div",{staticClass:"right"},[t._v("\n      "+t._s(t.zbPrice)+"/"+t._s(t.zbPrice_s)+"\n    ")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"left"},[t._v("\n      zbotc\n    ")]),t._v(" "),a("div",{staticClass:"right"},[t._v("\n      "+t._s(t.zbOtcPrice_b)+"/"+t._s(t.zbOtcPrice_s)+"\n    ")])]),t._v(" "),a("div",{staticClass:"item"},[a("div",{staticClass:"left"},[t._v("\n      strategy\n    ")]),t._v(" "),a("div",{staticClass:"right"},[a("div",[t._v("\n        "+t._s(t.strategy)+"\n      ")])])]),t._v(" "),a("div",{staticClass:"table-box"},[a("table",{staticClass:"table-zb"},[t._m(0),t._v(" "),a("thead",[a("tr",[a("td",[t._v("hb")]),t._v(" "),a("td",[t._v(t._s(t.hbPrice))]),t._v(" "),a("td",[t._v(t._s(t._f("getRatio")(t.hbPrice,t.zbOtcPrice_s)))])]),t._v(" "),a("tr",[a("td",[t._v("hb to zb")]),t._v(" "),a("td",[t._v(t._s(t.hbPrice_b))]),t._v(" "),a("td",[t._v(t._s(t._f("getRatio")(t.hbPrice_b,t.zbOtcPrice_b)))])]),t._v(" "),a("tr",[a("td",[t._v("aex")]),t._v(" "),a("td",[t._v(t._s(t.aexUsdtPrice))]),t._v(" "),a("td",[t._v(t._s(t.aexUsdtRefer))])]),t._v(" "),a("tr",[a("td",[t._v("aex_r")]),t._v(" "),a("td",[t._v(t._s(t.aexUsdtPrice))]),t._v(" "),a("td",[t._v(t._s(t.aexUsdtRefer_r))])]),t._v(" "),a("tr",[a("td",[t._v("exchange")]),t._v(" "),a("td",[t._v(t._s(t.hlPrice))]),t._v(" "),a("td",[t._v(t._s(t._f("diff")(t.zbPrice,t.hlPrice)))])])])])]),t._v(" "),a("div",{staticStyle:{height:"20px"}}),t._v(" "),a("hr"),t._v(" "),a("div",{staticClass:"clearBoth"},[a("div",{staticStyle:{width:"50%",float:"left"}},[a("table",{staticClass:"table-zb"},[t._m(1),t._v(" "),a("tbody",t._l(t.zbAsks,function(e){return a("tr",[a("td",[t._v(t._s(e[0]))]),t._v(" "),a("td",[t._v(t._s(e[1]))])])}))])]),t._v(" "),a("div",{staticStyle:{width:"50%",float:"left"}},[a("table",{staticClass:"table-zb"},[t._m(2),t._v(" "),a("tbody",t._l(t.zbBids,function(e){return a("tr",[a("td",[t._v(t._s(e[0]))]),t._v(" "),a("td",[t._v(t._s(e[1]))])])}))])])])],1)},staticRenderFns:[function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("\n            platform\n          ")]),this._v(" "),e("th",[this._v("\n            price\n          ")]),this._v(" "),e("th",[this._v("\n            refer\n          ")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("ask")])])])},function(){var t=this.$createElement,e=this._self._c||t;return e("thead",[e("tr",[e("th",[this._v("bid")])])])}]};var j=a("VU/8")(p,g,!1,function(t){a("da6s")},"data-v-60e117e8",null).exports,b=a("//Fk"),x=a.n(b),y=a("PJh5"),k=a.n(y),I=a("XLwt"),z=a.n(I);a("UZ5h");function M(t){return t[2]/2+t[3]/2}var w={t:[1534867200,1534780800,1534694400,1534435200,1534348800,1534262400,1534176e3,1534089600,1533830400,1533744e3,1533657600,1533571200,1533484800,1533225600,1533139200,1533052800,1532966400,153288e4,1532620800,1532534400,1532448e3,1532361600,1532275200,1532016e3,1531929600,1531843200,1531756800,1531670400,1531411200,1531324800,1531238400,1531152e3,1531065600,1530806400,153072e4,1530633600,1530547200,1530460800,1530201600,1530115200,1530028800,1529942400,1529856e3,1529596800,1529510400,1529424e3,1529337600,1528992e3,1528905600,1528819200,1528732800,1528646400,1528387200,1528300800,1528214400,1528128e3,1528041600,1527782400,1527696e3,1527609600,1527523200,1527436800,1527177600,1527091200,1527004800,1526918400,1526832e3,1526572800,1526486400,15264e5,1526313600,1526227200,1525968e3,1525881600,1525795200,1525708800,1525622400,1525363200,1525276800,1525190400,1524758400,1524672e3,1524585600,1524499200,1524412800,1524153600,1524067200,1523980800,1523894400,1523808e3,1523548800,1523462400,1523376e3,1523289600,1523203200,1522771200,1522684800,1522598400,1522339200,1522252800,1522166400,152208e4,1521993600,1521734400,1521648e3,1521561600,1521475200,1521388800,1521129600,1521043200,1520956800,1520870400,1520784e3,1520524800,1520438400,1520352e3,1520265600,1520179200,151992e4,1519833600,1519747200,1519660800,1519574400,1519315200,1519228800,1519142400,1518537600,1518451200,1518364800,1518105600,1518019200,1517932800,1517846400,151776e4,1517500800,1517414400,1517328e3,1517241600,1517155200,1516896e3,1516809600,1516723200,1516636800,1516550400,1516291200,1516204800,1516118400,1516032e3,1515945600,1515686400,15156e5,1515513600,1515427200,1515340800,1515081600,1514995200,1514908800,1514822400,1514476800,1514390400,1514304e3,1514217600,1514131200,1513872e3,1513785600,1513699200,1513612800,1513526400,1513267200,1513180800,1513094400,1513008e3,1512921600,1512662400,1512576e3,1512489600,1512403200,1512316800,1512057600,1511971200,1511884800,1511798400,1511712e3,1511452800,1511366400,151128e4,1511193600,1511107200,1510848e3,1510761600,1510675200,1510588800,1510502400,1510243200,1510156800,1510070400,1509984e3,1509897600,1509638400,1509552e3],c:[6.8421,6.8472,6.8577,6.8775,6.8853,6.9348,6.8842,6.8912,6.8467,6.821,6.8355,6.8314,6.8535,6.827,6.8428,6.823,6.8167,6.8155,6.8133,6.7928,6.7697,6.7928,6.7986,6.7697,6.7751,6.7189,6.7065,6.6911,6.6917,6.6678,6.6826,6.634,6.616,6.6427,6.637,6.6325,6.6425,6.668,6.621,6.6271,6.6083,6.5793,6.541,6.5052,6.4932,6.4738,6.4853,6.4387,6.4017,6.3979,6.4028,6.4018,6.4067,6.3921,6.3884,6.4061,6.408,6.4204,6.4106,6.419,6.4176,6.3993,6.3918,6.3784,6.3886,6.3675,6.3835,6.3795,6.3672,6.3715,6.3775,6.3393,6.334,6.3492,6.3624,6.3707,6.3667,6.3627,6.3537,6.3625,6.3322,6.3365,6.3266,6.3065,6.317,6.2964,6.2791,6.2744,6.2825,6.2765,6.275,6.2915,6.269,6.2832,6.307,6.3033,6.2899,6.2804,6.2755,6.2898,6.298,6.283,6.2731,6.316,6.335,6.3232,6.3341,6.3322,6.3348,6.3221,6.318,6.3217,6.3295,6.3344,6.3422,6.3254,6.3145,6.3496,6.3454,6.3582,6.331,6.3169,6.3161,6.3372,6.3527,6.3421,6.3432,6.341,6.3275,6.3032,6.3298,6.2778,6.2907,6.2926,6.3008,6.2962,6.2888,6.3239,6.3405,6.3283,6.3264,6.3575,6.4047,6.405,6.404,6.42,6.4343,6.444,6.4371,6.469,6.5063,6.5083,6.5297,6.4998,6.4885,6.4935,6.503,6.493,6.5068,6.5335,6.5564,6.545,6.5398,6.5773,6.5848,6.5785,6.6047,6.6164,6.6094,6.6093,6.6195,6.6215,6.6187,6.6209,6.6193,6.6149,6.6193,6.6198,6.6163,6.6091,6.6167,6.6078,6.5992,6.6018,6.5835,6.6103,6.629,6.6372,6.6268,6.6303,6.6237,6.6361,6.6405,6.6409,6.6402,6.6279,6.6405,6.6338,6.639,6.6093],o:[6.838,6.8365,6.865,6.8853,6.9181,6.8921,6.8891,6.8731,6.8355,6.828,6.8126,6.8505,6.8275,6.858,6.82,6.8216,6.8267,6.818,6.8073,6.738,6.7945,6.8181,6.757,6.7909,6.7225,6.7053,6.6869,6.6904,6.6558,6.7035,6.6712,6.6027,6.6409,6.6459,6.6325,6.6407,6.6997,6.6283,6.6271,6.6154,6.5801,6.5411,6.5191,6.4929,6.4805,6.4665,6.4394,6.4191,6.3983,6.4107,6.4083,6.4063,6.3975,6.3884,6.4061,6.4078,6.419,6.4094,6.419,6.4215,6.4083,6.3895,6.3863,6.3885,6.3707,6.375,6.379,6.3705,6.3715,6.3777,6.3433,6.3306,6.3398,6.3685,6.3749,6.3649,6.352,6.3464,6.3653,6.3537,6.3413,6.3253,6.3065,6.3208,6.2963,6.2864,6.2786,6.2866,6.2751,6.2789,6.2885,6.272,6.2825,6.3062,6.3034,6.2908,6.2838,6.2679,6.2859,6.2969,6.2726,6.2594,6.311,6.3322,6.3143,6.3351,6.3254,6.3359,6.3295,6.3078,6.3206,6.3212,6.3263,6.347,6.3332,6.3242,6.3361,6.3302,6.3439,6.3328,6.3342,6.3023,6.3301,6.3489,6.3462,6.3419,6.3377,6.3289,6.2934,6.33,6.2894,6.2701,6.2978,6.3058,6.2806,6.296,6.3273,6.3365,6.3294,6.34,6.3607,6.396,6.394,6.4095,6.405,6.4377,6.4295,6.4435,6.455,6.4922,6.5146,6.5307,6.505,6.4725,6.4825,6.506,6.4979,6.5045,6.531,6.5552,6.545,6.5412,6.5719,6.5815,6.5583,6.6055,6.6154,6.6132,6.6093,6.6055,6.6225,6.6182,6.6174,6.619,6.6185,6.6167,6.616,6.6115,6.6097,6.6062,6.6069,6.6018,6.5941,6.576,6.6,6.6302,6.6378,6.6339,6.6235,6.6295,6.631,6.6383,6.6502,6.641,6.6321,6.6395,6.6338,6.6385,6.6069,6.5953],h:[6.8507,6.8538,6.8698,6.8972,6.922,6.9376,6.898,6.8913,6.8638,6.8409,6.8417,6.8661,6.8576,6.8972,6.8513,6.8338,6.8388,6.8428,6.8424,6.7979,6.8087,6.829,6.8006,6.8149,6.7867,6.7255,6.71,6.7071,6.7085,6.7055,6.6826,6.6404,6.6444,6.6689,6.6487,6.641,6.7214,6.6719,6.6426,6.6345,6.6183,6.5864,6.5476,6.5107,6.5099,6.4825,6.4853,6.4394,6.4076,6.4137,6.4122,6.4119,6.4151,6.3992,6.4061,6.4161,6.4266,6.4239,6.419,6.4369,6.4257,6.4009,6.3948,6.3983,6.3945,6.3815,6.3965,6.3826,6.3724,6.3819,6.3795,6.3443,6.3519,6.3716,6.3827,6.3714,6.368,6.366,6.3736,6.3691,6.348,6.3369,6.3301,6.3247,6.3205,6.2975,6.2838,6.293,6.2863,6.2888,6.2976,6.2943,6.2909,6.3075,6.3196,6.311,6.292,6.2837,6.2884,6.3062,6.299,6.2857,6.3177,6.3369,6.3355,6.3386,6.3346,6.34,6.3358,6.3263,6.3235,6.3361,6.3366,6.3534,6.3423,6.3337,6.3483,6.35,6.3637,6.3596,6.3378,6.3172,6.3307,6.3498,6.3664,6.3421,6.3563,6.3511,6.3331,6.3333,6.3449,6.2794,6.3045,6.3102,6.3028,6.3105,6.334,6.3471,6.341,6.3415,6.3614,6.3993,6.413,6.4171,6.4103,6.4417,6.4418,6.4517,6.4607,6.4922,6.5188,6.5362,6.5317,6.5006,6.4908,6.5105,6.511,6.5045,6.532,6.5594,6.5604,6.5572,6.5721,6.5845,6.5885,6.6058,6.6174,6.618,6.6114,6.6112,6.6233,6.6233,6.6187,6.6213,6.6194,6.6197,6.6194,6.6206,6.6173,6.618,6.6185,6.6091,6.6074,6.6065,6.6038,6.6328,6.6421,6.6384,6.6355,6.6385,6.6356,6.6441,6.6517,6.6455,6.6442,6.6437,6.641,6.6417,6.6393,6.6132],l:[6.8349,6.83,6.8424,6.8638,6.8776,6.8852,6.8746,6.8656,6.8286,6.8119,6.8008,6.82,6.801,6.824,6.8027,6.7878,6.8086,6.8123,6.7963,6.7358,6.7572,6.7878,6.7403,6.7647,6.7196,6.6931,6.6707,6.6691,6.65,6.6584,6.6501,6.5993,6.6103,6.6381,6.6259,6.5995,6.6421,6.6247,6.6042,6.6059,6.5774,6.5316,6.5132,6.4902,6.4763,6.4611,6.4386,6.4095,6.3872,6.3963,6.3966,6.3973,6.3946,6.386,6.3841,6.3963,6.4011,6.4047,6.3971,6.4152,6.4027,6.3852,6.3816,6.3745,6.3689,6.3618,6.3732,6.3642,6.3523,6.3624,6.3413,6.3286,6.3261,6.343,6.3611,6.3595,6.345,6.3419,6.3468,6.3513,6.3298,6.3185,6.2982,6.304,6.2859,6.2789,6.2596,6.2732,6.2727,6.2752,6.275,6.2713,6.2685,6.2809,6.2935,6.284,6.2787,6.2677,6.2645,6.2817,6.266,6.2431,6.2706,6.3139,6.3095,6.3232,6.3222,6.3249,6.319,6.3032,6.3082,6.3184,6.3201,6.3294,6.322,6.3182,6.3097,6.3249,6.337,6.3322,6.3224,6.2941,6.3024,6.3311,6.3417,6.3419,6.3285,6.3198,6.286,6.2943,6.2813,6.2525,6.2687,6.2847,6.2673,6.2868,6.2861,6.3192,6.3212,6.3116,6.3127,6.357,6.3928,6.3983,6.3879,6.4187,6.4204,6.4235,6.392,6.457,6.4979,6.5028,6.4975,6.4725,6.4782,6.4931,6.496,6.491,6.5037,6.5281,6.5426,6.5347,6.5393,6.568,6.5532,6.5752,6.6031,6.6107,6.6047,6.605,6.6155,6.6171,6.6125,6.6141,6.6121,6.6105,6.6087,6.61,6.6036,6.6022,6.5957,6.592,6.5929,6.5744,6.5785,6.6103,6.628,6.6267,6.622,6.6267,6.6153,6.6349,6.6338,6.6299,6.6234,6.6248,6.6218,6.6253,6.6065,6.5844],v:[0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],s:"ok"},C={name:"AverageChart",data:function(){return{klineData:[],btcTop:20093,ethTop:1424,eosTop:23.28,kline:{},buttonIntervals:["1min","3min","5min","15min","30min","1hour","4hour","6hour","1day"]}},methods:{getProfit:function(t,e){var a=1e4,n=0,i=0,s=100;t.forEach(function(t,r){var d=e[r];if(t<0&&a>100*d&&(a-=100*d,n+=100,i++,s=d),t>0&&n>100){if(d<s)return;a+=100*d,n-=100,i++}}),console.log(a,n,i,a+7*n)},initKline:function(){var t=this.kline,e=t.usdt_qc,a=t.btc_qc,n=t.btc_usdt,i=t.eos_qc,s=t.eos_usdt,r=e.map(function(t){return k()(t[0]).format("MM-DD HH:mm")}),d=e.map(function(t,e){return M(t)}),c=a.map(function(t,e){return(d[e]-M(t)/M(n[e])).toFixed(4)}),o=i.map(function(t,e){return(d[e]-M(t)/M(s[e])).toFixed(4)});this.getProfit(c,d);var u={title:{text:"均线"},tooltip:{trigger:"axis"},legend:{data:["usdt","usdt(btc)","usdt(eos)"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},dataZoom:[{type:"inside",start:90,end:100},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],xAxis:{type:"category",boundaryGap:!1,data:r},yAxis:[{name:"price",type:"log",max:"dataMax",min:"dataMin"},{name:"diff",max:"dataMax",min:"dataMin",type:"value"}],series:[{name:"usdt",type:"line",data:d},{name:"usdt(btc)",type:"line",yAxisIndex:1,data:c},{name:"usdt(eos)",yAxisIndex:1,type:"line",data:o}]};z.a.init(document.getElementById("kline1")).setOption(u)},initKline1:function(){var t=this.kline.usdt_qc,e=0,a=100,n={title:{text:"均线"},tooltip:{trigger:"axis"},legend:{data:["usdt","rsv"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},dataZoom:[{type:"inside",start:90,end:100},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],xAxis:{type:"category",boundaryGap:!1,data:t.map(function(t){return k()(t[0]).format("MM-DD HH:mm")})},yAxis:[{name:"price",type:"log",max:"dataMax",min:"dataMin"},{name:"diff",max:"dataMax",min:"dataMin",type:"value"}],series:[{name:"usdt",type:"line",data:t.map(function(t,n){return t[2]>e&&(e=t[2]),t[3]<a&&(a=t[3]),M(t)})},{name:"rsv",type:"line",yAxisIndex:1,data:t.map(function(t){return(t[4]-a)/(e-a)*100})}]};z.a.init(document.getElementById("kline1")).setOption(n)},initKline2:function(){var t=this.kline.usdt_qc,e=t.map(function(t){return k()(t[0]).format("MM-DD HH:mm")}),a=0,n=100,i=t.map(function(t,e){return t[2]>a&&(a=t[2]),t[3]<n&&(n=t[3]),M(t)}),s=i.map(function(t,e){return t-w.c.reverse()[e]}),r={title:{text:"均线"},tooltip:{trigger:"axis"},legend:{data:["usdt","exchange"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},dataZoom:[{type:"inside",start:90,end:100},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],xAxis:{type:"category",boundaryGap:!1,data:e},yAxis:[{name:"price",type:"log",max:"dataMax",min:"dataMin"},{name:"diff",max:"dataMax",min:"dataMin",type:"value"}],series:[{name:"usdt",type:"line",data:i},{name:"exchange",type:"line",data:w.c.reverse()},{name:"diff",type:"line",yAxisIndex:1,data:s}]};z.a.init(document.getElementById("kline1")).setOption(r)},getKline:function(t,e,a){var n=this;return new x.a(function(i,s){setTimeout(function(){n.$http("http://api.zb.cn/data/v1/kline",{params:{market:e,type:t,size:a||1e3}}).then(function(t){n.kline[e]=t.data.data,i(t.data.data)})},1e3)})},initData:function(t){var e=this;this.getKline(t,"usdt_qc",200).then(function(t){e.initKline2()})}}},F={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{padding:"30px"}},[a("Row",{attrs:{gutter:16}},t._l(t.buttonIntervals,function(e){return a("Col",{key:e,staticStyle:{"margin-bottom":"10px"},attrs:{span:"6"}},[a("Button",{attrs:{long:""},on:{click:function(a){t.initData(e)}}},[t._v(t._s(e))])],1)})),t._v(" "),a("Row",[a("Col",{attrs:{span:"24"}},[a("div",{staticStyle:{width:"100%",height:"500px"},attrs:{id:"kline1"}})])],1)],1)},staticRenderFns:[]},P=a("VU/8")(C,F,!1,null,null,null).exports,A=a("fZjL"),S=a.n(A),O=a("KtYF"),K={name:"BotProfit",filters:{getFixed:function(t,e){return(t?t/1:0).toFixed(e)},getStatus:function(t,e,a){return t/1<e/1?-1:t/1>a/1?1:0}},data:function(){return{type:"",market:"usdt_qc",kline:[],buttonMarkets:["usdt_qc","btc_usdt","eth_usdt"],buttonIntervals:["1min","3min","5min","15min","30min","1hour","4hour","6hour","1day"],strategy1Data:{account:1e4,usdtAccount:0,sellItems:[]},macd:{},kdj:{},minItems:[],maxItems:[],buyItems:[],perIndicator:{maxMacd:{},minMacd:{},maxKdj:{},minKdj:{},buyMacd:{},buyKdj:{}},nowIndicator:{macd:{},kdj:{}}}},methods:{initChart:function(t){var e={title:{text:"均线"},tooltip:{trigger:"axis"},legend:{data:["kline","barSum"]},grid:{left:"3%",right:"4%",bottom:"3%",containLabel:!0},dataZoom:[{type:"inside",start:90,end:100},{start:0,end:10,handleIcon:"M10.7,11.9v-1.3H9.3v1.3c-4.9,0.3-8.8,4.4-8.8,9.4c0,5,3.9,9.1,8.8,9.4v1.3h1.3v-1.3c4.9-0.3,8.8-4.4,8.8-9.4C19.5,16.3,15.6,12.2,10.7,11.9z M13.3,24.4H6.7V23h6.6V24.4z M13.3,19.6H6.7v-1.4h6.6V19.6z",handleSize:"80%",handleStyle:{color:"#fff",shadowBlur:3,shadowColor:"rgba(0, 0, 0, 0.6)",shadowOffsetX:2,shadowOffsetY:2}}],xAxis:{type:"category",boundaryGap:!1,data:this.kline.map(function(t){return k()(t[0]).format("MM-DD HH:mm:ss")})},yAxis:[{name:"kline",type:"log",max:"dataMax",min:"dataMin"},{name:"barSum",max:"dataMax",min:"dataMin",type:"value"}],series:[{name:"kline",type:"line",data:this.kline.map(function(t){return t[4]})},{name:"barSum",type:"line",yAxisIndex:1,data:t}]};z.a.init(document.getElementById("kline1")).setOption(e)},getKline:function(t,e){var a=this;t?this.market=t:t=this.market,e?this.type=e:e=this.type,this.$http("http://www.abichi.club/zbapi/data/v1/kline",{params:{market:t,type:e,size:1e3}}).then(function(t){a.kline=t.data.data,a.macd=Object(O.MACD)(a.kline.map(function(t){return t[4]})),a.kdj=Object(O.KDJ)(a.kline.map(function(t){return[t[2],t[3],t[4]]})),a.parseData(),a.strategy6()})},strategy1:function(){var t=this,e={account:1e4,usdtAccount:0,sellItems:[]};this.kline.forEach(function(a,n,i){var s=a[4];t.macd.deas[n]<-.00132&&e.account-100*a[4]>0&&(e.account=e.account-100*a[4],e.usdtAccount=e.usdtAccount+100,e.sellItems.push(a[4]+.01)),e.sellItems.forEach(function(t,a){e.usdtAccount-100<0||999999!=t&&t<s&&(e.account=e.account+100*t,e.usdtAccount=e.usdtAccount-100,e.sellItems[a]=999999)})}),e.profit=(e.account+6.85*e.usdtAccount).toFixed(2),console.log(e)},strategy2:function(){var t=this,e={account:1e4,usdtAccount:0,sellItems:[]},a=null,n=!1,i=!1,s=null;this.kline.forEach(function(r,d,c){r[4];var o=t.macd.deas[d];if(o<-1e-4&&!n){if(i=!1,null==a)return a=o;a<o?(e.account-100*r[4]>0&&(e.account=e.account-100*r[4],e.usdtAccount=e.usdtAccount+100,n=!0),a=null):a=o}else a=null;if(o>1e-4&&!i){if(n=!1,null==s)return s=o;s>o?(e.usdtAccount-100>0&&(e.account=e.account+100*r[4],e.usdtAccount=e.usdtAccount-100,i=!0),s=null):s=o}else s=null}),e.profit=(e.account+6.85*e.usdtAccount).toFixed(2),console.log(e)},strategy3:function(){var t=this,e={account:1e4,usdtAccount:0,sellItems:[]};this.kline.forEach(function(a,n){var i=a[4],s=t.kdj.j[n];s<0&&e.account-1e3*i>0&&(e.account=e.account-1e3*i,e.usdtAccount=e.usdtAccount+1e3),s>88&&e.usdtAccount>0&&(e.account=e.account+i*e.usdtAccount,e.usdtAccount=0)}),e.profit=(e.account+6.95*e.usdtAccount).toFixed(2),console.log(e)},strategy4:function(){var t=this,e={account:1e4,usdtAccount:0,sellItems:[]};this.kline.forEach(function(a,n){if(0!=n){var i=a[4],s=(t.kdj.j[n],t.macd.deas[n]),r=t.macd.deas[n-1],d=parseInt(1e4/i);s<-.003&&s>r&&e.account-i*d>0&&(e.account=e.account-i*d,e.usdtAccount=e.usdtAccount+d),s>0&&s<r&&e.usdtAccount>0&&(e.account=e.account+i*e.usdtAccount,e.usdtAccount=0)}}),e.profit=(e.account+6.95*e.usdtAccount).toFixed(2),console.log(e)},strategy5:function(){var t=this;function e(t,e,a){return t>a?1:t<e?-1:0}var a={account:1e4,usdtAccount:0,sellItems:[],sellCounts:[]};this.kline.forEach(function(n,i){var s=n[4],r={dea:e(t.macd.deas[i],t.perIndicator.minMacd.dea,t.perIndicator.maxMacd.dea),diff:e(t.macd.diffs[i],t.perIndicator.minMacd.diff,t.perIndicator.maxMacd.diff),bar:e(t.macd.bars[i],t.perIndicator.minMacd.bar,t.perIndicator.maxMacd.bar),k:e(t.kdj.k[i],t.perIndicator.minKdj.k,t.perIndicator.maxKdj.k),d:e(t.kdj.d[i],t.perIndicator.minKdj.d,t.perIndicator.maxKdj.d),j:e(t.kdj.j[i],t.perIndicator.minKdj.j,t.perIndicator.maxKdj.j)};S()(r).forEach(function(t){r[t]});-1==r.dea&&-1==r.diff&&-1==r.bar&&a.account-200*s>0&&(a.account=a.account-200*s,a.usdtAccount=a.usdtAccount+200),r.dea+r.diff+r.bar>1&&(a.account=a.account+s*a.usdtAccount,a.usdtAccount=0);var d=(a.account+6.9*a.usdtAccount).toFixed(2);d<1e4&&console.log(d)}),a.profit=(a.account+6.9*a.usdtAccount).toFixed(2),console.log(a)},strategy6:function(){var t=[],e=0;this.macd.bars.forEach(function(a){e+=a,t.push(e.toFixed(4))}),this.initChart(t),console.log(t,e)},parseData:function(){var t=this,e=[],a=[],n=[],i=0;this.kline.forEach(function(t,s,r){for(var d=t[4],c=s,o=s,u=null,l=0;l<66&&(null!=c||null!=o);l++){var f=s-l+33;if(s!=f)if(f<0||f>r.length-1)c=null,o=null;else{var h=r[f][4];d<h?c=null:o=null,d<h-.01&&f>s&&s>i&&(u=s,i=f)}}c&&e.push(c),o&&a.push(o),u&&n.push(u)}),this.minItems=a,this.maxItems=e,this.buyItems=n;var s={diff:0,dea:0,bar:0},r={k:0,d:0,j:0},d={diff:0,dea:0,bar:0},c={k:0,d:0,j:0},o={k:0,d:0,j:0},u={diff:0,dea:0,bar:0};a.forEach(function(e){r.k=r.k+t.kdj.k[e],r.d=r.d+t.kdj.d[e],r.j=r.j+t.kdj.j[e],s.diff=s.diff+t.macd.diffs[e],s.dea=s.dea+t.macd.deas[e],s.bar=s.bar+t.macd.bars[e]}),e.forEach(function(e){c.k=c.k+t.kdj.k[e],c.d=c.d+t.kdj.d[e],c.j=c.j+t.kdj.j[e],d.diff=d.diff+t.macd.diffs[e],d.dea=d.dea+t.macd.deas[e],d.bar=d.bar+t.macd.bars[e]}),n.forEach(function(e){o.k=o.k+t.kdj.k[e],o.d=o.d+t.kdj.d[e],o.j=o.j+t.kdj.j[e],u.diff=u.diff+t.macd.diffs[e],u.dea=u.dea+t.macd.deas[e],u.bar=u.bar+t.macd.bars[e]});var l={k:r.k/a.length,d:r.d/a.length,j:r.j/a.length},f={k:c.k/e.length,d:c.d/e.length,j:c.j/e.length},h={diff:s.diff/a.length,dea:s.dea/a.length,bar:s.bar/a.length},v={diff:d.diff/a.length,dea:d.dea/a.length,bar:d.bar/a.length},m={diff:u.diff/n.length,dea:u.dea/n.length,bar:u.bar/n.length},_={k:o.k/n.length,d:o.d/n.length,j:o.j/n.length};this.perIndicator={maxKdj:f,minKdj:l,maxMacd:v,minMacd:h,buyKdj:_,buyMacd:m};var p=this.kline.length-1;this.nowIndicator={macd:{dea:this.macd.deas[p],diff:this.macd.diffs[p],bar:this.macd.bars[p]},kdj:{k:this.kdj.k[p],d:this.kdj.d[p],j:this.kdj.j[p]}}}}},E={render:function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"container"},[a("h1",{staticStyle:{"text-align":"center"}},[t._v("\n    "+t._s(t.market)+" - "+t._s(t.type)+"\n  ")]),t._v(" "),a("router-link",{staticClass:"navigation",attrs:{to:"/zb"}}),t._v(" "),a("Row",{staticStyle:{padding:"10px 20px 20px","margin-top":"10px"},attrs:{gutter:16}},t._l(t.buttonMarkets,function(e){return a("Col",{key:e,staticStyle:{"margin-bottom":"10px"},attrs:{span:"8"}},[a("Button",{class:{active:e==t.market},attrs:{long:""},on:{click:function(a){t.getKline(e,null)}}},[t._v(t._s(e))])],1)})),t._v(" "),a("Row",{staticStyle:{padding:"0 20px 20px","margin-top":"0px"},attrs:{gutter:16}},t._l(t.buttonIntervals,function(e){return a("Col",{key:e,staticStyle:{"margin-bottom":"10px"},attrs:{span:"8"}},[a("Button",{class:{active:e==t.type},attrs:{long:""},on:{click:function(a){t.getKline(null,e)}}},[t._v(t._s(e))])],1)})),t._v(" "),a("div",[a("table",{staticClass:"mytable"},[t._m(0),t._v(" "),a("tbody",[a("tr",[a("td",[t._v("macd-dea")]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.nowIndicator.macd.dea,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.maxMacd.dea,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.minMacd.dea,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.buyMacd.dea,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getStatus")(t.nowIndicator.macd.dea,t.perIndicator.minMacd.dea,t.perIndicator.maxMacd.dea)))])]),t._v(" "),a("tr",[a("td",[t._v("macd-diff")]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.nowIndicator.macd.diff,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.maxMacd.diff,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.minMacd.diff,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.buyMacd.diff,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getStatus")(t.nowIndicator.macd.diff,t.perIndicator.minMacd.diff,t.perIndicator.maxMacd.diff)))])]),t._v(" "),a("tr",[a("td",[t._v("macd-bar")]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.nowIndicator.macd.bar,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.maxMacd.bar,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.minMacd.bar,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.buyMacd.bar,6)))]),t._v(" "),a("td",[t._v(t._s(t._f("getStatus")(t.nowIndicator.macd.bar,t.perIndicator.minMacd.bar,t.perIndicator.maxMacd.bar)))])]),t._v(" "),a("tr",[a("td",[t._v("kdj-k")]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.nowIndicator.kdj.k,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.maxKdj.k,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.minKdj.k,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.buyKdj.k,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getStatus")(t.nowIndicator.kdj.k,t.perIndicator.minKdj.k,t.perIndicator.maxKdj.k)))])]),t._v(" "),a("tr",[a("td",[t._v("kdj-d")]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.nowIndicator.kdj.d,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.maxKdj.d,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.minKdj.d,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.buyKdj.d,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getStatus")(t.nowIndicator.kdj.d,t.perIndicator.minKdj.d,t.perIndicator.maxKdj.d)))])]),t._v(" "),a("tr",[a("td",[t._v("kdj-j")]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.nowIndicator.kdj.j,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.maxKdj.j,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.minKdj.j,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getFixed")(t.perIndicator.buyKdj.j,2)))]),t._v(" "),a("td",[t._v(t._s(t._f("getStatus")(t.nowIndicator.kdj.j,t.perIndicator.minKdj.j,t.perIndicator.maxKdj.j)))])])])])]),t._v(" "),a("div",{staticStyle:{height:"500px",width:"100%",background:"#fff","margin-top":"10px"},attrs:{id:"kline1"}})],1)},staticRenderFns:[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("thead",[a("tr",[a("th",[t._v("type")]),t._v(" "),a("th",[t._v("now")]),t._v(" "),a("th",[t._v("max")]),t._v(" "),a("th",[t._v("min")]),t._v(" "),a("th",[t._v("buy")]),t._v(" "),a("th",[t._v("status")])])])}]};var H=a("VU/8")(K,E,!1,function(t){a("ppqh")},"data-v-7c4616b4",null).exports,B={name:"BtcTrending",mounted:function(){var t=document.createElement("script");t.type="text/javascript",t.src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",t.innerHTML='{\n        "width": "100%",\n        "height": "100%",\n        "symbol": "COINBASE:BTCUSD",\n        "locale": "en",\n        "interval": "4h"\n      }',document.getElementById("btcTrending").appendChild(t);var e=document.createElement("script");e.type="text/javascript",e.src="https://s3.tradingview.com/external-embedding/embed-widget-technical-analysis.js",e.innerHTML='{\n        "width": "100%",\n        "height": "100%",\n        "symbol": "FX_IDC:USDCNY",\n        "locale": "en",\n        "interval": "4h"\n      }',document.getElementById("usdTrending").appendChild(e)}},D={render:function(){var t=this.$createElement,e=this._self._c||t;return e("div",{staticStyle:{height:"100%"}},[e("router-link",{staticClass:"navigation",attrs:{to:"/zb"}}),this._v(" "),e("div",{staticStyle:{height:"50%"},attrs:{id:"btcTrending"}}),this._v(" "),e("div",{staticStyle:{height:"50%"},attrs:{id:"usdTrending"}})],1)},staticRenderFns:[]};var q=a("VU/8")(B,D,!1,function(t){a("+rTK")},"data-v-359d75e4",null).exports;n.default.use(r.a);var U=new r.a({mode:"history",routes:[{path:"/",name:"Home",component:c},{path:"/zb",name:"zb",component:j},{path:"/averagechart",name:"AverageChart",component:P},{path:"/botprofit",name:"BotProfit",component:H},{path:"/btctrending",name:"BtcTrending",component:q}]}),R=a("BTaQ"),V=a.n(R);a("+skl");n.default.use(V.a),n.default.config.productionTip=!1,n.default.prototype.$http=u.a,new n.default({el:"#app",router:U,template:"<App/>",components:{App:s}})},da6s:function(t,e){},ppqh:function(t,e){},uslO:function(t,e,a){var n={"./af":"3CJN","./af.js":"3CJN","./ar":"3MVc","./ar-dz":"tkWw","./ar-dz.js":"tkWw","./ar-kw":"j8cJ","./ar-kw.js":"j8cJ","./ar-ly":"wPpW","./ar-ly.js":"wPpW","./ar-ma":"dURR","./ar-ma.js":"dURR","./ar-sa":"7OnE","./ar-sa.js":"7OnE","./ar-tn":"BEem","./ar-tn.js":"BEem","./ar.js":"3MVc","./az":"eHwN","./az.js":"eHwN","./be":"3hfc","./be.js":"3hfc","./bg":"lOED","./bg.js":"lOED","./bm":"hng5","./bm.js":"hng5","./bn":"aM0x","./bn.js":"aM0x","./bo":"w2Hs","./bo.js":"w2Hs","./br":"OSsP","./br.js":"OSsP","./bs":"aqvp","./bs.js":"aqvp","./ca":"wIgY","./ca.js":"wIgY","./cs":"ssxj","./cs.js":"ssxj","./cv":"N3vo","./cv.js":"N3vo","./cy":"ZFGz","./cy.js":"ZFGz","./da":"YBA/","./da.js":"YBA/","./de":"DOkx","./de-at":"8v14","./de-at.js":"8v14","./de-ch":"Frex","./de-ch.js":"Frex","./de.js":"DOkx","./dv":"rIuo","./dv.js":"rIuo","./el":"CFqe","./el.js":"CFqe","./en-au":"Sjoy","./en-au.js":"Sjoy","./en-ca":"Tqun","./en-ca.js":"Tqun","./en-gb":"hPuz","./en-gb.js":"hPuz","./en-ie":"ALEw","./en-ie.js":"ALEw","./en-il":"QZk1","./en-il.js":"QZk1","./en-nz":"dyB6","./en-nz.js":"dyB6","./eo":"Nd3h","./eo.js":"Nd3h","./es":"LT9G","./es-do":"7MHZ","./es-do.js":"7MHZ","./es-us":"INcR","./es-us.js":"INcR","./es.js":"LT9G","./et":"XlWM","./et.js":"XlWM","./eu":"sqLM","./eu.js":"sqLM","./fa":"2pmY","./fa.js":"2pmY","./fi":"nS2h","./fi.js":"nS2h","./fo":"OVPi","./fo.js":"OVPi","./fr":"tzHd","./fr-ca":"bXQP","./fr-ca.js":"bXQP","./fr-ch":"VK9h","./fr-ch.js":"VK9h","./fr.js":"tzHd","./fy":"g7KF","./fy.js":"g7KF","./gd":"nLOz","./gd.js":"nLOz","./gl":"FuaP","./gl.js":"FuaP","./gom-latn":"+27R","./gom-latn.js":"+27R","./gu":"rtsW","./gu.js":"rtsW","./he":"Nzt2","./he.js":"Nzt2","./hi":"ETHv","./hi.js":"ETHv","./hr":"V4qH","./hr.js":"V4qH","./hu":"xne+","./hu.js":"xne+","./hy-am":"GrS7","./hy-am.js":"GrS7","./id":"yRTJ","./id.js":"yRTJ","./is":"upln","./is.js":"upln","./it":"FKXc","./it.js":"FKXc","./ja":"ORgI","./ja.js":"ORgI","./jv":"JwiF","./jv.js":"JwiF","./ka":"RnJI","./ka.js":"RnJI","./kk":"j+vx","./kk.js":"j+vx","./km":"5j66","./km.js":"5j66","./kn":"gEQe","./kn.js":"gEQe","./ko":"eBB/","./ko.js":"eBB/","./ky":"6cf8","./ky.js":"6cf8","./lb":"z3hR","./lb.js":"z3hR","./lo":"nE8X","./lo.js":"nE8X","./lt":"/6P1","./lt.js":"/6P1","./lv":"jxEH","./lv.js":"jxEH","./me":"svD2","./me.js":"svD2","./mi":"gEU3","./mi.js":"gEU3","./mk":"Ab7C","./mk.js":"Ab7C","./ml":"oo1B","./ml.js":"oo1B","./mn":"CqHt","./mn.js":"CqHt","./mr":"5vPg","./mr.js":"5vPg","./ms":"ooba","./ms-my":"G++c","./ms-my.js":"G++c","./ms.js":"ooba","./mt":"oCzW","./mt.js":"oCzW","./my":"F+2e","./my.js":"F+2e","./nb":"FlzV","./nb.js":"FlzV","./ne":"/mhn","./ne.js":"/mhn","./nl":"3K28","./nl-be":"Bp2f","./nl-be.js":"Bp2f","./nl.js":"3K28","./nn":"C7av","./nn.js":"C7av","./pa-in":"pfs9","./pa-in.js":"pfs9","./pl":"7LV+","./pl.js":"7LV+","./pt":"ZoSI","./pt-br":"AoDM","./pt-br.js":"AoDM","./pt.js":"ZoSI","./ro":"wT5f","./ro.js":"wT5f","./ru":"ulq9","./ru.js":"ulq9","./sd":"fW1y","./sd.js":"fW1y","./se":"5Omq","./se.js":"5Omq","./si":"Lgqo","./si.js":"Lgqo","./sk":"OUMt","./sk.js":"OUMt","./sl":"2s1U","./sl.js":"2s1U","./sq":"V0td","./sq.js":"V0td","./sr":"f4W3","./sr-cyrl":"c1x4","./sr-cyrl.js":"c1x4","./sr.js":"f4W3","./ss":"7Q8x","./ss.js":"7Q8x","./sv":"Fpqq","./sv.js":"Fpqq","./sw":"DSXN","./sw.js":"DSXN","./ta":"+7/x","./ta.js":"+7/x","./te":"Nlnz","./te.js":"Nlnz","./tet":"gUgh","./tet.js":"gUgh","./tg":"5SNd","./tg.js":"5SNd","./th":"XzD+","./th.js":"XzD+","./tl-ph":"3LKG","./tl-ph.js":"3LKG","./tlh":"m7yE","./tlh.js":"m7yE","./tr":"k+5o","./tr.js":"k+5o","./tzl":"iNtv","./tzl.js":"iNtv","./tzm":"FRPF","./tzm-latn":"krPU","./tzm-latn.js":"krPU","./tzm.js":"FRPF","./ug-cn":"To0v","./ug-cn.js":"To0v","./uk":"ntHu","./uk.js":"ntHu","./ur":"uSe8","./ur.js":"uSe8","./uz":"XU1s","./uz-latn":"/bsm","./uz-latn.js":"/bsm","./uz.js":"XU1s","./vi":"0X8Q","./vi.js":"0X8Q","./x-pseudo":"e/KL","./x-pseudo.js":"e/KL","./yo":"YXlc","./yo.js":"YXlc","./zh-cn":"Vz2w","./zh-cn.js":"Vz2w","./zh-hk":"ZUyn","./zh-hk.js":"ZUyn","./zh-tw":"BbgG","./zh-tw.js":"BbgG"};function i(t){return a(s(t))}function s(t){var e=n[t];if(!(e+1))throw new Error("Cannot find module '"+t+"'.");return e}i.keys=function(){return Object.keys(n)},i.resolve=s,t.exports=i,i.id="uslO"}},["NHnr"]);
//# sourceMappingURL=app.efe0a4d9be2e9e3a072d.js.map