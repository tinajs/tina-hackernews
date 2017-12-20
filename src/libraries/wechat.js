import Queue from 'p-queue'
import timeout from 'p-timeout'
import wxio from 'wxio'

wxio.alert = ({ title = '提示', ...options }) => wxio.showModal({ title, ...options, showCancel: false })

wxio.loading = (function () {
  let stack = 0
  return function loading (options) {
    if (options) {
      wxio.showLoading(options)
    } else {
      wxio.showNavigationBarLoading()
    }
    ++stack
    return function loaded () {
      if (--stack > 0) {
        return
      }
      if (options) {
        wxio.hideLoading()
      } else {
        wxio.hideNavigationBarLoading()
      }
      return
    }
  }
})()

export default wxio
