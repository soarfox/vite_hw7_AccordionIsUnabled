<template>
  <!-- 讓寬度自動響應裝置的寬度, 詳情請見: https://www.w3schools.com/css/css_rwd_viewport.asp -->
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <!-- 將Parallax Scrolling效果放在container之外, 讓圖片能夠橫向填滿整個畫面 -->
  <div class="parallax">
    <div class="container">
      <div class="flex-column">
        <div class="pt-3">
          <h1 class="text-primary" style="font-size:66px;">用一道美味料理</h1>
        </div>
        <div>
          <h1 class="fs-1 fw-bolder text-primary">品嚐義大利風情</h1>
        </div>
      </div>
    </div>
  </div>

  <div class="container" height="2000px">

    <div class="text-center text-primary" style="height:100px; font-size:72px;" data-aos="fade-down">
      您與美味料理的邂逅
    </div>

    <!--   -->
    <div class="d-flex flex-column justify-content-center">
      <div class="card me-5 feature-cards border-white" style="max-width: 100%;" data-aos="fade-right">
        <div class="row g-0">
          <div class="col-md-7 d-flex align-items-center">
            <!-- class="img-fluid"設為響應式圖片 -->
            <img
              src="https://images.unsplash.com/photo-1461354464878-ad92f492a5a0?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=50"
              class="img-fluid rounded mx-auto" alt="...">
          </div>
          <div class="col-md-5">
            <div class="card-body">
              <h2 class="card-title text-center">新鮮食材</h2>
              <hr>
              <h4 class="card-text">精選新鮮的小麥麵粉、產地直送的新鮮蕃茄、研選橄欖油和義大利香草等食料手工調製而成，只用最天然的食料來呈現出最佳的義大利風味。</h4>
              <p class="card-text text-end"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>

      <div class="card ms-5 feature-cards border-white" style="max-width: 100%;" data-aos="fade-left">
        <div class="row g-0">
          <div class="col-md-5">
            <div class="card-body">
              <h2 class="card-title text-center">為您手作</h2>
              <hr>
              <h4 class="card-text">堅持採用純手工製作的方式，從麵團到醬汁，我們精心製作每一道餐點，保證每一口都能品嘗到最純粹的味道。</h4>
              <p class="card-text text-end"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
          <div class="col-md-7 d-flex align-items-center">
            <img
              src="https://images.unsplash.com/photo-1447279506476-3faec8071eee?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=50"
              class="img-fluid rounded mx-auto" alt="...">
          </div>
        </div>
      </div>

      <div class="card me-5 feature-cards border-white" style="max-width: 100%;" data-aos="fade-right">
        <div class="row g-0">
          <div class="col-md-7 d-flex align-items-center">
            <img
              src="https://images.unsplash.com/photo-1471253794676-0f039a6aae9d?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=600&q=50"
              class="img-fluid rounded mx-auto" alt="...">
          </div>
          <div class="col-md-5">
            <div class="card-body">
              <h2 class="card-title text-center">美味約會</h2>
              <hr>
              <h4 class="card-text">我們用心琢磨每一個細節，從食材的選擇到餐點的擺盤，每一個環節都經過精心的安排與調整，期待與您共度愉快的用餐時光。</h4>
              <p class="card-text text-end"><small class="text-muted">Last updated 3 mins ago</small></p>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="banner-parallax">
      <div class="row justify-content-center align-items-center">
        <div class="col-auto">
          <h1 class="pt-5 text-center fw-bolder text-white" style="font-size:66px;">品嚐美味</h1>
        </div>
      </div>
    </div>
    <div class="row mt-5">
      <div class="col-4" data-aos="fade-up">
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1605590955562-be1a5fda4161?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=498&q=50"
            class="card-img-categories rounded" alt="...">
          <div class="card-body text-center">
            <button type="button" class="btn btn-outline-primary w-100 fs-4"
              @click="pushToCategoryProduct('青醬義大利麵')">爽口青醬</button>
          </div>
        </div>
      </div>
      <div class="col-4" data-aos="fade-down">
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1560434019-4558f9a9e2a1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=50"
            class="card-img-categories rounded" alt="...">
          <div class="card-body text-center">
            <button type="button" class="btn btn-outline-primary w-100 fs-4"
              @click="pushToCategoryProduct('奶油義大利麵')">香醇白醬</button>
          </div>
        </div>
      </div>
      <div class="col-4" data-aos="fade-up">
        <div class="card">
          <img
            src="https://images.unsplash.com/photo-1563379926898-05f4575a45d8?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=470&q=50"
            class="card-img-categories rounded" alt="...">
          <div class="card-body text-center">
            <!-- 分類中是寫"蕃茄"而非自動選字出現的"番茄" -->
            <button type="button" class="btn btn-outline-primary w-100 fs-4"
              @click="pushToCategoryProduct('蕃茄義大利麵')">酸甜蕃茄</button>
          </div>
        </div>
      </div>
    </div>
    <!-- <div class="text-center text-primary" style="height:400px; font-size:72px;" data-aos="fade-up">
      您與美味料理的邂逅
    </div> -->
    <div class="row justify-content-center align-items-center">
      <h1 class="mt-5 text-center fw-bolder text-primary" style="height:90px; font-size:66px;">
        即刻下訂，溫暖美味送到家</h1>
    </div>

    <!-- 顯示Google Map的位置, 請記得一定要為其設定寬度與高度才能正常顯示出地圖來 -->
    <div class="card my-3 border-white" data-aos="fade-up">
      <div class="row g-0">
        <div class="col-md-8">
          <div id="map" style="height: 350px">
          </div>
        </div>
        <div class="col-md-4">
          <div class="card-body">
            <h3 class="card-title text-center">米諾可義大利麵餐廳</h3>
            <hr>
            <h5 class="card-text">電話：(02)2200-1234</h5>
            <h5 class="card-text">地址：新北市板橋區縣民大道二段7號21F</h5>
            <h5 class="card-text">Email：soarfox@gmail.com</h5>
          </div>
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
  </div>
