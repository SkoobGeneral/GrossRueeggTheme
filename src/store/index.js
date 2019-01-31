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
import _ from "lodash"

const debug = process.env.NODE_ENV !== 'production'


function initialState () {
  return {
    menu: {},
    menuIsOpen: {},
    showMenu: false,
    references: {
      allRefs: [],
      maxTaxPages: { //maximum of pages per reference, taken from the header in the API response
        //0: 1,
        //1: 1 //save...
      },
      currentTaxPages: { // current page by taxId
        //0: 1
        //1: 3
      },
      refsByTaxId: {} // the actual references by taxId
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
    saveReferencesByTaxId (state, payload) {
      if (state.references.refsByTaxId[payload.taxId] && state.references.refsByTaxId[payload.taxId].length) {
        state.references.refsByTaxId[payload.taxId] = _.uniqBy(_.union(state.references.refsByTaxId[payload.taxId], payload.refsArray), 'id')
      } else {
        Vue.set(state.references.refsByTaxId, payload.taxId, payload.refsArray)
      }
      if (state.references.allRefs.length > 0) {
        state.references.allRefs = _.uniqBy(_.union(state.references.allRefs, payload.refsArray), 'id')
      } else {
        Vue.set(state.references, 'allRefs', payload.refsArray)
      }
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
  strict: debug
})
