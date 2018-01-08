import Tinax from '@tinajs/tinax'

import config from './modules/config'
import items from './modules/items'
import lists from './modules/lists'
import users from './modules/users'

export const tinax = new Tinax({
  modules: {
    config,
    items,
    lists,
    users,
  },
})

// for debug
global.tinax = tinax
