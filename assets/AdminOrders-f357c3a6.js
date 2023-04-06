import{P as D,M as w}from"./paginationComponent-44100d3c.js";import{_ as M,o as n,c,a as e,j as k,k as $,v as I,F as f,g as y,t as i,i as C,r as b,b as O}from"./index-7dd6f913.js";const P={props:["orderDataInModal","checkedBtnOperation","closeOrderModalWindow"],data(){return{modalOrder:{},meals:[],userInfo:[],orderTime:""}},watch:{orderDataInModal:{handler(s,t){this.modalOrder=s,console.log("this.modalOrder最新狀態在這裡:",this.modalOrder)},deep:!0}}},E={id:"orderModal",ref:"orderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"orderModalLabel","aria-hidden":"true"},S={class:"modal-dialog modal-xl"},T={class:"modal-content border-0"},A=e("div",{class:"modal-header bg-warning text-dark"},[e("h5",{id:"orderModalLabel",class:"modal-title"},[e("span",null,"編輯訂單")]),e("button",{type:"button",class:"btn-close","data-bs-dismiss":"modal","aria-label":"Close"})],-1),B={class:"modal-body"},N={class:"row"},V={class:"col-4"},F={class:"card mb-3"},L={class:"card-body"},j=e("h5",{class:"card-title"},"訂購者資訊",-1),H={class:"mb-3"},W=e("label",{for:"username",class:"form-label"},"訂購者",-1),q=["value"],U={class:"mb-3"},J=e("label",{for:"username",class:"form-label"},"電話",-1),R=["value"],Y={class:"mb-3"},z=e("label",{for:"username",class:"form-label"},"Email",-1),G=["value"],K={class:"mb-3"},Q=e("label",{for:"username",class:"form-label"},"地址",-1),X=["value"],Z={class:"col-4"},ee={class:"card mb-3"},te={class:"card-body"},se=e("h5",{class:"card-title"},"訂單資訊",-1),oe={class:"mb-3"},de=e("label",{for:"username",class:"form-label"},"訂購時間",-1),le=["value"],re={class:"mb-3"},ae=e("label",{for:"username",class:"form-label"},"訂單ID",-1),ne=["value"],ce={class:"mb-3"},ie=e("label",{for:"username",class:"form-label"},"總金額",-1),_e=["value"],ue={class:"mb-3"},he=e("label",{for:"username",class:"form-label"},"是否付款",-1),me=["value"],pe={class:"col-4"},be={class:"card mb-3"},Oe={class:"card-body"},ge=e("h5",{class:"card-title"},"此處僅限管理者操作勾選",-1),ve={class:"form-check"},fe=e("label",{class:"form-check-label",for:"is_enabled"},"是否付款",-1),ye=e("hr",null,null,-1),Me={class:"mb-3"},xe=e("label",{for:"message",class:"form-label"},"訂購者留言",-1),we={class:"col-12"},ke={class:"card mb-3"},De={class:"card-body"},$e=e("h5",{class:"card-title"},"餐點資訊",-1),Ie={class:"mb-3"},Ce={class:"table"},Pe=e("thead",null,[e("tr",null,[e("th",{scope:"col"},"餐點"),e("th",{scope:"col",class:"text-end"},"數量"),e("th",{scope:"col",class:"text-end"},"單價"),e("th",{scope:"col",class:"text-end"},"小計")])],-1),Ee={class:"text-start"},Se={class:"text-start text-end"},Te={class:"text-start text-end"},Ae={class:"text-start text-end"},Be=e("td",{class:"text-end table-warning",colspan:"3"},"總金額",-1),Ne={class:"text-end table-warning",colspan:"4"},Ve={class:"modal-footer"};function Fe(s,t,l,x,o,a){var _,m,p,r;return n(),c("div",E,[e("div",S,[e("div",T,[A,e("div",B,[e("div",N,[e("div",V,[e("div",F,[e("div",L,[j,e("div",H,[W,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示訂購者的名字",value:(_=o.modalOrder.user)==null?void 0:_.name,disabled:""},null,8,q)]),e("div",U,[J,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示訂購者的電話",value:(m=o.modalOrder.user)==null?void 0:m.tel,disabled:""},null,8,R)]),e("div",Y,[z,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示訂購者的Email",value:(p=o.modalOrder.user)==null?void 0:p.email,disabled:""},null,8,G)]),e("div",K,[Q,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示訂購者的地址",value:(r=o.modalOrder.user)==null?void 0:r.address,disabled:""},null,8,X)])])])]),e("div",Z,[e("div",ee,[e("div",te,[se,e("div",oe,[de,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示訂購時間",value:new Date(o.modalOrder.create_at*1e3).toLocaleString(),disabled:""},null,8,le)]),e("div",re,[ae,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示訂單ID",value:o.modalOrder.id,disabled:""},null,8,ne)]),e("div",ce,[ie,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示總金額",value:o.modalOrder.total,disabled:""},null,8,_e)]),e("div",ue,[he,e("input",{id:"username",type:"text",class:"form-control",placeholder:"顯示付款狀態",value:o.modalOrder.is_paid,disabled:""},null,8,me)])])])]),e("div",pe,[e("div",be,[e("div",Oe,[ge,e("div",ve,[k(e("input",{id:"is_enabled",class:"form-check-input",type:"checkbox","true-value":!0,"false-value":!1,"onUpdate:modelValue":t[0]||(t[0]=d=>o.modalOrder.is_paid=d)},null,512),[[$,o.modalOrder.is_paid]]),fe]),ye,e("div",Me,[xe,k(e("input",{id:"message",type:"text",class:"form-control",placeholder:"顯示訂購者的留言","onUpdate:modelValue":t[1]||(t[1]=d=>o.modalOrder.message=d)},null,512),[[I,o.modalOrder.message]])])])])]),e("div",we,[e("div",ke,[e("div",De,[$e,e("div",Ie,[e("table",Ce,[Pe,e("tbody",null,[(n(!0),c(f,null,y(o.modalOrder.products,d=>(n(),c("tr",{key:d.id},[e("td",Ee,i(d.product.title),1),e("td",Se,i(d.qty),1),e("td",Te,"NT$ "+i(d.product.price),1),e("td",Ae,"NT$ "+i(d.product.price*d.qty),1)]))),128)),e("tr",null,[Be,e("td",Ne,"NT$ "+i(o.modalOrder.total),1)])])])])])])])])]),e("div",Ve,[e("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[2]||(t[2]=d=>l.closeOrderModalWindow())}," 取消 "),e("button",{type:"button",class:"btn btn-primary",onClick:t[3]||(t[3]=C(d=>s.$emit("send-new-order-data-from-modal",o.modalOrder),["prevent"]))}," 確認 ")])])])],512)}const Le=M(P,[["render",Fe]]),je={props:["tempItem","deleteOrder","closeDeleteModalWindow"]},He={id:"delOrderModal",ref:"delOrderModal",class:"modal fade",tabindex:"-1","aria-labelledby":"delOrderModalLabel","aria-hidden":"true"},We={class:"modal-dialog"},qe={class:"modal-content border-0"},Ue={class:"modal-header bg-danger text-white"},Je=e("h5",{id:"delOrderModalLabel",class:"modal-title"},[e("span",null,"刪除訂單")],-1),Re={class:"modal-body"},Ye=e("strong",{class:"text-danger"},"(一經刪除，將無法恢復)。",-1),ze={class:"modal-footer"};function Ge(s,t,l,x,o,a){return n(),c("div",He,[e("div",We,[e("div",qe,[e("div",Ue,[Je,e("button",{type:"button",class:"btn-close","aria-label":"Close",onClick:t[0]||(t[0]=_=>l.closeDeleteModalWindow())})]),e("div",Re,[e("h3",null,'是否刪除 "'+i(l.tempItem.id)+' 訂單" ',1),Ye]),e("div",ze,[e("button",{type:"button",class:"btn btn-outline-secondary",onClick:t[1]||(t[1]=_=>l.closeDeleteModalWindow())}," 取消 "),e("button",{type:"button",class:"btn btn-danger",onClick:t[2]||(t[2]=_=>l.deleteOrder(l.tempItem.id))}," 確認刪除訂單 ")])])])],512)}const Ke=M(je,[["render",Ge]]),{VITE_API:g,VITE_APIPATH:v}={VITE_API:"https://vue3-course-api.hexschool.io/v2",VITE_APIPATH:"cheetah116",BASE_URL:"/vite_hw7_AccordionIsUnabled/",MODE:"production",DEV:!1,PROD:!0};let u="",h="";const Qe={data(){return{orders:[],tempOrder:{},arrOrders:[],pageObj:{},tempOrderMeal:{}}},methods:{getOrders(s=1){this.$http.get(`${g}/api/${v}/admin/orders/?page=${s}`).then(t=>{this.orders=t.data.orders,console.log(t),this.pageObj=t.data.pagination,this.sortData()}).catch(t=>{console.dir(t),alert(t.data)})},transferOderTime(s){const t=new Date(s*1e3);return t.getFullYear()+"/"+(t.getMonth()+1)+"/"+t.getDate()+" "+(t.getHours().toString().length===2?t.getHours():"0"+t.getHours())+":"+(t.getMinutes().toString().length===2?t.getMinutes():"0"+t.getMinutes())+":"+(t.getSeconds().toString().length===2?t.getSeconds():"0"+t.getSeconds())},getProductsDetailFromOrder(s){const t=[];return Object.keys(s).forEach(l=>{t.push(`${s[l].product.title} ${s[l].qty} ${s[l].product.unit}`)}),t},openOrderModal(s,t){s==="edit"?(this.tempOrder={...t},u.show()):s==="delete"&&(this.tempOrder={...t},h.show())},checkedBtnOperation(s){console.log("準備呼叫update訂單 API"),console.log("orderId=",s),this.updateOrder(s)},updateOrder(s){this.$http.put(`${g}/api/${v}/admin/order/${s}`,{data:this.tempOrder}).then(t=>{u.hide(),alert("編輯訂單成功!"),this.getOrders()}).catch(t=>{u.hide(),alert(t.data.message),this.getOrders()})},deleteOrder(s){this.$http.delete(`${g}/api/${v}/admin/order/${s}`).then(t=>{h.hide(),alert("已刪除訂單!"),this.getOrders()}).catch(t=>{h.hide(),alert(t.data.message),this.getOrders()})},sortData(){const s=JSON.parse(JSON.stringify(this.orders));this.arrOrders=Object.values(s),this.arrOrders.sort(function(t,l){return t.create_at<l.create_at?1:-1})},closeOrderModal(){u.hide()},closeDeleteModal(){h.hide()},getDataFromOrderModal(s){this.tempOrder=s,console.log("呼叫update訂單 API"),this.updateOrder(this.tempOrder.id)}},components:{PaginationComponent:D,OrderModal:Le,DeleteOrderModal:Ke},mounted(){this.getOrders(),u=new w(document.getElementById("orderModal")),h=new w(document.getElementById("delOrderModal"))}},Xe={class:"container"},Ze={class:"table mt-4"},et=e("thead",null,[e("tr",null,[e("th",null,"訂購時間"),e("th",null,"訂購人姓名"),e("th",null,"餐點內容"),e("th",null,"訂購留言"),e("th",null,"總金額"),e("th",null,"是否付款"),e("th",null,"訂單操作")])],-1),tt={class:"text-start",width:"500px"},st={class:"text-start"},ot={class:"text-start"},dt={key:0,class:"text-success"},lt={key:1},rt={class:"btn-group"},at=["onClick"],nt=["onClick"];function ct(s,t,l,x,o,a){const _=b("OrderModal"),m=b("PaginationComponent"),p=b("DeleteOrderModal");return n(),c("div",Xe,[e("table",Ze,[et,e("tbody",null,[(n(!0),c(f,null,y(o.orders,r=>(n(),c("tr",{key:r.create_at},[e("td",null,i(a.transferOderTime(r.create_at)),1),e("td",null,i(r.user.name),1),e("td",tt,[(n(!0),c(f,null,y(r.products,d=>(n(),c("span",{key:d.id},i(d.product.title+d.qty+d.product.unit+" "),1))),128))]),e("td",st,i(r.message),1),e("td",ot,i(r.total),1),e("td",null,[r.is_paid?(n(),c("span",dt,"付款")):(n(),c("span",lt,"未付款"))]),e("td",null,[e("div",rt,[e("button",{type:"button",class:"btn btn-outline-primary btn-sm",onClick:d=>a.openOrderModal("edit",r)}," 編輯 ",8,at),e("button",{type:"button",class:"btn btn-outline-danger btn-sm",onClick:d=>a.openOrderModal("delete",r)}," 刪除 ",8,nt)])])]))),128))])]),O(_,{"order-data-in-modal":o.tempOrder,"checked-btn-operation":a.checkedBtnOperation,"close-order-modal-window":a.closeOrderModal,onSendNewOrderDataFromModal:a.getDataFromOrderModal},null,8,["order-data-in-modal","checked-btn-operation","close-order-modal-window","onSendNewOrderDataFromModal"]),O(m,{innerpages:o.pageObj,"get-items":a.getOrders},null,8,["innerpages","get-items"]),O(p,{"temp-item":o.tempOrder,"delete-order":a.deleteOrder,"close-delete-modal-window":a.closeDeleteModal},null,8,["temp-item","delete-order","close-delete-modal-window"])])}const ut=M(Qe,[["render",ct]]);export{ut as default};
