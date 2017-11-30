import Queue from 'p-queue'
import timeout from 'p-timeout'

let wechat = Object.assign({}, wx)

const PROMISIFY_APIS = [
  'request',
  'showModal',
  'makePhoneCall',
  'scanCode',
  'openSetting',
  'getSetting',
  'authorize',
  'login',
  'getUserInfo',
  'requestPayment',
]

const TIMEOUTIFY_APIS = [
  ['request', 60 * 1000],
]

const QUEUEIFY_APIS = [
  ['request', 5],
]

function promisify (api) {
  return (options) => new Promise((resolve, reject) => {
    api(Object.assign({}, options, {
      success (...args) {
        resolve(...args)
      },
      fail (error) {
        if (error && error.errMsg) {
          return reject(new Error(error.errMsg))
        }
        reject(new Error(error))
      },
    }))
  })
}

function queueify (api, concurrency = 1) {
  const queue = new Queue({ concurrency })
  return (options) => queue.add(() => api(options))
}

function timeoutify (api, ms = 5 * 60 * 1000) {
  return (options) => timeout(api(options), ms)
}

function initialize () {
  PROMISIFY_APIS.forEach((name) => {
    wechat[name] = promisify(wechat[name])
  })
  TIMEOUTIFY_APIS.forEach(([name, ms]) => {
    wechat[name] = timeoutify(wechat[name], ms)
  })
  QUEUEIFY_APIS.forEach(([name, concurrency]) => {
    wechat[name] = queueify(wechat[name], concurrency)
  })

  wechat.alert = ({ title = '提示', ...options }) => wechat.showModal({ title, ...options, showCancel: false })

  wechat.loading = (function () {
    let stack = 0
    return function loading (options) {
      if (options) {
        wechat.showLoading(options)
      } else {
        wechat.showNavigationBarLoading()
      }
      ++stack
      return function loaded (onLoaded) {
        if (--stack > 0) {
          return
        }
        if (options) {
          wechat.hideLoading()
        } else {
          wechat.hideNavigationBarLoading()
        }
        onLoaded()
      }
    }
  })()
}

initialize()

export default wechat
