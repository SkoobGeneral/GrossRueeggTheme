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
    },
    assets: {
      allRefsAssets: [],
      maxTaxPagesAssets: { //maximum of pages per reference, taken from the header in the API response
        //0: 1,
        //1: 1 //save...
      },
      currentTaxPagesAssets: { // current page by taxId
        //0: 1
        //1: 3
      },
      refsByTaxIdAssets: {} // the actual references by taxId
    },
    news: {
      allRefsNews: [],
      maxTaxPagesNews: { //maximum of pages per reference, taken from the header in the API response
        //0: 1,
        //1: 1 //save...
      },
      currentTaxPagesNews: { // current page by taxId
        //0: 1
        //1: 3
      },
      refsByTaxIdNews: {} // the actual references by taxId
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

//REFS
    saveMaxPagesById (state, payload) {
      Vue.set(state.references.maxTaxPages, payload.taxId, payload.maxPages)
    },
    currentTaxPagesById (state, payload) {
      Vue.set(state.references.currentTaxPages, payload.taxId, payload.currentPage)
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
    },
//ASSETS
    saveMaxPagesByIdAssets (state, payload) {
      Vue.set(state.assets.maxTaxPagesAssets, payload.taxId, payload.maxPages)
    },
    currentTaxPagesByIdAssets (state, payload) {
      Vue.set(state.assets.currentTaxPagesAssets, payload.taxId, payload.currentPage)
    },
    saveReferencesByTaxIdAssets (state, payload) {
      if (state.assets.refsByTaxIdAssets[payload.taxId] && state.assets.refsByTaxIdAssets[payload.taxId].length) {
        state.assets.refsByTaxIdAssets[payload.taxId] = _.uniqBy(_.union(state.assets.refsByTaxIdAssets[payload.taxId], payload.refsArray), 'id')
      } else {
        Vue.set(state.assets.refsByTaxIdAssets, payload.taxId, payload.refsArray)
      }
      if (state.assets.allRefsAssets.length > 0) {
        state.assets.allRefsAssets = _.uniqBy(_.union(state.assets.allRefsAssets, payload.refsArrayAssets), 'id')
      } else {
        Vue.set(state.assets, 'allRefsAssets', payload.refsArrayAssets)
      }
    },
    //NEWS
    saveMaxPagesByIdNews (state, payload) {
      Vue.set(state.news.maxTaxPagesNews, payload.taxId, payload.maxPages)
    },
    currentTaxPagesByIdNews (state, payload) {
      Vue.set(state.news.currentTaxPagesNews, payload.taxId, payload.currentPage)
    },
    saveReferencesByTaxIdNews (state, payload) {
      if (state.news.refsByTaxIdNews[payload.taxId] && state.news.refsByTaxIdNews[payload.taxId].length) {
        state.news.refsByTaxIdNews[payload.taxId] = _.uniqBy(_.union(state.news.refsByTaxIdNews[payload.taxId], payload.refsArray), 'id')
      } else {
        Vue.set(state.news.refsByTaxIdNews, payload.taxId, payload.refsArray)
      }
      if (state.news.allRefsNews.length > 0) {
        state.news.allRefsNews = _.uniqBy(_.union(state.news.allRefsNews, payload.refsArrayNews), 'id')
      } else {
        Vue.set(state.news, 'allRefsNews', payload.refsArrayNews)
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
