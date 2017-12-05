import wechat from '../libraries/wechat'

const isDevtools = wx.getSystemInfoSync().platform === 'devtools'

const HACKERNEWS_API_BASE_URL = isDevtools ? `https://cors.now.sh/https://hacker-news.firebaseio.com/v0/` : 'https://tina-hackernews.lab4310.com/hn/v0/'

function fetch (child) {
  let options = {
    url: `${HACKERNEWS_API_BASE_URL}${child}.json`,
  }
  return wechat.request(options)
    .then(function (response) {
      return response.data || {}
    })
}

export function fetchIdsByChannel (channel) {
  return fetch(`${channel}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
    .then((item) => {
      if (!item) {
        return item
      }
      return {
        ...item,
        __lastUpdated: Date.now(),
      }
    })
}

export function fetchItems (ids) {
  return Promise.all(ids.map((id) => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
