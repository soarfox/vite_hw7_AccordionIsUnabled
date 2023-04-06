<template>
  <div class="container col-8 my-5">
    <div v-if="this.cartProducts.length">
      <h2 class="text-center fw-bolder">購物車清單</h2>
    <!-- 當購物車內有品項時, 會呈現以下購物車表格 -->
    <!-- 使用Bootstrap5的table-hover樣式, 讓游標滑入時會反灰顯示, 參考官網: https://getbootstrap.com/docs/5.0/content/tables/#hoverable-rows -->
    <table class="table align-middle table-hover">
      <thead>
        <tr>
          <th></th>
          <th>品名</th>
          <th>單價</th>
          <!-- <th style="width: 150px">數量/單位</th> -->
          <th class="text-center">數量/單位</th>
          <th class="text-end">金額小計</th>
        </tr>
      </thead>
      <tbody>
        <!-- 下方template加入v-if="cart.carts"項目 -->
        <template v-if="cartList">
          <tr v-for="item in cartProducts" :key="item.id">
            <td>
              <!-- 在按下刪除購物車內某一品項的X按鈕後, 需要顯示旋轉圖示的效果, 藉此告知使用者正在處理中, 故需要使用v-bind搭配disabled標籤; 等待刪除購物車API成功執行後, 在該API內清除 loadingStatus.loadingItem的值, 如此便代表已經更新完成, 就能自動隱藏旋轉圖示; 當其正刪除購物車內某一品項的行為時, 故也將旋轉圖示的效果顯現出來; 若該loadingStatus.loadingItem的值於刪除購物車內某一品項的API執行成功時被清除掉了, 則代表已經處理完成, 故便不需顯示此旋轉圖示, 因此此處會使用v-if來進行判斷 -->
              <button type="button" class="btn btn-outline-danger btn-sm" @click="removeCartItem(item.id)"
                :disabled="loadingStatus.loadingItem === item.id">
                <i class="fas fa-spinner fa-pulse" v-if="loadingStatus.loadingItem === item.id"></i>
                x
              </button>
            </td>
            <td>
              {{ item.product.title }}
              <div class="text-success" v-if="item.coupon">
                已套用優惠券
              </div>
            </td>
            <!-- 自行加入產品"單價"欄位 -->
            <td>
              {{ item.product.price }}
            </td>
            <td>
              <div class="input-group input-group-sm">
                <div class="input-group mb-3">
                  <!-- 在調整數量後, 需要暫時停止調整數量的往上及往下按鈕, 故需要使用v-bind搭配disabled標籤; 等待更新購物車API成功執行後, 在該API內清除 loadingStatus.loadingItem的值, 如此便代表已經更新完成, 就解除暫時停止調整數量的功能 -->
                  <input v-model.number="item.qty" min="1" type="number" class="form-control text-end"
                    @blur="updateCart(item)" :disabled="loadingStatus.loadingItem === item.id">
                  <span class="input-group-text" id="basic-addon2">{{ item.product.unit }}</span>
                </div>
              </div>
            </td>
            <td class="text-end">
              <small class="text-success" v-if="cartList.total !== cartList.final_total">折扣價：</small>
              {{ item.final_total }}
            </td>
          </tr>
        </template>
      </tbody>
      <tfoot>
        <tr>
          <td colspan="4" class="text-end">總計</td>
          <td class="text-end">{{ cartList.total }}</td>
        </tr>
        <tr v-if="cartList.total !== cartList.final_total">
          <td colspan="4" class="text-end text-success">折扣價</td>
          <td class="text-end text-success">{{ cartList.final_total }}</td>
        </tr>
      </tfoot>
    </table>
    <div class="text-end">
        <!-- 如果購物車列表內的數量是0, 則無法點擊清空購物車的按鈕 -->
        <button class="btn btn-outline-secondary" type="button" @click="deleteAllCartItem()"
          :disabled="!this.cartProducts.length">清空購物車</button>
    </div>
  </div>
    <!-- 自行新增一個表格, 當購物車內沒有品項時, 則顯示該文字內容 -->
    <div v-if="!this.cartProducts.length" class="card">
      <div class="card-body text-center">
        <h5 class="card-title">購物車是空的</h5>
        <hr>
        <RouterLink :to="`/products`" class="btn btn-danger w-60">
          按我去選購
        </RouterLink>
      </div>
    </div>
  </div>
  <!-- 表單部份請參考課程預習影片製作及VeeValidate驗證 -->

  <!-- form表單請放在<div class="container">內, 表單開始 -->
  <div class="my-5 row justify-content-center">
    <h3 class="text-center fw-bolder">請填寫訂購資訊</h3>
    <!-- 使用VeeValidate套件的步驟五(1): 進行驗證內容的調整, 將form的頭尾標籤都改成v-form, 且加入v-slot, 將元件本身的資源提取出來做使用, 將errors提取出來並呈現在畫面上, 這樣方便得知製作表單驗證的過程中有沒有錯誤 -->
    <v-form ref="formContent" class="col-md-6" @submit="createOrder()" v-slot="{ errors }">
      <!-- {{ errors }} -->

      <div class="mb-3">
        <label for="name" class="form-label">姓名</label>
        <!-- 使用VeeValidate套件的步驟七(1): 將input標籤改成v-field, 且記得v-field這是一個元件, 因此要有元件的結尾標籤 -->
        <!-- 使用VeeValidate套件的步驟七(3): 在此處綁定v-model, 藉此當表單內容都有正確輸入後, 可以正確送出訂購表單資訊-->
        <!-- 此處同下方使用VeeValidate套件的步驟六(4)的說明, 在<v-field>元件內的name='姓名'與:class="{ 'is-invalid':errors['姓名'], 此二者的名稱必須對應, (且'is-invalid'是使用'-'符號, 而非使用'_'符號串接), 且error-message元件內的name="姓名"也必須要有所對應, 當三者都對應時, 才能正確在畫面上顯示有套用BootStrap5樣式的錯誤紅字提示 -->
        <v-field id="name" name="姓名" type="text" class="form-control" rules="required" v-model="formOrder.user.name"
          :class="{ 'is-invalid': errors['姓名'] }" placeholder="請輸入姓名">
        </v-field>
        <error-message name="姓名" class="invalid-feedback">
        </error-message>
      </div>

      <div class="mb-3">
        <label for="email" class="form-label">Email</label>
        <!-- 使用VeeValidate套件的步驟六(1): 將v-field元件放在這裡, 也就是將原本input標籤改成v-field元件, 且因為是一個元件, 故記得頭尾都要有這個元件標籤 -->
        <!-- 使用VeeValidate套件的步驟六(3): 為這個欄位加上想要套用的驗證規則rules, 且如果要套用多個規則, 且記得用'|'符號隔開各個規則, 且記得不需有空白格隔開, 直接相連在一起即可  -->
        <!-- 使用VeeValidate套件的步驟六(4): 為這個欄位的驗證訊息套用Bootstrap5的樣式, 因此使用:class="{...}", 此處將Bootstrap5的樣式'is-invalid'加進來, 將v-slot內取出來的資源errors傳過來此處, 如果它有錯誤訊息時, 此錯誤訊息會套用'is-invalid'這個樣式在畫面上進行呈現, 而errors['email']內的'email'此名稱必須要對應到<v-field>元件標籤內的name="xxx", 這樣子才能抓到要驗證的對象, 且補充說明:在<error-message>元件標籤內的name='email'此名稱, 必須要搭配此處<v-field>的'is-invalid'的'email', 才能正確顯示出畫面上的紅字提示文字 -->
        <!-- 使用VeeValidate套件的步驟七(2): 在此處綁定v-model, 當表單內容都有正確輸入後(email和電話), 可以在console視窗內看到送出的表單資訊-->
        <v-field id="email" name="email" type="email" class="form-control" rules="email|required"
          v-model="formOrder.user.email" :class="{ 'is-invalid': errors['email'] }" placeholder="請輸入Email">
        </v-field>
        <!-- 使用VeeValidate套件的步驟六(2): 將error-message元件放在這裡, 也就是將原本span標籤改成error-message元件, 且因為是一個元件, 故記得頭尾都要有這個元件標籤; 且error-message必須要對應到想要驗證的v-field的name屬性名稱, 故在此為error-message元件加上想要對應的name, 也就是name="email" -->
        <error-message name="email" class="invalid-feedback">
        </error-message>
      </div>

      <!-- 手機號碼的驗證, 使用自定義的驗證規則方法, 且這裡使用v-bind綁定isPhoneNumber這個自定義的方法 -->
      <!-- <div class="mb-3">
            <label for="phone" class="form-label">手機號碼(使用自定義的驗證規則方法)</label>
            <v-field id="phone" name="手機號碼" type="text" class="form-control"
            :rules="isPhoneNumber" v-model="formOrder.user.phone"
            :class="{ 'is-invalid':errors['手機號碼'] }"
            placeholder="請輸入手機號碼">
            </v-field>
            <error-message name="手機號碼" class="invalid-feedback">
            </error-message>
          </div> -->

      <!-- 因為此處使用到的內建規則較多, 請記得每一個規則(required, numeric, min, max都要在本檔案內進行引入); 如使用npm安裝VeeValidate套件則可以選擇使用以全域方式一次引入所有規則, 但若以CDN方式一次引入所有規則則會有bug, 因此需逐一引入 -->
      <div class="mb-3">
        <label for="tel" class="form-label">電話 (請輸入09開頭的手機號碼)</label>
        <!-- 原本的規則為rules="required|numeric|min:8|max:10", 但這個規則無法限定為09開頭的手機號碼, 故改用下方規則, 可參考官網: https://vee-validate.logaretm.com/v4/guide/global-validators#regex, 且因為要包含"必填"這項規則, 故需要加上逗號以利兩個規則能同時產生效用, 請參考官網: https://vee-validate.logaretm.com/v4/guide/global-validators#object-expressions  -->
        <v-field id="tel" name="電話" type="tel" class="form-control" :rules="{ regex: /^(09)[0-9]{8}$/, required: true }"
          v-model="formOrder.user.tel" :class="{ 'is-invalid': errors['電話'] }" placeholder="請輸入電話">
        </v-field>
        <error-message name="電話" class="invalid-feedback">
        </error-message>
      </div>

      <div class="mb-3">
        <label for="address" class="form-label">地址</label>
        <v-field id="address" name="地址" type="text" class="form-control" rules="required" v-model="formOrder.user.address"
          :class="{ 'is-invalid': errors['地址'] }" placeholder="請輸入地址">
        </v-field>
        <error-message name="地址" class="invalid-feedback">
        </error-message>
      </div>

      <!-- 此處留言為非必填, 故不需對它進行表單驗證 -->
      <div class="mb-3">
        <label for="message" class="form-label">留言</label>
        <textarea id="message" name="message" class="form-control" cols="30" rows="10" v-model="formOrder.message"
          placeholder="請輸入留言">
                  </textarea>
      </div>

      <!-- 在此將送出訂單按鈕外層加上一個<div>標籤並且class設為text-end, 讓按鈕能夠靠右對齊呈現 -->
      <!-- 預設已經將submit加上驗證了, 故不需要修改任何內容即有效果, 可以直接在網頁上按下submit按鈕試試看 -->
      <div class="text-end">
        <button class="btn btn-danger" type="submit">送出訂單</button>
      </div>
    </v-form>
  </div>
  <!-- form表單結束 -->
