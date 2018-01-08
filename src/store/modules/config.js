import uniq from 'uniq'
import types from '../types'
import {
  fetchConfig,
} from '../../api'

const initialState = {
  github: false,
}

const getters = {}

const actions = {
  fetchConfig ({ commit, state }) {
    fetchConfig().then((config) => commit(types.SET_CONFIG, { config }))
  },
}

const mutations = {
  [types.SET_CONFIG] (state, { config }) {
    return config
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
