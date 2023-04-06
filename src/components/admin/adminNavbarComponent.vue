<template>
  <!-- 修改字體為粗體fw-bold, 參考官網: https://getbootstrap.com/docs/5.0/utilities/text/#font-weight-and-italics -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top fw-bold" style="background-color: #A5E89E;">
    <div class="container-fluid">
      <a class="navbar-brand" href="#">米諾可icon</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/" class="nav-link">回到前台首頁
            </router-link>
          </li>
          <li class="nav-item">
            <!-- 將各路徑加入進來(需與router/index.js內對應), 且記得要加上超連結的名稱 -->
            <router-link to="/admin/products" class="nav-link">後台的產品列表
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/admin/orders" class="nav-link">後台的訂單列表
            </router-link>
          </li>
          <li class="nav-item">
            <a href="#" class="nav-link" @click.prevent="logout()">登出
            </a>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>

<script>
export default {
  methods: {
    logout () {
      // console.log('登出並清除cookie的內容')
      // 可參考MDN Cookie 文件( https://developer.mozilla.org/zh-CN/docs/Web/API/Document/cookie )裡, 第三個範例內的其中一行程式碼來用, 並且把自訂義名稱改成想要的名稱; 將expired轉成(原本的)unix timestamp格式
      // 將cookie內的token清除掉, 也就是不要給予其任何值
      document.cookie = `hexToken=; expires = ${new Date()};`
      // 當登出後, 把畫面使用$router的push方法轉回登入頁面
      this.$router.push('/login')
    }
  }
}
</script>
