<template>
  <div class="banner-parallax">
    <div class="align-items-center">
      <div class="col-auto pt-5">
        <h1 class="pt-5 text-center fw-bolder text-white" style="font-size:66px;">關於我們</h1>
      </div>
    </div>
  </div>

  <div class="card text-white bg-primary border-white my-5 mx-5">
    <div class="card-header bg-primary border-white text-center" style="font-size:38px;">如同牛奶一般的香、醇、美味</div>
    <div class="card-body" style="font-size:28px;">
      <p>米諾可取自「牛奶(Milk)」的諧音，主廚喜歡單純的事物並堅定地相信「食材的天然原味，最能讓人感受到這片大地給予人們的恩惠。」義大利麵是世界上最美味的食物之一，也是帶著濃濃愛意的美食。</p>
      <p>我們堅持用最好的食材、最細心的手藝，為客人呈現最好的義大利麵，讓每一位客人在我們的餐廳裡都能感受到義大利的熱情和浪漫，在這裡感受到幸福。</p>
    </div>
  </div>
  <div class="container my-5">
    <div class="row">
      <div class="col-lg-8 d-flex align-items-center">
        <ul>
          <li>
            <h3>大地友善</h3>
          </li>
          <h5>
            在這個時代，人們越來越關注食品的來源和品質。我們的義大利麵餐廳深知這一點，因此我們與當地的小農合作，挑選最新鮮、最天然的有機食材，確保每一道菜餚都呈現出大地的真實味道。我們的農作物不僅是有機的，也是友善大地的。我們使用的食材不含有任何農藥或化學添加劑，因此您可以放心享用我們的餐點。
          </h5>
          <br>
          <li>
            <h3>健康原味</h3>
          </li>
          <h5>
            我們的義大利麵餐廳堅信，健康就是最美味的味道。因此，我們不會在任何一道菜餚中添加任何人工香精或化學添加物。我們的菜餚不僅健康，而且原汁原味，每一道菜的味道都是來自食材本身的天然風味。我們經過精心的挑選，使用最新鮮、最天然的食材，讓您在享受美食的同時，也能夠感受到大自然的美好。
          </h5>
          <br>
          <li>
            <h3>衛生乾淨</h3>
          </li>
          <h5>
            我們非常重視衛生問題。在我們的義大利麵餐廳中，我們確保每一道菜餚都是由經驗豐富、專業的廚師手工製作而成。我們的廚師們非常嚴格地遵守衛生規定，保持整個廚房的衛生環境，並且使用最好的設備和最高品質的食材，確保您能夠在一個乾淨、衛生的環境中享受美食。我們的菜餚不僅美味，更是經過嚴格的品質控制，讓您放心品嘗。
          </h5>
        </ul>
      </div>
      <div class="col-lg-4 d-flex align-items-center">
        <img src="https://images.unsplash.com/photo-1634141510639-d691d86f47be?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=464&q=80" alt="Food image" class="img-fluid">
      </div>
    </div>
  </div>

  <!-- <div>
    <div class="box" data-aos="fade-up"></div>
    <div class="box" data-aos="fade-down"></div>
    <div class="box" data-aos="fade-left"></div>
    <div class="box" data-aos="fade-right"></div>
    <div class="box" data-aos="fade-up"></div>
    <div class="box" data-aos="fade-down"></div>
    <div class="box" data-aos="fade-left"></div>
    <div class="box" data-aos="fade-right"></div>
    <div class="box" data-aos="fade-up"></div>
    <div class="box" data-aos="fade-down"></div>
    <div class="box" data-aos="fade-left"></div>
    <div class="box" data-aos="fade-right"></div>
    <div class="box" data-aos="fade-up"></div>
    <div class="box" data-aos="fade-down"></div>
    <div class="box" data-aos="fade-left"></div>
    <div class="box" data-aos="fade-right"></div>
  </div> -->
</template>

<script>
export default {
}
</script>

<style>
.banner-parallax {
  /* The image used */
  background-image: url('https://images.unsplash.com/photo-1515276427842-f85802d514a2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1076&q=80');

  /* Set a specific height */
  min-height: 200px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

/* 因為有些行動裝置可能不支援background-attachment: fixed; 故在此可設定螢幕解析度低於多少的裝置, 將會關閉該parallax scrolling效果, 在此以Apple iPhone 12 Pro的螢幕解析度寬度390設為分水嶺, 可用瀏覽器開發者模式模擬使用行動裝置iPhone 12 Pro來觀看關閉效果後的模樣*/
@media only screen and (max-device-width: 390px) {
  .parallax {
    background-attachment: scroll;
  }
}</style>