</template>

<script>
import { Loader } from '@googlemaps/js-api-loader'

// // 使用解構的方式取得環境變數
// const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  // name: 'AddGoogleMap',
  data () {
    return {
      // 餐廳的Google Map
      map: null,
      // 建立地圖地點的標記
      marker: null,
      // 餐廳的map座標預設經緯度在板橋車站的經緯度(可使用電腦網頁在GoogleMap中搜尋板橋車站, 從該網頁的網址列上找到經緯度資料)
      lat: 25.0141035,
      lng: 121.4626298,
      // 餐廳的Google Map的說明資訊視窗內容
      contentString: `
        <h3>米諾可義大利麵餐廳</h3>
        <h5><a href="#">官方網站</a>
        (菜單最後更新：2023/03/16)</h5>`,

      // 說明資訊視窗的物件
      infowindow: null
    }
  },
  methods: {
    pushToCategoryProduct (categoryProducts) {
      // 轉到products頁面
      const category = categoryProducts
      console.log('分類是=', category)
      this.$router.push({
        // 在使用params時, 必須使用name, 使用path會跳出黃字提示
        name: 'products',
        params: { category }
      })
    },
    showGoogleMap () {
      // Google MAP API使用方式, 參考官方網站介紹(請點選網頁中的"動態載入Package"那個分頁標籤): https://developers.google.com/maps/documentation/javascript/overview?hl=zh-tw%2F%3Fq%3Dmake#Loading_the_Maps_API
      const loader = new Loader({
        // 個人Google Map API KEY (請保密勿外流)
        apiKey: 'AIzaSyAuJ7GstEIcKD3vpTx8gSE3sGuDLRxSabE',
        version: 'weekly'
        // 設定是否讓使用者可以切換地圖樣式：一般、衛星圖等
        // mapTypeControl: false,
      })

      // Google MAP API使用方式, 參考官方網站介紹(請點選網頁中的"動態載入Package"那個分頁標籤): https://developers.google.com/maps/documentation/javascript/overview?hl=zh-tw%2F%3Fq%3Dmake#Loading_the_Maps_API
      loader.load().then(() => {
        const bqStation = { lat: this.lat, lng: this.lng }
        // 重要:下方new google...的"google"前方請加上"window.", 這樣才能正確顯示出地圖, 否則會顯示抓不到google物件而跳出紅字錯誤(參考資料, 且記得要設定好地圖要顯示的寬度與高度: https://stackoverflow.com/a/66557044/6559375 )
        // 重要:請記得要關閉瀏覽器的擋廣告機制, 才不會跳出相關黃字警告提示
        this.map = new window.google.maps.Map(document.getElementById('map'), {
          // 屬性內容可參考這個網友的說明: https://chloelin.coderbridge.io/2021/12/25/vue-google-map-api-1/
          // 設定地圖的中心點的經緯度
          center: bqStation,
          // 縮放等級可參考官網: https://developers.google.com/maps/documentation/javascript/overview?hl=zh-tw%2F%3Fq%3Dmake#zoom-levels
          zoom: 15
        })
        // 為地圖加入地標, 請參考官網: https://developers.google.com/maps/documentation/javascript/adding-a-google-map?hl=zh-tw#step_2_add_a_map_with_a_marker, 且記得在new google...的google前方要自己加上"window.", 否則會顯示抓不到google物件而跳出紅字錯誤
        this.marker = new window.google.maps.Marker({
          position: bqStation,
          map: this.map
        })
        // 為地圖加上說明資訊視窗, 請參考官網: https://developers.google.com/maps/documentation/javascript/infowindows?hl=zh-tw, 且記得在new google...的google前方要自己加上"window.", 否則會顯示抓不到google物件而跳出紅字錯誤
        this.infowindow = new window.google.maps.InfoWindow({
          content: this.contentString
        })
        // 並且需要在地圖的紅色地標上加入監聽滑鼠點擊事件
        this.marker.addListener('click', () => {
          // 指定在哪張地圖和紅色地標上要開啟說明資訊視窗
          this.infowindow.open(this.map, this.marker)
        })
      })
    }
  },
  mounted () {
    this.showGoogleMap()
  }
}
</script>

