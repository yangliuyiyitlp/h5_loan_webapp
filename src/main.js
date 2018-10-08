// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
// import 'normalize.css' // 初始化文件：不要可以注掉
import App from './App'
import router from './router'
import store from './store'
import '@/stylus/reset.less'
import * as filters from '@/filters'
import '@/utils/fontSize.js'

// import { 
// 	Button, 
//     Popup,
// 	Area,
// 	List,
// 	Cell,
//     PullRefresh,
//     Toast,
//     Field,
//     DatetimePicker 
// }  from 'vant';
// Vue.use(Button);
// Vue.use(Popup);
// Vue.use(Area);
// Vue.use(List);
// Vue.use(Cell);
// Vue.use(PullRefresh).use(Toast);
// Vue.use(Field);
// Vue.use(DatetimePicker);


//cube-ui按需加载UI插件
import {
  /* eslint-disable no-unused-vars */
  Style,
  Input,
  Textarea,
  Picker,
  DatePicker,
  Scroll,
  Toast,
  Dialog
} from 'cube-ui'

Vue.use(Style);
Vue.use(Scroll);
Vue.use(Scroll);
Vue.use(Picker);
Vue.use(Input);
Vue.use(Textarea);
Vue.use(DatePicker);
Vue.use(Toast);
Vue.use(Dialog);

//用来覆盖cube-ui的样式，一定要放在下面
import '@/stylus/common.less'

Object.keys(filters).forEach(key => { // 全局过滤器
  Vue.filter(key, filters[key])
})
Vue.config.productionTip = false

Vue.prototype.toast = null
Vue.prototype.showToast = function showToast(txt, type, toastTime, isDisabled) {
  isDisabled = true; //addfollowup.vue 页面验证弹框
  this.toast = this.$createToast({
    time: toastTime || 1000,
    txt: txt,
    type: type || 'loading',
    zIndex: 99999
  });
  this.toast.show();
  if (type != 'loading') {
    setTimeout(() => {
      this.toast.hide();
      isDisabled = false;
    }, 1500);
  }

}

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: {
    App
  },
  template: '<App/>'
})
if (process.env.BUILD_TIME) {
  console.log('当前环境:' + process.env.BUILD_ENV)
  console.log('版本发布时间:' + process.env.BUILD_TIME)
}
