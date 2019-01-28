import Vue from 'vue'
import Vuex from 'vuex'
import createPersist from 'vuex-localstorage'
import * as actions from './actions'
import * as getters from './getters'
import hub from './modules/hub'
import user from './modules/user'
import post from './modules/post'
import reference from './modules/reference'
import page from './modules/page'
import categories from './modules/categories'

Vue.use(Vuex)

const debug = process.env.NODE_ENV !== 'production'

let localStorage = createPersist({
    namespace: 'YOUR_APP_NAMESPACE',
    initialState: {},
    expires: 1.21e+9 // Two Weeks
})

function initialState () {
  return {
    menu: {},
    menuIsOpen: {},
    showMenu: {},
    references: {
      maxTaxPages: {
        //0: 1,
        //1: 1 //save...
      },
      currentTaxPages: {
        //0: 1
        //1: 3
      },
      refsByTaxId: [
        {
//          id: 132,
//          title: 'caisdjfiasd'
        }
      ]

    }
  }
}

export default new Vuex.Store({
  state: initialState(),
  actions,
  getters,
  mutations: {
    loadMenu (state, menu) {
      state.menu = menu
    },
    setShowMenu (state, showMenu) {
      state.showMenu = showMenu
    },
    setMenuIsOpen (state, menuIsOpen) {
      state.menuIsOpen = menuIsOpen
    },
    increaseTaxPage (state, taxId) {
      state.references.taxPages[taxId]++
    },
    saveReferencesByTaxId (state, taxId, refsArray) {
      //if (refsArray.length)
      state.references.refsById[taxId].concat(refsArray)
    }
  },
  modules: {
    hub,
    user,
    post,
    reference,
    page,
    categories
  },
  strict: debug,
  plugins: [localStorage]
})
