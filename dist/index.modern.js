import e from"@reach/portal";import n,{useRef as t,useDebugValue as r,useEffect as a,useLayoutEffect as o,useState as i,useCallback as c,useMemo as s,useImperativeHandle as l,forwardRef as u}from"react";import{useMachine as d}from"@xstate/react";import{useSpring as p,interpolate as y,animated as m,config as g}from"react-spring";import{useDrag as f,rubberbandIfOutOfBounds as S}from"react-use-gesture";import{createFocusTrap as v}from"focus-trap";import{disableBodyScroll as h,enableBodyScroll as E}from"body-scroll-lock";import{ResizeObserver as b}from"@juggle/resize-observer";import{Machine as R,assign as w}from"xstate";function O(){return(O=Object.assign||function(e){for(var n=1;n<arguments.length;n++){var t=arguments[n];for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])}return e}).apply(this,arguments)}function x(e,n){if(null==e)return{};var t,r,a={},o=Object.keys(e);for(r=0;r<o.length;r++)n.indexOf(t=o[r])>=0||(a[t]=e[t]);return a}const N="undefined"!=typeof window?o:a;function C(e,n,t){return n=(n=+n)==n?n:0,t=(t=+t)==t?t:0,(e=+e)==e&&(e=(e=e<=t?e:t)>=n?e:n),e}function H(e){const n=Math.round(e);if(Number.isNaN(e))throw new TypeError("Found a NaN! Check your snapPoints / defaultSnap / snapTo ");return n}const k={box:"border-box"};function D(e,{label:n,enabled:t,resizeSourceRef:a}){let[o,s]=i(0);r(`${n}: ${o}`);const l=c(e=>{s(e[0].borderBoxSize[0].blockSize),a.current="element"},[a]);return N(()=>{if(!e.current||!t)return;const n=new b(l);return n.observe(e.current,k),()=>{n.disconnect()}},[e,l,t]),t?o:0}function z(e=1e3){return new Promise(n=>setTimeout(n,e))}const P={DRAG:{target:"#overlay.dragging",actions:"onOpenEnd"}},A={RESIZE:{target:"#overlay.resizing",actions:"onOpenEnd"}},L=R({id:"overlay",initial:"closed",context:{initialState:"CLOSED"},states:{closed:{on:{OPEN:"opening",CLOSE:void 0}},opening:{initial:"start",states:{start:{invoke:{src:"onOpenStart",onDone:"transition"}},transition:{always:[{target:"immediately",cond:"initiallyOpen"},{target:"smoothly",cond:"initiallyClosed"}]},immediately:{initial:"open",states:{open:{invoke:{src:"openImmediately",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"#overlay.opening.end"},on:O({},P,A)}}},smoothly:{initial:"visuallyHidden",states:{visuallyHidden:{invoke:{src:"renderVisuallyHidden",onDone:"activating"}},activating:{invoke:{src:"activate",onDone:"open"}},open:{invoke:{src:"openSmoothly",onDone:"#overlay.opening.end"},on:O({},P,A)}}},end:{invoke:{src:"onOpenEnd",onDone:"done"},on:{CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:O({},{CLOSE:{target:"#overlay.closing",actions:"onOpenCancel"}}),onDone:"open"},open:{on:{DRAG:"#overlay.dragging",SNAP:"snapping",RESIZE:"resizing"}},dragging:{on:{SNAP:"snapping"}},snapping:{initial:"start",states:{start:{invoke:{src:"onSnapStart",onDone:"snappingSmoothly"},entry:[w({y:(e,{payload:{y:n}})=>n,velocity:(e,{payload:{velocity:n}})=>n,snapSource:(e,{payload:{source:n="custom"}})=>n})]},snappingSmoothly:{invoke:{src:"snapSmoothly",onDone:"end"}},end:{invoke:{src:"onSnapEnd",onDone:"done"},on:{RESIZE:"#overlay.resizing",SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{SNAP:{target:"snapping",actions:"onSnapEnd"},RESIZE:{target:"#overlay.resizing",actions:"onSnapCancel"},DRAG:{target:"#overlay.dragging",actions:"onSnapCancel"},CLOSE:{target:"#overlay.closing",actions:"onSnapCancel"}},onDone:"open"},resizing:{initial:"start",states:{start:{invoke:{src:"onResizeStart",onDone:"resizingSmoothly"}},resizingSmoothly:{invoke:{src:"resizeSmoothly",onDone:"end"}},end:{invoke:{src:"onResizeEnd",onDone:"done"},on:{SNAP:"#overlay.snapping",CLOSE:"#overlay.closing",DRAG:"#overlay.dragging"}},done:{type:"final"}},on:{RESIZE:{target:"resizing",actions:"onResizeEnd"},SNAP:{target:"snapping",actions:"onResizeCancel"},DRAG:{target:"#overlay.dragging",actions:"onResizeCancel"},CLOSE:{target:"#overlay.closing",actions:"onResizeCancel"}},onDone:"open"},closing:{initial:"start",states:{start:{invoke:{src:"onCloseStart",onDone:"deactivating"},on:{OPEN:{target:"#overlay.open",actions:"onCloseCancel"}}},deactivating:{invoke:{src:"deactivate",onDone:"closingSmoothly"}},closingSmoothly:{invoke:{src:"closeSmoothly",onDone:"end"}},end:{invoke:{src:"onCloseEnd",onDone:"done"},on:{OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}}},done:{type:"final"}},on:{CLOSE:void 0,OPEN:{target:"#overlay.opening",actions:"onCloseCancel"}},onDone:"closed"}},on:{CLOSE:"closing"}},{actions:{onOpenCancel:(e,n)=>{},onSnapCancel:(e,n)=>{},onResizeCancel:(e,n)=>{},onCloseCancel:(e,n)=>{},onOpenEnd:(e,n)=>{},onSnapEnd:(e,n)=>{},onRezizeEnd:(e,n)=>{}},services:{onSnapStart:async()=>{await z()},onOpenStart:async()=>{await z()},onCloseStart:async()=>{await z()},onResizeStart:async()=>{await z()},onSnapEnd:async()=>{await z()},onOpenEnd:async()=>{await z()},onCloseEnd:async()=>{await z()},onResizeEnd:async()=>{await z()},renderVisuallyHidden:async(e,n)=>{await z()},activate:async(e,n)=>{await z()},deactivate:async(e,n)=>{await z()},openSmoothly:async(e,n)=>{await z()},openImmediately:async(e,n)=>{await z()},snapSmoothly:async(e,n)=>{await z()},resizeSmoothly:async(e,n)=>{await z()},closeSmoothly:async(e,n)=>{await z()}},guards:{initiallyClosed:({initialState:e})=>"CLOSED"===e,initiallyOpen:({initialState:e})=>"OPEN"===e}}),{tension:T,friction:M}=g.default,I=n.forwardRef(function(e,o){let{children:u,sibling:g,className:b,topOffset:R,footer:w,header:k,open:z,initialState:P,lastSnapRef:A,initialFocusRef:I,onDismiss:B,maxHeight:$,defaultSnap:j=F,snapPoints:V=Z,blocking:q=!0,scrollLocking:K=!0,style:J,onSpringStart:Q,onSpringCancel:U,onSpringEnd:W,reserveScrollBarGap:X=q}=e,Y=x(e,["children","sibling","className","topOffset","footer","header","open","initialState","lastSnapRef","initialFocusRef","onDismiss","maxHeight","defaultSnap","snapPoints","blocking","scrollLocking","style","onSpringStart","onSpringCancel","onSpringEnd","reserveScrollBarGap"]);const{ready:_,registerReady:ee}=function(){const[e,n]=i(!1),[t,r]=i({}),o=c(e=>(r(n=>O({},n,{[e]:!1})),()=>{r(n=>O({},n,{[e]:!0}))}),[]);return a(()=>{const e=Object.values(t);0!==e.length&&e.every(Boolean)&&n(!0)},[t]),{ready:e,registerReady:o}}(),ne=t(!1),te=t(Q),re=t(U),ae=t(W);a(()=>{te.current=Q,re.current=U,ae.current=W},[U,Q,W]);const[oe,ie]=p(()=>({y:0,ready:0,maxHeight:0,minSnap:0,maxSnap:0,topOffset:0})),ce=t(null),se=t(null),le=t(null),ue=t(null),de=t(null),pe=t(null),ye=t(0),me=t(),ge=function(){const e=s(()=>"undefined"!=typeof window?window.matchMedia("(prefers-reduced-motion: reduce)"):null,[]),n=t(null==e?void 0:e.matches);return r(n.current?"reduce":"no-preference"),a(()=>{const t=e=>{n.current=e.matches};return null==e||e.addListener(t),()=>null==e?void 0:e.removeListener(t)},[e]),n}(),fe=function({targetRef:e,enabled:n,reserveScrollBarGap:o}){const i=t({activate:()=>{throw new TypeError("Tried to activate scroll lock too early")},deactivate:()=>{}});return r(n?"Enabled":"Disabled"),a(()=>{if(!n)return i.current.deactivate(),void(i.current={activate:()=>{},deactivate:()=>{}});const t=e.current;let r=!1;i.current={activate:()=>{r||(r=!0,h(t,{allowTouchMove:e=>e.closest("[data-body-scroll-lock-ignore]"),reserveScrollBarGap:o}))},deactivate:()=>{r&&(r=!1,E(t))}}},[n,e,o]),i}({targetRef:se,enabled:_&&K,reserveScrollBarGap:X}),Se=function({targetRef:e,enabled:n}){const o=t({activate:()=>{throw new TypeError("Tried to activate aria hider too early")},deactivate:()=>{}});return r(n?"Enabled":"Disabled"),a(()=>{if(!n)return o.current.deactivate(),void(o.current={activate:()=>{},deactivate:()=>{}});const t=e.current;let r=!1,a=[],i=[];o.current={activate:()=>{if(r)return;r=!0;const e=t.parentNode;document.querySelectorAll("body > *").forEach(n=>{if(n===e)return;let t=n.getAttribute("aria-hidden");null!==t&&"false"!==t||(a.push(t),i.push(n),n.setAttribute("aria-hidden","true"))})},deactivate:()=>{r&&(r=!1,i.forEach((e,n)=>{let t=a[n];null===t?e.removeAttribute("aria-hidden"):e.setAttribute("aria-hidden",t)}),a=[],i=[])}}},[e,n]),o}({targetRef:ce,enabled:_&&q}),ve=function({targetRef:e,fallbackRef:n,initialFocusRef:o,enabled:i}){const c=t({activate:()=>{throw new TypeError("Tried to activate focus trap too early")},deactivate:()=>{}});return r(i?"Enabled":"Disabled"),a(()=>{if(!i)return c.current.deactivate(),void(c.current={activate:()=>{},deactivate:()=>{}});const t=n.current,r=v(e.current,{onActivate:void 0,initialFocus:o?()=>(null==o?void 0:o.current)||t:void 0,fallbackFocus:t,escapeDeactivates:!1,clickOutsideDeactivates:!1});let a=!1;c.current={activate:async()=>{a||(a=!0,await r.activate(),await new Promise(e=>setTimeout(()=>e(void 0),0)))},deactivate:()=>{a&&(a=!1,r.deactivate())}}},[i,n,o,e]),c}({targetRef:ce,fallbackRef:pe,initialFocusRef:I,enabled:_&&q}),{minSnap:he,maxSnap:Ee,maxHeight:be,findSnap:Re}=function({contentRef:e,controlledMaxHeight:n,footerEnabled:o,footerRef:c,getSnapPoints:l,headerEnabled:u,headerRef:d,heightRef:p,lastSnapRef:y,ready:m,registerReady:g,resizeSourceRef:f}){const{maxHeight:S,minHeight:v,headerHeight:h,footerHeight:E}=function({contentRef:e,controlledMaxHeight:n,footerEnabled:o,footerRef:c,headerEnabled:l,headerRef:u,registerReady:d,resizeSourceRef:p}){const y=s(()=>d("contentHeight"),[d]),m=function(e,n,o){const c=s(()=>n("maxHeight"),[n]),[l,u]=i(()=>H(e)||"undefined"!=typeof window?window.innerHeight:0),d=l>0,p=t(0);return r(e?"controlled":"auto"),a(()=>{d&&c()},[d,c]),N(()=>{if(e)return u(H(e)),void(o.current="maxheightprop");const n=()=>{p.current||(p.current=requestAnimationFrame(()=>{u(window.innerHeight),o.current="window",p.current=0}))};return window.addEventListener("resize",n),u(window.innerHeight),o.current="window",c(),()=>{window.removeEventListener("resize",n),cancelAnimationFrame(p.current)}},[e,c,o]),l}(n,d,p),g=D(u,{label:"headerHeight",enabled:l,resizeSourceRef:p}),f=D(e,{label:"contentHeight",enabled:!0,resizeSourceRef:p}),S=D(c,{label:"footerHeight",enabled:o,resizeSourceRef:p}),v=Math.min(m-g-S,f)+g+S;r(`minHeight: ${v}`);const h=f>0;return a(()=>{h&&y()},[h,y]),{maxHeight:m,minHeight:v,headerHeight:g,footerHeight:S}}({contentRef:e,controlledMaxHeight:n,footerEnabled:o,footerRef:c,headerEnabled:u,headerRef:d,registerReady:g,resizeSourceRef:f}),{snapPoints:b,minSnap:R,maxSnap:w}=function(e,n){const t=[].concat(e).map(H).reduce((e,t)=>(e.add(C(t,0,n)),e),new Set),r=Array.from(t),a=Math.min(...r);if(Number.isNaN(a))throw new TypeError("minSnap is NaN");const o=Math.max(...r);if(Number.isNaN(o))throw new TypeError("maxSnap is NaN");return{snapPoints:r,minSnap:a,maxSnap:o}}(m?l({height:p.current,footerHeight:E,headerHeight:h,minHeight:v,maxHeight:S}):[0],S);return r(`minSnap: ${R}, maxSnap:${w}`),{minSnap:R,maxSnap:w,findSnap:function(e){let n;n="function"==typeof e?e({footerHeight:E,headerHeight:h,height:p.current,minHeight:v,maxHeight:S,snapPoints:b,lastSnap:y.current}):e;const t=H(n);return b.reduce((e,n)=>Math.abs(n-t)<Math.abs(e-t)?n:e,R)},maxHeight:S}}({contentRef:le,controlledMaxHeight:$,footerEnabled:!!w,footerRef:de,getSnapPoints:V,headerEnabled:!1!==k,headerRef:ue,heightRef:ye,lastSnapRef:A,ready:_,registerReady:ee,resizeSourceRef:me}),we=t(be),Oe=t(he),xe=t(Ee),Ne=t(Re),Ce=t(0),He=t(0);N(()=>{we.current=be,xe.current=Ee,Oe.current=he,He.current=R,Ne.current=Re,Ce.current=Re(j)},[Re,j,be,Ee,he,R]);const ke=c(e=>{let{onRest:n,config:{velocity:t=1}={}}=e,r=x(e.config,["velocity"]),a=x(e,["onRest","config"]);return new Promise(e=>ie(O({},a,{config:O({velocity:t},r,{mass:1,tension:T,friction:Math.max(M,M+(M-M*t))}),onRest:(...t)=>{e(...t),null==n||n(...t)}})))},[ie]),[De,ze]=d(L,{devTools:!1,actions:{onOpenCancel:c(()=>null==re.current?void 0:re.current({type:"OPEN"}),[]),onSnapCancel:c(e=>null==re.current?void 0:re.current({type:"SNAP",source:e.snapSource}),[]),onCloseCancel:c(()=>null==re.current?void 0:re.current({type:"CLOSE"}),[]),onResizeCancel:c(()=>null==re.current?void 0:re.current({type:"RESIZE",source:me.current}),[]),onOpenEnd:c(()=>null==ae.current?void 0:ae.current({type:"OPEN"}),[]),onSnapEnd:c((e,n)=>null==ae.current?void 0:ae.current({type:"SNAP",source:e.snapSource}),[]),onResizeEnd:c(()=>null==ae.current?void 0:ae.current({type:"RESIZE",source:me.current}),[])},context:{initialState:P},services:{onSnapStart:c(async(e,n)=>null==te.current?void 0:te.current({type:"SNAP",source:n.payload.source||"custom"}),[]),onOpenStart:c(async()=>null==te.current?void 0:te.current({type:"OPEN"}),[]),onCloseStart:c(async()=>null==te.current?void 0:te.current({type:"CLOSE"}),[]),onResizeStart:c(async()=>null==te.current?void 0:te.current({type:"RESIZE",source:me.current}),[]),onSnapEnd:c(async(e,n)=>null==ae.current?void 0:ae.current({type:"SNAP",source:e.snapSource}),[]),onOpenEnd:c(async()=>null==ae.current?void 0:ae.current({type:"OPEN"}),[]),onCloseEnd:c(async()=>null==ae.current?void 0:ae.current({type:"CLOSE"}),[]),onResizeEnd:c(async()=>null==ae.current?void 0:ae.current({type:"RESIZE",source:me.current}),[]),renderVisuallyHidden:c(async(e,n)=>{await ke({y:Ce.current,ready:0,maxHeight:we.current,maxSnap:xe.current,minSnap:Ce.current,immediate:!0,topOffset:He.current})},[ke]),activate:c(async(e,n)=>{ne.current=!0,await Promise.all([fe.current.activate(),ve.current.activate(),Se.current.activate()])},[Se,ve,fe]),deactivate:c(async()=>{fe.current.deactivate(),ve.current.deactivate(),Se.current.deactivate(),ne.current=!1},[Se,ve,fe]),openImmediately:c(async()=>{ye.current=Ce.current,await ke({y:Ce.current,ready:1,maxHeight:we.current,maxSnap:xe.current,minSnap:Ce.current,immediate:!0,topOffset:He.current})},[ke]),openSmoothly:c(async()=>{await ke({y:0,ready:1,maxHeight:we.current,maxSnap:xe.current,minSnap:Ce.current,immediate:!0,topOffset:He.current}),ye.current=Ce.current,await ke({y:Ce.current,ready:1,maxHeight:we.current,maxSnap:xe.current,minSnap:Ce.current,immediate:ge.current,topOffset:He.current})},[ke,ge]),snapSmoothly:c(async(e,n)=>{const t=Ne.current(e.y);ye.current=t,A.current=t,await ke({y:t,ready:1,maxHeight:we.current,maxSnap:xe.current,minSnap:Oe.current,immediate:ge.current,topOffset:He.current,config:{velocity:e.velocity}})},[ke,A,ge]),resizeSmoothly:c(async()=>{const e=Ne.current(ye.current);ye.current=e,A.current=e,await ke({y:e,ready:1,maxHeight:we.current,maxSnap:xe.current,minSnap:Oe.current,topOffset:He.current,immediate:"element"!==me.current||ge.current})},[ke,A,ge]),closeSmoothly:c(async(e,n)=>{ke({minSnap:ye.current,immediate:!0}),ye.current=0,await ke({y:0,maxHeight:we.current,maxSnap:xe.current,immediate:ge.current}),await ke({ready:0,immediate:!0})},[ke,ge])}});a(()=>{_&&ze(z?"OPEN":"CLOSE")},[z,ze,_]),N(()=>{(be||Ee||he)&&ze("RESIZE")},[be,Ee,he,ze]),a(()=>()=>{fe.current.deactivate(),ve.current.deactivate(),Se.current.deactivate()},[Se,ve,fe]),l(o,()=>({snapTo:(e,{velocity:n=1,source:t="custom"}={})=>{ze("SNAP",{payload:{y:Ne.current(e),velocity:n,source:t}})},get height(){return ye.current}}),[ze]);const Pe=f(({args:[{closeOnTap:e=!1}={}]=[],cancel:n,direction:[,t],down:r,first:a,last:o,memo:i=oe.y.getValue(),movement:[,c],tap:s,velocity:l})=>{const u=-1*c;if(!ne.current)return n(),i;if(B&&e&&s)return n(),setTimeout(()=>B(),0),i;if(s)return i;const d=i+u,p=u*l,y=Math.max(Oe.current,Math.min(xe.current,d+2*p));if(!r&&B&&t>0&&d+p<Oe.current/2)return n(),B(),i;let m=r?B||Oe.current!==xe.current?S(d,B?0:Oe.current,xe.current,.55):d<Oe.current?S(d,Oe.current,2*xe.current,.55):S(d,Oe.current/2,xe.current,.55):y;return a&&ze("DRAG"),o?(ze("SNAP",{payload:{y:m,velocity:l>.05?l:1,source:"dragging"}}),i):(ie({y:m,ready:1,maxHeight:we.current,maxSnap:xe.current,minSnap:Oe.current,topOffset:He.current,immediate:!0,config:{velocity:2}}),i)},{filterTaps:!0});if(Number.isNaN(xe.current))throw new TypeError("maxSnapRef is NaN!!");if(Number.isNaN(Oe.current))throw new TypeError("minSnapRef is NaN!!");const Ae=function({spring:e}){const n=y([e.y,e.maxHeight,e.topOffset],(e,n,t)=>`${Math.round(C(n-e-(t||0),0,16))}px`),t=y([e.y,e.minSnap,e.maxSnap],(e,n,t)=>`${C(e,n,t)}px`),r=y([e.y,e.minSnap,e.maxSnap],(e,n,t)=>e<n?n-e+"px":e>t?t-e+"px":"0px"),a=y([e.y,e.maxSnap],(e,n)=>e>=n?Math.ceil(e-n):0);return{"--rsbs-content-opacity":y([e.y,e.minSnap],(e,n)=>{if(!n)return 0;const t=Math.max(n/2-45,0);return C((e-t)*(1/(Math.min(n/2+45,n)-t)+0),0,1)}),"--rsbs-backdrop-opacity":y([e.y,e.minSnap],(e,n)=>n?C(e/n,0,1):0),"--rsbs-antigap-scale-y":a,"--rsbs-overlay-translate-y":r,"--rsbs-overlay-rounded":n,"--rsbs-overlay-h":t}}({spring:oe});return n.createElement(m.div,O({},Y,{"data-rsbs-root":!0,"data-rsbs-state":G.find(De.matches),"data-rsbs-is-blocking":q,"data-rsbs-is-dismissable":!!B,"data-rsbs-has-header":!!k,"data-rsbs-has-footer":!!w,className:b,ref:ce,style:O({},Ae,J,{opacity:oe.ready})}),g,q&&n.createElement("div",O({key:"backdrop","data-rsbs-backdrop":!0},Pe({closeOnTap:!0}))),n.createElement("div",{key:"overlay","aria-modal":"true",role:"dialog","data-rsbs-overlay":!0,tabIndex:-1,ref:pe,onKeyDown:e=>{"Escape"===e.key&&(e.stopPropagation(),B&&B())}},!1!==k&&n.createElement("div",O({key:"header","data-rsbs-header":!0,ref:ue},Pe()),k),n.createElement("div",{key:"scroll","data-rsbs-scroll":!0,ref:se},n.createElement("div",{"data-rsbs-content":!0,ref:le},u)),w&&n.createElement("div",O({key:"footer",ref:de,"data-rsbs-footer":!0},Pe()),w)))}),G=["closed","opening","open","closing","dragging","snapping","resizing"];function F({snapPoints:e,lastSnap:n}){return null!=n?n:Math.min(...e)}function Z({minHeight:e}){return e}const B=u(function(r,a){let{onSpringStart:o,onSpringEnd:s,skipInitialTransition:l}=r,u=x(r,["onSpringStart","onSpringEnd","skipInitialTransition"]);const[d,p]=i(!1),y=t(),m=t(null),g=t(l&&u.open?"OPEN":"CLOSED");N(()=>{if(u.open)return cancelAnimationFrame(y.current),p(!0),()=>{g.current="CLOSED"}},[u.open]);const f=c(async function(e){await(null==o?void 0:o(e)),"OPEN"===e.type&&cancelAnimationFrame(y.current)},[o]),S=c(async function(e){await(null==s?void 0:s(e)),"CLOSE"===e.type&&(y.current=requestAnimationFrame(()=>p(!1)))},[s]);return d?n.createElement(e,{"data-rsbs-portal":!0},n.createElement(I,O({},u,{lastSnapRef:m,ref:a,initialState:g.current,onSpringStart:f,onSpringEnd:S}))):null});export{B as BottomSheet};
//# sourceMappingURL=index.modern.js.map
