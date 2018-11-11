/**
 * Created by jiabinbin
 * 2018-10-20 01:21
 * Email 425605679@qq.com
 */
import Decimal from 'decimal.js'

export const add = (arr) => {
  return arr.reduce((prev, curr) => {
    let a = new Decimal(prev)
    let b = new Decimal(curr)
    return a.plus(b).toNumber()
  })
}
