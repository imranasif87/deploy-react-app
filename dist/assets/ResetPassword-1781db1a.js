import{x as E,E as $,z as I,a8 as j,b as i,D as U,t as W,j as s,_ as z,v as L,w as q,a5 as g,c as d,K as y,B as O,u as Z,ay as K}from"./index-04fc7d56.js";/* empty css              */import{d as S,a as x}from"./VisibilityOff-81e0d5d9.js";import{F as _,O as A}from"./OutlinedInput-ed327864.js";import{I as N}from"./InputAdornment-72e1f2a0.js";import{A as G}from"./Alert-0bf56b7a.js";import"./InputBase-d61b863a.js";function H(o){return E("MuiAlertTitle",o)}$("MuiAlertTitle",["root"]);const J=["className"],Q=o=>{const{classes:t}=o;return q({root:["root"]},H,t)},V=I(j,{name:"MuiAlertTitle",slot:"Root",overridesResolver:(o,t)=>t.root})(({theme:o})=>({fontWeight:o.typography.fontWeightMedium,marginTop:-2})),X=i.forwardRef(function(t,r){const a=U({props:t,name:"MuiAlertTitle"}),{className:w}=a,l=W(a,J),c=a,m=Q(c);return s(V,z({gutterBottom:!0,component:"div",ownerState:c,ref:r,className:L(m.root,w)},l))}),Y=X,ss=o=>{const{formData:t,onPasswordChange:r,onSubmit:a}=o,{Person:w,IsAdmin:l,Role:c,Password:m}=t,[h,n]=i.useState(""),[u,p]=i.useState(!1),[f,D]=g.useState(!1),[P,M]=g.useState(!1),[C,k]=i.useState(""),[v,F]=i.useState(""),B=()=>D(e=>!e),R=()=>M(e=>!e),b=e=>{e.preventDefault()};return d("div",{className:"login-form",children:[s("div",{children:s("h1",{children:"Nytt passord"})}),d("form",{className:"form__resetPassword",onSubmit:e=>{e.preventDefault(),v===h?(p(!0),o.navigate("/login")):k("Passwords do not match."),a(e)},children:[d("div",{className:"form__resetPassword__column",children:[s("label",{htmlFor:"Password",children:"Nytt passord"}),s("br",{}),s(_,{variant:"outlined",sx:{width:"300px"},children:s(A,{id:"Password",name:"Password",type:f?"text":"password",value:v,placeholder:"Nytt passord",size:"small",style:{width:"300px",backgroundColor:"white"},onChange:e=>{F(e.target.value),r(e)},inputProps:{pattern:"^(?=.*\\d{2,})(?=.*[A-Z]).{2,31}$",maxLength:31,required:!0},endAdornment:s(N,{position:"end",children:s(y,{"aria-label":"toggle password visibility",onClick:B,onMouseDown:b,edge:"end",children:f?s(S,{}):s(x,{})})})})}),s("div",{}),d("div",{className:"form__resetPassword__column",children:[s("label",{htmlFor:"ConfirmPassword",children:"Bekreft passord"}),s("br",{}),s(_,{variant:"outlined",sx:{width:"300px"},children:s(A,{style:{width:"300px",backgroundColor:"white"},className:"input-password",id:"ConfirmPassword",name:"ConfirmPassword",type:P?"text":"password",placeholder:"Bekreft passord",size:"small",value:h,onChange:e=>{n(e.target.value)},inputProps:{pattern:"^(?=.*\\d{2,})(?=.*[A-Z]).{2,31}$",maxLength:31,required:!0},endAdornment:s(N,{position:"end",children:s(y,{"aria-label":"toggle password visibility",onClick:R,onMouseDown:b,edge:"end",children:P?s(S,{}):s(x,{})})})})}),C&&d(G,{severity:"error",children:[s(Y,{children:"Error"}),C]})]})]}),s(O,{type:"submit",variant:"contained",style:{width:"300px",border:"1px solid white",color:"white",backgroundColor:"#00602C"},sx:{":hover":{backgroundColor:"#369E3B"},margin:1},disabled:!(m===h),children:"Bekreft passord"})]})]})},T={Person:"",Password:""},hs=o=>{const t=Z(),[r,a]=i.useState(T),[w,l]=i.useState(""),c=(n,u=/$^/)=>{a(p=>({...p,[n.target.name]:n.target.value.replace(u,"")}))},m=(n,u=/$^/)=>{l(n.target.value.replace(u,""))},h=async n=>{if(n.preventDefault(),r.Password===w)try{await savePasswordToDatabase(r.Password),a(T),l(""),t("/")}catch{}};return s(g.Fragment,{children:d("div",{id:"login",children:[s("img",{className:"navbar__img-item",src:K,alt:"Widerøe logo"}),s("div",{id:"login-container",children:s("form",{children:s(ss,{formData:r,onPasswordChange:c,onConfirmPasswordChange:m,onSubmit:h,navigate:t})})})]})})};export{hs as default};
