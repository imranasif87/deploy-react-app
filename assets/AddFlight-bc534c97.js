import{b as g,u as A,j as a,C as N,c as F,B as x,e as S,n as j}from"./index-04fc7d56.js";import{d as s,L as p,A as h,D as m}from"./AdapterDayjs-db07bf75.js";import{T as o}from"./TextField-b77e99c3.js";import"./Grid-f0afdb95.js";import"./InputAdornment-72e1f2a0.js";import"./InputBase-d61b863a.js";import"./ListItem-f9123d32.js";import"./OutlinedInput-ed327864.js";import"./Select-2f2e7d44.js";import"./Input-3dc7ac4d.js";const J=w=>{const[n,d]=g.useState({flightNumber:"",origin:"",departureTime:s(),destination:"",arrivalTime:s(),seatCapacity:0,price:0,airline:""}),[u,C]=g.useState(localStorage.getItem("language")||"no"),t=u==="en"?S.incident:j.incident,b=e=>{C(e),localStorage.setItem("language",e)},r=e=>{const{name:i,value:l}=e.target;d(T=>({...T,[i]:l}))},c=(e,i)=>{i&&d(l=>({...l,[e]:s(i)}))},y=A(),f=async e=>{try{const i=await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Flight",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)});y("/AddIncident")}catch(i){console.error(i)}},v=()=>{f(n)};return a(N,{navHeader:t.newFlight,onLanguageChange:b,children:a("div",{className:"App",children:a("div",{className:"container",children:F("div",{className:"row",children:[a(o,{id:"flightNumber",label:t.flight,name:"flightNumber",value:n.flightNumber,onChange:r}),a(o,{id:"airline",label:t.airline,name:"airline",value:n.airline,onChange:r}),a(o,{id:"origin",label:t.origin,name:"origin",value:n.origin,onChange:r}),a(o,{id:"destination",label:t.destination,name:"destination",value:n.destination,onChange:r}),a(p,{dateAdapter:h,children:a(m,{label:t.departure,value:n.departureTime,onChange:e=>c("departureTime",(e==null?void 0:e.toDate())??null)})}),a(p,{dateAdapter:h,children:a(m,{label:t.arrival,value:n.arrivalTime,onChange:e=>c("arrivalTime",(e==null?void 0:e.toDate())??null)})}),a(o,{id:"seatCapacity",label:t.seatCapacity,name:"seatCapacity",type:"number",value:n.seatCapacity,onChange:r}),a(o,{id:"price",label:t.price,name:"price",value:n.price,onChange:r}),a(x,{onClick:v,style:{backgroundColor:"#369E3B",color:"black",width:"204%"},type:"button",children:t.newFlight})]})})})})};export{J as default};
