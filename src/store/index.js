import Wuex from '@tinajs/wuex'

import items from './modules/items'
import lists from './modules/lists'
import users from './modules/users'

export const wuex = new Wuex({
  modules: {
    items,
    lists,
    users,
  },
})

// for debug
global.wuex = wuex
