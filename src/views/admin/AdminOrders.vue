<template>
    <div class="container">
      <table class="table mt-4">
        <thead>
          <tr>
            <th>訂購時間</th>
            <th>訂購人姓名</th>
            <th>餐點內容</th>
            <th>訂購留言</th>
            <th>總金額</th>
            <th>是否付款</th>
            <th>訂單操作</th>
          </tr>
        </thead>
        <tbody>
          <!-- 由於每個訂單的創建時間必定不一樣, 故可以作為key值 -->
          <tr v-for="item in orders" :key="item.create_at">
            <td>{{ transferOderTime(item.create_at) }}</td>
            <td>{{ item.user.name }}</td>
            <!-- 文字對齊方式可參考:https://bootstrap5.hexschool.com/docs/5.0/utilities/text/, 作業範例是用"text-end", 但目前呈現出來看起來會有點離標題太遠, 故自行修改成"text-start"較合適 -->
            <!-- 在下方新增一個v-for來抓出每一筆訂單當中, 各項餐點的內容 -->
            <td class="text-start" width="500px">
              <!-- 由於每項餐點的id必定不一樣, 故可以作為key值 -->
              <span v-for="oneMeal in item.products" :key="oneMeal.id">
                {{ oneMeal.product.title + oneMeal.qty + oneMeal.product.unit + ' '}}
              </span>
            </td>
            <td class="text-start">{{ item.message }}</td>
            <td class="text-start">{{ item.total }}</td>
            <td>
              <span class="text-success" v-if="item.is_paid">付款</span>
              <span v-else>未付款</span>
            </td>
            <td>
              <div class="btn-group">
                <button type="button" class="btn btn-outline-primary btn-sm" @click="openOrderModal('edit', item)">
                  編輯
                </button>
                <button type="button" class="btn btn-outline-danger btn-sm" @click="openOrderModal('delete', item)">
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>

      <!-- 將已經註冊好的元件(OrderModal)放在此處, 適用編輯訂單 -->
      <!-- 已將"訂單內容的Modal"改成元件化, 當在傳遞props時, 如果遇到大寫字母則要改成小寫字母且前方要加上-符號, 撰寫口訣一樣是:前內後外, 也就是將外部資料(tempOrder)或方法(checkedBtnOperation, closeOrderModal)透過內部元件變數(在此依前述規則修改其命名為order-data-in-modal, checked-btn-operation, close-order-modal-window)通通傳入元件內使用, 且在該元件內則維持使用props內所命名的資料或方法的英文大小寫字母不變, 例如:close-order-modal-window在props內定義的是有大小寫的closeOrderModalWindow, 在元件內就直接使用closeOrderModalWindow即可-->
      <!-- 使用emit, 將內部元件資料往外層傳遞, 也就是將訂單元件內的資料(在此為事件名稱send-new-order-data-from-modal)傳送給外層方法(在此為getDataFromOrderModal此方法)做接收及後續處理 -->
      <OrderModal :order-data-in-modal="tempOrder" :checked-btn-operation="checkedBtnOperation"  :close-order-modal-window="closeOrderModal" @send-new-order-data-from-modal="getDataFromOrderModal">
      </OrderModal>

      <!-- 將已經註冊好的元件(PaginationComponent)放在此處 -->
      <!-- 口訣:先內(部元件變數)後外(部資料變數), 且元件變數的名稱記得以小寫為主, :innerpages="pageObj -->
      <!-- 在此使用props的寫法, 把方法當成資料來傳入PaginationComponent元件裡面, 口訣一樣是先內後外(內部原本是getItems, 但要把大寫改成小寫, 且原本大寫字母前方要加上-符號), 而外部的方法名稱是getOrders -->
      <PaginationComponent :innerpages="pageObj" :get-items="getOrders"></PaginationComponent>

      <!-- 已將"刪除訂單的確認視窗Modal"改成元件化, 當在傳遞props時, 如果遇到大寫字母則要改成小寫字母且前方要加上-符號, 撰寫口訣一樣是:前內後外, 也就是將外部資料(tempOrder)或方法(deleteOrder, closeDeleteModal)透過內部元件變數(在此依前述規則修改其命名為temp-item, delete-order, close-delete-modal-window)通通傳入元件內使用, 且在該元件內則維持使用props內所命名的資料或方法的英文大小寫字母不變, 例如:close-delete-modal-window在props內定義的是有大小寫的closeDeleteModalWindow, 在元件內就直接使用closeDeleteModalWindow即可 -->
      <DeleteOrderModal :temp-item="tempOrder" :delete-order="deleteOrder"
        :close-delete-modal-window="closeDeleteModal">
      </DeleteOrderModal>
    </div>

</template>

