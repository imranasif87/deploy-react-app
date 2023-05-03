import{x,E as b,z as w,P as G,b as c,D as A,t as N,_ as m,j as a,v as L,w as M,C as T,c as g,a8 as f,e as k,n as z,B as F,L as W}from"./index-04fc7d56.js";/* empty css                     */import{T as O}from"./TextField-b77e99c3.js";import{G as P}from"./Grid-f0afdb95.js";import"./OutlinedInput-ed327864.js";import"./InputBase-d61b863a.js";import"./Select-2f2e7d44.js";import"./Input-3dc7ac4d.js";function Q(s){return x("MuiCard",s)}b("MuiCard",["root"]);const H=["className","raised"],Z=s=>{const{classes:t}=s;return M({root:["root"]},Q,t)},q=w(G,{name:"MuiCard",slot:"Root",overridesResolver:(s,t)=>t.root})(()=>({overflow:"hidden"})),J=c.forwardRef(function(t,r){const o=A({props:t,name:"MuiCard"}),{className:p,raised:l=!1}=o,h=N(o,H),n=m({},o,{raised:l}),d=Z(n);return a(q,m({className:L(d.root,p),elevation:l?8:void 0,ref:r,ownerState:n},h))}),K=J;function V(s){return x("MuiCardActions",s)}b("MuiCardActions",["root","spacing"]);const X=["disableSpacing","className"],Y=s=>{const{classes:t,disableSpacing:r}=s;return M({root:["root",!r&&"spacing"]},V,t)},tt=w("div",{name:"MuiCardActions",slot:"Root",overridesResolver:(s,t)=>{const{ownerState:r}=s;return[t.root,!r.disableSpacing&&t.spacing]}})(({ownerState:s})=>m({display:"flex",alignItems:"center",padding:8},!s.disableSpacing&&{"& > :not(:first-of-type)":{marginLeft:8}})),et=c.forwardRef(function(t,r){const o=A({props:t,name:"MuiCardActions"}),{disableSpacing:p=!1,className:l}=o,h=N(o,X),n=m({},o,{disableSpacing:p}),d=Y(n);return a(tt,m({className:L(d.root,l),ownerState:n,ref:r},h))}),st=et;function ot(s){return x("MuiCardContent",s)}b("MuiCardContent",["root"]);const nt=["className","component"],at=s=>{const{classes:t}=s;return M({root:["root"]},ot,t)},rt=w("div",{name:"MuiCardContent",slot:"Root",overridesResolver:(s,t)=>t.root})(()=>({padding:16,"&:last-child":{paddingBottom:24}})),it=c.forwardRef(function(t,r){const o=A({props:t,name:"MuiCardContent"}),{className:p,component:l="div"}=o,h=N(o,nt),n=m({},o,{component:l}),d=at(n);return a(rt,m({as:l,className:L(d.root,p),ownerState:n,ref:r},h))}),ct=it,v=10,ft=s=>{const[t,r]=c.useState([]),[o,p]=c.useState([]),[l,h]=c.useState(""),[n,d]=c.useState(0),[$,B]=c.useState(localStorage.getItem("language")||"no"),u=$==="en"?k.incident:z.incident,E=e=>{B(e),localStorage.setItem("language",e)},U=({incident:e})=>{var i;return g(K,{variant:"outlined",sx:{height:"100%"},children:[g(ct,{children:[g(f,{sx:{fontSize:14},color:"text.secondary",gutterBottom:!0,children:[u.created,": ",e.createdAt.toLocaleString()]}),a(f,{variant:"h5",component:"div",children:((i=e.flight)==null?void 0:i.flightNumber)||"Null"}),a(f,{sx:{mb:1.5},color:"text.secondary",children:e.timeOfIncident.toLocaleString()}),a(f,{variant:"body2",children:e.description})]}),a(st,{children:a(F,{size:"small",component:W,to:`/Test/${e.id}`,children:u.readMore})})]})};c.useEffect(()=>{async function e(){try{const R=await(await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident")).json();console.log(R);const y=R.map(C=>({id:C.id,flight:{flightNumber:C.flightNumber},createdAt:new Date(C.createdAt).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}).replace(/\//g,"."),timeOfIncident:new Date(C.timeOfIncident).toLocaleDateString("en-GB",{day:"2-digit",month:"2-digit",year:"numeric"}).replace(/\//g,"."),description:C.description,isActive:C.isActive}));r(y),console.log(y[0].isActive,y[1].isActive,y[2].isActive)}catch(i){console.error("Error while fetching incident data:",i)}}e()},[]),c.useEffect(()=>{t.length>0&&p(t)},[t]);const D=e=>{const{value:i}=e.target;h(i),d(0)};o.filter(e=>{var i;return((i=e.flight)==null?void 0:i.flightNumber)&&e.flight.flightNumber.toLowerCase().includes(l.toLowerCase())});const I=Math.ceil(o.length/v),_=n===0,j=n===I-1,S=o.filter(e=>e.isActive).slice(n*v,n*v+v);return a(T,{navHeader:u.activeIncidents,onLanguageChange:E,children:g("div",{className:"SearchField",children:[a(O,{label:u.search,variant:"outlined",onChange:D,sx:{marginBottom:"2%"}}),g("div",{className:"GridWrapper",children:[a(P,{container:!0,justifyContent:"center",spacing:2,children:S.map(e=>a(P,{item:!0,sx:{width:"400px"},children:a(U,{incident:e})},e.id))}),S.filter(e=>e.isActive).length===0&&g(f,{variant:"body1",children:[" ",u.notFound]})]}),S.length>v&&a("div",{className:"ButtonsWrapper",children:g("div",{className:"Buttons",children:[a("button",{disabled:_,onClick:()=>d(n-1),children:u.previous}),g("span",{children:[u.page,` ${n+1} av ${I}`]}),a("button",{disabled:j,onClick:()=>d(n+1),children:u.next})]})})]})})};export{ft as default};