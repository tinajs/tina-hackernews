import uniq from 'uniq'
import types from '../types'
import {
  fetchItems
} from '../../api'

const CACHE_EXPIRES_IN =  1000 * 60 * 3

const initialState = {
  items: [],
}

const getters = {
  activeItems: (state, getters) => {
    return getters.activeIds().map(id => state.items.find((item) => item.id === id)).filter(_ => _)
  },
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
      const item = state.items.find((item) => item.id === id)
      if (!item) {
        return true
      }
      if (now - item.__lastUpdated > CACHE_EXPIRES_IN) {
        return true
      }
      return false
    })
    if (ids.length) {
      return fetchItems(ids).then(items => commit(types.SET_ITEMS, { items }))
    } else {
      return Promise.resolve()
    }
  },
}

const mutations = {
  [types.SET_ITEMS] (state, { items }) {
    return {
      ...state,
      items: uniq([ ...state.items, ...items ], (l, r) => l.id === r.id ? 0 : -1),
    }
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
