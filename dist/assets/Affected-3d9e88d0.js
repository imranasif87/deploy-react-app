import{x as ne,E as se,z as _,Z as ae,_ as h,b as r,t as V,a1 as re,c as l,j as e,v as D,H as G,w as J,G as Z,N as ie,M as ce,D as oe,az as X,ax as de,a8 as F,aA as le,F as pe,C as ue,B as q,L as Y,e as he,n as me,P as fe,au as ye,aB as ge}from"./index-04fc7d56.js";import{M as xe}from"./Modal-200beab9.js";/* empty css                     */import{G as P}from"./Grid-f0afdb95.js";import{S as ee}from"./Stack-83892a09.js";import{A as te}from"./Alert-0bf56b7a.js";import{I as O}from"./Input-3dc7ac4d.js";import{L as be,a as Ce}from"./ListItem-f9123d32.js";import{u as ke}from"./InputBase-d61b863a.js";function Ie(t){return ne("PrivateSwitchBase",t)}se("PrivateSwitchBase",["root","checked","disabled","input","edgeStart","edgeEnd"]);const ve=["autoFocus","checked","checkedIcon","className","defaultChecked","disabled","disableFocusRipple","edge","icon","id","inputProps","inputRef","name","onBlur","onChange","onFocus","readOnly","required","tabIndex","type","value"],Ne=t=>{const{classes:n,checked:o,disabled:s,edge:c}=t,d={root:["root",o&&"checked",s&&"disabled",c&&`edge${G(c)}`],input:["input"]};return J(d,Ie,n)},we=_(ae)(({ownerState:t})=>h({padding:9,borderRadius:"50%"},t.edge==="start"&&{marginLeft:t.size==="small"?-3:-12},t.edge==="end"&&{marginRight:t.size==="small"?-3:-12})),Be=_("input")({cursor:"inherit",position:"absolute",opacity:0,width:"100%",height:"100%",top:0,left:0,margin:0,padding:0,zIndex:1}),Le=r.forwardRef(function(n,o){const{autoFocus:s,checked:c,checkedIcon:d,className:x,defaultChecked:$,disabled:B,disableFocusRipple:m=!1,edge:k=!1,icon:v,id:N,inputProps:L,inputRef:g,name:f,onBlur:I,onChange:b,onFocus:T,readOnly:j,required:A=!1,tabIndex:H,type:S,value:E}=n,M=V(n,ve),[z,a]=re({controlled:c,default:Boolean($),name:"SwitchBase",state:"checked"}),i=ke(),u=w=>{T&&T(w),i&&i.onFocus&&i.onFocus(w)},p=w=>{I&&I(w),i&&i.onBlur&&i.onBlur(w)},y=w=>{if(w.nativeEvent.defaultPrevented)return;const Q=w.target.checked;a(Q),b&&b(w,Q)};let C=B;i&&typeof C>"u"&&(C=i.disabled);const R=S==="checkbox"||S==="radio",U=h({},n,{checked:z,disabled:C,disableFocusRipple:m,edge:k}),K=Ne(U);return l(we,h({component:"span",className:D(K.root,x),centerRipple:!0,focusRipple:!m,disabled:C,tabIndex:null,role:void 0,onFocus:u,onBlur:p,ownerState:U,ref:o},M,{children:[e(Be,h({autoFocus:s,checked:c,defaultChecked:$,className:K.input,disabled:C,id:R?N:void 0,name:f,onChange:y,readOnly:j,ref:g,required:A,ownerState:U,tabIndex:H,type:S},S==="checkbox"&&E===void 0?{}:{value:E},L)),z?d:v]}))}),Se=Le,Pe=Z(e("path",{d:"M19 5v14H5V5h14m0-2H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"}),"CheckBoxOutlineBlank"),$e=Z(e("path",{d:"M19 3H5c-1.11 0-2 .9-2 2v14c0 1.1.89 2 2 2h14c1.11 0 2-.9 2-2V5c0-1.1-.89-2-2-2zm-9 14l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"}),"CheckBox"),Te=Z(e("path",{d:"M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10H7v-2h10v2z"}),"IndeterminateCheckBox");function Fe(t){return ne("MuiCheckbox",t)}const ze=se("MuiCheckbox",["root","checked","disabled","indeterminate","colorPrimary","colorSecondary"]),W=ze,Re=["checkedIcon","color","icon","indeterminate","indeterminateIcon","inputProps","size","className"],Ae=t=>{const{classes:n,indeterminate:o,color:s}=t,c={root:["root",o&&"indeterminate",`color${G(s)}`]},d=J(c,Fe,n);return h({},n,d)},Ee=_(Se,{shouldForwardProp:t=>ie(t)||t==="classes",name:"MuiCheckbox",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:o}=t;return[n.root,o.indeterminate&&n.indeterminate,o.color!=="default"&&n[`color${G(o.color)}`]]}})(({theme:t,ownerState:n})=>h({color:(t.vars||t).palette.text.secondary},!n.disableRipple&&{"&:hover":{backgroundColor:t.vars?`rgba(${n.color==="default"?t.vars.palette.action.activeChannel:t.vars.palette.primary.mainChannel} / ${t.vars.palette.action.hoverOpacity})`:ce(n.color==="default"?t.palette.action.active:t.palette[n.color].main,t.palette.action.hoverOpacity),"@media (hover: none)":{backgroundColor:"transparent"}}},n.color!=="default"&&{[`&.${W.checked}, &.${W.indeterminate}`]:{color:(t.vars||t).palette[n.color].main},[`&.${W.disabled}`]:{color:(t.vars||t).palette.action.disabled}})),Me=e($e,{}),Oe=e(Pe,{}),_e=e(Te,{}),je=r.forwardRef(function(n,o){var s,c;const d=oe({props:n,name:"MuiCheckbox"}),{checkedIcon:x=Me,color:$="primary",icon:B=Oe,indeterminate:m=!1,indeterminateIcon:k=_e,inputProps:v,size:N="medium",className:L}=d,g=V(d,Re),f=m?k:B,I=m?k:x,b=h({},d,{color:$,indeterminate:m,size:N}),T=Ae(b);return e(Ee,h({type:"checkbox",inputProps:h({"data-indeterminate":m},v),icon:r.cloneElement(f,{fontSize:(s=f.props.fontSize)!=null?s:N}),checkedIcon:r.cloneElement(I,{fontSize:(c=I.props.fontSize)!=null?c:N}),ownerState:b,ref:o,className:D(T.root,L)},g,{classes:T}))}),He=je,Ue=["children","className","disableTypography","inset","primary","primaryTypographyProps","secondary","secondaryTypographyProps"],qe=t=>{const{classes:n,inset:o,primary:s,secondary:c,dense:d}=t;return J({root:["root",o&&"inset",d&&"dense",s&&c&&"multiline"],primary:["primary"],secondary:["secondary"]},le,n)},We=_("div",{name:"MuiListItemText",slot:"Root",overridesResolver:(t,n)=>{const{ownerState:o}=t;return[{[`& .${X.primary}`]:n.primary},{[`& .${X.secondary}`]:n.secondary},n.root,o.inset&&n.inset,o.primary&&o.secondary&&n.multiline,o.dense&&n.dense]}})(({ownerState:t})=>h({flex:"1 1 auto",minWidth:0,marginTop:4,marginBottom:4},t.primary&&t.secondary&&{marginTop:6,marginBottom:6},t.inset&&{paddingLeft:56})),Ve=r.forwardRef(function(n,o){const s=oe({props:n,name:"MuiListItemText"}),{children:c,className:d,disableTypography:x=!1,inset:$=!1,primary:B,primaryTypographyProps:m,secondary:k,secondaryTypographyProps:v}=s,N=V(s,Ue),{dense:L}=r.useContext(de);let g=B??c,f=k;const I=h({},s,{disableTypography:x,inset:$,primary:!!g,secondary:!!f,dense:L}),b=qe(I);return g!=null&&g.type!==F&&!x&&(g=e(F,h({variant:L?"body2":"body1",className:b.primary,component:m!=null&&m.variant?void 0:"span",display:"block"},m,{children:g}))),f!=null&&f.type!==F&&!x&&(f=e(F,h({variant:"body2",className:b.secondary,color:"text.secondary",display:"block"},v,{children:f}))),l(We,h({className:D(b.root,d),ownerState:I,ref:o},N,{children:[g,f]}))}),De=Ve,nt=t=>{const[n,o]=r.useState(localStorage.getItem("language")||"no"),s=n==="en"?he.affected:me.affected,c=a=>{o(a),localStorage.setItem("language",a)},[d,x]=r.useState([]),[$,B]=r.useState();r.useState(!1);const[m,k]=r.useState(!1),[v,N]=r.useState([]),[L,g]=r.useState([]),[f,I]=r.useState([]),[b,T]=r.useState([]),[j,A]=r.useState(!1),[H,S]=r.useState(!1);r.useEffect(()=>{(async()=>{const u=await(await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected")).json();x(u),g(u),T(u),I(u)})()},[]);const E=a=>async()=>{const i=v.indexOf(a),u=[...v];i===-1?u.push(a):u.splice(i,1),N(u);const p=d.findIndex(R=>R.id===a),y=d[p];let C;y.processed===0?(C=1,S(!0)):y.processed===2?(C=1,A(!0)):(C=y.center?1:2,S(!0)),window.confirm(`Er du sikker på at du vil gjøre endringer for ${y.person.firstName} ${y.person.lastName}?`)&&(await fetch(`https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected/${y.id}`,{method:"PUT",headers:{"Content-Type":"application/json"},body:JSON.stringify({...y,processed:C})}),x(R=>[...R.slice(0,p),{...y,processed:C},...R.slice(p+1)]),setTimeout(()=>{window.location.reload()},5e3))},M=async a=>{const i=await fetch("https://wideroeemergencynextofkinapi.azure-api.net/WideroeEmergency/api/Affected").then(u=>u.json());B(i),k(!0),console.log(JSON.stringify(i))},z=(a,i,u)=>e(fe,{sx:{width:"100%",height:"250px",backgroundColor:i,overflow:"auto"},children:e(ye,{dense:!0,component:"div",role:"list",children:a.filter(p=>p.processed===u).map(p=>{const y=`transfer-list-item-${p.id}-label`;return l(be,{role:"listitem",button:!0,onClick:E(p.id),children:[e(Ce,{children:e(ge,{children:e(He,{checked:v.indexOf(p.id)!==-1,tabIndex:-1,disableRipple:!0,inputProps:{"aria-labelledby":y}})})}),e(Y,{to:`/AffectedInformation/${p.id}`,children:e(De,{id:y,primary:`${p.person.firstName} ${p.person.lastName}`,style:{paddingLeft:"10px"}})})]},p.id)})})});return e(pe,{children:l(ue,{navHeader:s.title,onLanguageChange:c,children:[e(q,{className:"add-crew",onClick:()=>M(),variant:"contained",style:{position:"absolute",top:"17%",right:"2%",width:"250px",height:"54px",margin:2,backgroundColor:"#369E3B"},sx:{":hover":{backgroundColor:"#369E3B"},margin:1},children:s.addAffected}),l(P,{container:!0,justifyContent:"center",spacing:2,children:[j&&e(P,{item:!0,xs:10,md:10,children:e(ee,{sx:{width:"85%",position:"centered",marginTop:"2%"},children:e(te,{severity:"success",onClose:()=>A(!1),children:"Du har flyttet pårørende til under behandling"})})}),H&&e(P,{item:!0,xs:10,md:10,children:e(ee,{sx:{width:"85%",position:"centered",marginTop:"2%"},children:e(te,{severity:"success",onClose:()=>S(!1),children:"Du har flyttet pårørende til fullført behandling"})})}),e(P,{item:!0,xs:10,md:10,children:l(P,{container:!0,justifyContent:"center",alignItems:"center",textAlign:"center",sx:{height:"50% !important",display:"flex",flexWrap:"wrap",alignItems:"baseline",marginTop:"8%","& > *":{flexBasis:"33% !important"}},children:[l(P,{item:!0,xs:12,sm:12,children:[e(F,{variant:"h6",children:s.unprocessed}),z(L,"mistyrose",0)]}),l(P,{item:!0,xs:12,sm:12,children:[e(F,{variant:"h6",children:s.processing}),z(b,"ivory",1)]}),l(P,{item:!0,xs:12,sm:12,children:[e(F,{variant:"h6",children:s.processed}),z(f,"Honeydew",2)]})]})})]}),l(xe,{className:"my-modal",isOpen:m,modalHeadLine:s.addAffected,onClose:()=>k(!1),children:[e("h2",{}),l("div",{className:"container",children:[l("div",{children:[e("label",{htmlFor:"soul-firstName",children:s.firstName}),e("br",{}),e(O,{className:"input-form",id:"soul-firstName",name:"soul-firstName",type:"text",placeholder:"",onChange:a=>onChange(a),pattern:"^([\\p{L}\\p{P}\\d+](\\s)?){2,31}$",maxLength:31,style:{width:"450px"},required:!0})]}),l("div",{children:[e("label",{htmlFor:"soul-firstName",children:s.lastName}),e("br",{}),e(O,{className:"input-form",id:"soul-firstName",name:"soul-firstName",type:"text",placeholder:"",onChange:a=>onChange(a,/^([\p{L}\p{P}\d+](\s)?){2,31}$/),maxLength:31,style:{width:"450px"},required:!0})]}),l("div",{children:[e("label",{htmlFor:"soul-firstName",children:s.email}),e("br",{}),e(O,{className:"input-form",id:"soul-firstName",name:"soul-firstName",type:"text",placeholder:"",onChange:a=>onChange(a),pattern:"^([\\p{L}\\p{P}\\d+](\\s)?){2,31}$",maxLength:31,style:{width:"450px"},required:!0})]}),l("div",{children:[e("label",{htmlFor:"soul-firstName",children:s.phone}),e("br",{}),e(O,{className:"input-form",id:"soul-firstName",name:"soul-firstName",type:"text",placeholder:"",onChange:a=>onChange(a),pattern:"^([\\p{L}\\p{P}\\d+](\\s)?){2,31}$",maxLength:31,style:{width:"450px"},required:!0})]})]}),l("div",{className:"btn-container",children:[e(q,{className:"change-btn",type:"submit",form:"ic-form__affected",variant:"contained",style:{backgroundColor:"#369E3B",width:"230px",height:"40px"},onSubmit:M,children:s.addAffected}),e(q,{className:"back-btn",type:"submit",form:"ic-form__affected",variant:"contained",style:{backgroundColor:"#369E3B",width:"230px",height:"40px"},onClick:()=>k(!1),children:s.back})]})]}),e("div",{className:"backBtn",children:e(Y,{to:"/",children:s.back})})]})})};export{nt as default};