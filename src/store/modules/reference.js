import api from '../../api'
import * as types from '../mutation-types'

// initial state
const state = {
  recent: [],
  loaded: false
}

// getters
const getters = {
  recentReferences: state => limit => {
    if ( !limit || !_.isNumber(limit) || _.isNull(limit) || typeof limit == 'undefined' ) {
      return state.recent
    }
    let recent = state.recent
    return recent.slice(0, limit)
  },

  recentReferencesLoaded: state => state.loaded
}

// actions
const actions = {
  getReference ({ commit }, { limit }) {
    api.getReference(limit, references => {
      commit(types.STORE_FETCHED_REFERENCES, { references })
      commit(types.REFERENCES_LOADED, true)
      commit(types.INCREMENT_LOADING_PROGRESS)
    })
  }
}

// mutations
const mutations = {
  [types.STORE_FETCHED_REFERENCES] (state, { references }) {
    state.recent = references
  },

  [types.REFERENCES_LOADED] (state, val) {
    state.loaded = val
  }
}

export default {
  state,
  getters,
  actions,
  mutations
}
