import{_ as n,u as l,q as i,b as d,c,e as s,w as p,z as m,y as o,x as u,m as f}from"./index-rum8cWz9.js";const t=l(),b={mounted(){t.appSidebarHide=!0,t.appHeaderHide=!0,t.appContentClass="p-0"},beforeUnmount(){t.appSidebarHide=!1,t.appHeaderHide=!1,t.appContentClass=""},methods:{submitForm:function(){this.$router.push("/")}}},v={class:"login"},x={class:"login-content"},g={class:"text-center text-muted"};function h(k,e,y,w,S,a){const r=i("RouterLink");return d(),c("div",v,[s("div",x,[s("form",{onSubmit:e[0]||(e[0]=p(_=>a.submitForm(),["prevent"])),method:"POST",name:"login_form"},[e[4]||(e[4]=m('<h1 class="text-center">Sign In</h1><div class="text-muted text-center mb-4"> For your protection, please verify your identity. </div><div class="mb-3"><label class="form-label">Email Address</label><input type="text" class="form-control form-control-lg fs-15px" value="" placeholder="username@address.com"></div><div class="mb-3"><div class="d-flex"><label class="form-label">Password</label><a href="#" class="ms-auto text-muted">Forgot password?</a></div><input type="password" class="form-control form-control-lg fs-15px" value="" placeholder="Enter your password"></div><div class="mb-3"><div class="form-check"><input class="form-check-input" type="checkbox" value="" id="customCheck1"><label class="form-check-label fw-500" for="customCheck1">Remember me</label></div></div><button type="submit" class="btn btn-theme btn-lg d-block w-100 fw-500 mb-3">Sign In</button>',6)),s("div",g,[e[2]||(e[2]=o(" Don't have an account yet? ")),u(r,{to:"/page/register"},{default:f(()=>e[1]||(e[1]=[o("Sign up")])),_:1}),e[3]||(e[3]=o(". "))])],32)])])}const H=n(b,[["render",h]]);export{H as default};
