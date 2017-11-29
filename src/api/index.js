import wechat from '../libraries/wechat'

const CORS_PROXY_BASE_URL = 'https://cors.now.sh/'
const HACKERNEWS_API_BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
const BASE_URL = `${CORS_PROXY_BASE_URL}${HACKERNEWS_API_BASE_URL}`

function fetch (child) {
  let options = {
    url: `${BASE_URL}${child}.json`,
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
