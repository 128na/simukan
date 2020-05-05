import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// bootstrapVue
import { BootstrapVue } from 'bootstrap-vue';
Vue.use(BootstrapVue);

const files = require.context('./components', true, /\.vue$/i);
files.keys().map(key => Vue.component(key.split('/').pop().split('.')[0], files(key).default));

new Vue({
  render: h => h(App),
}).$mount('#app')

import "./scss/style.scss";