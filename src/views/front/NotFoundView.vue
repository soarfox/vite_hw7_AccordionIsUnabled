<template>
  <div class="contein my-5 mx-5">
    <h1>
      404
    </h1>
    <h3>
      很抱歉！找不到這一頁的內容。
    </h3>
    <button type="button" class="btn btn-danger fs-5" @click="redirectToHome()">請按我返回首頁</button>
  </div>
</template>

<script>
export default {
  methods: {
    redirectToHome () {
      // 使用router內的push方法, 類似新增一個頁面概念, 在網址列上亂數輸入網址後, 跳轉回首頁畫面
      this.$router.push('/')
    }
  }
}
</script>
