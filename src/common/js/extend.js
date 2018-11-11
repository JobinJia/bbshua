/* eslint-disable */

/**
 * 原生js对象的扩展
 */

/**
 *删除数组指定下标或指定对象
 */
Array.prototype.remove = function (obj) {
  for (let i = 0; i < this.length; i++) {
    let temp = this[i]
    if (!isNaN(obj)) {
      temp = i
    }
    if (temp === obj) {
      for (let j = i; j < this.length; j++) {
        this[j] = this[j + 1]
      }
      this.length = this.length - 1
    }
  }
}
