import{_ as d,o as c,c as u,a as e,i as m,j as i,v as l}from"./index-7dd6f913.js";const{VITE_API:p}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"cheetah116",BASE_URL:"/vite_hw7_AccordionIsUnabled/",MODE:"production",DEV:!1,PROD:!0},h={data(){return{user:{username:"",password:""}}},methods:{login(){this.$http.post(`${p}/admin/signin`,this.user).then(t=>{const{token:s,expired:n}=t.data;document.cookie=`hexToken = ${s}; expires = ${new Date(n)}; path=/`,console.log("儲存cookie完成, 自動跳轉到管理者的主畫面並檢查登入資訊是否正確, 檢查中......"),this.$router.push("/admin")}).catch(t=>{alert(t.data.error.message)})}}},_={class:"container col-3 my-5"},f=e("h3",null,"管理者登入頁面",-1),w={class:"form-floating mb-3"},g=e("label",{for:"username"},"Email address",-1),v={class:"form-floating"},b=e("label",{for:"password"},"Password",-1),x=e("button",{class:"btn btn-lg btn-primary w-100 mt-3",type:"submit"}," 登入 ",-1);function E(t,s,n,V,r,a){return c(),u("div",_,[e("div",null,[f,e("form",{id:"form",class:"form-signin",onSubmit:s[2]||(s[2]=m((...o)=>a.login&&a.login(...o),["prevent"]))},[e("div",w,[i(e("input",{type:"email",class:"form-control","onUpdate:modelValue":s[0]||(s[0]=o=>r.user.username=o),id:"username",placeholder:"name@example.com",required:"",autofocus:""},null,512),[[l,r.user.username]]),g]),e("div",v,[i(e("input",{type:"password",class:"form-control","onUpdate:modelValue":s[1]||(s[1]=o=>r.user.password=o),id:"password",placeholder:"Password",required:""},null,512),[[l,r.user.password]]),b]),x],32)])])}const P=d(h,[["render",E]]);export{P as default};