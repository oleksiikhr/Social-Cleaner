webpackJsonp([6],{"N56+":function(t,s,e){"use strict";Object.defineProperty(s,"__esModule",{value:!0});var a=e("Xxa5"),n=e.n(a),r=e("exGp"),i=e.n(r),o=e("6jyd"),u=e("8j+c"),c=e("6U0b"),d={components:{AttrInput:u.default,AttrAction:o.default},data:function(){return{id:"",link:"",status:"",loading:!1}},computed:{user:function(){return this.$store.state.media.vk.user},process:function(){return this.$store.state.media.vk.process}},methods:{fetchGetStatus:function(){var t=this;return i()(n.a.mark(function s(){var e;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.start(),s.next=3,c.default.fetchStatusGet(t.id?"-"+t.id:t.user.id);case 3:(e=s.sent).ok&&e.body.response&&(t.status=e.body.response.text,t.link=t.id?c.default.getLinkGroup(t.id):c.default.getLinkUser()),t.stop();case 6:case"end":return s.stop()}},s,t)}))()},fetchDeleteStatus:function(){var t=this;return i()(n.a.mark(function s(){var e;return n.a.wrap(function(s){for(;;)switch(s.prev=s.next){case 0:return t.start(),s.next=3,c.default.fetchStatusSet("",t.id||null);case 3:(e=s.sent).ok&&e.body.response&&(t.status=""),t.stop();case 6:case"end":return s.stop()}},s,t)}))()},start:function(){this.$store.commit("START_PROCESS","vk"),this.loading=!0},stop:function(){this.$store.commit("STOP_PROCESS","vk"),this.loading=!1}},watch:{id:function(){this.status="",this.link=""}}},l={render:function(){var t=this,s=t.$createElement,e=t._self._c||s;return e("div",{attrs:{id:"status"}},[e("div",{staticClass:"main-config block"},[e("h2",[t._v(t._s(t.$t("vk.status.h2")))]),t._v(" "),e("attr-input",{attrs:{name:t.$t("vk.status.attr_1.p"),info:t.$t("vk.status.attr_1.small"),model:t.id,process:t.process},on:{"update:model":function(s){t.id=s}}}),t._v(" "),e("div",{staticClass:"text-center"},[e("at-button",{attrs:{type:"primary",disabled:t.process},on:{click:function(s){t.fetchGetStatus()}}},[t._v("\n        "+t._s(t.$t("vk.status.get_status"))+"\n      ")])],1)],1),t._v(" "),e("div",{staticClass:"block"},[e("div",{staticClass:"block__result"},[e("h2",[t._v(t._s(t.$t("vk.status.current_status")))]),t._v(" "),t.link?[t.status?e("a",{staticClass:"status-text",attrs:{href:t.link,target:"_blank",rel:"noopener"}},[t._v("\n          "+t._s(t.status)+"\n        ")]):e("a",{attrs:{href:t.link,target:"_blank",rel:"noopener"}},[e("at-alert",{attrs:{message:t.$t("vk.status.empty"),type:"info","show-icon":""}})],1)]:e("at-alert",{attrs:{message:t.$t("vk.status.not_received"),type:"warning","show-icon":""}})],2)]),t._v(" "),e("attr-action",{attrs:{process:t.process,loading:t.loading},on:{start:t.fetchDeleteStatus}})],1)},staticRenderFns:[]};var f=e("VU/8")(d,l,!1,function(t){e("zMKu")},"data-v-5fc0972e",null);s.default=f.exports},zMKu:function(t,s){}});
//# sourceMappingURL=6.cea62b34e0b7b9d373f9.js.map