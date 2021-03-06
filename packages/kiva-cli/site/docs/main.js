import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// import 'highlight.js/styles/color-brewer.css'
// import 'highlight.js/styles/zenburn.css'
import 'highlight.js/styles/agate.css'
import './css/index.less'

Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App),
}).$mount('#app')
