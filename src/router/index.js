import { createRouter, createWebHashHistory } from 'vue-router'
// import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  // 讓使用者能夠知道當前處在哪一個頁面, 此處的值可以任意命名, 不過在此使用'active', 因為想要套用BootStrap5的一個active樣式, 參考資料: https://router.vuejs.org/zh/api/#routeroptions
  // 可以在網址列輸入: http://localhost:8080/#/newpage, 並且隨意點擊左側連結, 可以看到樣式有被套用上去(呈現藍色底色), 如果是點擊上方navbar的超連結, 則被點擊的那一個的文字顏色也會比其他兩者更深一點點(需要仔細看)
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      component: () => import('../views/FrontLayout.vue'),
      children: [
        {
          path: '',
          component: () => import('../views/front/HomeView.vue')
        },
        {
          path: 'about',
          component: () => import('../views/front/AboutView.vue')
        },
        {
          // 為了不要讓NavbarComponent因為找不到這個產品列表頁而跳出黃字提示, 故需要保留此項
          path: 'products',
          component: () => import('../views/front/ProductsView.vue')
        },
        {
          // 適用於在網站首頁按下商品分類的按鈕時, 要動態把分類名稱代入並顯示對應的分類商品
          path: 'products/:category',
          // 為了要從首頁傳遞商品分類的router參數到這個頁面來, 故必須要使用name來為此頁面做命名
          name: 'products',
          component: () => import('../views/front/ProductsView.vue'),
          // 此處需要定義一個要傳遞的參數, 例如: category, 且在ProductsView.vue內要使用props來接收它
          props: (route) => {
            // console.log('這是在路由表內的console.log, 將route內容顯示出來:', route)
            return {
              category: route.params.category
            }
          }
        },
        {
          // 在/號後方可加上一個自訂義名稱, 藉此實作出動態路由
          path: 'singleProduct/:id',
          component: () => import('../views/front/SingleProductView.vue')
        },
        {
          path: 'cart',
          component: () => import('../views/front/CartView.vue')
        },
        {
          path: 'service',
          component: () => import('../views/front/ServiceView.vue')
        },
        {
          path: 'login',
          component: () => import('../views/front/LoginView.vue')
        },
        {
          path: 'contact',
          component: () => import('../views/front/ContactUS.vue')
        }
      ]
    },
    {
      path: '/admin',
      component: () => import('../views/DashboardView.vue'),
      children: [
        {
          path: 'products',
          component: () => import('../views/admin/AdminProducts.vue')
        },
        {
          path: 'orders',
          component: () => import('../views/admin/AdminOrders.vue')
        }
      ]
    },
    // 404頁面(找不到網頁的說明頁)
    {
      // 這個路徑使用*號, 代表所有的路徑以及子路徑以下的網頁都符合這個條件, 當使用者輸入錯誤的網址時, 就會被引導到NotFound.vue這個頁面
      // 因此可在網址列上http://localhost:5173/#/oxoxoxoxo, 請在/#/的後方隨意輸入一串文字, 按下enter鍵後, 就會導到此處設定的404頁面去, 而非尚未設定之前出現的空白畫面
      path: '/:pathMatch(.*)*',
      component: () => import('../views/front/NotFoundView.vue')
    }
  ],
  scrollBehavior (to, from, savedPosition) {
    // console.log('to, from, savedPosition', to, from, savedPosition);
    // 如果使用者跳到特定頁面時, 例如:'products', 想要觸發滾動的行為, 則可以這樣寫, 否則, 預設是不做滾動行為, 即return {}, 但現在希望只要是在根目錄底下的所有頁面都要滾動到最上方, 故寫match('/')
    if (to.fullPath.match('/')) {
      return {
        // 即可滾動到最上方(距離top為0)
        top: 0
      }
    }
    return {}
  }
})

// 在此將router進行匯出, 因此可以在main.js檔案來使用這個router設定
export default router
