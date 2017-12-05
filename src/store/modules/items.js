import uniq from 'uniq'
import types from '../types'
import {
  fetchItems,
  fetchItem,
} from '../../api'

const CACHE_EXPIRES_IN =  1000 * 60 * 3

const initialState = []

const getters = {
  activeItems: (state, getters) => {
    return getters.activeIds().map(id => state.find((item) => item.id === id) || { id, loading: true })
  },
  getItem: (state) => (id) => state.find((item) => item.id === id) || { id, loading: true },
}

const actions = {
  ensureActiveItems ({ dispatch, getters }) {
    return dispatch('fetchItems', {
      ids: getters.activeIds(),
    })
  },
  fetchItems ({ commit, state }, { ids }) {
    const now = Date.now()
    ids = ids.filter(id => {
      const item = state.find((item) => item.id === id)
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > CACHE_EXPIRES_IN) {
        return true
      }
      return false
    })
    if (ids.length) {
      return Promise.all(ids.map((id) => fetchItem(id).then((item) => commit(types.SET_ITEM, { item }))))
    } else {
      return Promise.resolve()
    }
  },
}

const mutations = {
  [types.SET_ITEM] (state, { item }) {
    return uniq([ ...state, item ], (l, r) => l.id === r.id ? 0 : -1)
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
