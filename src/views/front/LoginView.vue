<template>
  <div class="container col-3 my-5">
    <div>
      <h3>管理者登入頁面</h3>
      <!-- 此處為了避免登入按鈕(submit)送出一個請求給伺服器, 故要寫prevent, 使其停留在本頁並且做登入檢查後, 才執行後續動作 -->
      <form id="form" class="form-signin" v-on:submit.prevent="login">
        <div class="form-floating mb-3">
          <input type="email" class="form-control" v-model="user.username" id="username" placeholder="name@example.com"
            required autofocus>
          <label for="username">Email address</label>
        </div>
        <div class="form-floating">
          <input type="password" class="form-control" v-model="user.password" id="password" placeholder="Password"
            required>
          <label for="password">Password</label>
        </div>
        <button class="btn btn-lg btn-primary w-100 mt-3" type="submit">
          登入
        </button>
      </form>
    </div>
  </div>
</template>

<script>
// 使用解構的方式取得環境變數
const { VITE_API } = import.meta.env
export default {
  data () {
    return {
      // 在HTML畫面上已使用v-model指令進行雙向綁定, 故在此可以接收到使用者輸入的資料內容
      user: {
        username: '',
        password: ''
      }
    }
  },
  // 方法(請記得尾字有"s")
  methods: {
    login () {
      this.$http.post(`${VITE_API}/admin/signin`, this.user)
        .then((response) => {
          // console.log(response)

          // 使用解構的方式來取得token與token的expired(到期日), 每次登入後, token都會不同
          const { token, expired } = response.data

          // 把token和expired儲存在cookie內
          // 直接複製MDN Cookie 文件( https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie )裡, 第三個範例內的其中一行程式碼來用, 並且把自訂義名稱改成想要的名稱; 將expired轉成(原本的)unix timestamp格式, 進行儲存
          document.cookie = `hexToken = ${token}; expires = ${new Date(expired)}; path=/`

          console.log('儲存cookie完成, 自動跳轉到管理者的主畫面並檢查登入資訊是否正確, 檢查中......')

          // 因上述登入成功, 故執行跳轉到後台的畫面, 使用router內的push方法, 類似新增一個頁面概念, 讓使用者能在登入轉換到admin畫面
          this.$router.push('/admin')
        })
        .catch((error) => {
          // console.dir(error);
          alert(error.data.error.message)
        })
    }
  }
}
</script>
