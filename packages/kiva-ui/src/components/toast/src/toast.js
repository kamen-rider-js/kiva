import Vue from 'vue'

import VueToast from './index.vue'
import { isObject } from '@ui/src/utils'

const DEFAULT_OPTIONS = {
  message: '',
  duration: 3000,
  position: 'bottom',
}

let toast = null
function createInstance(Vue) {
  // 单例模式
  if (toast) return toast

  const VueConstructor = Vue.extend(VueToast)
  toast = new VueConstructor()
  toast.$mount()
  toast.$on('change-visible', (val) => (toast.visible = val))
  document.body.appendChild(toast.$el)
  return toast
}

function getOptions(options) {
  if (isObject(options)) return options
  return {
    message: options
  }
}


let timer = null
function Toast (options = {}) {
  const toast = createInstance(Vue)

  options = getOptions(options)
  options = Object.assign({}, DEFAULT_OPTIONS, options)

  Object.assign(toast, options)

  toast.visible = true

  toast.close = function() {
    toast.visible = false
  }

  if (timer) clearTimeout(timer)
  if (options.duration) {
    timer = setTimeout(toast.close, options.duration)
  }

  return toast

}

Toast.install = function(Vue) {
  Vue.component(VueToast.name, VueToast)
}

Vue.prototype.$toast = Toast

export default Toast
