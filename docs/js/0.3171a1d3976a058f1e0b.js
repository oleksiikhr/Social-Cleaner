webpackJsonp([0],{109:function(t,e,n){"use strict";Object.defineProperty(e,"__esModule",{value:!0});var r=n(135),o=n(151),i=n(41),s=i(r.a,o.a,!1,null,null,null);e.default=s.exports},110:function(t,e,n){"use strict";function r(t,e){return e.v=f,e.access_token||(e.access_token=i.a.state.vk.token),o.a.http.jsonp(c+t,{method:"GET",params:e})}n.d(e,"d",function(){return s}),n.d(e,"c",function(){return a}),n.d(e,"a",function(){return u}),n.d(e,"e",function(){return f}),e.b=r;var o=n(7),i=n(42),s="https://oauth.vk.com/authorize/",c="https://api.vk.com/method/",a="https://alexeykhr.github.io/Social-Cleaner/",u=6244330,f="5.69"},115:function(t,e,n){"use strict";function r(t){var e,n;this.promise=new t(function(t,r){if(void 0!==e||void 0!==n)throw TypeError("Bad Promise constructor");e=t,n=r}),this.resolve=o(e),this.reject=o(n)}var o=n(44);t.exports.f=function(t){return new r(t)}},116:function(t,e,n){var r=n(31),o=n(2)("toStringTag"),i="Arguments"==r(function(){return arguments}()),s=function(t,e){try{return t[e]}catch(t){}};t.exports=function(t){var e,n,c;return void 0===t?"Undefined":null===t?"Null":"string"==typeof(n=s(e=Object(t),o))?n:i?r(e):"Object"==(c=r(e))&&"function"==typeof e.callee?"Arguments":c}},117:function(t,e,n){var r=n(8),o=n(44),i=n(2)("species");t.exports=function(t,e){var n,s=r(t).constructor;return void 0===s||void 0==(n=r(s)[i])?e:o(n)}},118:function(t,e,n){var r,o,i,s=n(43),c=n(144),a=n(47),u=n(32),f=n(0),l=f.process,v=f.setImmediate,h=f.clearImmediate,d=f.MessageChannel,p=f.Dispatch,m=0,_={},y=function(){var t=+this;if(_.hasOwnProperty(t)){var e=_[t];delete _[t],e()}},b=function(t){y.call(t.data)};v&&h||(v=function(t){for(var e=[],n=1;arguments.length>n;)e.push(arguments[n++]);return _[++m]=function(){c("function"==typeof t?t:Function(t),e)},r(m),m},h=function(t){delete _[t]},"process"==n(31)(l)?r=function(t){l.nextTick(s(y,t,1))}:p&&p.now?r=function(t){p.now(s(y,t,1))}:d?(o=new d,i=o.port2,o.port1.onmessage=b,r=s(i.postMessage,i,1)):f.addEventListener&&"function"==typeof postMessage&&!f.importScripts?(r=function(t){f.postMessage(t+"","*")},f.addEventListener("message",b,!1)):r="onreadystatechange"in u("script")?function(t){a.appendChild(u("script")).onreadystatechange=function(){a.removeChild(this),y.call(t)}}:function(t){setTimeout(s(y,t,1),0)}),t.exports={set:v,clear:h}},119:function(t,e){t.exports=function(t){try{return{e:!1,v:t()}}catch(t){return{e:!0,v:t}}}},120:function(t,e,n){var r=n(8),o=n(9),i=n(115);t.exports=function(t,e){if(r(t),o(e)&&e.constructor===t)return e;var n=i.f(t);return(0,n.resolve)(e),n.promise}},135:function(t,e,n){"use strict";function r(t){return new s.a(function(e){return setTimeout(e,t)})}function o(t,e){return Math.round(t-.5+Math.random()*(e-t+1))}var i=n(136),s=n.n(i),c=n(29),a=n(110);e.a={components:{QSpinnerCube:c.t,QField:c.e,QChipsInput:c.d,QInput:c.g,QBtn:c.b},data:function(){return{wall:{},itemsNoDelete:[],count:1,offset:0,processDelete:!1}},created:function(){this.fetchGetWall()},methods:{fetchGetWall:function(){var t=this;Object(a.b)("wall.get",{count:1}).then(function(e){e.body.response?(t.wall=e.body.response,t.count=e.body.response.count,t.$store.dispatch("vkSetUserCounter",{key:"wall",val:t.count})):c.x.create.negative({html:e.body.error?e.body.error.error_msg:"Error from VK"})},function(t){c.x.create.negative({html:"Error from VK"})})},fetchDeleteWall:function(t){var e=this;if(this.processDelete=!0,t>=this.offset+this.count)return this.processDelete=!1,c.x.create.positive({html:"Posts deleted"});r(o(500,3e3)).then(function(){Object(a.b)("wall.get",{offset:t+1,count:1}).then(function(n){if(!n.body.response||!n.body.response.items.length)return e.processDelete=!1,c.x.create.negative({html:n.body.error?n.body.error.error_msg:"No items"});var r=n.body.response.items[0].id;if(e.itemsNoDelete.indexOf(r.toString())>-1)return e.$store.dispatch("vkAddLog",{message:"Saved id: "+r,section:"wall"}),e.fetchDeleteWall(t);Object(a.b)("wall.delete",{post_id:r}).then(function(n){return n.body.response?(e.$store.dispatch("vkCounterUserDecrement","wall"),e.$store.dispatch("vkAddLog",{message:"Deleted id: "+r,section:"wall"}),e.count--,e.fetchDeleteWall(t)):(e.processDelete=!1,c.x.create.negative({html:n.body.error?n.body.error.error_msg:"No deleted"}))},function(t){e.processDelete=!1})},function(t){e.processDelete=!1})})}}}},136:function(t,e,n){t.exports={default:n(137),__esModule:!0}},137:function(t,e,n){n(49),n(45),n(48),n(138),n(149),n(150),t.exports=n(14).Promise},138:function(t,e,n){"use strict";var r,o,i,s,c=n(16),a=n(0),u=n(43),f=n(116),l=n(30),v=n(9),h=n(44),d=n(139),p=n(140),m=n(117),_=n(118).set,y=n(145)(),b=n(115),x=n(119),g=n(120),w=a.TypeError,D=a.process,P=a.Promise,k="process"==f(D),j=function(){},E=o=b.f,S=!!function(){try{var t=P.resolve(1),e=(t.constructor={})[n(2)("species")]=function(t){t(j,j)};return(k||"function"==typeof PromiseRejectionEvent)&&t.then(j)instanceof e}catch(t){}}(),C=function(t){var e;return!(!v(t)||"function"!=typeof(e=t.then))&&e},O=function(t,e){if(!t._n){t._n=!0;var n=t._c;y(function(){for(var r=t._v,o=1==t._s,i=0;n.length>i;)!function(e){var n,i,s=o?e.ok:e.fail,c=e.resolve,a=e.reject,u=e.domain;try{s?(o||(2==t._h&&N(t),t._h=1),!0===s?n=r:(u&&u.enter(),n=s(r),u&&u.exit()),n===e.promise?a(w("Promise-chain cycle")):(i=C(n))?i.call(n,c,a):c(n)):a(r)}catch(t){a(t)}}(n[i++]);t._c=[],t._n=!1,e&&!t._h&&T(t)})}},T=function(t){_.call(a,function(){var e,n,r,o=t._v,i=M(t);if(i&&(e=x(function(){k?D.emit("unhandledRejection",o,t):(n=a.onunhandledrejection)?n({promise:t,reason:o}):(r=a.console)&&r.error&&r.error("Unhandled promise rejection",o)}),t._h=k||M(t)?2:1),t._a=void 0,i&&e.e)throw e.v})},M=function(t){if(1==t._h)return!1;for(var e,n=t._a||t._c,r=0;n.length>r;)if(e=n[r++],e.fail||!M(e.promise))return!1;return!0},N=function(t){_.call(a,function(){var e;k?D.emit("rejectionHandled",t):(e=a.onrejectionhandled)&&e({promise:t,reason:t._v})})},W=function(t){var e=this;e._d||(e._d=!0,e=e._w||e,e._v=t,e._s=2,e._a||(e._a=e._c.slice()),O(e,!0))},A=function(t){var e,n=this;if(!n._d){n._d=!0,n=n._w||n;try{if(n===t)throw w("Promise can't be resolved itself");(e=C(t))?y(function(){var r={_w:n,_d:!1};try{e.call(t,u(A,r,1),u(W,r,1))}catch(t){W.call(r,t)}}):(n._v=t,n._s=1,O(n,!1))}catch(t){W.call({_w:n,_d:!1},t)}}};S||(P=function(t){d(this,P,"Promise","_h"),h(t),r.call(this);try{t(u(A,this,1),u(W,this,1))}catch(t){W.call(this,t)}},r=function(t){this._c=[],this._a=void 0,this._s=0,this._d=!1,this._v=void 0,this._h=0,this._n=!1},r.prototype=n(146)(P.prototype,{then:function(t,e){var n=E(m(this,P));return n.ok="function"!=typeof t||t,n.fail="function"==typeof e&&e,n.domain=k?D.domain:void 0,this._c.push(n),this._a&&this._a.push(n),this._s&&O(this,!1),n.promise},catch:function(t){return this.then(void 0,t)}}),i=function(){var t=new r;this.promise=t,this.resolve=u(A,t,1),this.reject=u(W,t,1)},b.f=E=function(t){return t===P||t===s?new i(t):o(t)}),l(l.G+l.W+l.F*!S,{Promise:P}),n(17)(P,"Promise"),n(147)("Promise"),s=n(14).Promise,l(l.S+l.F*!S,"Promise",{reject:function(t){var e=E(this);return(0,e.reject)(t),e.promise}}),l(l.S+l.F*(c||!S),"Promise",{resolve:function(t){return g(c&&this===s?P:this,t)}}),l(l.S+l.F*!(S&&n(148)(function(t){P.all(t).catch(j)})),"Promise",{all:function(t){var e=this,n=E(e),r=n.resolve,o=n.reject,i=x(function(){var n=[],i=0,s=1;p(t,!1,function(t){var c=i++,a=!1;n.push(void 0),s++,e.resolve(t).then(function(t){a||(a=!0,n[c]=t,--s||r(n))},o)}),--s||r(n)});return i.e&&o(i.v),n.promise},race:function(t){var e=this,n=E(e),r=n.reject,o=x(function(){p(t,!1,function(t){e.resolve(t).then(n.resolve,r)})});return o.e&&r(o.v),n.promise}})},139:function(t,e){t.exports=function(t,e,n,r){if(!(t instanceof e)||void 0!==r&&r in t)throw TypeError(n+": incorrect invocation!");return t}},140:function(t,e,n){var r=n(43),o=n(141),i=n(142),s=n(8),c=n(46),a=n(143),u={},f={},e=t.exports=function(t,e,n,l,v){var h,d,p,m,_=v?function(){return t}:a(t),y=r(n,l,e?2:1),b=0;if("function"!=typeof _)throw TypeError(t+" is not iterable!");if(i(_)){for(h=c(t.length);h>b;b++)if((m=e?y(s(d=t[b])[0],d[1]):y(t[b]))===u||m===f)return m}else for(p=_.call(t);!(d=p.next()).done;)if((m=o(p,y,d.value,e))===u||m===f)return m};e.BREAK=u,e.RETURN=f},141:function(t,e,n){var r=n(8);t.exports=function(t,e,n,o){try{return o?e(r(n)[0],n[1]):e(n)}catch(e){var i=t.return;throw void 0!==i&&r(i.call(t)),e}}},142:function(t,e,n){var r=n(15),o=n(2)("iterator"),i=Array.prototype;t.exports=function(t){return void 0!==t&&(r.Array===t||i[o]===t)}},143:function(t,e,n){var r=n(116),o=n(2)("iterator"),i=n(15);t.exports=n(14).getIteratorMethod=function(t){if(void 0!=t)return t[o]||t["@@iterator"]||i[r(t)]}},144:function(t,e){t.exports=function(t,e,n){var r=void 0===n;switch(e.length){case 0:return r?t():t.call(n);case 1:return r?t(e[0]):t.call(n,e[0]);case 2:return r?t(e[0],e[1]):t.call(n,e[0],e[1]);case 3:return r?t(e[0],e[1],e[2]):t.call(n,e[0],e[1],e[2]);case 4:return r?t(e[0],e[1],e[2],e[3]):t.call(n,e[0],e[1],e[2],e[3])}return t.apply(n,e)}},145:function(t,e,n){var r=n(0),o=n(118).set,i=r.MutationObserver||r.WebKitMutationObserver,s=r.process,c=r.Promise,a="process"==n(31)(s);t.exports=function(){var t,e,n,u=function(){var r,o;for(a&&(r=s.domain)&&r.exit();t;){o=t.fn,t=t.next;try{o()}catch(r){throw t?n():e=void 0,r}}e=void 0,r&&r.enter()};if(a)n=function(){s.nextTick(u)};else if(i){var f=!0,l=document.createTextNode("");new i(u).observe(l,{characterData:!0}),n=function(){l.data=f=!f}}else if(c&&c.resolve){var v=c.resolve();n=function(){v.then(u)}}else n=function(){o.call(r,u)};return function(r){var o={fn:r,next:void 0};e&&(e.next=o),t||(t=o,n()),e=o}}},146:function(t,e,n){var r=n(3);t.exports=function(t,e,n){for(var o in e)n&&t[o]?t[o]=e[o]:r(t,o,e[o]);return t}},147:function(t,e,n){"use strict";var r=n(0),o=n(14),i=n(4),s=n(5),c=n(2)("species");t.exports=function(t){var e="function"==typeof o[t]?o[t]:r[t];s&&e&&!e[c]&&i.f(e,c,{configurable:!0,get:function(){return this}})}},148:function(t,e,n){var r=n(2)("iterator"),o=!1;try{var i=[7][r]();i.return=function(){o=!0},Array.from(i,function(){throw 2})}catch(t){}t.exports=function(t,e){if(!e&&!o)return!1;var n=!1;try{var i=[7],s=i[r]();s.next=function(){return{done:n=!0}},i[r]=function(){return s},t(i)}catch(t){}return n}},149:function(t,e,n){"use strict";var r=n(30),o=n(14),i=n(0),s=n(117),c=n(120);r(r.P+r.R,"Promise",{finally:function(t){var e=s(this,o.Promise||i.Promise),n="function"==typeof t;return this.then(n?function(n){return c(e,t()).then(function(){return n})}:t,n?function(n){return c(e,t()).then(function(){throw n})}:t)}})},150:function(t,e,n){"use strict";var r=n(30),o=n(115),i=n(119);r(r.S,"Promise",{try:function(t){var e=o.f(this),n=i(t);return(n.e?e.reject:e.resolve)(n.v),e.promise}})},151:function(t,e,n){"use strict";var r=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticStyle:{padding:"0 20px 20px"},attrs:{id:"wall"}},[n("h4",{staticStyle:{margin:"0",padding:"15px 0 10px"}},[t._v("Wall")]),t._v(" "),"items"in t.wall?[n("div",{staticClass:"row"},[n("div",{staticClass:"col"},[n("q-input",{attrs:{disabled:t.processDelete,type:"number","float-label":"Count"},model:{value:t.count,callback:function(e){t.count=e},expression:"count"}})],1),t._v(" "),n("div",{staticClass:"col"},[n("q-input",{attrs:{disabled:t.processDelete,type:"number","float-label":"Offset"},model:{value:t.offset,callback:function(e){t.offset=e},expression:"offset"}})],1)]),t._v(" "),n("q-field",{staticStyle:{"margin-bottom":"2rem"},attrs:{icon:"label",count:"",helper:"Press: Enter"}},[n("q-chips-input",{attrs:{disabled:t.processDelete,"float-label":"ID's undelete posts"},model:{value:t.itemsNoDelete,callback:function(e){t.itemsNoDelete=e},expression:"itemsNoDelete"}})],1),t._v(" "),n("q-btn",{staticClass:"full-width",attrs:{icon:"delete",color:"red",loader:"",outline:"",disabled:t.count<1},nativeOn:{click:function(e){t.fetchDeleteWall(t.offset)}},model:{value:t.processDelete,callback:function(e){t.processDelete=e},expression:"processDelete"}},[t._v("\n      Delete\n    ")])]:n("q-spinner-cube",{attrs:{color:"primary",size:60}})],2)},o=[],i={render:r,staticRenderFns:o};e.a=i}});