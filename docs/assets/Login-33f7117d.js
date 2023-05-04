import{a as r,R as b,j as e,I as _,B as I,u as N,A as L,q as R,e as z,n as D}from"./index-0d061a6e.js";/* empty css              */import{d as T,a as B}from"./VisibilityOff-240e2893.js";import{T as M}from"./TextField-78e03c0c.js";import{F as U,O as $}from"./OutlinedInput-022772fb.js";import{I as q}from"./Select-afcd75d4.js";import{S as O}from"./Stack-fb4fdbd4.js";import{A as Z}from"./Alert-bcfbf7f1.js";import"./InputBase-2dce6e5c.js";import"./Input-6bc773cf.js";const V=x=>{const{formData:n,onChange:s,onSubmit:m}=x,{Email:i,IsAdmin:v,Role:w,Password:f}=n,[u,p]=r.useState(i),[l,d]=b.useState(!1),h=()=>d(o=>!o),g=o=>{o.preventDefault()};return r.useEffect(()=>{p(i)},[i]),e.jsxs("div",{className:"login-form",children:[e.jsx("div",{children:e.jsx("h1",{children:"Logg inn"})}),e.jsxs("form",{className:"form__login",onSubmit:m,children:[e.jsxs("div",{className:"form__login__column",children:[e.jsx("label",{htmlFor:"Email",children:"E-post"}),e.jsx("br",{}),e.jsx(M,{style:{width:"300px",backgroundColor:"white"},className:"input-email",id:"Email",size:"small",name:"Email",type:"email",value:u,onChange:o=>{p(o.target.value),s(o)},inputProps:{pattern:"^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+.[a-zA-Z]{2,}$",required:!0}}),e.jsx("div",{})]}),e.jsxs("div",{className:"form__login__column",children:[e.jsx("label",{htmlFor:"Password",children:"Passord"}),e.jsx("br",{}),e.jsxs(U,{variant:"outlined",children:[e.jsx(q,{sx:{width:"25ch"},htmlFor:"outlined-adornment-password"}),e.jsx($,{id:"Password",type:l?"text":"password",style:{width:"300px",backgroundColor:"white"},className:"input-password",name:"Password",value:f,onChange:s,inputProps:{pattern:"^(?=.*d{2,})(?=.*[A-Z]).{2,31}",required:!0},required:!0,size:"small",endAdornment:e.jsx(_,{"aria-label":"toggle password visibility",onClick:h,onMouseDown:g,edge:"end",children:l?e.jsx(T,{}):e.jsx(B,{})})})]}),e.jsx("div",{})]}),e.jsx(I,{type:"submit",variant:"contained",style:{width:"300px",border:"1px solid white",color:"white",backgroundColor:"#00602C"},sx:{":hover":{backgroundColor:"#369E3B"},margin:1},children:"Logg inn"})]})]})},W={Person:{FirstName:"",LastName:"",Email:"",Phone:""},IsAdmin:!1,Role:"",Password:"",Email:""},oe=x=>{const n=N(),[s,m]=r.useState({Person:{FirstName:"",LastName:"",Email:"",Phone:""},IsAdmin:!1,Role:"",Password:"",Email:""}),[i,v]=r.useState("no"),w=i==="en"?z.login:D.login,[f,u]=r.useState(""),[p,l]=r.useState(""),[d,h]=r.useState(!1),[g,o]=r.useState(null),k=(t,c=/$^/)=>{const{name:a,value:P}=t.target;m(E=>({...E,Person:{...E.Person},[a]:P}))},j=async(t,c)=>{const a=await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/login",{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({email:s.Person.Email,password:s.Password})});if(a.status===200)return await a.json();if(a.status===404)return!1;if(a.status===401)return!1;throw new Error("Unexpected error occurred")},y=async t=>{t.preventDefault(),console.log(s),await j(s.Person.Email,s.Password)?(A(),u(s.Person.Email),l(s.Password)):o(e.jsx(Z,{severity:"error",children:"Feil e-post eller passord. Vennligst prøv igjen."})),m(W),u(s.Person.Email),l(s.Password)},C=()=>{h(!d)},{setIsAuthenticated:S}=r.useContext(L),A=async()=>{const t=await j(s.Person.Email,s.Password);if(console.log("Token: ",t.token),t.token){d&&localStorage.setItem("token",t.token),localStorage.setItem("userId",t.userId),S(!0);const c=await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/User/${t.userId}`,{method:"GET",headers:{Authorization:`Bearer ${t.token}`}});if(c.status===200){const{role:a}=await c.json();a===0?n("/hrk_controlpanel"):a===1&&n("/")}else o("Failed to get user details")}else o("Ugyldig E-post eller passord")},F=()=>{n("/ForgotPassword")};return e.jsx(b.Fragment,{children:e.jsxs("div",{id:"login",children:[e.jsx("img",{className:"navbar__img-item",src:R,alt:"Widerøe logo"}),e.jsx("div",{id:"login-container",children:e.jsx(V,{formData:s,onChange:k,onSubmit:y})}),e.jsx(O,{sx:{width:"25%",margin:"10px"},spacing:2,children:g}),e.jsxs("div",{id:"login-text",style:{display:"inline-block",textAlign:"left"},children:[e.jsxs("label",{children:[w.remember,e.jsx("input",{type:"checkbox",checked:d,onChange:C})]}),e.jsx("br",{}),e.jsx("span",{onClick:F,children:"Glemt passord?"})]})]})})};export{oe as default};