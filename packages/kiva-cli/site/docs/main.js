import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import 'highlight.js/styles/github.css'
import './css/reset.less'
import './css/common.less'
import './css/util.less'
import './css/markdown/sspai.less'
// import './css/markdown/lixiaolai.css'
// import './css/markdown/vue/vue.css'
// import './css/markdown/ursine/ursine-polar.css'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
