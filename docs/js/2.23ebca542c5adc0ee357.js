webpackJsonp([2],{104:function(t,e,a){"use strict";function n(t){a(130)}Object.defineProperty(e,"__esModule",{value:!0});var i=a(118),r=a(132),s=a(42),o=n,c=s(i.a,r.a,!1,o,null,null);e.default=c.exports},118:function(t,e,a){"use strict";var n=a(29);e.a={components:{QCard:n.d,QCardTitle:n.i,QCardSeparator:n.h,QCardMain:n.f,QCardMedia:n.g,QIcon:n.o,QCardActions:n.e,QBtn:n.c},data:function(){return{cards:[{name:"VKontakte",shortName:"vk",icon:"fa-vk",domain:"vk.com",content:"VK (VKontakte; Russian: ВКонта́кте, meaning InContact) is a Russian-based online social media and social networking service."},{name:"Twitter",shortName:"twitter",icon:"fa-twitter",domain:"twitter.com",content:'Twitter (/ˈtwɪtər/) is an online news and social networking service where users post and interact with messages, known as "tweets."'}]}},created:function(){this.$store.dispatch("clearTemplateLeftSide"),this.$store.dispatch("clearTemplateRightSide"),this.$store.dispatch("clearTemplateSubTitle")},methods:{goLink:function(t){this.$router.push({name:t})}}}},130:function(t,e,a){var n=a(131);"string"==typeof n&&(n=[[t.i,n,""]]),n.locals&&(t.exports=n.locals);a(103)("0aa2154a",n,!0)},131:function(t,e,a){e=t.exports=a(102)(void 0),e.push([t.i,".q-card-media>img{height:180px}",""])},132:function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"general-dashboard"}},t._l(t.cards,function(e){return n("q-card",{key:e.name,staticStyle:{width:"300px"},attrs:{inline:""}},[n("q-card-media",["vk"===e.shortName?n("img",{attrs:{src:a(133)}}):"twitter"===e.shortName?n("img",{attrs:{src:a(134)}}):t._e()]),t._v(" "),n("q-card-title",[t._v("\n      "+t._s(e.name)+"\n      "),n("div",{attrs:{slot:"subtitle"},slot:"subtitle"},[n("q-icon",{attrs:{name:"http"}}),t._v("\n        "+t._s(e.domain)+"\n      ")],1),t._v(" "),n("q-icon",{attrs:{slot:"right",name:e.icon},slot:"right"})],1),t._v(" "),n("q-card-separator"),t._v(" "),n("q-card-main",[t._v(t._s(e.content))]),t._v(" "),n("q-card-actions",[n("q-btn",{staticClass:"full-width",attrs:{flat:"",color:"primary"},on:{click:function(a){t.goLink(e.shortName)}}},[t._v("GO")])],1)],1)}))},i=[],r={render:n,staticRenderFns:i};e.a=r},133:function(t,e,a){t.exports=a.p+"img/wallpaper.7ef528b.jpg"},134:function(t,e,a){t.exports=a.p+"img/wallpaper.5117423.jpg"}});