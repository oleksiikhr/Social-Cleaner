webpackJsonp([13],{"EW+e":function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var o={components:{Top:n("k/f8").default},props:{obj:{type:Object,required:!0},name:{type:String,required:!1},compare:{type:Boolean,required:!1},info:{type:String,required:!1},process:{type:Boolean,required:!1}},data:function(){return{nameAttribute:""}},mounted:function(){this.name?this.nameAttribute=this.name:this.obj.name&&(this.nameAttribute=this.obj.name)}},r={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"block__attr"},[n("top",{attrs:{obj:e.obj,name:e.nameAttribute,compare:e.compare,process:e.process}}),e._v(" "),n("at-checkbox-group",{model:{value:e.obj.items,callback:function(t){e.$set(e.obj,"items",t)},expression:"obj.items"}},e._l(e.obj.html,function(t){return n("at-checkbox",{key:t.val,attrs:{label:t.val,disabled:e.process}},[e._v("\n      "+e._s(t.name)+"\n    ")])})),e._v(" "),e.info?n("small",[e._v(e._s(e.info))]):e._e()],1)},staticRenderFns:[]},a=n("VU/8")(o,r,!1,null,null,null);t.default=a.exports}});
//# sourceMappingURL=13.fcbbcd3bb49a1b5ecfd2.js.map