webpackJsonp([2,10,11,13],{"EW+e":function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={components:{Top:a("k/f8").default},props:{obj:{type:Object,required:!0},name:{type:String,required:!1},compare:{type:Boolean,required:!1},info:{type:String,required:!1},process:{type:Boolean,required:!1}},data:function(){return{nameAttribute:""}},mounted:function(){this.name?this.nameAttribute=this.name:this.obj.name&&(this.nameAttribute=this.obj.name)}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block__attr"},[a("top",{attrs:{obj:e.obj,name:e.nameAttribute,compare:e.compare,process:e.process}}),e._v(" "),a("at-checkbox-group",{model:{value:e.obj.items,callback:function(t){e.$set(e.obj,"items",t)},expression:"obj.items"}},e._l(e.obj.html,function(t){return a("at-checkbox",{key:t.val,attrs:{label:t.val,disabled:e.process}},[e._v("\n      "+e._s(t.name)+"\n    ")])})),e._v(" "),e.info?a("small",[e._v(e._s(e.info))]):e._e()],1)},staticRenderFns:[]},s=a("VU/8")(n,r,!1,null,null,null);t.default=s.exports},EcHe:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={props:{obj:{type:Object,required:!0},name:{type:String,required:!0},info:{type:String,required:!1},process:{type:Boolean,required:!1}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block__attr"},[a("p",[e._v(e._s(e.name))]),e._v(" "),a("at-radio-group",{model:{value:e.obj.value,callback:function(t){e.$set(e.obj,"value",t)},expression:"obj.value"}},e._l(e.obj.html,function(t){return a("at-radio-button",{key:t.val,attrs:{label:t.val,disabled:e.process}},[e._v("\n      "+e._s(t.name)+"\n    ")])}))],1)},staticRenderFns:[]},s=a("VU/8")(n,r,!1,null,null,null);t.default=s.exports},aO0K:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n={props:{obj:{type:Object,required:!0},name:{type:String,required:!0},info:{type:String,required:!1},size:{type:String,required:!1,default:"normal"},process:{type:Boolean,required:!1}},data:function(){return{input:this.model}},watch:{input:function(){this.$emit("update:model",this.input)}}},r={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{staticClass:"block__attr"},[a("p",[e._v(e._s(e.name))]),e._v(" "),a("at-select",{attrs:{disabled:e.process,size:e.size},model:{value:e.obj.value,callback:function(t){e.$set(e.obj,"value",t)},expression:"obj.value"}},e._l(e.obj.html,function(t){return a("at-option",{key:t.val,attrs:{value:t.val}},[e._v("\n      "+e._s(t.name)+"\n    ")])})),e._v(" "),e.info?a("small",[e._v(e._s(e.info))]):e._e()],1)},staticRenderFns:[]},s=a("VU/8")(n,r,!1,null,null,null);t.default=s.exports},slB7:function(e,t,a){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var n=a("Xxa5"),r=a.n(n),s=a("exGp"),o=a.n(s),i=a("EcHe"),l=a("fwsB"),c=a("EW+e"),u=a("FeOV"),m=a("nJ4+"),d=a("6jyd"),p=a("aO0K"),v=a("8j+c"),f=a("dKil"),h=a("MhDk"),b=a("6U0b"),_=b.default.prototype.COUNT_WALL,k={components:{AttrTag:h.default,AttrCheckbox:c.default,AttrCount:f.default,AttrInput:v.default,AttrSelect:p.default,AttrRadioButton:i.default,AttrIndicators:l.default,AttrReverse:u.default,AttrResult:m.default,AttrAction:d.default},data:function(){return{main:{owner_id:"",filter:{value:"all",html:[{name:"Все",val:"all"},{name:"Предложенные записи на стене сообщества",val:"suggests"},{name:"Отложенные записи",val:"postponed"},{name:"Записи владельца стены",val:"owner"},{name:"Записи не от владельца стены",val:"others"}]},count:{min:"1",max:"20"},isDeletePosts:{value:0,html:[{name:"Записи",val:0},{name:"Комментарии",val:1}]}},wall:{ids:{name:"ID записей",input:"",items:[],compareAll:!1},fromIds:{name:"ID авторов записей",input:"",items:[],compareAll:!1},texts:{name:"Фразы в тексте",input:"",items:[],compareAll:!1},attachments:{name:"Added media attachments",items:[],compareAll:!0,html:[{name:"Photo",val:"photo"},{name:"Video",val:"video"},{name:"Audio",val:"audio"},{name:"Document",val:"doc"},{name:"Link",val:"link"},{name:"Note",val:"note"},{name:"Poll",val:"poll"},{name:"Wiki Page",val:"page"},{name:"Photos List",val:"photos_list"},{name:"Market Item",val:"market"},{name:"Market Collection",val:"market_album"}]},indicators:{name:"Показатели",items:[{name:"Comments",icon:"comment-o",state:0,count:0},{name:"Likes",icon:"heart-o",state:0,count:0},{name:"Reposts",icon:"bullhorn",state:0,count:0},{name:"Views",icon:"eye",state:0,count:0}],compareAll:!0},reverse:!1},result:[],loading:!1}},computed:{user:function(){return this.$store.state.media.vk.user},process:function(){return this.$store.state.media.vk.process},ownerId:function(){return this.main.owner_id?"-"+this.main.owner_id:this.user.id}},methods:{fetchGetWall:function(){var e=this,t=arguments.length>0&&void 0!==arguments[0]?arguments[0]:b.default.prototype.COUNT_WALL,a=arguments.length>1&&void 0!==arguments[1]?arguments[1]:this.main.count.min-1;return o()(r.a.mark(function n(){var s;return r.a.wrap(function(n){for(;;)switch(n.prev=n.next){case 0:return n.next=2,b.default.fetchWallGet(e.ownerId,e.main.filter.value,t,a,500,1500);case 2:return s=n.sent,n.abrupt("return",s);case 4:case"end":return n.stop()}},n,e)}))()},fetchDeleteWall:function(e){var t=this;return o()(r.a.mark(function a(){var n;return r.a.wrap(function(a){for(;;)switch(a.prev=a.next){case 0:return a.next=2,b.default.fetchWallDelete(e,t.ownerId,1500,2500);case 2:return n=a.sent,a.abrupt("return",n);case 4:case"end":return a.stop()}},a,t)}))()},doStart:function(){var e=this;return o()(r.a.mark(function t(){var a,n,s,o,i,l,c;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.start()){t.next=2;break}return t.abrupt("return",e.stop());case 2:a=e.getCountLoop(e.main.count,_),n=0;case 4:if(!(n<a)){t.next=32;break}return t.next=7,e.fetchGetWall(e.getMaxCountItems(e.main.count,_));case 7:if(!(s=t.sent).ok||!s.body.response){t.next=28;break}o=s.body.response.items.length,i=0;case 11:if(!(i<o)){t.next=26;break}if(!e.cancel){t.next=14;break}return t.abrupt("return",e.stop());case 14:if(l=s.body.response.items[i],!e.check(l)){t.next=22;break}return t.next=18,e.fetchDeleteWall(l.id);case 18:(c=t.sent).ok&&c.body.response&&e.main.count.max--,t.next=23;break;case 22:e.main.count.min++;case 23:i++,t.next=11;break;case 26:t.next=29;break;case 28:return t.abrupt("return",e.stop());case 29:n++,t.next=4;break;case 32:e.stop();case 33:case"end":return t.stop()}},t,e)}))()},doPreview:function(){var e=this;return o()(r.a.mark(function t(){var a,n,s,o,i;return r.a.wrap(function(t){for(;;)switch(t.prev=t.next){case 0:if(e.start()){t.next=2;break}return t.abrupt("return",e.stop());case 2:a=e.getCountLoop(e.main.count,_),n=0;case 4:if(!(n<a)){t.next=20;break}if(!e.cancel){t.next=7;break}return t.abrupt("return",e.stop());case 7:return s=n*_,o=e.main.count.max-s,t.next=11,e.fetchGetWall(o>_?_:o,s);case 11:if(!((i=t.sent).ok&&i.body.response&&i.body.response.items.length)){t.next=16;break}i.body.response.items.forEach(function(t){return e.check(t)}),t.next=17;break;case 16:return t.abrupt("return",e.stop());case 17:n++,t.next=4;break;case 20:e.stop();case 21:case"end":return t.stop()}},t,e)}))()},start:function(){return this.$store.commit("START_PROCESS","vk"),this.loading=!0,this.result=[],this.checkStart(this.main.count)},stop:function(){this.$store.commit("STOP_PROCESS","vk"),this.$store.commit("CLEAR_CANCEL","vk"),this.loading=!1},check:function(e){var t=void 0===e.attachments?void 0:e.attachments.map(function(e){return e.type}),a=[void 0===e.comments?void 0:e.comments.count,void 0===e.likes?void 0:e.likes.count,void 0===e.reposts?void 0:e.reposts.count,void 0===e.views?void 0:e.views.count],n=[{obj:this.wall.ids,method:this.checkNumber,param:e.id},{obj:this.wall.fromIds,method:this.checkNumber,param:e.from_id},{obj:this.wall.texts,method:this.checkText,param:e.text},{obj:this.wall.attachments,method:this.checkCheckbox,param:t},{obj:this.wall.indicators,method:this.checkIndicators,param:a}],r=this.checkFinal(n,this.wall.reverse);return this.result.push({name:"id: "+e.id,link:b.default.getLinkWall(this.ownerId,e.id),reason:r.index?n[r.index].obj.name:"-",result:r.result?"Yes":"No"}),r.result},getLinkPost:function(e){return b.default.getLinkWall(this.ownerId,e)},getLinkPage:function(e){return b.default.getLinkPage(e)}}},g={render:function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("div",{attrs:{id:"wall"}},[a("div",{staticClass:"main-config block"},[a("h2",[e._v("Основные настройки")]),e._v(" "),a("attr-input",{attrs:{name:"ID сообщества",model:e.main.owner_id,info:"Positive number. Empty - Current User.",process:e.process},on:{"update:model":function(t){e.$set(e.main,"owner_id",t)}}}),e._v(" "),a("attr-select",{attrs:{name:"Фильтр записей",obj:e.main.filter,size:"large",process:e.process}}),e._v(" "),a("attr-count",{attrs:{name:"Количество записей (от и до), включительно",model:e.main.count,process:e.process}}),e._v(" "),a("attr-radio-button",{attrs:{name:"Удалить записи или очистить комментарии под записями",obj:e.main.isDeletePosts,process:e.process}})],1),e._v(" "),a("div",{staticClass:"wall-config block"},[a("h2",[e._v("Параметры стены")]),e._v(" "),a("attr-tag",{attrs:{obj:e.wall.ids,push:e.pushNumber,"link-tag":e.getLinkPost,process:e.process,info:"After filling, press enter to add to the list."}}),e._v(" "),a("attr-tag",{attrs:{obj:e.wall.fromIds,push:e.pushNumber,"link-tag":e.getLinkPage,process:e.process,info:"After filling, press enter to add to the list. Use a negative value to designate a community ID."}}),e._v(" "),a("attr-tag",{attrs:{obj:e.wall.texts,push:e.pushString,process:e.process,compare:"",info:"After filling, press enter to add to the list."}}),e._v(" "),a("attr-checkbox",{attrs:{obj:e.wall.attachments,process:e.process,compare:""}}),e._v(" "),a("attr-indicators",{attrs:{obj:e.wall.indicators,process:e.process,compare:""}}),e._v(" "),a("attr-reverse",{attrs:{model:e.wall.reverse,process:e.process},on:{"update:model":function(t){e.$set(e.wall,"reverse",t)}}})],1),e._v(" "),e.main.isDeletePosts.value?[e._m(0)]:e._e(),e._v(" "),a("attr-action",{attrs:{process:e.process,loading:e.loading,canPreview:""},on:{start:e.doStart,preview:e.doPreview}}),e._v(" "),a("attr-result",{attrs:{data:e.result}})],2)},staticRenderFns:[function(){var e=this.$createElement,t=this._self._c||e;return t("div",{staticClass:"comments-config block"},[t("h2",[this._v("Параметры комментарий")])])}]},x=a("VU/8")(k,g,!1,null,null,null);t.default=x.exports}});
//# sourceMappingURL=2.32e166da7ba14d9e5de1.js.map