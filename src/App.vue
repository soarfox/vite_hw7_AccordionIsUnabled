<template>
  <!-- 將點擊navbar項目後的結果顯示在下方此處, 在navbar有router-link, 在這裡有對應的router-view -->
  <router-view />
</template>

<script>
// 在VScode的終端機輸入指令安裝AOS效果:npm install aos --save ,引用步驟可參考洧杰老師的AOS講義: https://hackmd.io/KjiZhD-UTpK_UdvuTCm8Tg?view

// 在mounted()生命週期內就初始化AOS函式庫, AOS程式碼將會在App.vue(所有頁面的父元件)渲染完成後執行, 故所有頁面都能夠使用到AOS效果
import AOS from 'aos'
import 'aos/dist/aos.css'
export default {
  mounted () {
    AOS.init({
      offset: 300, // offset (in px) from the original trigger point
      delay: 0, // values from 0 to 3000, with step 50ms
      duration: 1300 // values from 0 to 3000, with step 50ms
    })
  }
}
</script>

<!-- 參考Vite官網: https://vitejs.dev/guide/features.html#css-pre-processors , 將sass安裝起來, 在VScode輸入指令npm add -D sass, 且將此處原本的程式碼都刪除, 且寫上lang="scss" -->
<style lang="scss">
//在此處增加一個body且設定padding-top是某一高度, 藉此避免網頁內容被navbar給遮蓋住
body {
  padding-top: 55px
}
</style>
