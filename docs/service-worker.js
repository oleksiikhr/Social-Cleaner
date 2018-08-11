"use strict";var precacheConfig=[["/Social-Cleaner/icon_128x128.af8309b80629ae692ea150280d9262b8.png","af8309b80629ae692ea150280d9262b8"],["/Social-Cleaner/icon_192x192.919e76532ca6430776be8995ce6d4f75.png","919e76532ca6430776be8995ce6d4f75"],["/Social-Cleaner/icon_256x256.f08d25fd9e85fe32c380cecd8bda4772.png","f08d25fd9e85fe32c380cecd8bda4772"],["/Social-Cleaner/icon_384x384.5e5e96ecb0fa462e170b4ae0e8c9e85d.png","5e5e96ecb0fa462e170b4ae0e8c9e85d"],["/Social-Cleaner/icon_512x512.0a4bd7a7d242efbfa382db23accb495b.png","0a4bd7a7d242efbfa382db23accb495b"],["/Social-Cleaner/icon_96x96.23ab4f2083b2a9fb21eb3dc5086d4f89.png","23ab4f2083b2a9fb21eb3dc5086d4f89"],["/Social-Cleaner/index.html","de94e3c768f8ec4d97e0e2ef10f486e8"],["/Social-Cleaner/manifest.61b059edac2f42380d23dc2c68374e07.json","61b059edac2f42380d23dc2c68374e07"],["/Social-Cleaner/static/css/app.b4ee6d23e36e0d6305f4.css","bfc0e6502872f0b512503efda8567a00"],["/Social-Cleaner/static/css/vendor.458198b970181fb13393.css","a7b383aef19d8b8a6189dd7ce5af3001"],["/Social-Cleaner/static/favicon.ico","d2546612497ef095005309377ef16d4b"],["/Social-Cleaner/static/fonts/feather.5fad700.eot","5fad700adc948cb51404d55833347f51"],["/Social-Cleaner/static/fonts/feather.66cbb62.woff","66cbb621b431bf32041a5c478e5539c0"],["/Social-Cleaner/static/fonts/feather.a940fe8.ttf","a940fe89dbfe9d1d89fc1aa0488fe032"],["/Social-Cleaner/static/fonts/fontawesome-webfont.674f50d.eot","674f50d287a8c48dc19ba404d20fe713"],["/Social-Cleaner/static/fonts/fontawesome-webfont.af7ae50.woff2","af7ae505a9eed503f8b8e6982036873e"],["/Social-Cleaner/static/fonts/fontawesome-webfont.b06871f.ttf","b06871f281fee6b241d60582ae9369b9"],["/Social-Cleaner/static/fonts/fontawesome-webfont.fee66e7.woff","fee66e712a8a08eef5805a46892932ad"],["/Social-Cleaner/static/img/feather.023ba08.svg","023ba0824a99109c4a63622228dd6354"],["/Social-Cleaner/static/img/fontawesome-webfont.912ec66.svg","912ec66d7572ff821749319396470bde"],["/Social-Cleaner/static/img/logo-square-full.png","0198dc4269c314b0a5a51f2dd948ded9"],["/Social-Cleaner/static/img/logo-square.png","5b65520b407bb5f6ba53c303be9df3f7"],["/Social-Cleaner/static/js/app.b4ee6d23e36e0d6305f4.js","b9cbb664bbb498f4d042925ae9607b42"],["/Social-Cleaner/static/js/runtime.d2ed37c115741e8104a3.js","98e53b7899d731ce011408aa9584b257"],["/Social-Cleaner/static/js/vendor.458198b970181fb13393.js","c7c747dd302003f294bd05c737ae25fe"]],cacheName="sw-precache-v3-social-cleaner-"+(self.registration?self.registration.scope:""),ignoreUrlParametersMatching=[/^utm_/],addDirectoryIndex=function(e,a){var t=new URL(e);return"/"===t.pathname.slice(-1)&&(t.pathname+=a),t.toString()},cleanResponse=function(e){return e.redirected?("body"in e?Promise.resolve(e.body):e.blob()).then(function(a){return new Response(a,{headers:e.headers,status:e.status,statusText:e.statusText})}):Promise.resolve(e)},createCacheKey=function(e,a,t,n){var c=new URL(e);return n&&c.pathname.match(n)||(c.search+=(c.search?"&":"")+encodeURIComponent(a)+"="+encodeURIComponent(t)),c.toString()},isPathWhitelisted=function(e,a){if(0===e.length)return!0;var t=new URL(a).pathname;return e.some(function(e){return t.match(e)})},stripIgnoredUrlParameters=function(e,a){var t=new URL(e);return t.hash="",t.search=t.search.slice(1).split("&").map(function(e){return e.split("=")}).filter(function(e){return a.every(function(a){return!a.test(e[0])})}).map(function(e){return e.join("=")}).join("&"),t.toString()},hashParamName="_sw-precache",urlsToCacheKeys=new Map(precacheConfig.map(function(e){var a=e[0],t=e[1],n=new URL(a,self.location),c=createCacheKey(n,hashParamName,t,/\.\w{8}\./);return[n.toString(),c]}));function setOfCachedUrls(e){return e.keys().then(function(e){return e.map(function(e){return e.url})}).then(function(e){return new Set(e)})}self.addEventListener("install",function(e){e.waitUntil(caches.open(cacheName).then(function(e){return setOfCachedUrls(e).then(function(a){return Promise.all(Array.from(urlsToCacheKeys.values()).map(function(t){if(!a.has(t)){var n=new Request(t,{credentials:"same-origin"});return fetch(n).then(function(a){if(!a.ok)throw new Error("Request for "+t+" returned a response with status "+a.status);return cleanResponse(a).then(function(a){return e.put(t,a)})})}}))})}).then(function(){return self.skipWaiting()}))}),self.addEventListener("activate",function(e){var a=new Set(urlsToCacheKeys.values());e.waitUntil(caches.open(cacheName).then(function(e){return e.keys().then(function(t){return Promise.all(t.map(function(t){if(!a.has(t.url))return e.delete(t)}))})}).then(function(){return self.clients.claim()}))}),self.addEventListener("fetch",function(e){if("GET"===e.request.method){var a,t=stripIgnoredUrlParameters(e.request.url,ignoreUrlParametersMatching);(a=urlsToCacheKeys.has(t))||(t=addDirectoryIndex(t,"index.html"),a=urlsToCacheKeys.has(t));!a&&"navigate"===e.request.mode&&isPathWhitelisted([],e.request.url)&&(t=new URL("https://alexeykhr.github.io/Social-Cleaner/",self.location).toString(),a=urlsToCacheKeys.has(t)),a&&e.respondWith(caches.open(cacheName).then(function(e){return e.match(urlsToCacheKeys.get(t)).then(function(e){if(e)return e;throw Error("The cached response that was expected is missing.")})}).catch(function(a){return console.warn('Couldn\'t serve response for "%s" from cache: %O',e.request.url,a),fetch(e.request)}))}});