<script>
// 將bootstrap的modal元件引用進來
import { Modal } from 'bootstrap'
import '@popperjs/core'

// 匯入分頁元件(PaginationComponent)的.js檔
import PaginationComponent from '../../components/admin/paginationComponent.vue'

// 匯入訂單內容的Modal元件
import OrderModal from '@/components/admin/orderModal.vue'

// 匯入刪除訂單的確認視窗Modal元件的.js檔
import DeleteOrderModal from '../../components/admin/deleteOrderModal.vue'

// 使用解構的方式取得環境變數
const { VITE_API, VITE_APIPATH } = import.meta.env

// 宣告此些變數, 避免瀏覽器一開始就報錯, 且當生命週期走到mounted階段時, 代表畫面都已經生成完畢, 這時候再來抓取網頁裡的DOM元素時, 才能正確抓取得到, 故在生命週期mounted內定義該些變數的內容(詳細說明請見:2023 Vue直播班的影片名稱:"第三週額外補充，Bootstrap JS 部分"的14分01秒處往後看)
let orderModal = ''
let delOrderModal = ''

export default {
  // 資料
  data () {
    return {
      // 建立一個空陣列資料, 用來接收從axios回傳回來的商品資料
      orders: [],
      // 建立一個暫時性的訂單物件
      tempOrder: {},
      // 建立一個空陣列資料, 處理排序後的訂單列表
      arrOrders: [],
      // 建立一個分頁的空物件
      pageObj: {},
      // 建立一個暫時性的餐點內容物件
      tempOrderMeal: {}
    }
  },
  // 方法(請記得methods的尾字有"s")
  methods: {
    // 取得訂單列表資料, 依資料數目來決定頁數有幾頁, 且如果要決定當前要跳到第幾頁, API本身即可使用?page=後方加上一個數字來跳到該頁的畫面, 故在此將其加上一個變數, 來決定要跳到第幾頁(如果資料有11筆以上, 則第11~20筆資料會顯示於第二頁裡), 而如果直接寫getData(pageObj), 則pageObj預設會是undefined, 故需要使用"參數預設值"的方式(pageObj = 1), 也就是如果沒有提供pageObj參數的內容, 則將其預設值設定為1, 這是ES6的寫法
    getOrders (pageObj = 1) {
      this.$http.get(`${VITE_API}/api/${VITE_APIPATH}/admin/orders/?page=${pageObj}`)
        .then((response) => {
          this.orders = response.data.orders
          console.log(response)

          // 將分頁的資訊儲存起來
          this.pageObj = response.data.pagination
          // console.log(this.pageObj);

          // 取得第一份訂單內的各餐點細節資料, order是一個陣列, 故使用索引值0
          // 待辦事項: 可用一個物件變數把取得的餐點資料包起來, 傳到OrderModal內, 即可呈現出該份訂單內的所有餐點資訊
          // this.getProductsDetailFromOrder(this.orders[0].products)
          // console.log(this.orders[0].products)

          // 進行資料排序(依照訂單創建時間由最新至最舊排序)
          this.sortData()
          // console.dir(this.arrOrders)
        })
        .catch((error) => {
          console.dir(error)
          alert(error.data)
        })
    },
    // 將UnixTimeStamp的格式轉成一般常見的日期時間格式
    transferOderTime (unixTimestamp) {
      const date = new Date(unixTimestamp * 1000)
      // 透過將小時, 分鐘與秒數都各別轉成字串後, 判斷其長度是否等於2, 如果沒有則補上0
      const twDate = date.getFullYear() + '/' + (date.getMonth() + 1) + '/' + date.getDate() + ' ' +
      (date.getHours().toString().length === 2 ? date.getHours() : '0' + date.getHours()) + ':' +
      (date.getMinutes().toString().length === 2 ? date.getMinutes() : '0' + date.getMinutes()) + ':' +
      (date.getSeconds().toString().length === 2 ? date.getSeconds() : '0' + date.getSeconds())
      return twDate
    },
    getProductsDetailFromOrder (meals) {
      // 因為是單張訂單的資訊, 故只要在函式內宣告一個變數並且將其回傳即可在畫面上作呈現, 如果使用根元件的變數則會造成無窮迴圈
      const singleOrderMeals = []
      // // 參考卡斯伯老師的網誌: https://www.casper.tw/development/2022/03/10/object-for-each/
      Object.keys(meals).forEach((item) => {
        // console.log(meals[item].product.title)
        singleOrderMeals.push(`${meals[item].product.title} ${meals[item].qty} ${meals[item].product.unit}`)
      })
      // console.log('singleOrderMeals=', singleOrderMeals)
      return singleOrderMeals
    },
    // 第一個參數為edit或delete, 判斷要執行的對應行為, 第二個參數為該筆訂單的完整資料
    openOrderModal (operation, thisOrder) {
      if (operation === 'edit') {
        // 使用解構方式取出該筆訂單內容並賦予給一個變數, 以利將該筆訂單資料透過props方式傳入model裡使用
        this.tempOrder = { ...thisOrder }

        orderModal.show()
      } else if (operation === 'delete') {
        // 取出該訂單內容, 這樣才能取得訂單的id, 如此才能在後續執行刪除訂單的行為
        this.tempOrder = { ...thisOrder }
        delOrderModal.show()
      }
    },
    // 當按下編輯訂單的確認按鈕
    checkedBtnOperation (orderId) {
      console.log('準備呼叫update訂單 API')
      console.log('orderId=', orderId)
      // 呼叫編輯訂單的API且帶入訂單id
      this.updateOrder(orderId)
    },
    // 編輯一筆訂單資料
    updateOrder (orderId) {
      // 此處請記得使用物件方式將訂單資料帶入API內
      this.$http.put(`${VITE_API}/api/${VITE_APIPATH}/admin/order/${orderId}`, { data: this.tempOrder })
        .then((response) => {
          // console.log(response);
          orderModal.hide()
          alert('編輯訂單成功!')
          this.getOrders()
        })
        .catch((error) => {
          // console.dir(error);
          orderModal.hide()
          alert(error.data.message)
          this.getOrders()
        })
    },
    // 刪除一筆訂單資料
    deleteOrder (orderId) {
      this.$http.delete(`${VITE_API}/api/${VITE_APIPATH}/admin/order/${orderId}`)
        .then((response) => {
          // console.log(response);
          delOrderModal.hide()
          alert('已刪除訂單!')
          this.getOrders()
        })
        .catch((error) => {
          // console.dir(error);
          delOrderModal.hide()
          alert(error.data.message)
          this.getOrders()
        })
    },
    // 將資料依照分類排序
    // 寫法參考自:https://ithelp.ithome.com.tw/articles/10225733
    sortData () {
      // 將API內的原始資料進行深層拷貝
      const copyOrders = JSON.parse(JSON.stringify(this.orders)) // 深層拷貝; 這段JSON.stringify(a);是指先將a物件改成字串, 這段JSON.parse(...);是指將內容物改成JSON格式

      // 使用Object.values(...)把值取出來, 雖然這會失去原始資料內的id, 但因為是執行深層拷貝, 故不會影響到原本API內的原始資料, 在此僅作後台畫面上的顯示使用而已
      this.arrOrders = Object.values(copyOrders)

      // 依據訂單的類別進行排序, 目標是要將"相同類別的資料"擺放在一起, 待處理完成之後, 需在HTML畫面上以arrOrders作為呈現, 而非用orders(即API內的原始資料)作呈現
      this.arrOrders.sort(function (a, b) {
        if (a.create_at < b.create_at) {
          return 1 // 當a.create_at值 < b.create_at值為true時, 代表b項較a項更大, 故把b項放在a項的前面, 數值越大者將被排得越前面
        } else {
          return -1 // 當a.create_at值 < b.create_at值為false時, 代表b項較a項更小, 故把b項放在a項的後面, 數值越大者將被排得越前面
        }
      })
    },
    // 關閉"訂單資料Modal"的方法
    closeOrderModal () {
      orderModal.hide()
    },
    // 關閉"刪除訂單資料Modal"的方法
    closeDeleteModal () {
      delOrderModal.hide()
    },
    getDataFromOrderModal (item) {
      // 將Modal元件(內層)傳出來的訂單資料賦予給管理者的訂單畫面(外層)的變數進行接收
      this.tempOrder = item

      // console.log('已從Modal收到傳出來的資料了, 執行函式並且將資料賦予給this.tempOrder變數, 其值為', this.tempOrder)

      console.log('呼叫update訂單 API')
      this.updateOrder(this.tempOrder.id)
    }

  },
  // 通常會使用使用import(見開頭第四行)搭配區域元件, 且區域元件裡面可以註冊很多個子元件 (請記得components的尾字有"s")
  components: {
    PaginationComponent, OrderModal, DeleteOrderModal
  },
  // 生命週期(在mounted此階段代表畫面上的DOM元素都已經生成完成了)
  mounted () {
    this.getOrders()

    // 在建立Bootstrap Modal元件的實體之前, 記得先在最外層宣告modal變數為'', 避免因為找不到該變數而報錯, 而當生命週期走到mounted時代表畫面都已經生成完畢, 此時進行抓取網頁DOM元素時才不會出錯, 故在此階段才將Modal實體化
    orderModal = new Modal(document.getElementById('orderModal'))
    delOrderModal = new Modal(document.getElementById('delOrderModal'))
  }

}
</script>
