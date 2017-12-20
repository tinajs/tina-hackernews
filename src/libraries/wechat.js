import Queue from 'p-queue'
import timeout from 'p-timeout'
import wxio from 'wxio'

wxio.alert = ({ title = '提示', ...options }) => wxio.showModal({ title, ...options, showCancel: false })

export default wxio
