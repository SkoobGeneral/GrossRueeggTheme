window.SETTINGS = {
  // How many different dispatched actions determine loading progress
  // This is likely determined by how many dispatched actions you have below
  // in the created() method
  LOADING_SEGMENTS: 2,
  API_BASE_PATH: '/wp-json/wp/v2/',
  API_MENU_BASE_PATH: '/wp-json/menus/v1/'
}

require('./bootstrap')

import 'babel-polyfill'
import Vue from 'vue'
import VueRouter from 'vue-router'
import { routerHistory, writeHistory } from 'vue-router-back-button'
import VueLazyload from 'vue-lazyload'
import VueInsProgressBar from 'vue-ins-progress-bar'
import Bulma from 'bulma'

import BootstrapVue from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons'
import { faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { faChevronLeft } from '@fortawesome/free-solid-svg-icons'
import { faChevronRight } from '@fortawesome/free-solid-svg-icons'
import { faCaretDown } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

import router from './router'
// import { auth, database } from './firebase.config.js' - Uncomment if you need firebase
import App from './App.vue'
import store from './store'
import * as types from './store/mutation-types'

const options = {
  position: 'fixed',
  show: true,
  height: '3px'
}


library.add(faArrowLeft,faArrowRight,faChevronLeft,faChevronRight)


Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false


Vue.use(VueLazyload)
Vue.use(BootstrapVue)
Vue.use(VueInsProgressBar, options)
Vue.use(routerHistory)



router.afterEach(writeHistory)

router.afterEach((to, from) => {
  // Add a body class specific to the route we're viewing
  $("body").removeClass (function (index, className) {
    return (className.match (/(^|\s)vue--page--\S+/g) || []).join(' ');
  });
  $("body").addClass("vue--page--"+_.toLower(to.name))
})



new Vue({
  el: '#app',
  store,
  router,
  render: h => h(App),
  created () {
    this.$store.commit(types.RESET_LOADING_PROGRESS)
    this.$store.dispatch('getAllCategories')
    this.$store.dispatch('getAllPages')

    // Once user is signed in/out, uncomment if you need Firebase authentication
    // auth.onAuthStateChanged(user => {
    //   if (user) {
    //     this.$store.commit(types.LOGIN_USER)
    //     this.$store.commit(types.STORE_FETCHED_USER, user)
    //   } else {
    //     this.$store.commit(types.LOGOUT_USER)
    //   }
    // })
  }
})