</template>

<script>
// 使用解構的方式取得環境變數
const { VITE_API, VITE_APIPATH } = import.meta.env
export default {
  data () {
    return {
      testTesting: 'test 123456789',
      // 建立VueLoading的變數: isLoading, loadingColor和loadingBackgroundColor
      isLoading: true,
      loadingColor: '#FFC78E',
      loadingBackgroundColor: '#FFFAF4',
      apiUrl: 'https://vue3-course-api.hexschool.io/v2',
      apiPath: 'cheetah116',
      // 空陣列資料, 用來接收從axios回傳回來的商品資料
      products: [],
      // 分頁的空物件
      pageObj: {},
      // 用來盛裝資料的物件, 藉此顯示於Modal內
      singleProduct: {},
      // 購物車內單一項產品資訊(用於將產品加入購物車及更新購物車資訊)
      singleCartData: {},
      // 購物車清單
      cartList: [],
      // 購物車內各品項內容
      cartProducts: [],
      // 表單資訊都在formOrder內
      formOrder: {
        user: {
          email: '',
          name: '',
          tel: '',
          address: ''
        },
        // 表單資訊的留言內容
        message: ''
      },
      // 針對fontAwesome旋轉小圖示的設定, 官方網站: https://fontawesome.com/
      loadingStatus: {
        loadingItem: ''
      }
    }
  },
  methods: {
    // 取得購物車列表
    getCartList () {
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/cart`)
        .then((response) => {
          // console.log(response.data.data);
          // 取得的資料內有包含總金額, 且該API本身就會自動為相同品項增添數量進去, 不需手動增加購物車內的產品數量
          this.cartList = response.data.data
          // console.log(`this.cartList如下`);
          // console.log(this.cartList);

          this.cartProducts = this.cartList.carts
          // console.log(this.cartProducts);
        })
        .catch((error) => {
          console.dir(error)
          // alert(error.data);
        })
    },
    // 移除購物車內單一品項
    removeCartItem (cartItemId) {
      // 將fontAwesome旋轉小圖示設定產品id給它, 如果它有接收到這個id時就停止圖示轉動
      this.loadingStatus.loadingItem = cartItemId

      this.$http.delete(`${VITE_API}/api/${VITE_APIPATH}/cart/${cartItemId}`)
        .then((response) => {
          // 當axios API執行成功後, 將fontAwesome旋轉小圖示的內容清空, 使其恢復轉動
          this.loadingStatus.loadingItem = ''

          // console.log(response);
          alert('已刪除該產品')
          // 取得購物車資訊
          this.getCartList()
        })
        .catch((error) => {
          // console.dir(error);
          alert(error.data.message)
        })
    },
    // 清空購物車的內容
    deleteAllCartItem () {
      this.$http.delete(`${VITE_API}/api/${VITE_APIPATH}/carts`)
        .then((response) => {
          // console.log(response);
          alert('已清空購物車')
          // 取得購物車資訊
          this.getCartList()
        })
        .catch((error) => {
          // console.dir(error);
          alert(error.data.message)
        })
    },
    // 調整購物車內單一商品的數量
    updateCart (item) {
      // 將fontAwesome旋轉小圖示設定產品id給它, 如果它有接收到這個id時就停止圖示轉動
      this.loadingStatus.loadingItem = item.id

      // 欲更新購物車的資料需要有產品ID與數量
      this.singleCartData.product_id = item.product_id
      this.singleCartData.qty = item.qty

      this.$http.put(`${VITE_API}/api/${VITE_APIPATH}/cart/${item.id}`, { data: this.singleCartData })
        .then((response) => {
          // 當axios API執行成功後, 將fontAwesome旋轉小圖示的內容清空, 使其恢復轉動
          this.loadingStatus.loadingItem = ''

          // console.log(response);
          alert('已更新購物車')
          // 取得購物車資訊
          this.getCartList()
        })
        .catch((error) => {
          // 當axios API執行失敗後, 將fontAwesome旋轉小圖示的內容清空, 使其恢復轉動
          this.loadingStatus.loadingItem = ''

          // console.dir(error);
          alert(error.data.message)
        })
    },
    // 創建一筆訂單資料
    createOrder () {
      if (this.cartProducts.length === 0) {
        alert('購物車內無品項, 無法送出訂單')
      } else {
        // console.log(`購物車有品項, 歡迎下訂`);
        // 此API在成功送出訂單後會自動清除購物車的內容, 因此只需要將購物車清單重新取得一次, 即可讓畫面上呈現的購物車內容為空
        this.$http.post(`${VITE_API}/api/${VITE_APIPATH}/order`, { data: this.formOrder })
          .then((response) => {
            // console.log(response);
            alert('已送出訂單')

            // 取得購物車資訊
            this.getCartList()

            // 在HTML內有使用ref="formContent", 故在此可使用$refs取得DOM元素並搭配VeeValidate內建的resetForm方法清除使用者所填的內容(但僅限清除form內有v-field元件的各欄位), 可參考VeeValidate官方網站: https://vee-validate.logaretm.com/v4/guide/components/handling-forms , 但留言區則因為不是v-field元件, 故需要自己清空內容
            this.$refs.formContent.resetForm()
            this.formOrder.message = ''
          })
          .catch((error) => {
            // console.dir(error);
            alert(error.data.message)
          })
      }
    }
  },
  // 將元件在此進行註冊(元件採用首字大寫的方式命名, 這跟Vite的規則是一樣的)
  components: {

  },
  mounted () {
    this.getCartList()
  }
}
</script>
