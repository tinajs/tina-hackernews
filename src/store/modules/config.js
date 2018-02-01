import uniq from 'uniq'
import map from 'just-map-object'
import types from '../types'
import {
  fetchConfig,
} from '../../api'

const initialState = {
  github: false,
  ads: {
    menu: {
      visible: true,
      thumbnail: '',
      message: {
        type: 'link',
        link: {
          title: 'HackerNews 热点 @ GitHub',
          url: 'https://github.com/tinajs/tina-hackernews',
          thumbnail: 'https://github.com/tinajs/assets/raw/master/images/showcases/hackernews.png',
        },
      },
    },
  }
}

const getters = {
  ads: (state) => {
    return map(state.ads, (key, ad) => {
      return {
        ...ad,
        message: JSON.stringify(ad.message),
      }
    })
  },
}

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
