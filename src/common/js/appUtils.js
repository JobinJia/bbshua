import Cookies from 'js-cookie'
import * as Decimal from './math'

export default {
  isNull (str) {
    str = typeof str === 'number' ? str + '' : str
    return (str === undefined || str === null || str.trim() === '')
  },
  copyData (obj) {
    if (Array.isArray(obj)) {
      return [...obj]
    } else {
      return JSON.parse(JSON.stringify(obj))
    }
  },
  /**
   * 时间戳转时间
   * @param {Number} curServerTime 可选 时间戳
   * @return {String} 时间字符串
   */
  getDateByTimestamp (curServerTime) {
    if (this.isNull(curServerTime)) {
      return '-'
    }
    let a = curServerTime * 1000
    let date = new Date(parseInt(a))
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    let h = date.getHours()
    h = h < 10 ? ('0' + h) : h
    let minute = date.getMinutes()
    let second = date.getSeconds()
    minute = minute < 10 ? ('0' + minute) : minute
    second = second < 10 ? ('0' + second) : second
    return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second
  },
  getFormatDateByTimestamp (curServerTime) {
    if (curServerTime === null) {
      return '-'
    }
    let a = curServerTime * 1000
    let date = new Date(parseInt(a))
    let y = date.getFullYear()
    let m = date.getMonth() + 1
    m = m < 10 ? ('0' + m) : m
    let d = date.getDate()
    d = d < 10 ? ('0' + d) : d
    return y + '-' + m + '-' + d
  },
  plusOneDay (endTime) {
    if (!endTime) {
      return null
    }
    if (parseInt(endTime).toString !== 'NaN') {
      return parseInt(endTime) + 86400
    } else {
      return endTime
    }
  },

  /**
   * 判断数组arr中的项是否有重复项
   * @param arr
   * @param objectKey 数组中每一项（对象）的key， 即 要判断是否有重复val的key
   * @returns {boolean}
   */
  hasRepeat (arr, objectKey) {
    let arrLen = arr.length
    let keyArr = arr.map(item => item[objectKey])
    let brrLen = [...new Set(keyArr)].length
    return arrLen !== brrLen
  },

  formateDate (fmt, date) {
    let o = {
      'M+': date.getMonth() + 1, // 月份
      'd+': date.getDate(), // 日
      'h+': date.getHours(), // 小时
      'm+': date.getMinutes(), // 分
      's+': date.getSeconds(), // 秒
      'q+': Math.floor((date.getMonth() + 3) / 3), // 季度
      'S': date.getMilliseconds() // 毫秒
    }
    if (/(y+)/.test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length))
    }
    for (let k in o) {
      if (new RegExp('(' + k + ')').test(fmt)) {
        fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? (o[k]) : (('00' + o[k]).substr(('' + o[k]).length)))
      }
    }
    return fmt
  },

  /**
   * 转unix时间戳
   * @param d
   * @returns {*}
   */
  getUnixTimeByDate (d) {
    if (!d) {
      return d
    }
    return (d.getTime() / 1000)
  },

  getUserInfo () {
    let userStr = Cookies.get('userInfo')
    if (userStr) {
      return JSON.parse(userStr)
    } else {
      return null
    }
  },

  getNameByStatus (code, type, statusList) {
    if (!code && String(code) !== '0') {
      return '-'
    }
    code = typeof code === 'number' ? code + '' : code
    let stash = statusList[type]
    return stash[code]
  },

  mapToArray (object) {
    let arr = []
    if (JSON.stringify(object) === '{}') {
      return arr
    }
    for (let key in object) {
      arr.push({
        key: key,
        val: object[key]
      })
    }
    return arr
  },

  add (arr) {
    return Decimal.add(arr)
  }
}
