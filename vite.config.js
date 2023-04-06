import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import eslintPlugin from 'vite-plugin-eslint'
import { fileURLToPath, URL } from 'node:url'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    eslintPlugin({
      include: ['src/**/*.js', 'src/**/*.vue', 'src/*.js', 'src/*.vue']
    })
  ],
  // 請手動新增下方這一行, 設定編譯完成後的路徑對應到github的儲存庫名稱, 請記得在此github專案名稱的前後方都需要加上一個/符號
  base: '/vite_hw7_AccordionIsUnabled/',
  resolve: {
    alias: {
      '@': fileURLToPath(new URL('./src', import.meta.url)),
      vue: 'vue/dist/vue.esm-bundler.js' // 因為使用modal及x-template後有出現黃字提示, 故增加此行定義vue的別名, 使用其他套件時可能會使用到這個別名, 參考自: https://www.jianshu.com/p/0211eee74440
    }
  }
})
