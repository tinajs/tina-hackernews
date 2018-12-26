import wxio from 'wxio'

const isDevtools = wx.getSystemInfoSync().platform === 'devtools'

const HACKERNEWS_API_BASE_URL = isDevtools ? `https://cors-anywhere.herokuapp.com/https://hacker-news.firebaseio.com/v0/` : 'https://tina-hackernews.lab4310.com/hn/v0/'
const ARTICLE_API_BASE_URL = 'https://tina-hackernews.lab4310.com/readability/'
const CONFIG_API_URL = 'https://tina-hackernews.lab4310.com/config'

function got (url) {
  return wxio.request({ url })
    .then(function (response) {
      return response.data || {}
    })
}

function fetch (child) {
  return got(`${HACKERNEWS_API_BASE_URL}${child}.json`)
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

export function fetchArticle (id) {
  return got(`${ARTICLE_API_BASE_URL}${id}`)
}

export function fetchConfig () {
  return got(CONFIG_API_URL)
}
