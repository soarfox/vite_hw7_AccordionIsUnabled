<template>
  <div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel" aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
          <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
              <!-- 透過isAddProduct的布林值, 來判斷當前是要顯示"新增產品"或"編輯產品" -->
              <span v-if="isAddProduct">新增產品</span>
              <span v-else>編輯產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <div class="row">
              <div class="col-sm-4">
                <div class="mb-2">
                  <h3 class="mb-3">主要圖片</h3>

                  <div>
                    <!-- 當使用者選擇好要上傳的檔案之後, 會觸發change事件, 透過函式進行後續處理 -->
                    <input
                      type="file" class="form-control" id="pic_file_uploadField"
                      placeholder="請選擇圖片或將圖片拖曳進來" @change="singleFileUpload()"
                    />
                  </div>

                  <div class="mb-3">
                    <label for="imageUrl" class="form-label">主要圖片的網址</label>
                    <!-- imageUrl是產品API中內建的屬性名稱, 用於產品的主要圖片 -->
                    <input type="text" class="form-control"
                    placeholder="請輸入主要圖片的網址" v-model="modalProduct.imageUrl">
                  </div>
                  <!-- Bootstrap 中的圖片可利用 .類別名稱img-fluid, 將其設定為響應式圖片,參考資料:https://bootstrap5.hexschool.com/docs/5.0/content/images/ -->
                  <img class="img-fluid" :src="modalProduct.imageUrl" alt="">
                </div>

                <h3 class="mb-3">新增多張圖片</h3>
                <div v-if="Array.isArray(modalProduct.imagesUrl)">
                  <div class="mb-1" v-for="(img, index) in modalProduct.imagesUrl" :key="index">
                    <div>
                      <label class="form-label">圖片網址</label>
                      <input v-model="modalProduct.imagesUrl[index]" type="text" class="form-control"
                        placeholder="請輸入圖片的網址">
                    </div>
                    <img class="img-fluid" :src="img">
                  </div>
                  <div
                    v-if="modalProduct.imagesUrl.length === 0 || modalProduct.imagesUrl[modalProduct.imagesUrl.length-1]">
                    <button class="btn btn-outline-primary btn-sm d-block w-100"
                      @click="modalProduct.imagesUrl.push('')">
                      新增圖片
                    </button>
                  </div>
                  <div v-else>
                    <button class="btn btn-outline-danger btn-sm d-block w-100" @click="modalProduct.imagesUrl.pop()">
                      刪除圖片
                    </button>
                  </div>
                </div>
                <!-- 如果tempProduct.imagesUrl不是一個陣列(或者其不存在時), 則呼叫createImages方法創建一個空陣列, 且直接在tempProduct.imagesUrl內新增一個空字串'', 接下來就等使用者在input欄位內輸入圖片網址後, 因為input有使用v-model雙向綁定, 故會直接把原本空字串給覆蓋掉, 此種狀況適用在當編輯產品資料時, 因為該產品本身沒有圖片, 故需要呼叫一個createImages方法創建一個空陣列, 這樣才能夠新增圖片 -->
                <div v-else>
                  <button class="btn btn-outline-primary btn-sm d-block w-100"
                  @click="createImagesUrlArray">
                    新增圖片
                  </button>
                </div>
              </div>
              <div class="col-sm-8">
                <div class="mb-3">
                  <label for="title" class="form-label">標題</label>
                  <input id="title" type="text" class="form-control"
                  placeholder="請輸入標題" v-model="modalProduct.title">
                </div>
                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="category" class="form-label">分類</label>
                    <input id="category" type="text" class="form-control"
                    placeholder="請輸入分類" v-model="modalProduct.category">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="unit" class="form-label">單位</label>
                    <input id="unit" type="text" class="form-control"
                    placeholder="請輸入單位" v-model="modalProduct.unit">
                  </div>
                </div>

                <div class="row">
                  <div class="mb-3 col-md-6">
                    <label for="origin_price" class="form-label">原價</label>
                    <!-- 在金額部分的v-model加上.number修飾符, 確保輸入的值為數字 -->
                    <input id="origin_price" type="number" min="0" class="form-control"
                    placeholder="請輸入原價" v-model.number="modalProduct.origin_price">
                  </div>
                  <div class="mb-3 col-md-6">
                    <label for="price" class="form-label">售價</label>
                    <!-- 在金額部分的v-model加上.number修飾符, 確保輸入的值為數字 -->
                    <input id="price" type="number" min="0" class="form-control"
                    placeholder="請輸入售價" v-model.number="modalProduct.price">
                  </div>
                </div>
                <hr>

                <div class="mb-3">
                  <label for="description" class="form-label">產品描述</label>
                  <textarea id="description" type="text" class="form-control"
                  placeholder="請輸入產品描述"  v-model="modalProduct.description">
                 </textarea>
                </div>
                <div class="mb-3">
                  <label for="content" class="form-label">說明內容</label>
                  <textarea id="content" type="text" class="form-control"
                  placeholder="請輸入說明內容" v-model="modalProduct.content">
                 </textarea>
                </div>

                <!-- 自行新增的一個欄位:商品評價星級 -->
                <!-- 欄位寬度等設定可以參考BootStrap官網:https://getbootstrap.com/docs/5.3/utilities/spacing/#margin-and-padding -->
                <div class="mb-3 col-md-6">
                  <label for="productRatingStars" class="form-label">商品評價星級</label>
                  <!-- 在此部分的v-model加上.number修飾符, 確保輸入的值為數字 -->
                  <input id="productRatingStars" type="number" class="form-control"
                  placeholder="請輸入評價星級(1~5)" v-model.number="modalProduct.productRatingStars">
                </div>

                <div class="mb-3">
                  <div class="form-check">
                    <label class="form-check-label" for="is_enabled">是否啟用</label>
                    <input id="is_enabled" class="form-check-input" type="checkbox"
                    :true-value="1" :false-value="0"
                    v-model="modalProduct.is_enabled">
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary"
            @click="closeProductModalWindow()">
              取消
            </button>
            <!-- 在<button>標籤內使用@click方法來觸發$emit()事件, 且在emit()內的前面是一個自定義的事件名稱(send-new-product-data-from-modal, 建議全為英文小寫且可用-號隔開各單字), 且後方是一個想要傳送出去給外層的資料(modalProduct), 請記得在@click後方加上.prevent, 防止其跳頁後回到畫面的頂端 -->
            <button type="button" class="btn btn-primary"
            @click.prevent="$emit('send-new-product-data-from-modal', modalProduct)">
              確認
            </button>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  // 將資料(tempProduct, isAddProduct)及方法(createImagesUrlArray, closeProductModalWindow, singleFileUpload)傳入元件裡, 否則會出現找不到Cannot read properties of undefined (reading 'xxxx')...等各種的紅字錯誤訊息或黃字提醒訊息; 當管理者在產品視窗內進行主要圖片的上傳時, 就可以立刻執行外層的singleFileUpload方法, 在Modal內直接完成圖片上傳完成行為, 最後透過按下Modal內的"確認"按鈕, 將整份modalProduct物件資料透過$emit事件往外層傳送出去, 藉此進行後續觸發新增或編輯商品的API行為; 其餘也是依此類推, 各項都是將資料變數或方法, 自外層(管理者商品畫面)傳進來內層(此Modal)進行使用
  props: ['tempProduct', 'isAddProduct', 'createImagesUrlArray', 'closeProductModalWindow', 'singleFileUpload'],

  data () {
    return {
      modalProduct: {}
    }
  },
  // 深層監聽, 可監聽一個物件內的所有變動, 用於當管理者的產品列表中, 某個產品被按下編輯按鈕時, 需要把資料傳入tempProduct內, 且透過watch進行深層監聽, 一旦tempProduct物件的內容有被更動到, 就立刻把資料賦予給this.modalProduct, 最後透過$emit事件將資料內容傳到外層去, 執行產品內容更新的API, 如此將產品完成更新
  watch: {
    // 針對從外部透過props傳進來的資料(tempProduct物件), 將所要監聽的物件直接在這裡寫一個物件, 且其內容寫handler(新的異動後的內容, 舊的原有內容){...}, deep: true, 此為固定寫法
    tempProduct: {
      handler (newItem, oldItem) {
        // console.log('old tempProduct=', oldItem)
        // console.log('new tempProduct=', newItem)
        // 如果tempProduct內容的有更新, 則將整份tempProduct的所有內容賦予給在此Modal內的自定義變數modalProduct物件儲存, 並且在Modal內的各欄位的內容都以modalProduct物件的內容作呈現, 不論是新增產品或編輯產品, 一旦在Modal內按下確認按鈕後, 將整份modalProduct物件透過$emit事件送出去給外層(管理者產品列表畫面)的一個方法做接收後, 且觸發新增或編輯產品API, 藉此完成新增或編輯產品的行為
        this.modalProduct = newItem
      },
      deep: true
    }
  }
}
</script>
