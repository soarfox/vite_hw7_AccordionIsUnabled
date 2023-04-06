<template>
  <AdminNavbarComponent></AdminNavbarComponent>
  <RouterView></RouterView>
</template>

<script>
// const宣告請放在import下方, 否則ESLint會報錯
import { RouterView } from 'vue-router'
import AdminNavbarComponent from '../components/admin/adminNavbarComponent.vue'
// 使用解構的方式取得環境變數
const { VITE_API } = import.meta.env

export default {
  components: {
    RouterView, AdminNavbarComponent
  },
  methods: {
    checkLogin () {
      // 如果這項的值為空的, 代表使用者尚未登入, 故跳出請先登入的告警並跳轉到登入頁; 否則, 進行使用者登入驗證, 如果驗證失敗則一樣跳轉回登入頁面
      if (!this.$http.defaults.headers.common.Authorization) {
        alert('請先登入')
        this.$router.push('/login')
      } else {
        this.$http.post(`${VITE_API}/api/user/check`)
          .then((response) => {
            console.log(response)
            console.log('檢查登入資訊正確, 自動跳轉到管理者的產品管理畫面, 正在讀取所有產品的資料......')
            // 因檢查登入資訊正確, 故執行跳轉到後台的管理者產品畫面, 使用router內的push方法, 類似新增一個頁面概念, 讓網頁能跳轉到想要去的畫面
            this.$router.push('/admin/products')
          })
          .catch((error) => {
            console.dir(error)
            alert(error.response.data.message)
            this.$router.push('/login')
          })
      }
    }
  },
  mounted () {
    // 引用第四週的作業程式碼, 取得 Token（Token僅需要設定一次), 在此原本=號前方有多一個\號, 將其去掉即可
    const myToken = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1')
    // 參考自axios文件的此處:https://github.com/axios/axios#global-axios-defaults
    this.$http.defaults.headers.common.Authorization = myToken

    // 只要進入DashboardView都需要驗證, 如果驗證不符合, 則要跳轉回登入頁面
    this.checkLogin()
  }
}
</script>
