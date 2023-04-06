import { createApp } from 'vue'
// 安裝完vue axios套件後, 需要引用它們
import axios from 'axios'
import VueAxios from 'vue-axios'
import App from './App.vue'
// 因為index.js中有export default router這個檔案, 故在此可以引入使用
import router from './router'

// 為了要讓前台"常見問題"該頁的Bootstrap5的手風琴效果(Accordion)能正常作動, 此處需要引用bootstrap, 應當是該效果有使用到BS的js, 故需要進行引用bs
import 'bootstrap'

// 將VeeValidate套件進行安裝, 安裝方式可參考官網:https://vee-validate.logaretm.com/v4/tutorials/basics/, 以全域性方式引入所需使用到的多項表單樣式與規則, 且設定(configure)也需引用, 並搭配下方對應程式碼, 參考官網: https://vee-validate.logaretm.com/v4/api/configuration#updating-the-config
import { Form, Field, ErrorMessage, defineRule, configure } from 'vee-validate'
// 以全域性方式定義所有VeeValidate的規則, 且在下方加上對應的程式碼, 可參考官網: https://vee-validate.logaretm.com/v4/guide/global-validators#vee-validaterules, 請用關鍵字搜尋Or you can globally define all the available rules in the @vee-validate/rules package
import AllRules from '@vee-validate/rules'
// 將VeeValidate套件的語系進行安裝, 安裝方式可參考官網:https://vee-validate.logaretm.com/v4/guide/i18n, 並引入地區設定及繁體中文語系的json檔, 且需在下方設定語系內容
import { localize, setLocale } from '@vee-validate/i18n'
import zhTW from '@vee-validate/i18n/dist/locale/zh_TW.json'

// 在此將all.scss匯入進來(該檔案內已包含bootstrap)
import './assets/all.scss'

// 以全域性方式定義所有VeeValidate的規則
Object.keys(AllRules).forEach(rule => {
  defineRule(rule, AllRules[rule])
})

// 設定VeeValidate的設定內容
configure({
  // 驗證的訊息以繁體中文語系為主
  generateMessage: localize({ zh_TW: zhTW }),
  // 在輸入內容的當下直接進行驗證
  validateOnInput: true
})

// 設定VeeValidate的預設語系為繁體中文, 'zh_TW'請使用底線_符號, 而非使用dash符號(-), 否則無法成功設定繁體中文語系
setLocale('zh_TW')

const app = createApp(App)

app.use(router)
// 安裝完vue axios套件後, 需要透過app.use方法來使用它們, 也就是"將axios作為Vue的套件使用", 如此在每個畫面內要使用axios時, 可直接寫this.$http.get('...')即可調用axios;不需於該檔案內得先寫import axios from 'axios'才能使用axios.get('...')
app.use(VueAxios, axios)

// 安裝完VeeValidate套件後, 需要將這三個VeeValidate自定義的元件進行重新命名, 以利使用於HTML標籤內, 而不會跟HTML本身的標籤名稱有所衝突, 可參考講師講義: https://hackmd.io/FFv0a5cBToOATP7uI5COMQ
app.component('VForm', Form)
app.component('VField', Field)
app.component('ErrorMessage', ErrorMessage)
app.mount('#app')
