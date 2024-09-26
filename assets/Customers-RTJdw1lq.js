import{d as E,r as n,H,I as L,q as P,b as i,c as d,e,x as o,z as R,m as C,y as T,t as s,F as y,k as D,f as z,v as O}from"./index-DZo-DfWi.js";import{u as G}from"./customers-C6sdkYqR.js";import{u as K}from"./categories-Dhgm8WZz.js";import{_ as W}from"./VueSelect.vue_vue_type_script_setup_true_lang-DTTVSoIg.js";import{M as J,_ as Q}from"./ModalConfirmation-BhBlxflj.js";import"./generateUniqueId-BGfF6MB9.js";import"./getDocumentsByFilters-Cop2zNRW.js";const X={class:"d-flex align-items-center mb-3"},Y={class:"ms-auto"},tt={class:"tab-content p-4"},et={class:"tab-pane fade show active",id:"allTab"},at={class:"input-group mb-4"},lt={class:"btn btn-default dropdown-toggle",type:"button","data-bs-toggle":"dropdown","aria-haspopup":"true","aria-expanded":"false"},st={class:"dropdown-menu"},nt=["onClick"],it={class:"flex-fill position-relative"},dt={class:"input-group"},ot={class:"table-responsive"},pt={class:"table table-hover text-nowrap"},rt={class:"d-flex align-items-center"},ct={class:"w-60px h-60px bg-gray-100 d-flex align-items-center justify-content-center"},ut=["src"],vt={key:1,class:"icon",viewBox:"0 0 65 65",xmlns:"http://www.w3.org/2000/svg"},gt={class:"align-middle"},_t={class:"align-middle"},ht={class:"ms-3 text-truncate",style:{"max-width":"300px"}},bt={key:0},ft=["href"],Ct={class:"align-middle"},yt={class:"align-middle"},wt={class:"align-middle"},xt={class:"align-middle"},Vt={class:"align-middle"},kt={class:"align-middle"},St=["onClick"],$t=E({__name:"Customers",setup(mt){const w=G(),A=K(),c=n(1),p=n(""),u=n(""),x=n(0),V=n([]),k=n(""),_=n(!1),{categories:h}=A.getAllCategories(),B=l=>h.value.find(a=>a.id===l),S=[{value:"id",title:"Id"},{value:"name",title:"Name"},{value:"company",title:"Company"},{value:"createdAt",title:"Created at"}],b=n(""),N=H(()=>{var l;return(l=h.value)==null?void 0:l.map(a=>({id:a.id,title:a.title}))}),$=l=>{k.value=l},m=(l,a)=>{l&&$(a),_.value=l},U=l=>{u.value=l},v=async()=>{const{documents:l,totalPages:a}=await w.getCustomersByFilters(c.value,{filterValue:p.value,filterKey:u.value});V.value=l||[],x.value=a},Z=()=>{var l,a;u.value="categoryId",p.value=((a=(l=h.value)==null?void 0:l.find(g=>g.id===b.value))==null?void 0:a.id)||"",v()},j=async l=>{await w.deleteDocument(l),await v(),m(!1,"")};return L([c,p],()=>{v()},{deep:!0}),v(),(l,a)=>{const g=P("RouterLink"),q=P("card");return i(),d(y,null,[e("div",X,[o(J,{onActionSuccess:a[0]||(a[0]=r=>j(k.value)),modelValue:_.value,"onUpdate:modelValue":a[1]||(a[1]=r=>_.value=r),title:"Delete a customer?"},null,8,["modelValue"]),a[6]||(a[6]=R('<div><ul class="breadcrumb"><li class="breadcrumb-item"><a href="#">PAGES</a></li><li class="breadcrumb-item active text-uppercase">Customers</li></ul><h1 class="page-header mb-0">Customers</h1></div>',1)),e("div",Y,[o(g,{to:"/customer-create",href:"#",class:"btn btn-theme"},{default:C(()=>a[5]||(a[5]=[e("i",{class:"fa fa-plus-circle fa-fw me-1"},null,-1),T(" Create Customer")])),_:1})])]),o(q,null,{default:C(()=>{var r;return[e("div",tt,[e("div",et,[e("div",at,[e("button",lt,s(((r=S.find(t=>u.value==t.value))==null?void 0:r.title)||"Filter customers")+"   ",1),e("div",st,[(i(),d(y,null,D(S,t=>e("button",{class:"dropdown-item",onClick:f=>U(t.value),key:t.value},s(t.title),9,nt)),64))]),e("div",it,[e("div",dt,[a[7]||(a[7]=e("div",{class:"input-group-text position-absolute top-0 bottom-0 bg-none border-0",style:{"z-index":"1020"}},[e("i",{class:"fa fa-search opacity-5"})],-1)),z(e("input",{"onUpdate:modelValue":a[2]||(a[2]=t=>p.value=t),type:"text",class:"form-control ps-35px",placeholder:"Search products"},null,512),[[O,p.value]])])])]),o(W,{class:"mb-4",style:"max-width: 300px",modelValue:b.value,"onUpdate:modelValue":a[3]||(a[3]=t=>b.value=t),options:N.value,label:"title","onOption:selected":Z,reduce:t=>t.id,placeholder:"Select an option"},null,8,["modelValue","options","reduce"]),e("div",ot,[e("table",pt,[a[10]||(a[10]=e("thead",null,[e("tr",null,[e("th",{class:"pt-0 pb-2"}),e("th",{class:"pt-0 pb-2"},"Id"),e("th",{class:"pt-0 pb-2"},"Name"),e("th",{class:"pt-0 pb-2"},"Category"),e("th",{class:"pt-0 pb-2"},"REF"),e("th",{class:"pt-0 pb-2"},"Company"),e("th",{class:"pt-0 pb-2"},"Country"),e("th",{class:"pt-0 pb-2"},"Created At"),e("th",{class:"pt-0 pb-2"})])],-1)),e("tbody",null,[(i(!0),d(y,null,D(V.value,t=>{var f,I,F,M;return i(),d("tr",{key:t.id},[e("td",null,[e("div",rt,[e("div",ct,[o(g,{class:"d-flex align-items-center justify-content-center",to:/customer-update/+(t==null?void 0:t.id)},{default:C(()=>[t!=null&&t.photo?(i(),d("img",{key:0,alt:"",class:"mw-100 mh-100",src:t==null?void 0:t.photo},null,8,ut)):(i(),d("svg",vt,a[8]||(a[8]=[e("path",{d:"M32.5 0.0644531C36.8098 0.0644531 40.943 1.76861 43.9905 4.80203C47.038 7.83546 48.75 11.9497 48.75 16.2396C48.75 20.5295 47.038 24.6437 43.9905 27.6771C40.943 30.7105 36.8098 32.4147 32.5 32.4147C28.1902 32.4147 24.057 30.7105 21.0095 27.6771C17.962 24.6437 16.25 20.5295 16.25 16.2396C16.25 11.9497 17.962 7.83546 21.0095 4.80203C24.057 1.76861 28.1902 0.0644531 32.5 0.0644531ZM32.5 8.15201C30.3451 8.15201 28.2785 9.00409 26.7548 10.5208C25.231 12.0375 24.375 14.0946 24.375 16.2396C24.375 18.3845 25.231 20.4416 26.7548 21.9583C28.2785 23.475 30.3451 24.3271 32.5 24.3271C34.6549 24.3271 36.7215 23.475 38.2452 21.9583C39.769 20.4416 40.625 18.3845 40.625 16.2396C40.625 14.0946 39.769 12.0375 38.2452 10.5208C36.7215 9.00409 34.6549 8.15201 32.5 8.15201ZM32.5 36.4585C43.3469 36.4585 65 41.8367 65 52.6336V64.7649H0V52.6336C0 41.8367 21.6531 36.4585 32.5 36.4585ZM32.5 44.1416C20.4344 44.1416 7.71875 50.0456 7.71875 52.6336V57.0817H57.2812V52.6336C57.2812 50.0456 44.5656 44.1416 32.5 44.1416Z"},null,-1)])))]),_:2},1032,["to"])])])]),e("td",gt,s(t==null?void 0:t.id),1),e("td",_t,[e("div",ht,[t!=null&&t.websiteSocial[0]?(i(),d("a",{key:1,target:"_blank",href:(f=t==null?void 0:t.websiteSocial[0])!=null&&f.value.startsWith("http")?(I=t==null?void 0:t.websiteSocial[0])==null?void 0:I.value:`https://${(F=t==null?void 0:t.websiteSocial[0])==null?void 0:F.value}`},s(t==null?void 0:t.name)+" "+s(t==null?void 0:t.surname),9,ft)):(i(),d("span",bt,s(t==null?void 0:t.name)+" "+s(t==null?void 0:t.surname),1))])]),e("td",Ct,s(t.categoryId&&((M=B(t.categoryId))==null?void 0:M.title)||"null"),1),e("td",yt,s((t==null?void 0:t.ref)||"null"),1),e("td",wt,s((t==null?void 0:t.company)||"null"),1),e("td",xt,s((t==null?void 0:t.country)||"null"),1),e("td",Vt,s(t==null?void 0:t.createdAt),1),e("td",kt,[e("button",{onClick:It=>m(!0,t.id),class:"btn btn-light"},a[9]||(a[9]=[e("i",{class:"fas fa-trash-alt"},null,-1)]),8,St)])])}),128))])])]),o(Q,{class:"justify-content-center mt-2",currentPage:c.value,"onUpdate:currentPage":a[4]||(a[4]=t=>c.value=t),quantityPages:x.value},null,8,["currentPage","quantityPages"])])])]}),_:1})],64)}}});export{$t as default};
