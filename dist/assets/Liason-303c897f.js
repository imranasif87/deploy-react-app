import{b as o,c as g,C as l,j as a,L as r,e as c,n as i}from"./index-04fc7d56.js";/* empty css                     */const L=h=>{const[n,s]=o.useState(localStorage.getItem("language")||"no"),t=n==="en"?c.liason:i.liason;return g(l,{navHeader:"Liason",onLanguageChange:e=>{s(e),localStorage.setItem("language",e)},children:[a("div",{className:"App",children:a("header",{className:"App-header",children:a("h1",{children:"Liason "})})}),a(r,{to:"/test",children:t.back})]})};export{L as default};