<template>
  <!-- 修改字體為粗體fw-bold, 參考官網: https://getbootstrap.com/docs/5.0/utilities/text/#font-weight-and-italics -->
  <nav class="navbar navbar-expand-lg bg-body-tertiary fixed-top fw-bold" style="background-color: #EDB200;">
    <div class="container-fluid">
      <a class="navbar-brand text-white fs-2" href="#">米諾可icon</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav">
          <li class="nav-item">
            <router-link to="/about" class="nav-link text-white fs-5">關於我們
            </router-link>
          </li>
          <li class="nav-item">
            <!-- 將各路徑加入進來(需與router/index.js內對應), 且記得要加上超連結的名稱 -->
            <router-link to="/products" class="nav-link text-white fs-5">美味餐點
            </router-link>
          </li>
          <li class="nav-item">
            <router-link to="/cart" class="nav-link text-white fs-5">查看購物車
            </router-link>
          </li>
          <li class="nav-item">
            <!-- 此頁內文可參考: https://kerickkkkk.github.io/homeless/#/service -->
            <router-link to="/service" class="nav-link text-white fs-5">常見問題
            </router-link>
          </li>
        </ul>
      </div>
    </div>
  </nav>
</template>
