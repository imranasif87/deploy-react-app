import{a as c,b as w,j as e,C as y,B as o,L as i,e as E,n as B}from"./index-48719fb3.js";/* empty css                     */import{T,a as I,b as a,c as r}from"./TableRow-6f073381.js";const R=L=>{var h,g,x,p,u,m,j;const[f,b]=c.useState(localStorage.getItem("language")||"no"),n=f==="en"?E.controlpanel:B.controlpanel,v=s=>{b(s),localStorage.setItem("language",s)},[t,k]=c.useState({id:0,createdAt:"",timeOfIncident:"",flight:{id:0,flightNumber:"",origin:"",departureTime:"",destination:"",arrivalTime:"",seatCapacity:0,price:"",airline:""},description:""}),{id:l}=w(),C=()=>{fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Incident/${l}`).then(s=>s.json()).then(s=>{k(s)})};c.useEffect(()=>{C()},[l]);const d=s=>new Date(s).toLocaleDateString("nb-NO");return e.jsx(e.Fragment,{children:e.jsx(y,{navHeader:n.activeIncident,onLanguageChange:v,children:e.jsx("div",{className:"App",children:e.jsxs("header",{className:"App-header",children:[e.jsx("h1",{children:n.activeIncident}),e.jsx("div",{children:e.jsx(o,{id:"addincident",component:i,to:`/Incident/${t.id}`,variant:"text",style:{width:1e3,padding:"5px !important",height:"auto",backgroundColor:"#369E3B"},children:e.jsx(T,{children:e.jsxs(I,{children:[e.jsxs(a,{children:[e.jsx(r,{children:n.description}),e.jsx(r,{children:t.description})]}),e.jsxs(a,{children:[e.jsxs(r,{children:[n.flight,": ",(h=t==null?void 0:t.flight)==null?void 0:h.flightNumber]}),e.jsxs(r,{children:[n.airline,": ",(g=t==null?void 0:t.flight)==null?void 0:g.airline]})]}),e.jsxs(a,{children:[e.jsxs(r,{children:[n.departure,":"," ",d((x=t==null?void 0:t.flight)==null?void 0:x.departureTime)]}),e.jsxs(r,{children:[n.arrival,": ",d((p=t==null?void 0:t.flight)==null?void 0:p.arrivalTime)]})]}),e.jsxs(a,{children:[e.jsxs(r,{children:[n.origin,": ",(u=t==null?void 0:t.flight)==null?void 0:u.origin]}),e.jsxs(r,{children:[n.destination,": ",(m=t==null?void 0:t.flight)==null?void 0:m.destination]})]}),e.jsxs(a,{children:[e.jsx(r,{children:n.seatCapacity}),e.jsx(r,{children:(j=t==null?void 0:t.flight)==null?void 0:j.seatCapacity})]})]})})})}),e.jsxs("div",{id:"buttons",children:[e.jsxs(o,{id:"affected",component:i,to:"/Passengers",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.passengers," "]}),e.jsxs(o,{id:"incidents",component:i,to:"/Affected",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.affected," "]}),e.jsxs(o,{id:"liason",component:i,to:"/Liason",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.liason," "]})]}),e.jsxs("div",{id:"buttons",children:[e.jsxs(o,{id:"management_support",component:i,to:"/ManagementSupport",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.managementSupport," "]}),e.jsxs(o,{id:"crew",component:i,to:"/Crew",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.crew," "]}),e.jsx(o,{id:"newincident",component:i,to:"/InformationToAffected",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:n.informationToAffected})]}),e.jsxs("div",{id:"buttons",children:[e.jsxs(o,{id:"statistics",component:i,to:"/Statistics",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.statistics," "]}),e.jsxs(o,{id:"evaluation",component:i,to:"/Evaluation",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.evaluation," "]}),e.jsxs(o,{id:"no_match",component:i,to:"/NoMatch",variant:"text",style:{width:320,height:100,backgroundColor:"#369E3B",color:"black"},children:[n.noMatch," "]})]}),e.jsx(i,{to:"/HRK_controlpanel",children:n.back})]})})})})};export{R as default};
