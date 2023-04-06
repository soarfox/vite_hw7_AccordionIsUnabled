<template>
  <div id="orderModal" ref="orderModal" class="modal fade" tabindex="-1" aria-labelledby="orderModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
      <div class="modal-content border-0">
        <div class="modal-header bg-warning text-dark">
          <h5 id="orderModalLabel" class="modal-title">
            <span>編輯訂單</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-4">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">訂購者資訊</h5>
                  <div class="mb-3">
                    <label for="username" class="form-label">訂購者</label>
                    <!-- 在此需使用"可選串連（物件名稱?.物件屬性）"方式來拜訪物件的屬性, 否則在此物件中會發生找不到user底下屬性的值的狀況, 詳細可參考MDN官網: https://developer.mozilla.org/zh-TW/docs/Web/JavaScript/Reference/Operators/Optional_chaining -->
                    <input id="username" type="text" class="form-control" placeholder="顯示訂購者的名字"
                      :value="modalOrder.user?.name" disabled />
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">電話</label>
                    <input id="username" type="text" class="form-control" placeholder="顯示訂購者的電話"
                      :value="modalOrder.user?.tel" disabled />
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">Email</label>
                    <input id="username" type="text" class="form-control" placeholder="顯示訂購者的Email"
                      :value="modalOrder.user?.email" disabled />
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">地址</label>
                    <input id="username" type="text" class="form-control" placeholder="顯示訂購者的地址"
                      :value="modalOrder.user?.address" disabled />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">訂單資訊</h5>
                  <div class="mb-3">
                    <label for="username" class="form-label">訂購時間</label>
                    <!-- 將UnixTimestamp格式先乘上1000(因為Unix是以秒為單位, 而JS是以毫秒為單位, 故要將秒*1000後變成毫秒, 再進行當地時間的轉換)再使用轉換成當地日期時間的方法toLocalString(), 參考資料: https://w3c.hexschool.com/blog/e69d8619 -->
                    <!-- 有關文字欄位不可輸入的方式有兩種:readonly和disabled, 差異在於disabled的值無法被回傳給後端, 兩者詳細差異說明可參考: https://whirlwindwing99.pixnet.net/blog/post/360842918-readonly-and-disabled; 在此為了讓管理者一眼就知道哪些欄位不可修改, 故直接採用disabled -->
                    <input id="username" type="text" class="form-control" placeholder="顯示訂購時間"
                      :value="new Date(modalOrder.create_at * 1000).toLocaleString()" disabled />
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">訂單ID</label>
                    <input id="username" type="text" class="form-control" placeholder="顯示訂單ID" :value="modalOrder.id"
                      disabled />
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">總金額</label>
                    <input id="username" type="text" class="form-control" placeholder="顯示總金額" :value="modalOrder.total"
                      disabled />
                  </div>
                  <div class="mb-3">
                    <label for="username" class="form-label">是否付款</label>
                    <input id="username" type="text" class="form-control" placeholder="顯示付款狀態" :value="modalOrder.is_paid" disabled />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-4">
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">此處僅限管理者操作勾選</h5>
                  <!-- 因為表單預設會垂直堆疊, 因此在此使用表單格式來進行排版 -->
                  <div class="form-check">
                    <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="true"
                      :false-value="false" v-model="modalOrder.is_paid">
                    <label class="form-check-label" for="is_enabled">是否付款</label>
                  </div>
                  <hr>
                  <div class="mb-3">
                    <label for="message" class="form-label">訂購者留言</label>
                    <input id="message" type="text" class="form-control" placeholder="顯示訂購者的留言"
                      v-model="modalOrder.message" />
                  </div>
                </div>
              </div>
            </div>
            <div class="col-12">
              <!-- 設定元素與元素之間的距離(margin), margin bottom為3, 參考Bootstrap官網: https://bootstrap5.hexschool.com/docs/5.0/utilities/spacing/#margin-and-padding -->
              <div class="card mb-3">
                <div class="card-body">
                  <h5 class="card-title">餐點資訊</h5>
                  <div class="mb-3">
                    <table class="table">
                      <thead>
                        <tr>
                          <th scope="col">餐點</th>
                          <th scope="col" class="text-end">數量</th>
                          <th scope="col" class="text-end">單價</th>
                          <th scope="col" class="text-end">小計</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr v-for="item in modalOrder.products" :key="item.id">
                          <td class="text-start">{{ item.product.title }}</td>
                          <td class="text-start text-end">{{ item.qty }}</td>
                          <td class="text-start text-end">NT$ {{ item.product.price }}</td>
                          <td class="text-start text-end">NT$ {{ item.product.price * item.qty }}</td>
                        </tr>
                        <tr>
                          <td class="text-end table-warning" colspan="3">總金額</td>
                          <td class="text-end table-warning" colspan="4">NT$ {{ modalOrder.total }}</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="closeOrderModalWindow()">
            取消
          </button>
          <!-- 在<button>標籤內使用@click方法來觸發$emit()事件, 且在emit()內的前面是一個自定義的事件名稱(send-new-order-data-from-modal, 建議全為英文小寫且可用-號隔開各單字), 且後方是一個想要傳送出去給外層的資料(modalOrder), 請記得在@click後方加上.prevent, 防止其跳頁後回到畫面的頂端 -->
          <button type="button" class="btn btn-primary"
            @click.prevent="$emit('send-new-order-data-from-modal', modalOrder)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 將資料(orderDataInModal)及方法(checkedBtnOperation, closeOrderModalWindow)傳入元件裡, 否則會出現找不到Cannot read properties of undefined (reading 'xxxx')...等各種的紅字錯誤訊息或黃字提醒訊息; 這樣子在產品視窗內按下"取消"按鈕時, 就可以執行外層的closeOrderModalWindow方法, 依此類推, 其餘各項是將資料變數或方法, 自外層傳進來內層(Modal)使用
  props: ['orderDataInModal', 'checkedBtnOperation', 'closeOrderModalWindow'],

  data () {
    return {
      modalOrder: {},
      meals: [],
      userInfo: [],
      orderTime: ''
    }
  },
  // 使用深層監聽可監聽"一整個物件內的所有屬性的值"的異動情形, 用於當管理者的產品列表中, 某個產品被按下編輯按鈕時, 需要把資料傳入orderDataInModal內, 且透過watch進行深層監聽, 一旦orderDataInModal物件的內容有被更動到, 就立刻把資料賦予給this.modalOrder, 最後透過$emit事件將資料內容傳到外層去, 執行產品內容更新的API, 如此將產品完成更新
  watch: {
    // 針對從外部透過props傳進來的資料(orderDataInModal物件), 將所要監聽的物件直接在這裡寫一個物件, 且其內容寫handler(新的異動後的內容, 舊的原有內容){...}, deep: true, 此為固定寫法
    orderDataInModal: {
      handler (newItem, oldItem) {
        // console.log('new orderDataInModal=', newItem)
        // console.log('old orderDataInModal=', oldItem)
        this.modalOrder = newItem
        console.log('this.modalOrder最新狀態在這裡:', this.modalOrder)
      },
      deep: true
    }
  }
}
</script>
