/*自定义事件过滤器*/
import Vue from 'vue'
import moment from 'moment'

Vue.filter('data-format',function (value,format) {
  return moment(value).format( format || 'YYYY-MM-DD HH:mm:ss')
})

