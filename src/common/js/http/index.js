import * as appAction from './app'
import * as order from './order'
import * as shop from './shopping'
import * as user from './user'
import * as pro from './purchase'
import * as purchase from './purchase/purchase'
import * as finance from './finance'
import * as level from './level'

export default Object.assign({}, appAction, order, shop, user, pro, purchase, finance, level)
