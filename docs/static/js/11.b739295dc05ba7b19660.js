webpackJsonp([11],{aO0K:function(e,t,n){"use strict";Object.defineProperty(t,"__esModule",{value:!0});var r={props:{name:{type:String,required:!0},model:{type:String,required:!0},html:{type:Array,required:!0},info:{type:String,required:!1},size:{type:String,required:!1,default:"normal"}},data:function(){return{input:this.model}},computed:{process:function(){return this.$store.state.vk.process}},watch:{input:function(){this.$emit("update:model",this.input)}}},i={render:function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"block__attr"},[n("p",[e._v(e._s(e.name))]),e._v(" "),n("at-select",{attrs:{disabled:e.process,size:e.size},model:{value:e.input,callback:function(t){e.input=t},expression:"input"}},e._l(e.html,function(t){return n("at-option",{key:t.val,attrs:{value:t.val}},[e._v("\n      "+e._s(t.name)+"\n    ")])})),e._v(" "),e.info?n("small",[e._v(e._s(e.info))]):e._e()],1)},staticRenderFns:[]},s=n("VU/8")(r,i,!1,null,null,null);t.default=s.exports}});
//# sourceMappingURL=11.b739295dc05ba7b19660.js.map