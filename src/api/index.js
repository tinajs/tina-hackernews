import wechat from '../libraries/wechat'

const CORS_PROXY_BASE_URL = 'https://cors.now.sh/'
const HACKERNEWS_API_BASE_URL = 'https://hacker-news.firebaseio.com/v0/'
const BASE_URL = `${CORS_PROXY_BASE_URL}${HACKERNEWS_API_BASE_URL}`

export const HACKERNEWS_STORY_TYPE = {
  TOP: 'top',
  NEW: 'new',
  BEST: 'best',
  ASK: 'ask',
  SHOW: 'show'
}

function fetch (child) {
  let options = {
    url: `${BASE_URL}${child}.json`,
  }
  return wechat.request(options)
    .then(function (response) {
      return response.data || {}
    })
}

export function fetchIdsByType (type) {
  return fetch(`${type}stories`)
}

export function fetchItem (id) {
  return fetch(`item/${id}`)
}

export function fetchItems (ids) {
  return Promise.all(ids.map((id) => fetchItem(id)))
}

export function fetchUser (id) {
  return fetch(`user/${id}`)
}
