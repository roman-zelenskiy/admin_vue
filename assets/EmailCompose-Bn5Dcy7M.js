import{_ as b,u,q as m,b as f,c as x,e as t,x as l,m as e,z as g,y as n}from"./index-rum8cWz9.js";import{q as _}from"./QuillEditor-DBB1FVcK.js";import{t as v}from"./TagsInput-CNGFDE_8.js";const c=u(),w={data(){return{to:"",cc:"",bcc:"",toTags:[{text:"seantheme@support.com"}],ccTags:[],bccTags:[],tagsAutocomplete:[{text:"javascript"},{text:"css"},{text:"html"}]}},components:{tagsInput:v,quillEditor:_},mounted(){c.appContentFullHeight=!0,c.appContentClass="p-0"},beforeUnmount(){c.appContentFullHeight=!1,c.appContentClass=""}},h={class:"mailbox"},C={class:"mailbox-toolbar"},V={class:"mailbox-toolbar-item"},k={class:"mailbox-toolbar-item"},S={class:"mailbox-toolbar-item"},T={class:"mailbox-toolbar-item ms-auto"},q={class:"mailbox-toolbar-item"},y={class:"mailbox-body"},A={class:"mailbox-content"},E={action:"#",method:"POST",name:"email_form",class:"h-100"},N={class:"mailbox-form d-flex flex-column h-100"},U={class:"mailbox-form-header"},B={class:"row mb-2"},j={class:"col-lg"},F={class:"row mb-2"},O={class:"col-lg"},H={class:"row mb-2"},I={class:"col-lg"},L={class:"border-0 flex-1 bg-component"};function R(z,o,D,M,s,P){const a=m("RouterLink"),d=m("tags-input"),r=m("quill-editor"),p=m("perfect-scrollbar");return f(),x("div",h,[t("div",C,[o[8]||(o[8]=t("div",{class:"mailbox-toolbar-item"},[t("span",{class:"mailbox-toolbar-text"},"New Message")],-1)),t("div",V,[l(a,{to:"/email/compose",class:"mailbox-toolbar-link active"},{default:e(()=>o[3]||(o[3]=[n("Send")])),_:1})]),t("div",k,[l(a,{to:"/email/compose",class:"mailbox-toolbar-link"},{default:e(()=>o[4]||(o[4]=[n("Attachment")])),_:1})]),t("div",S,[l(a,{to:"/email/inbox",class:"mailbox-toolbar-link"},{default:e(()=>o[5]||(o[5]=[n("Discard")])),_:1})]),o[9]||(o[9]=g('<div class="mailbox-toolbar-item dropdown"><a href="#" class="mailbox-toolbar-link" data-bs-toggle="dropdown"><i class="fa fa-ellipsis-h"></i></a><div class="dropdown-menu ms-n1 position-fixed"><a href="#" class="dropdown-item">Save draft</a><a href="#" class="dropdown-item">Show From</a><a href="#" class="dropdown-item">Check names</a><a href="#" class="dropdown-item">Set importance</a><a href="#" class="dropdown-item">Switch to plain text</a><a href="#" class="dropdown-item">Check for accessibility issues</a></div></div>',1)),t("div",T,[l(a,{to:"/email/compose",class:"mailbox-toolbar-link"},{default:e(()=>o[6]||(o[6]=[t("i",{class:"fa fa-redo fa-fw fs-12px me-1"},null,-1),n(" Undo")])),_:1})]),t("div",q,[l(a,{to:"/email/inbox",class:"mailbox-toolbar-link"},{default:e(()=>o[7]||(o[7]=[t("i",{class:"fa fa-times fa-fw"},null,-1),n(" Cancel")])),_:1})])]),t("div",y,[t("div",A,[t("form",E,[l(p,{class:"h-100"},{default:e(()=>[t("div",N,[t("div",U,[t("div",B,[o[10]||(o[10]=t("label",{class:"col-form-label w-100px px-2 fw-500 text-lg-end"},"To:",-1)),t("div",j,[l(d,{modelValue:s.to,"onUpdate:modelValue":o[0]||(o[0]=i=>s.to=i),tags:s.toTags,placeholder:"","autocomplete-items":s.tagsAutocomplete},null,8,["modelValue","tags","autocomplete-items"])])]),t("div",F,[o[11]||(o[11]=t("label",{class:"col-form-label w-100px px-2 fw-500 text-lg-end"},"Cc:",-1)),t("div",O,[l(d,{modelValue:s.cc,"onUpdate:modelValue":o[1]||(o[1]=i=>s.cc=i),tags:s.ccTags,placeholder:"","autocomplete-items":s.tagsAutocomplete},null,8,["modelValue","tags","autocomplete-items"])])]),t("div",H,[o[12]||(o[12]=t("label",{class:"col-form-label w-100px px-2 fw-500 text-lg-end"},"Bcc:",-1)),t("div",I,[l(d,{modelValue:s.bcc,"onUpdate:modelValue":o[2]||(o[2]=i=>s.bcc=i),tags:s.bccTags,placeholder:"","autocomplete-items":s.tagsAutocomplete},null,8,["modelValue","tags","autocomplete-items"])])]),o[13]||(o[13]=t("div",{class:"row mb-0"},[t("label",{class:"col-form-label w-100px px-2 fw-500 text-lg-end"},"Subject:"),t("div",{class:"col-lg"},[t("input",{type:"text",class:"form-control",placeholder:"Email subject"})])],-1))]),o[14]||(o[14]=t("hr",{class:"opacity-10 border-top bg-none my-0"},null,-1)),t("div",L,[l(r,{theme:"snow"})])])]),_:1})])])])])}const Q=b(w,[["render",R]]);export{Q as default};
