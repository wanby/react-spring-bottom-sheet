import e from"@reach/portal";import n,{useRef as t,useDebugValue as r,useEffect as a,useLayoutEffect as o,useState as i,useCallback as c,useMemo as s,useImperativeHandle as l,forwardRef as u}from"react";import{useMachine as d}from"@xstate/react";import{useSpring as p,interpolate as g,animated as y,config as m}from"react-spring";import{useDrag as v,rubberbandIfOutOfBounds as f}from"react-use-gesture";import{createFocusTrap as S}from"focus-trap";import{ResizeObserver as h}from"@juggle/resize-observer";import{Machine as E,assign as w}from"xstate";function b(){return(b=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function R(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n.indexOf(t=o[r])>=0||(a[t]=e[t]);return a}const O="undefined"!=typeof window?o:a;let x=!1;if("undefined"!=typeof window){const e={get passive(){x=!0}};window.addEventListener("testPassive",null,e),window.removeEventListener("testPassive",null,e)}const C="undefined"!=typeof window&&window.navigator&&window.navigator.platform&&(/iP(ad|hone|od)/.test(window.navigator.platform)||"MacIntel"===window.navigator.platform&&window.navigator.maxTouchPoints>1);let N,H,k=[],P=!1,D=-1;const z=e=>k.some(n=>!(!n.options.allowTouchMove||!n.options.allowTouchMove(e))),A=e=>{const n=e||window.event;return!!z(n.target)||n.touches.length>1||(n.preventDefault&&n.preventDefault(),!1)},L=()=>{void 0!==H&&(document.body.style.paddingRight=H,H=void 0),void 0!==N&&(document.body.style.overflow=N,N=void 0)},T=e=>!!e&&e.scrollHeight-e.scrollTop<=e.clientHeight;function M(e,n,t){return n=(n=+n)==n?n:0,t=(t=+t)==t?t:0,(e=+e)==e&&(e=(e=e<=t?e:t)>=n?e:n),e}function I(e){const n=Math.round(e);if(Number.isNaN(e))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return n}const G={box:"border-box"};function F(e,{label:n,enabled:t,resizeSourceRef:a}){let[o,s]=i(0);r(`${n}: ${o}`);const l=c(e=>{s(e[0].borderBoxSize[0].blockSize),a.current="element"},[a]);return O(()=>{if(!e.current||!t)return;const n=new h(l);return n.observe(e.current,G),()=>{n.disconnect()}},[e,l,t]),t?o:0}function Z(e=1e3){return new Promise(n=>setTimeout(n,e))}const $={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},B={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},j=E({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:b({},$,B)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:b({},$,B)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:b({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[w({y:(e,{payload:{y:n}})=>n,velocity:(e,{payload:{velocity:n}})=>n,snapSource:(e,{payload:{source:n="custom"}})=>n})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:(e,n)=>{},onSnapCancel:(e,n)=>{},onResizeCancel:(e,n)=>{},onCloseCancel:(e,n)=>{},onOpenEnd:(e,n)=>{},onSnapEnd:(e,n)=>{},onRezizeEnd:(e,n)=>{}},services:{onSnapStart:async()=>{await Z()},onOpenStart:async()=>{await Z()},onCloseStart:async()=>{await Z()},onResizeStart:async()=>{await Z()},onSnapEnd:async()=>{await Z()},onOpenEnd:async()=>{await Z()},onCloseEnd:async()=>{await Z()},onResizeEnd:async()=>{await Z()},renderVisuallyHidden:async(e,n)=>{await Z()},activate:async(e,n)=>{await Z()},deactivate:async(e,n)=>{await Z()},openSmoothly:async(e,n)=>{await Z()},openImmediately:async(e,n)=>{await Z()},snapSmoothly:async(e,n)=>{await Z()},resizeSmoothly:async(e,n)=>{await Z()},closeSmoothly:async(e,n)=>{await Z()}},guards:{initiallyClosed:({initialState:e})=>"CLOSED"===e,initiallyOpen:({initialState:e})=>"OPEN"===e}}),{tension:V,friction:q}=m.default,W=n.forwardRef(function(e,o){let{children:u,sibling:m,className:h,topOffset:E,springConfig:w,ignoreLockClasses:G,footer:Z,header:$,open:B,initialState:W,lastSnapRef:Q,initialFocusRef:U,onDismiss:X,maxHeight:_,defaultSnap:ee=K,snapPoints:ne=J,blocking:te=!0,scrollLocking:re=!0,style:ae,onSpringStart:oe,onSpringCancel:ie,onSpringEnd:ce,reserveScrollBarGap:se=te}=e,le=R(e,["children","sibling","className","topOffset","springConfig","ignoreLockClasses","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap"]);const{ready:ue,registerReady:de}=function(){const[e,n]=i(!1),[t,r]=i({}),o=c(e=>(r(n=>b({},n,{[e]:!1})),()=>{r(n=>b({},n,{[e]:!0}))}),[]);return a(()=>{const e=Object.values(t);0!==e.length&&e.every(Boolean)&&n(!0)},[t]),{ready:e,registerReady:o}}(),pe=t(!1),ge=t(oe),ye=t(ie),me=t(ce);a(()=>{ge.current=oe,ye.current=ie,me.current=ce},[ie,oe,ce]);const[ve,fe]=p(()=>({y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0,topOffset:0})),Se=t(null),he=t(null),Ee=t(null),we=t(null),be=t(null),Re=t(null),Oe=t(0),xe=t(),Ce=function(){const e=s(()=>"undefined"!=typeof window?window.matchMedia("(prefers-reduced-motion: reduce)"):null,[]),n=t(null==e?void 0:e.matches);return r(n.current?"reduce":"no-preference"),a(()=>{const t=e=>{n.current=e.matches};return null==e||e.addListener(t),()=>null==e?void 0:e.removeListener(t)},[e]),n}(),Ne=function({targetRef:e,enabled:n,reserveScrollBarGap:o,ignoreLockClasses:i}){const c=t({activate:()=>{throw new TypeError("Tried to activate scroll lock too early")},deactivate:()=>{}});return r(n?"Enabled":"Disabled"),a(()=>{if(!n)return c.current.deactivate(),void(c.current={activate:()=>{},deactivate:()=>{}});const t=e.current;let r=!1;c.current={activate:()=>{r||(r=!0,C?(k.forEach(e=>{e.targetElement.ontouchstart=null,e.targetElement.ontouchmove=null}),P&&(document.removeEventListener("touchmove",A,x?{passive:!1}:void 0),P=!1),D=-1):L(),k=[],((e,n)=>{if(!e)return;if(k.some(n=>n.targetElement===e))return;const t={targetElement:e,options:n||{}};k=[...k,t],C?(e.ontouchstart=e=>{1===e.targetTouches.length&&(D=e.targetTouches[0].clientY)},e.ontouchmove=n=>{1===n.targetTouches.length&&((e,n)=>{const t=e.targetTouches[0].clientY-D;(!z(e.target)||!(0!==n.scrollTop&&t>0||!T(n)&&t<0))&&(n&&0===n.scrollTop&&t>0||T(n)&&t<0?A(e):e.stopPropagation())})(n,e)},P||(document.addEventListener("touchmove",A,x?{passive:!1}:void 0),P=!0)):(e=>{if(void 0===H){const n=window.innerWidth-document.documentElement.clientWidth;if(e&&!0===e.reserveScrollBarGap&&n>0){const e=parseInt(getComputedStyle(document.body).getPropertyValue("padding-right"),10);H=document.body.style.paddingRight,document.body.style.paddingRight=`${e+n}px`}}void 0===N&&(N=document.body.style.overflow,document.body.style.overflow="hidden")})(n)})(t,{allowTouchMove:e=>0!==i.length&&i.some(n=>n&&n.length&&e.closest(`.${n}`)),reserveScrollBarGap:o}))},deactivate:()=>{var e;r&&(r=!1,(e=t)&&(k=k.filter(n=>n.targetElement!==e),C?(e.ontouchstart=null,e.ontouchmove=null,P&&0===k.length&&(document.removeEventListener("touchmove",A,x?{passive:!1}:void 0),P=!1)):k.length||L()))}}},[n,e,o,i]),c}({targetRef:he,enabled:ue&&re,reserveScrollBarGap:se,ignoreLockClasses:G?Array.isArray(G)?G:[G]:[]}),He=function({targetRef:e,enabled:n}){const o=t({activate:()=>{throw new TypeError("Tried to activate aria hider too early")},deactivate:()=>{}});return r(n?"Enabled":"Disabled"),a(()=>{if(!n)return o.current.deactivate(),void(o.current={activate:()=>{},deactivate:()=>{}});const t=e.current;let r=!1,a=[],i=[];o.current={activate:()=>{if(r)return;r=!0;const e=t.parentNode;document.querySelectorAll("body > *").forEach(n=>{if(n===e)return;let t=n.getAttribute("aria-hidden");null!==t&&"false"!==t||(a.push(t),i.push(n),n.setAttribute("aria-hidden","true"))})},deactivate:()=>{r&&(r=!1,i.forEach((e,n)=>{let t=a[n];null===t?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t)}),a=[],i=[])}}},[e,n]),o}({targetRef:Se,enabled:ue&&te}),ke=function({targetRef:e,fallbackRef:n,initialFocusRef:o,enabled:i}){const c=t({activate:()=>{throw new TypeError("Tried to activate focus trap too early")},deactivate:()=>{}});return r(i?"Enabled":"Disabled"),a(()=>{if(!i)return c.current.deactivate(),void(c.current={activate:()=>{},deactivate:()=>{}});const t=n.current,r=S(e.current,{onActivate:void 0,initialFocus:o?()=>(null==o?void 0:o.current)||t:void 0,fallbackFocus:t,escapeDeactivates:!1,clickOutsideDeactivates:!1});let a=!1;c.current={activate:async()=>{a||(a=!0,await r.activate(),await new Promise(e=>setTimeout(()=>e(void 0),0)))},deactivate:()=>{a&&(a=!1,r.deactivate())}}},[i,n,o,e]),c}({targetRef:Se,fallbackRef:Re,initialFocusRef:U,enabled:ue&&te}),{minSnap:Pe,maxSnap:De,maxHeight:ze,findSnap:Ae}=function({contentRef:e,controlledMaxHeight:n,footerEnabled:o,footerRef:c,getSnapPoints:l,headerEnabled:u,headerRef:d,heightRef:p,lastSnapRef:g,ready:y,registerReady:m,resizeSourceRef:v}){const{maxHeight:f,minHeight:S,headerHeight:h,footerHeight:E}=function({contentRef:e,controlledMaxHeight:n,footerEnabled:o,footerRef:c,headerEnabled:l,headerRef:u,registerReady:d,resizeSourceRef:p}){const g=s(()=>d("contentHeight"),[d]),y=function(e,n,o){const c=s(()=>n("maxHeight"),[n]),[l,u]=i(()=>I(e)||"undefined"!=typeof window?window.innerHeight:0),d=l>0,p=t(0);return r(e?"controlled":"auto"),a(()=>{d&&c()},[d,c]),O(()=>{if(e)return u(I(e)),void(o.current="maxheightprop");const n=()=>{p.current||(p.current=requestAnimationFrame(()=>{u(window.innerHeight),o.current="window",p.current=0}))};return window.addEventListener("resize",n),u(window.innerHeight),o.current="window",c(),()=>{window.removeEventListener("resize",n),cancelAnimationFrame(p.current)}},[e,c,o]),l}(n,d,p),m=F(u,{label:"headerHeight",enabled:l,resizeSourceRef:p}),v=F(e,{label:"contentHeight",enabled:!0,resizeSourceRef:p}),f=F(c,{label:"footerHeight",enabled:o,resizeSourceRef:p}),S=Math.min(y-m-f,v)+m+f;r(`minHeight: ${S}`);const h=v>0;return a(()=>{h&&g()},[h,g]),{maxHeight:y,minHeight:S,headerHeight:m,footerHeight:f}}({contentRef:e,controlledMaxHeight:n,footerEnabled:o,footerRef:c,headerEnabled:u,headerRef:d,registerReady:m,resizeSourceRef:v}),{snapPoints:w,minSnap:b,maxSnap:R}=function(e,n){const t=[].concat(e).map(I).reduce((e,t)=>(e.add(M(t,0,n)),e),new Set),r=Array.from(t),a=Math.min(...r);if(Number.isNaN(a))throw new TypeError("minSnap is NaN");const o=Math.max(...r);if(Number.isNaN(o))throw new TypeError("maxSnap is NaN");return{snapPoints:r,minSnap:a,maxSnap:o}}(y?l({height:p.current,footerHeight:E,headerHeight:h,minHeight:S,maxHeight:f}):[0],f);return r(`minSnap: ${b}, maxSnap:${R}`),{minSnap:b,maxSnap:R,findSnap:function(e){let n;n="function"==typeof e?e({footerHeight:E,headerHeight:h,height:p.current,minHeight:S,maxHeight:f,snapPoints:w,lastSnap:g.current}):e;const t=I(n);return w.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,b)},maxHeight:f}}({contentRef:Ee,controlledMaxHeight:_,footerEnabled:!!Z,footerRef:be,getSnapPoints:ne,headerEnabled:!1!==$,headerRef:we,heightRef:Oe,lastSnapRef:Q,ready:ue,registerReady:de,resizeSourceRef:xe}),Le=t(ze),Te=t(Pe),Me=t(De),Ie=t(Ae),Ge=t(0),Fe=t(E||0);O(()=>{Le.current=ze,Me.current=De,Te.current=Pe,Ie.current=Ae,Ge.current=Ae(ee)},[Ae,ee,ze,De,Pe]);const Ze=c(e=>{let{onRest:n,config:{velocity:t=1}={}}=e,r=R(e.config,["velocity"]),a=R(e,["onRest","config"]);return new Promise(e=>fe(b({},a,{config:b({velocity:t},r,{mass:1,tension:V,friction:Math.max(q,q+(q-q*t))},w),onRest:(...t)=>{e(...t),null==n||n(...t)}})))},[fe]),[$e,Be]=d(j,{devTools:!1,actions:{onOpenCancel:c(()=>null==ye.current?void 0:ye.current({type:"OPEN"}),[]),onSnapCancel:c(e=>null==ye.current?void 0:ye.current({type:"SNAP",source:e.snapSource}),[]),onCloseCancel:c(()=>null==ye.current?void 0:ye.current({type:"CLOSE"}),[]),onResizeCancel:c(()=>null==ye.current?void 0:ye.current({type:"RESIZE",source:xe.current}),[]),onOpenEnd:c(()=>null==me.current?void 0:me.current({type:"OPEN"}),[]),onSnapEnd:c((e,n)=>null==me.current?void 0:me.current({type:"SNAP",source:e.snapSource}),[]),onResizeEnd:c(()=>null==me.current?void 0:me.current({type:"RESIZE",source:xe.current}),[])},context:{initialState:W},services:{onSnapStart:c(async(e,n)=>null==ge.current?void 0:ge.current({type:"SNAP",source:n.payload.source||"custom"}),[]),onOpenStart:c(async()=>null==ge.current?void 0:ge.current({type:"OPEN"}),[]),onCloseStart:c(async()=>null==ge.current?void 0:ge.current({type:"CLOSE"}),[]),onResizeStart:c(async()=>null==ge.current?void 0:ge.current({type:"RESIZE",source:xe.current}),[]),onSnapEnd:c(async(e,n)=>null==me.current?void 0:me.current({type:"SNAP",source:e.snapSource}),[]),onOpenEnd:c(async()=>null==me.current?void 0:me.current({type:"OPEN"}),[]),onCloseEnd:c(async()=>null==me.current?void 0:me.current({type:"CLOSE"}),[]),onResizeEnd:c(async()=>null==me.current?void 0:me.current({type:"RESIZE",source:xe.current}),[]),renderVisuallyHidden:c(async(e,n)=>{await Ze({y:Ge.current,ready:0,maxHeight:Le.current,maxSnap:Me.current,minSnap:Ge.current,immediate:!0,topOffset:Fe.current})},[Ze]),activate:c(async(e,n)=>{pe.current=!0,await Promise.all([Ne.current.activate(),ke.current.activate(),He.current.activate()])},[He,ke,Ne]),deactivate:c(async()=>{Ne.current.deactivate(),ke.current.deactivate(),He.current.deactivate(),pe.current=!1},[He,ke,Ne]),openImmediately:c(async()=>{Oe.current=Ge.current,await Ze({y:Ge.current,ready:1,maxHeight:Le.current,maxSnap:Me.current,minSnap:Ge.current,immediate:!0,topOffset:Fe.current})},[Ze]),openSmoothly:c(async()=>{await Ze({y:0,ready:1,maxHeight:Le.current,maxSnap:Me.current,minSnap:Ge.current,immediate:!0,topOffset:Fe.current}),Oe.current=Ge.current,await Ze({y:Ge.current,ready:1,maxHeight:Le.current,maxSnap:Me.current,minSnap:Ge.current,immediate:Ce.current,topOffset:Fe.current})},[Ze,Ce]),snapSmoothly:c(async(e,n)=>{const t=Ie.current(e.y);Oe.current=t,Q.current=t,await Ze({y:t,ready:1,maxHeight:Le.current,maxSnap:Me.current,minSnap:Te.current,immediate:Ce.current,topOffset:Fe.current,config:{velocity:e.velocity}})},[Ze,Q,Ce]),resizeSmoothly:c(async()=>{const e=Ie.current(Oe.current);Oe.current=e,Q.current=e,await Ze({y:e,ready:1,maxHeight:Le.current,maxSnap:Me.current,minSnap:Te.current,topOffset:Fe.current,immediate:"element"!==xe.current||Ce.current})},[Ze,Q,Ce]),closeSmoothly:c(async(e,n)=>{Ze({minSnap:Oe.current,immediate:!0}),Oe.current=0,await Ze({y:0,maxHeight:Le.current,maxSnap:Me.current,immediate:Ce.current}),await Ze({ready:0,immediate:!0})},[Ze,Ce])}});a(()=>{ue&&Be(B?"OPEN":"CLOSE")},[B,Be,ue]),O(()=>{(ze||De||Pe)&&Be("RESIZE")},[ze,De,Pe,Be]),a(()=>()=>{Ne.current.deactivate(),ke.current.deactivate(),He.current.deactivate()},[He,ke,Ne]),l(o,()=>({snapTo:(e,{velocity:n=1,source:t="custom"}={})=>{Be("SNAP",{payload:{y:Ie.current(e),velocity:n,source:t}})},get height(){return Oe.current}}),[Be]);const je=v(({args:[{closeOnTap:e=!1}={}]=[],cancel:n,direction:[,t],down:r,first:a,last:o,memo:i=ve.y.getValue(),movement:[,c],tap:s,velocity:l})=>{const u=-1*c;if(!pe.current)return n(),i;if(X&&e&&s)return n(),setTimeout(()=>X(),0),i;if(s)return i;const d=i+u,p=u*l,g=Math.max(Te.current,Math.min(Me.current,d+2*p));if(!r&&X&&t>0&&d+p<Te.current/2)return n(),X(),i;let y=r?X||Te.current!==Me.current?f(d,X?0:Te.current,Me.current,.85):d<Te.current?f(d,Te.current,2*Me.current,.85):f(d,Te.current/2,Me.current,.85):g;return a&&Be("DRAG"),o?(Be("SNAP",{payload:{y,velocity:l>.05?l:1,source:"dragging"}}),i):(fe({y,ready:1,maxHeight:Le.current,maxSnap:Me.current,minSnap:Te.current,topOffset:Fe.current,immediate:!0,config:{velocity:l}}),i)},{filterTaps:!0});if(Number.isNaN(Me.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(Te.current))throw new TypeError("minSnapRef is NaN!!");const Ve=function({spring:e}){const n=g([e.y,e.maxHeight,e.topOffset],(e,n,t)=>`${Math.round(M(n-e-(t||0),0,16))}px`),t=g([e.y,e.minSnap,e.maxSnap],(e,n,t)=>`${M(e,n,t)}px`),r=g([e.y,e.minSnap,e.maxSnap],(e,n,t)=>e<n?n-e+"px":e>t?t-e+"px":"0px"),a=g([e.y,e.maxSnap],(e,n)=>e>=n?Math.ceil(e-n):0);return{"--rsbs-content-opacity":g([e.y,e.minSnap],(e,n)=>{if(!n)return 0;const t=Math.max(n/2-45,0);return M((e-t)*(1/(Math.min(n/2+45,n)-t)+0),0,1)}),"--rsbs-backdrop-opacity":g([e.y,e.minSnap],(e,n)=>n?M(e/n,0,1):0),"--rsbs-antigap-scale-y":a,"--rsbs-overlay-translate-y":r,"--rsbs-overlay-rounded":n,"--rsbs-overlay-h":t}}({spring:ve});return n.createElement(y.div,b({},le,{"data-rsbs-root":!0,"data-rsbs-state":Y.find($e.matches),"data-rsbs-is-blocking":te,"data-rsbs-is-dismissable":!!X,"data-rsbs-has-header":!!$,"data-rsbs-has-footer":!!Z,className:h,ref:Se,style:b({},Ve,ae,{opacity:ve.ready})}),m,te&&n.createElement("div",b({key:"backdrop","data-rsbs-backdrop":!0},je({closeOnTap:!0}))),n.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:Re,onKeyDown:e=>{"Escape"===e.key&&(e.stopPropagation(),X&&X())}},!1!==$&&n.createElement("div",b({key:"header","data-rsbs-header":!0,ref:we},je()),$),n.createElement("div",{key:"scroll","data-rsbs-scroll":!0,ref:he},n.createElement("div",{"data-rsbs-content":!0,ref:Ee},u||n.createElement("div",{style:{position:"relative",height:"1000",overflow:"hidden"}}))),Z&&n.createElement("div",b({key:"footer",ref:be,"data-rsbs-footer":!0},je()),Z)))}),Y=["closed","opening","open","closing","dragging","snapping","resizing"];function K({snapPoints:e,lastSnap:n}){return null!=n?n:Math.min(...e)}function J({minHeight:e}){return e}const Q=u(function(r,a){let{onSpringStart:o,onSpringEnd:s,skipInitialTransition:l}=r,u=R(r,["onSpringStart","onSpringEnd","skipInitialTransition"]);const[d,p]=i(!1),g=t(),y=t(null),m=t(l&&u.open?"OPEN":"CLOSED");O(()=>{if(u.open)return cancelAnimationFrame(g.current),p(!0),()=>{m.current="CLOSED"}},[u.open]);const v=c(async function(e){await(null==o?void 0:o(e)),"OPEN"===e.type&&cancelAnimationFrame(g.current)},[o]),f=c(async function(e){await(null==s?void 0:s(e)),"CLOSE"===e.type&&(g.current=requestAnimationFrame(()=>p(!1)))},[s]);return d?n.createElement(e,{"data-rsbs-portal":!0},n.createElement(W,b({},u,{lastSnapRef:y,ref:a,initialState:m.current,onSpringStart:v,onSpringEnd:f}))):null});export{Q as BottomSheet};
//# sourceMappingURL=index.modern.js.map
