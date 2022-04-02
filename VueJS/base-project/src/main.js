// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import VueResource from 'vue-resource';
Vue.use(VueResource);
/*import VueRouter from "vue-router";
Vue.use(VueRouter);
import Users from './components/Users';
import Test from './components/Test';
const router = new VueRouter({
  mode: 'history',
  base: __dirname,
  router: [
    { path: '/', component: Users },
    { path: '/test', component: Test },
  ],
});*/

Vue.config.productionTip = false;

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
/*new Vue({
  router,
  template: '<App/>',
  components: { App }
}).$mount('#app')*/
