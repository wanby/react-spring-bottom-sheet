import e from"@reach/portal";import n,{useRef as t,useDebugValue as r,useEffect as o,useLayoutEffect as i,useState as a,useCallback as c,useMemo as u,useImperativeHandle as s,forwardRef as l}from"react";import{useMachine as d}from"@xstate/react";import{useSpring as f,interpolate as v,animated as m,config as p}from"react-spring";import{useDrag as h,rubberbandIfOutOfBounds as y}from"react-use-gesture";import{createFocusTrap as g}from"focus-trap";import{ResizeObserver as S}from"@juggle/resize-observer";import{Machine as E,assign as P}from"xstate";function b(){return(b=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function R(e,n){if(null==e)return{};var t,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n.indexOf(t=i[r])>=0||(o[t]=e[t]);return o}var w="undefined"!=typeof window?i:o,O=!1;if("undefined"!=typeof window){var x={get passive(){O=!0}};window.addEventListener("testPassive",null,x),window.removeEventListener("testPassive",null,x)}var C,N,H="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1),k=[],D=!1,j=-1,z=function(e){return k.some(function(n){return!(!n.options.allowTouchMove||!n.options.allowTouchMove(e))})},A=function(e){var n=e||window.event;return!!z(n.target)||n.touches.length>1||(n.preventDefault&&n.preventDefault(),!1)},L=function(){void 0!==N&&(document.body.style.paddingRight=N,N=void 0),void 0!==C&&(document.body.style.overflow=C,C=void 0)},T=function(e){return!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight};function M(e,n,t){return n=(n=+n)==n?n:0,t=(t=+t)==t?t:0,(e=+e)==e&&(e=(e=e<=t?e:t)>=n?e:n),e}function I(e){var n=Math.round(e);if(Number.isNaN(e))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return n}var G={box:"border-box"};function F(e,n){var t=n.label,o=n.enabled,i=n.resizeSourceRef,u=a(0),s=u[0],l=u[1];r(t+": "+s);var d=c(function(e){l(e[0].borderBoxSize[0].blockSize),i.current="element"},[i]);return w(function(){if(e.current&&o){var n=new S(d);return n.observe(e.current,G),function(){n.disconnect()}}},[e,d,o]),o?s:0}function Z(e){return void 0===e&&(e=1e3),new Promise(function(n){return setTimeout(n,e)})}var B={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},V={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},q=E({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:b({},B,V)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:b({},B,V)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:b({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[P({y:function(e,n){return n.payload.y},velocity:function(e,n){return n.payload.velocity},snapSource:function(e,n){var t=n.payload.source;return void 0===t?"custom":t}})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:function(e,n){},onSnapCancel:function(e,n){},onResizeCancel:function(e,n){},onCloseCancel:function(e,n){},onOpenEnd:function(e,n){},onSnapEnd:function(e,n){},onRezizeEnd:function(e,n){}},services:{onSnapStart:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onOpenStart:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onCloseStart:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onResizeStart:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onSnapEnd:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onOpenEnd:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onCloseEnd:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},onResizeEnd:function(){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},renderVisuallyHidden:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},activate:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},deactivate:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},openSmoothly:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},openImmediately:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},snapSmoothly:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},resizeSmoothly:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}},closeSmoothly:function(e,n){try{return Promise.resolve(Z()).then(function(){})}catch(e){return Promise.reject(e)}}},guards:{initiallyClosed:function(e){return"CLOSED"===e.initialState},initiallyOpen:function(e){return"OPEN"===e.initialState}}}),W=p.default,Y=W.tension,K=W.friction,J=n.forwardRef(function(e,i){var l=e.children,p=e.sibling,S=e.className,E=e.topOffset,P=e.springConfig,x=e.ignoreLockClasses,G=e.footer,Z=e.header,B=e.open,V=e.initialState,W=e.lastSnapRef,J=e.initialFocusRef,$=e.onDismiss,_=e.maxHeight,ee=e.defaultSnap,ne=void 0===ee?U:ee,te=e.snapPoints,re=void 0===te?X:te,oe=e.blocking,ie=void 0===oe||oe,ae=e.scrollLocking,ce=void 0===ae||ae,ue=e.style,se=e.onSpringStart,le=e.onSpringCancel,de=e.onSpringEnd,fe=e.reserveScrollBarGap,ve=void 0===fe?ie:fe,me=R(e,["children","sibling","className","topOffset","springConfig","ignoreLockClasses","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap"]),pe=function(){var e=a(!1),n=e[0],t=e[1],r=a({}),i=r[0],u=r[1],s=c(function(e){return u(function(n){var t;return b({},n,((t={})[e]=!1,t))}),function(){u(function(n){var t;return b({},n,((t={})[e]=!0,t))})}},[]);return o(function(){var e=Object.values(i);0!==e.length&&e.every(Boolean)&&t(!0)},[i]),{ready:n,registerReady:s}}(),he=pe.ready,ye=pe.registerReady,ge=t(!1),Se=t(se),Ee=t(le),Pe=t(de);o(function(){Se.current=se,Ee.current=le,Pe.current=de},[le,se,de]);var be,Re,we=f(function(){return{y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0,topOffset:0}}),Oe=we[0],xe=we[1],Ce=t(null),Ne=t(null),He=t(null),ke=t(null),De=t(null),je=t(null),ze=t(0),Ae=t(),Le=(be=u(function(){return"undefined"!=typeof window?window.matchMedia("(prefers-reduced-motion: reduce)"):null},[]),Re=t(null==be?void 0:be.matches),r(Re.current?"reduce":"no-preference"),o(function(){var e=function(e){Re.current=e.matches};return null==be||be.addListener(e),function(){return null==be?void 0:be.removeListener(e)}},[be]),Re),Te=function(e){var n=e.targetRef,i=e.enabled,a=e.reserveScrollBarGap,c=e.ignoreLockClasses,u=t({activate:function(){throw new TypeError("Tried to activate scroll lock too early")},deactivate:function(){}});return r(i?"Enabled":"Disabled"),o(function(){if(!i)return u.current.deactivate(),void(u.current={activate:function(){},deactivate:function(){}});var e=n.current,t=!1;u.current={activate:function(){var n,r;t||(t=!0,H?(k.forEach(function(e){e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),D&&(document.removeEventListener("touchmove",A,O?{passive:!1}:void 0),D=!1),j=-1):L(),k=[],r={allowTouchMove:function(e){return 0!==c.length&&c.some(function(n){return n&&n.length&&e.closest("."+n)})},reserveScrollBarGap:a},(n=e)&&(k.some(function(e){return e.targetElement===n})||(k=[].concat(k,[{targetElement:n,options:r||{}}]),H?(n.ontouchstart=function(e){1===e.targetTouches.length&&(j=e.targetTouches[0].clientY)},n.ontouchmove=function(e){1===e.targetTouches.length&&function(e,n){var t=e.targetTouches[0].clientY-j;(!z(e.target)||!(0!==n.scrollTop&&t>0||!T(n)&&t<0))&&(n&&0===n.scrollTop&&t>0||T(n)&&t<0?A(e):e.stopPropagation())}(e,n)},D||(document.addEventListener("touchmove",A,O?{passive:!1}:void 0),D=!0)):function(e){if(void 0===N){var n=window.innerWidth-document.documentElement.clientWidth;if(e&&!0===e.reserveScrollBarGap&&n>0){var t=parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"),10);N=document.body.style.paddingRight,document.body.style.paddingRight=t+n+"px"}}void 0===C&&(C=document.body.style.overflow,document.body.style.overflow="hidden")}(r))))},deactivate:function(){var n;t&&(t=!1,(n=e)&&(k=k.filter(function(e){return e.targetElement!==n}),H?(n.ontouchstart=null,n.ontouchmove=null,D&&0===k.length&&(document.removeEventListener("touchmove",A,O?{passive:!1}:void 0),D=!1)):k.length||L()))}}},[i,n,a,c]),u}({targetRef:Ne,enabled:he&&ce,reserveScrollBarGap:ve,ignoreLockClasses:x?Array.isArray(x)?x:[x]:[]}),Me=function(e){var n=e.targetRef,i=e.enabled,a=t({activate:function(){throw new TypeError("Tried to activate aria hider too early")},deactivate:function(){}});return r(i?"Enabled":"Disabled"),o(function(){if(!i)return a.current.deactivate(),void(a.current={activate:function(){},deactivate:function(){}});var e=n.current,t=!1,r=[],o=[];a.current={activate:function(){if(!t){t=!0;var n=e.parentNode;document.querySelectorAll("body > *").forEach(function(e){if(e!==n){var t=e.getAttribute("aria-hidden");null!==t&&"false"!==t||(r.push(t),o.push(e),e.setAttribute("aria-hidden","true"))}})}},deactivate:function(){t&&(t=!1,o.forEach(function(e,n){var t=r[n];null===t?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t)}),r=[],o=[])}}},[n,i]),a}({targetRef:Ce,enabled:he&&ie}),Ie=function(e){var n=e.targetRef,i=e.fallbackRef,a=e.initialFocusRef,c=e.enabled,u=t({activate:function(){throw new TypeError("Tried to activate focus trap too early")},deactivate:function(){}});return r(c?"Enabled":"Disabled"),o(function(){if(!c)return u.current.deactivate(),void(u.current={activate:function(){},deactivate:function(){}});var e=i.current,t=g(n.current,{onActivate:void 0,initialFocus:a?function(){return(null==a?void 0:a.current)||e}:void 0,fallbackFocus:e,escapeDeactivates:!1,clickOutsideDeactivates:!1}),r=!1;u.current={activate:function(){try{return r?Promise.resolve():(r=!0,Promise.resolve(t.activate()).then(function(){return Promise.resolve(new Promise(function(e){return setTimeout(function(){return e(void 0)},0)})).then(function(){})}))}catch(e){return Promise.reject(e)}},deactivate:function(){r&&(r=!1,t.deactivate())}}},[c,i,a,n]),u}({targetRef:Ce,fallbackRef:je,initialFocusRef:J,enabled:he&&ie}),Ge=function(e){var n=e.getSnapPoints,i=e.heightRef,c=e.lastSnapRef,s=e.ready,l=function(e){var n=e.contentRef,i=e.controlledMaxHeight,c=e.footerEnabled,s=e.footerRef,l=e.headerEnabled,d=e.headerRef,f=e.registerReady,v=e.resizeSourceRef,m=u(function(){return f("contentHeight")},[f]),p=function(e,n,i){var c=u(function(){return n("maxHeight")},[n]),s=a(function(){return I(e)||"undefined"!=typeof window?window.innerHeight:0}),l=s[0],d=s[1],f=l>0,v=t(0);return r(e?"controlled":"auto"),o(function(){f&&c()},[f,c]),w(function(){if(e)return d(I(e)),void(i.current="maxheightprop");var n=function(){v.current||(v.current=requestAnimationFrame(function(){d(window.innerHeight),i.current="window",v.current=0}))};return window.addEventListener("resize",n),d(window.innerHeight),i.current="window",c(),function(){window.removeEventListener("resize",n),cancelAnimationFrame(v.current)}},[e,c,i]),l}(i,f,v),h=F(d,{label:"headerHeight",enabled:l,resizeSourceRef:v}),y=F(n,{label:"contentHeight",enabled:!0,resizeSourceRef:v}),g=F(s,{label:"footerHeight",enabled:c,resizeSourceRef:v}),S=Math.min(p-h-g,y)+h+g;r("minHeight: "+S);var E=y>0;return o(function(){E&&m()},[E,m]),{maxHeight:p,minHeight:S,headerHeight:h,footerHeight:g}}({contentRef:e.contentRef,controlledMaxHeight:e.controlledMaxHeight,footerEnabled:e.footerEnabled,footerRef:e.footerRef,headerEnabled:e.headerEnabled,headerRef:e.headerRef,registerReady:e.registerReady,resizeSourceRef:e.resizeSourceRef}),d=l.maxHeight,f=l.minHeight,v=l.headerHeight,m=l.footerHeight,p=function(e,n){var t=[].concat(e).map(I).reduce(function(e,t){return e.add(M(t,0,n)),e},new Set),r=Array.from(t),o=Math.min.apply(Math,r);if(Number.isNaN(o))throw new TypeError("minSnap is NaN");var i=Math.max.apply(Math,r);if(Number.isNaN(i))throw new TypeError("maxSnap is NaN");return{snapPoints:r,minSnap:o,maxSnap:i}}(s?n({height:i.current,footerHeight:m,headerHeight:v,minHeight:f,maxHeight:d}):[0],d),h=p.snapPoints,y=p.minSnap,g=p.maxSnap;return r("minSnap: "+y+", maxSnap:"+g),{minSnap:y,maxSnap:g,findSnap:function(e){var n=I("function"==typeof e?e({footerHeight:m,headerHeight:v,height:i.current,minHeight:f,maxHeight:d,snapPoints:h,lastSnap:c.current}):e);return h.reduce(function(e,t){return Math.abs(t-n)<Math.abs(e-n)?t:e},y)},maxHeight:d}}({contentRef:He,controlledMaxHeight:_,footerEnabled:!!G,footerRef:De,getSnapPoints:re,headerEnabled:!1!==Z,headerRef:ke,heightRef:ze,lastSnapRef:W,ready:he,registerReady:ye,resizeSourceRef:Ae}),Fe=Ge.minSnap,Ze=Ge.maxSnap,Be=Ge.maxHeight,Ve=Ge.findSnap,qe=t(Be),We=t(Fe),Ye=t(Ze),Ke=t(Ve),Je=t(0),Qe=t(E||0);w(function(){qe.current=Be,Ye.current=Ze,We.current=Fe,Ke.current=Ve,Je.current=Ve(ne)},[Ve,ne,Be,Ze,Fe]);var Ue=c(function(e){var n=e.onRest,t=e.config,r=(t=void 0===t?{}:t).velocity,o=void 0===r?1:r,i=R(t,["velocity"]),a=R(e,["onRest","config"]);return new Promise(function(e){return xe(b({},a,{config:b({velocity:o},i,{mass:1,tension:Y,friction:Math.max(K,K+(K-K*o))},P),onRest:function(){var t=[].slice.call(arguments);e.apply(void 0,t),null==n||n.apply(void 0,t)}}))})},[xe]),Xe=d(q,{devTools:!1,actions:{onOpenCancel:c(function(){return null==Ee.current?void 0:Ee.current({type:"OPEN"})},[]),onSnapCancel:c(function(e){return null==Ee.current?void 0:Ee.current({type:"SNAP",source:e.snapSource})},[]),onCloseCancel:c(function(){return null==Ee.current?void 0:Ee.current({type:"CLOSE"})},[]),onResizeCancel:c(function(){return null==Ee.current?void 0:Ee.current({type:"RESIZE",source:Ae.current})},[]),onOpenEnd:c(function(){return null==Pe.current?void 0:Pe.current({type:"OPEN"})},[]),onSnapEnd:c(function(e,n){return null==Pe.current?void 0:Pe.current({type:"SNAP",source:e.snapSource})},[]),onResizeEnd:c(function(){return null==Pe.current?void 0:Pe.current({type:"RESIZE",source:Ae.current})},[])},context:{initialState:V},services:{onSnapStart:c(function(e,n){try{return Promise.resolve(null==Se.current?void 0:Se.current({type:"SNAP",source:n.payload.source||"custom"}))}catch(e){return Promise.reject(e)}},[]),onOpenStart:c(function(){try{return Promise.resolve(null==Se.current?void 0:Se.current({type:"OPEN"}))}catch(e){return Promise.reject(e)}},[]),onCloseStart:c(function(){try{return Promise.resolve(null==Se.current?void 0:Se.current({type:"CLOSE"}))}catch(e){return Promise.reject(e)}},[]),onResizeStart:c(function(){try{return Promise.resolve(null==Se.current?void 0:Se.current({type:"RESIZE",source:Ae.current}))}catch(e){return Promise.reject(e)}},[]),onSnapEnd:c(function(e,n){try{return Promise.resolve(null==Pe.current?void 0:Pe.current({type:"SNAP",source:e.snapSource}))}catch(e){return Promise.reject(e)}},[]),onOpenEnd:c(function(){try{return Promise.resolve(null==Pe.current?void 0:Pe.current({type:"OPEN"}))}catch(e){return Promise.reject(e)}},[]),onCloseEnd:c(function(){try{return Promise.resolve(null==Pe.current?void 0:Pe.current({type:"CLOSE"}))}catch(e){return Promise.reject(e)}},[]),onResizeEnd:c(function(){try{return Promise.resolve(null==Pe.current?void 0:Pe.current({type:"RESIZE",source:Ae.current}))}catch(e){return Promise.reject(e)}},[]),renderVisuallyHidden:c(function(e,n){try{return Promise.resolve(Ue({y:Je.current,ready:0,maxHeight:qe.current,maxSnap:Ye.current,minSnap:Je.current,immediate:!0,topOffset:Qe.current})).then(function(){})}catch(e){return Promise.reject(e)}},[Ue]),activate:c(function(e,n){try{return ge.current=!0,Promise.resolve(Promise.all([Te.current.activate(),Ie.current.activate(),Me.current.activate()])).then(function(){})}catch(e){return Promise.reject(e)}},[Me,Ie,Te]),deactivate:c(function(){try{return Te.current.deactivate(),Ie.current.deactivate(),Me.current.deactivate(),ge.current=!1,Promise.resolve()}catch(e){return Promise.reject(e)}},[Me,Ie,Te]),openImmediately:c(function(){try{return ze.current=Je.current,Promise.resolve(Ue({y:Je.current,ready:1,maxHeight:qe.current,maxSnap:Ye.current,minSnap:Je.current,immediate:!0,topOffset:Qe.current})).then(function(){})}catch(e){return Promise.reject(e)}},[Ue]),openSmoothly:c(function(){try{return Promise.resolve(Ue({y:0,ready:1,maxHeight:qe.current,maxSnap:Ye.current,minSnap:Je.current,immediate:!0,topOffset:Qe.current})).then(function(){return ze.current=Je.current,Promise.resolve(Ue({y:Je.current,ready:1,maxHeight:qe.current,maxSnap:Ye.current,minSnap:Je.current,immediate:Le.current,topOffset:Qe.current})).then(function(){})})}catch(e){return Promise.reject(e)}},[Ue,Le]),snapSmoothly:c(function(e,n){try{var t=Ke.current(e.y);return ze.current=t,W.current=t,Promise.resolve(Ue({y:t,ready:1,maxHeight:qe.current,maxSnap:Ye.current,minSnap:We.current,immediate:Le.current,topOffset:Qe.current,config:{velocity:e.velocity}})).then(function(){})}catch(e){return Promise.reject(e)}},[Ue,W,Le]),resizeSmoothly:c(function(){try{var e=Ke.current(ze.current);return ze.current=e,W.current=e,Promise.resolve(Ue({y:e,ready:1,maxHeight:qe.current,maxSnap:Ye.current,minSnap:We.current,topOffset:Qe.current,immediate:"element"!==Ae.current||Le.current})).then(function(){})}catch(e){return Promise.reject(e)}},[Ue,W,Le]),closeSmoothly:c(function(e,n){try{return Ue({minSnap:ze.current,immediate:!0}),ze.current=0,Promise.resolve(Ue({y:0,maxHeight:qe.current,maxSnap:Ye.current,immediate:Le.current})).then(function(){return Promise.resolve(Ue({ready:0,immediate:!0})).then(function(){})})}catch(e){return Promise.reject(e)}},[Ue,Le])}}),$e=Xe[0],_e=Xe[1];o(function(){he&&_e(B?"OPEN":"CLOSE")},[B,_e,he]),w(function(){(Be||Ze||Fe)&&_e("RESIZE")},[Be,Ze,Fe,_e]),o(function(){return function(){Te.current.deactivate(),Ie.current.deactivate(),Me.current.deactivate()}},[Me,Ie,Te]),s(i,function(){return{snapTo:function(e,n){var t=void 0===n?{}:n,r=t.velocity,o=void 0===r?1:r,i=t.source,a=void 0===i?"custom":i;_e("SNAP",{payload:{y:Ke.current(e),velocity:o,source:a}})},get height(){return ze.current}}},[_e]);var en=h(function(e){var n=e.args,t=(n=void 0===n?[]:n)[0],r=(t=void 0===t?{}:t).closeOnTap,o=void 0!==r&&r,i=e.cancel,a=e.direction[1],c=e.down,u=e.first,s=e.last,l=e.memo,d=void 0===l?Oe.y.getValue():l,f=e.tap,v=e.velocity,m=-1*e.movement[1];if(!ge.current)return i(),d;if($&&o&&f)return i(),setTimeout(function(){return $()},0),d;if(f)return d;var p=d+m,h=m*v,g=Math.max(We.current,Math.min(Ye.current,p+2*h));if(!c&&$&&a>0&&p+h<We.current/2)return i(),$(),d;var S=c?$||We.current!==Ye.current?y(p,$?0:We.current,Ye.current,.85):p<We.current?y(p,We.current,2*Ye.current,.85):y(p,We.current/2,Ye.current,.85):g;return u&&_e("DRAG"),s?(_e("SNAP",{payload:{y:S,velocity:v>.05?v:1,source:"dragging"}}),d):(xe({y:S,ready:1,maxHeight:qe.current,maxSnap:Ye.current,minSnap:We.current,topOffset:Qe.current,immediate:!0,config:{velocity:v}}),d)},{filterTaps:!0});if(Number.isNaN(Ye.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(We.current))throw new TypeError("minSnapRef is NaN!!");var nn=function(e){var n,t=e.spring,r=v([t.y,t.maxHeight,t.topOffset],function(e,n,t){return Math.round(M(n-e-(t||0),0,16))+"px"}),o=v([t.y,t.minSnap,t.maxSnap],function(e,n,t){return M(e,n,t)+"px"}),i=v([t.y,t.minSnap,t.maxSnap],function(e,n,t){return e<n?n-e+"px":e>t?t-e+"px":"0px"}),a=v([t.y,t.maxSnap],function(e,n){return e>=n?Math.ceil(e-n):0}),c=v([t.y,t.minSnap],function(e,n){if(!n)return 0;var t=Math.max(n/2-45,0);return M((e-t)*(1/(Math.min(n/2+45,n)-t)+0),0,1)}),u=v([t.y,t.minSnap],function(e,n){return n?M(e/n,0,1):0});return(n={})["--rsbs-content-opacity"]=c,n["--rsbs-backdrop-opacity"]=u,n["--rsbs-antigap-scale-y"]=a,n["--rsbs-overlay-translate-y"]=i,n["--rsbs-overlay-rounded"]=r,n["--rsbs-overlay-h"]=o,n}({spring:Oe});return n.createElement(m.div,b({},me,{"data-rsbs-root":!0,"data-rsbs-state":Q.find($e.matches),"data-rsbs-is-blocking":ie,"data-rsbs-is-dismissable":!!$,"data-rsbs-has-header":!!Z,"data-rsbs-has-footer":!!G,className:S,ref:Ce,style:b({},nn,ue,{opacity:Oe.ready})}),p,ie&&n.createElement("div",b({key:"backdrop","data-rsbs-backdrop":!0},en({closeOnTap:!0}))),n.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:je,onKeyDown:function(e){"Escape"===e.key&&(e.stopPropagation(),$&&$())}},!1!==Z&&n.createElement("div",b({key:"header","data-rsbs-header":!0,ref:ke},en()),Z),n.createElement("div",{key:"scroll","data-rsbs-scroll":!0,ref:Ne},n.createElement("div",{"data-rsbs-content":!0,ref:He},l||n.createElement("div",{style:{position:"relative",height:"1000",overflow:"hidden"}}))),G&&n.createElement("div",b({key:"footer",ref:De,"data-rsbs-footer":!0},en()),G)))}),Q=["closed","opening","open","closing","dragging","snapping","resizing"];function U(e){var n=e.lastSnap;return null!=n?n:Math.min.apply(Math,e.snapPoints)}function X(e){return e.minHeight}var $=l(function(r,o){var i=r.onSpringStart,u=r.onSpringEnd,s=r.skipInitialTransition,l=R(r,["onSpringStart","onSpringEnd","skipInitialTransition"]),d=a(!1),f=d[0],v=d[1],m=t(),p=t(null),h=t(s&&l.open?"OPEN":"CLOSED");w(function(){if(l.open)return cancelAnimationFrame(m.current),v(!0),function(){h.current="CLOSED"}},[l.open]);var y=c(function(e){try{return Promise.resolve(null==i?void 0:i(e)).then(function(){"OPEN"===e.type&&cancelAnimationFrame(m.current)})}catch(e){return Promise.reject(e)}},[i]),g=c(function(e){try{return Promise.resolve(null==u?void 0:u(e)).then(function(){"CLOSE"===e.type&&(m.current=requestAnimationFrame(function(){return v(!1)}))})}catch(e){return Promise.reject(e)}},[u]);return f?n.createElement(e,{"data-rsbs-portal":!0},n.createElement(J,b({},l,{lastSnapRef:p,ref:o,initialState:h.current,onSpringStart:y,onSpringEnd:g}))):null});export{$ as BottomSheet};
//# sourceMappingURL=index.es.js.map
