import{h as y,g as A,s as C,l as c,a as b,k as I,_ as j,j as a,m as L,T as $,w as m,o as z}from"./index-48719fb3.js";import{u as R,F as T}from"./InputBase-fa14cdb4.js";function F(n){return A("MuiInputAdornment",n)}const _=y("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),f=_;var g;const w=["children","className","component","disablePointerEvents","disableTypography","position","variant"],M=(n,t)=>{const{ownerState:e}=n;return[t.root,t[`position${m(e.position)}`],e.disablePointerEvents===!0&&t.disablePointerEvents,t[e.variant]]},N=n=>{const{classes:t,disablePointerEvents:e,hiddenLabel:o,position:s,size:r,variant:l}=n,d={root:["root",e&&"disablePointerEvents",s&&`position${m(s)}`,l,o&&"hiddenLabel",r&&`size${m(r)}`]};return z(d,F,t)},S=C("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:M})(({theme:n,ownerState:t})=>c({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(n.vars||n).palette.action.active},t.variant==="filled"&&{[`&.${f.positionStart}&:not(.${f.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),U=b.forwardRef(function(t,e){const o=I({props:t,name:"MuiInputAdornment"}),{children:s,className:r,component:l="div",disablePointerEvents:d=!1,disableTypography:x=!1,position:u,variant:v}=o,E=j(o,w),i=R()||{};let p=v;v&&i.variant,i&&!p&&(p=i.variant);const h=c({},o,{hiddenLabel:i.hiddenLabel,size:i.size,disablePointerEvents:d,position:u,variant:p}),P=N(h);return a.jsx(T.Provider,{value:null,children:a.jsx(S,c({as:l,ownerState:h,className:L(P.root,r),ref:e},E,{children:typeof s=="string"&&!x?a.jsx($,{color:"text.secondary",children:s}):a.jsxs(b.Fragment,{children:[u==="start"?g||(g=a.jsx("span",{className:"notranslate",children:"​"})):null,s]})}))})}),H=U;export{H as I};
