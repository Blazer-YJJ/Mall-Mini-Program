import App from './App'

// #ifndef VUE3
import Vue from 'vue'
import './uni.promisify.adaptor'
import store from './store'
import uView from 'uview-ui'

Vue.use(uView)
Vue.config.productionTip = false
App.mpType = 'app'
const app = new Vue({
  ...App,
  store
})
app.$mount()
// #endif

// #ifdef VUE3
import { createSSRApp } from 'vue'
import store from './store'
import uView from 'uview-ui'

export function createApp() {
  const app = createSSRApp(App)
  app.use(store)
  // 修改uView的安装方式，适配Vue 3
  app.config.globalProperties.$u = uView.$u
  // 不使用app.use(uView)，因为uView 2.x不支持Vue 3的插件安装方式
  return {
    app
  }
}
// #endif