import uniq from 'uniq'
import types from '../types'
import {
  fetchUser,
} from '../../api'

const CACHE_EXPIRES_IN =  1000 * 60 * 3

const initialState = []

const getters = {
}

const actions = {
  fetchUser ({ commit, state }, { id }) {
    const found = state.find((user) => user.id === id)
    return found
      ? Promise.resolve(found)
      : fetchUser(id).then((user) => commit(types.SET_USER, { id, user }))
  },
}

const mutations = {
  [types.SET_USER] (state, { id, user }) {
    return uniq([ ...state, user ], (l, r) => l.id === r.id ? 0 : -1)
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
