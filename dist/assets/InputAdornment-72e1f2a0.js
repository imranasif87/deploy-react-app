import{E as y,x as A,z as C,_ as c,b,D as I,t as L,j as r,v as z,a8 as $,c as F,H as m,w as R}from"./index-04fc7d56.js";import{u as T,F as _}from"./InputBase-d61b863a.js";function j(n){return A("MuiInputAdornment",n)}const w=y("MuiInputAdornment",["root","filled","standard","outlined","positionStart","positionEnd","disablePointerEvents","hiddenLabel","sizeSmall"]),f=w;var g;const M=["children","className","component","disablePointerEvents","disableTypography","position","variant"],N=(n,t)=>{const{ownerState:e}=n;return[t.root,t[`position${m(e.position)}`],e.disablePointerEvents===!0&&t.disablePointerEvents,t[e.variant]]},S=n=>{const{classes:t,disablePointerEvents:e,hiddenLabel:o,position:s,size:a,variant:l}=n,d={root:["root",e&&"disablePointerEvents",s&&`position${m(s)}`,l,o&&"hiddenLabel",a&&`size${m(a)}`]};return R(d,j,t)},U=C("div",{name:"MuiInputAdornment",slot:"Root",overridesResolver:N})(({theme:n,ownerState:t})=>c({display:"flex",height:"0.01em",maxHeight:"2em",alignItems:"center",whiteSpace:"nowrap",color:(n.vars||n).palette.action.active},t.variant==="filled"&&{[`&.${f.positionStart}&:not(.${f.hiddenLabel})`]:{marginTop:16}},t.position==="start"&&{marginRight:8},t.position==="end"&&{marginLeft:8},t.disablePointerEvents===!0&&{pointerEvents:"none"})),H=b.forwardRef(function(t,e){const o=I({props:t,name:"MuiInputAdornment"}),{children:s,className:a,component:l="div",disablePointerEvents:d=!1,disableTypography:x=!1,position:u,variant:v}=o,E=L(o,M),i=T()||{};let p=v;v&&i.variant,i&&!p&&(p=i.variant);const h=c({},o,{hiddenLabel:i.hiddenLabel,size:i.size,disablePointerEvents:d,position:u,variant:p}),P=S(h);return r(_.Provider,{value:null,children:r(U,c({as:l,ownerState:h,className:z(P.root,a),ref:e},E,{children:typeof s=="string"&&!x?r($,{color:"text.secondary",children:s}):F(b.Fragment,{children:[u==="start"?g||(g=r("span",{className:"notranslate",children:"​"})):null,s]})}))})}),W=H;export{W as I};