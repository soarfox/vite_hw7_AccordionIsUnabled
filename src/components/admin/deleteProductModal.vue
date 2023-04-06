<template>
  <div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1" aria-labelledby="delProductModalLabel"
    aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
          <h5 id="delProductModalLabel" class="modal-title">
            <span>刪除產品</span>
          </h5>
          <button type="button" class="btn-close" aria-label="Close" @click="closeDeleteModalWindow()"></button>
        </div>
        <div class="modal-body">
          <h3>是否刪除 "{{ tempItem.title }}" 商品</h3>
          <strong class="text-danger">(一經刪除，將無法恢復)。</strong>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" @click="closeDeleteModalWindow()">
            取消
          </button>
          <button type="button" class="btn btn-danger"
          @click="deleteProduct(tempItem.id)">
            確認刪除商品
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  // 將資料(tempItem)及方法(deleteProduct, closeDeleteModalWindow)傳入元件裡, 這樣子在刪除視窗內按下"取消"按鈕時, 就可以執行外層的closeDeleteModalWindow方法; 在刪除視窗內按下"確認刪除"按鈕時, 就可以執行外層的deleteProduct方法
  props: ['tempItem', 'deleteProduct', 'closeDeleteModalWindow']
}
</script>