<style>
/* Parallax Scrolling效果, 參考自: https://www.w3schools.com/howto/howto_css_parallax.asp, 使用固定最小高度的方法才能成功, 請見網站內範例1 */
.parallax {
  /* The image used */
  background-image: url('https://images.unsplash.com/photo-1473093295043-cdd812d0e601?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1920&q=50');

  /* Set a specific height */
  min-height: 700px;

  /* Create the parallax scrolling effect */
  background-attachment: fixed;
  background-position: center;
  background-repeat: no-repeat;
  background-size: cover;
}

.banner-parallax {
  /* The image used */
  background-image: url('https://images.unsplash.com/photo-1616299915952-04c803388e5f?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=762&q=50');

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
}

.feature-cards {
  width: 100%;
  height: 400px;
  margin: 20px;
  /* background-color: rgb(0, 255, 55); */
}

.pt-3 {
  padding-top: 300px !important;
}

/* 設定商品圖片樣式 */
.card-img-categories {
  /* 在使僅設定高度即可 */
  height: 400px;
  /*  */
  /* 因為圖片設定寬度或高度後容易變形, 且使圖片能夠填滿所設定的寬與高的框框而比例盡可能不失真, 故建議可加上object-fit: cover; 參考官網:https://developer.mozilla.org/zh-TW/docs/Web/CSS/  */
  object-fit: cover;
}

.box {
  width: 100px;
  height: 200px;
  margin: 20px;
  background-color: red;
}
</style>
