import{d as I,r as d,I as k,q as u,b as i,c as p,e,t as o,w as T,x as m,m as v,y as _,f as V,v as A,l as B,g,F as N}from"./index-XWSdHgMw.js";import{_ as P}from"./QuillEditor.vue_vue_type_script_setup_true_lang-CvTmdxJ5.js";import{u as E}from"./categories-C4EI2I0i.js";import{f as O}from"./formatDate-BTl2i0hr.js";const U={class:"d-flex align-items-center mb-3"},q={class:"breadcrumb"},F={class:"breadcrumb-item text-uppercase active"},G={class:"page-header mb-0"},M={class:"row gx-4"},j={class:"col-lg-8"},Q={class:"mb-3"},R={class:""},Y={class:"form-control p-0"},$={class:"border-0"},z={key:0,class:"alert alert-danger"},H={key:1,class:"alert alert-success"},J={type:"submit",class:"btn btn-theme"},Z=I({__name:"CategoryDetails",props:{type:{},payloadInputs:{},categoryId:{}},emits:["update:modelValue"],setup(b,{emit:h}){const l=b,w=h,f=E(),n=d(""),r=d(""),y=d(1),a=k({get:()=>l.payloadInputs,set:s=>{w("update:modelValue",s)}}),x=async()=>{n.value="",r.value="";let s={status:0};if(l.type==="Create"){const t=a.value;t.createdAt=new Date().toISOString(),t.updatedAt=new Date().toISOString(),s=await f.createCategory(t)}l.type==="Update"&&(a.value.updatedAt=O(new Date),s=await f.updateCategory(a.value,l.categoryId)),s.status===0&&(n.value="The action is unsuccessful!"),s.status===1&&(r.value="The action is successful!",a.value.title="",a.value.description="",y.value++)};return(s,t)=>{const C=u("card-header"),S=u("card-body"),D=u("card");return i(),p(N,null,[e("div",U,[e("div",null,[e("ol",q,[t[2]||(t[2]=e("li",{class:"breadcrumb-item"},[e("a",{href:"javascript:;"},"PAGES")],-1)),e("li",F," CATEGORY "+o(s.type),1)]),e("h1",G,"Category "+o(s.type),1)])]),e("div",M,[e("div",j,[e("form",{action:"#",onSubmit:T(x,["prevent"])},[m(D,{class:"mb-4"},{default:v(()=>[m(C,{class:"d-flex align-items-center bg-inverse bg-opacity-10 fw-400"},{default:v(()=>t[3]||(t[3]=[_(" Product Information ")])),_:1}),m(S,null,{default:v(()=>[e("div",Q,[t[4]||(t[4]=e("label",{class:"form-label"},[_("Title "),e("span",{class:"text-danger"},"*")],-1)),V(e("input",{"onUpdate:modelValue":t[0]||(t[0]=c=>a.value.title=c),type:"text",required:"",class:"form-control",name:"title",placeholder:"Product name"},null,512),[[A,a.value.title]])]),e("div",R,[t[5]||(t[5]=e("label",{class:"form-label"},[_("Description "),e("span",{class:"text-danger"})],-1)),e("div",Y,[e("div",$,[(i(),B(P,{key:y.value,contentType:"html",content:a.value.description,"onUpdate:content":t[1]||(t[1]=c=>a.value.description=c),theme:"snow",class:"h-250px"},null,8,["content"]))])])])]),_:1})]),_:1}),n.value?(i(),p("div",z,o(n.value),1)):g("",!0),r.value?(i(),p("div",H,o(r.value),1)):g("",!0),e("button",J,o(s.type),1)],32)])])],64)}}});export{Z as _};
