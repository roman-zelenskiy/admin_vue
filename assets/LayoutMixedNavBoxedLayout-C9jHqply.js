import{_ as n,u as i,q as o,b as l,c as p,z as u,x as s,m,F as h}from"./index-rum8cWz9.js";import{h as g}from"./Highlightjs-D9PgrlOL.js";import{a as x}from"./axios-BimPEqV4.js";const e=i(),b={data(){return{code1:""}},components:{highlightjs:g},mounted(){e.appTopNav=!0,e.appBoxedLayout=!0,document.body.classList.add("app-with-bg"),x.get("/assets/data/layout/mixed-nav-boxed-layout-code-1.json").then(a=>{this.code1=a.data})},beforeUnmount(){e.appTopNav=!1,e.appBoxedLayout=!1,document.body.classList.remove("app-with-bg")}};function f(a,t,_,y,d,v){const c=o("highlightjs"),r=o("card");return l(),p(h,null,[t[0]||(t[0]=u('<ul class="breadcrumb"><li class="breadcrumb-item"><a href="#">LAYOUT</a></li><li class="breadcrumb-item active">MIXED NAV BOXED LAYOUT</li></ul><h1 class="page-header"> Mixed Nav Boxed Layout <small>page header description goes here...</small></h1><hr class="mb-4"><p> Add the following code within the <code>&lt;script&gt;</code> tag for mixed nav &amp; boxed layout page setting. </p>',4)),s(r,null,{default:m(()=>[s(c,{class:"rounded",code:d.code1},null,8,["code"])]),_:1})],64)}const j=n(b,[["render",f]]);export{j as default};
