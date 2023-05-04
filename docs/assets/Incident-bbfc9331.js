import{a as s,u as D,b as q,j as e,C as H,B as d,L as _,e as M,n as R}from"./index-48719fb3.js";import{M as z}from"./Modal-33b47fbb.js";/* empty css                     *//* empty css                  */import{S as y}from"./Stack-a25e0eb6.js";import{A as N}from"./Alert-7f0334cb.js";import{T as W,a as $,b as h,c as l}from"./TableRow-6f073381.js";import{I as c}from"./Input-f5ccd189.js";import"./InputBase-fa14cdb4.js";const ie=J=>{var v,b;const[T,C]=s.useState(localStorage.getItem("language")||"no"),t=T==="en"?M.incident:R.incident,w=n=>{C(n),localStorage.setItem("language",n)},[k,g]=s.useState(!1),[A,x]=s.useState(!1),S=D(),[a,m]=s.useState({id:0,createdAt:"",timeOfIncident:"",flightNumber:"",flight:{id:0,origin:"",departureTime:"",destination:"",arrivalTime:"",seatCapacity:0,price:"",airline:""},description:"",airlineName:"",departureTime:"",arrivalTime:"",isActive:!1}),[E,p]=s.useState(!1),[r,O]=s.useState(null),{id:u}=q(),I=n=>{fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${n}`).then(i=>i.json()).then(i=>{m({id:i.id,createdAt:i.createdAt,timeOfIncident:i.timeOfIncident,flightNumber:i.flightNumber,flight:{id:i.flight.id,origin:i.flight.origin,departureTime:i.flight.departureTime,destination:i.flight.destination,arrivalTime:i.flight.arrivalTime,seatCapacity:i.flight.seatCapacity,price:i.flight.price,airline:i.flight.airline},description:i.description,airlineName:i.flight.airline,departureTime:i.flight.departureTime,arrivalTime:i.flight.arrivalTime,isActive:i.isActive})})};s.useEffect(()=>{I(u)},[u]);const f=n=>new Date(n).toLocaleDateString("nb-NO"),o=()=>{p(!0)},F=async n=>{const i=await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${n}`).then(B=>B.json());O(i),g(!0),p(!0),console.log(JSON.stringify(i))},[K,j]=s.useState(a.isActive),L=()=>{if(j(!1),m(n=>({...n,isActive:!1})),window.confirm("Are you sure you want to deactivate the incident?")){const n={...a,isActive:!1};fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${u}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify(n)}).then(i=>{if(!i.ok)throw new Error("Failed to update the incident");x(!0),setTimeout(()=>{S("/historicalincidents")},3e3)}).catch(i=>{console.error(i)})}else j(!0),m(n=>({...n,isActive:!0}))};return e.jsx(e.Fragment,{children:e.jsxs(H,{navHeader:"Test",onLanguageChange:w,children:[e.jsx(d,{className:"add-crew",onClick:()=>o(),variant:"contained",style:{position:"absolute",top:"17%",right:"1%",width:"250px",height:"54px",margin:2,backgroundColor:"#369E3B"},sx:{":hover":{backgroundColor:"#369E3B"},margin:1},children:t.changeIncident}),a.isActive&&e.jsx(d,{className:"deactivate-incident",onClick:L,variant:"contained",style:{position:"absolute",top:"17%",left:"1%",width:"250px",height:"54px",margin:2,backgroundColor:"#FF0000"},sx:{":hover":{backgroundColor:"#FF0000"},margin:1},children:t.deactivate}),e.jsx("div",{className:"App",children:e.jsxs("header",{className:"App-header",children:[e.jsx("h1",{children:t.incident}),k&&e.jsx(y,{sx:{width:"97%",position:"centered",margin:"20px"},spacing:2,children:e.jsx(N,{severity:"success",onClose:()=>g(!1),children:"Opplysningene til ansatt ble endret"})}),A&&e.jsx(y,{sx:{width:"97%",position:"centered",margin:"20px"},spacing:2,children:e.jsx(N,{severity:"success",onClose:()=>x(!1),children:"Hendelse ble deaktivert"})}),e.jsx(W,{children:e.jsxs($,{children:[e.jsxs(h,{children:[e.jsxs(l,{children:["ID: ",a.id]}),e.jsxs(l,{children:[t.flight,": ",a.flightNumber||"Null"]})]}),e.jsxs(h,{children:[e.jsxs(l,{children:[t.origin,": ",((v=a.flight)==null?void 0:v.origin)||"Null"]}),e.jsxs(l,{children:[t.destination,": ",((b=a.flight)==null?void 0:b.destination)||"Null"]})]}),e.jsxs(h,{children:[e.jsxs(l,{children:[t.departure,": ",f(a.departureTime)]}),e.jsxs(l,{children:[t.arrival,": ",f(a.arrivalTime)]})]}),e.jsxs(h,{children:[e.jsx(l,{children:t.description}),e.jsx(l,{children:a.description})]})]})}),e.jsxs(z,{modalHeadLine:t.changeIncident,isOpen:E,children:[e.jsx("h2",{}),e.jsxs("div",{className:"container",children:[e.jsxs("div",{children:[e.jsx("label",{htmlFor:"incident-time",children:t.timeOfIncident}),e.jsx("br",{}),e.jsx(c,{className:"input-form",id:"incident-time",name:"timeOfIncident",type:"text",placeholder:r==null?void 0:r.timeOfIncident,onChange:o,style:{width:"450px"},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"flight-number",children:t.flight}),e.jsx("br",{}),e.jsx(c,{className:"input-form",id:"flight-number",name:"flightNumber",type:"text",placeholder:r==null?void 0:r.flightNumber,onChange:o,style:{width:"450px"},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"description",children:t.description}),e.jsx("br",{}),e.jsx(c,{className:"input-form",id:"description",name:"description",type:"text",placeholder:r==null?void 0:r.description,onChange:o,style:{width:"450px"},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"departure-time",children:t.departure}),e.jsx("br",{}),e.jsx(c,{className:"input-form",id:"departure-time",name:"departureTime",type:"text",placeholder:r==null?void 0:r.departureTime,onChange:o,style:{width:"450px"},required:!0})]}),e.jsxs("div",{children:[e.jsx("label",{htmlFor:"arrival-time",children:t.arrival}),e.jsx("br",{}),e.jsx(c,{className:"input-form",id:"arrival-time",name:"arrivalTime",type:"text",placeholder:r==null?void 0:r.arrivalTime,onChange:o,style:{width:"450px"},required:!0})]})]}),e.jsxs("div",{className:"btn-container",children:[e.jsx(d,{className:"change-btn",type:"submit",form:"ic-form__affected",variant:"contained",style:{backgroundColor:"#369E3B",width:"230px",height:"40px"},onSubmit:()=>F(r==null?void 0:r.flight.id),children:t.changeIncident}),e.jsx(d,{className:"back-btn",type:"submit",form:"ic-form__affected",variant:"contained",style:{backgroundColor:"#369E3B",width:"230px",height:"40px"},onClick:()=>p(!1),children:t.back})]})]}),e.jsx(_,{to:"/HRK_controlpanel",children:t.back})]})})]})})};export{ie as default};
