import{_ as r}from"./CategoryDetails.vue_vue_type_script_setup_true_lang-DJG6GL-Z.js";import{d as n,r as p,b as i,c,x as u,J as l}from"./index-DDNcE4wR.js";import{u as d}from"./categories-CbYFFI1e.js";import"./QuillEditor.vue_vue_type_script_setup_true_lang-tP_-kziH.js";import"./getDocumentsByFilters-kyLMTKT8.js";const x=n({__name:"UpdateCategory",setup(m){const s=d(),a=`${l().params.categoryId}`,e=p({title:"",description:"",updatedAt:""});return(async()=>{const{status:o,category:t}=await s.getCategoryById(a);o===1&&(e.value.title=(t==null?void 0:t.title)||"",e.value.description=(t==null?void 0:t.title)||"")})(),(o,t)=>(i(),c("div",null,[u(r,{payloadInputs:e.value,categoryId:a,type:"Update"},null,8,["payloadInputs"])]))}});export{x as default};
