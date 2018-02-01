import types from '../types'
import {
  fetchIdsByChannel,
} from '../../api'

const MINIMUM_PAGE = 1
const PAGE_SIZE = 10

const DEFAULT_CHANNEL = 'top'
const DEFAULT_PAGE = MINIMUM_PAGE

const initialState = {
  activeChannel: DEFAULT_CHANNEL,
  activePage: DEFAULT_PAGE,
  top: [],
  new: [],
  show: [],
  ask: [],
  job: [],
}

const getters = {
  activeIds: (state) => state[state.activeChannel].slice(0, state.activePage * PAGE_SIZE),
  maxPageOfActiveChannel: (state) => Math.ceil(state[state.activeChannel].length / PAGE_SIZE),
  hasMoreItemsOfActiveChannel: (state, getters) => state.activePage < getters.maxPageOfActiveChannel(),
}

const actions = {
  fetchListData ({ commit, dispatch }, { channel }) {
    commit(types.SET_ACTIVE_CHANNEL, { channel })
    return fetchIdsByChannel(channel)
      .then((ids) => commit(types.SET_LIST, { channel, ids }))
      .then(() => dispatch('ensureActiveItems'))
  },
  fetchNextPage ({ commit, state, dispatch, getters }) {
    commit(types.SET_ACTIVE_PAGE, { page: Math.min(state.activePage + 1, getters.maxPageOfActiveChannel()) })
    return dispatch('ensureActiveItems')
  },
}

const mutations = {
  [types.SET_ACTIVE_CHANNEL] (state, { channel }) {
    return {
      ...state,
      activeChannel: channel,
      activePage: DEFAULT_PAGE,
    }
  },
  [types.SET_LIST] (state, { channel, ids }) {
    return {
      ...state,
      [channel]: ids,
    }
  },
  [types.SET_ACTIVE_PAGE] (state, { page }) {
    return {
      ...state,
      activePage: page,
    }
  },
}

export default {
  state: initialState,
  getters,
  actions,
  mutations,
}
