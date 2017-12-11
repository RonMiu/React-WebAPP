import { get } from '../get'
import { post } from '../post'


export function getOrderListData(username) {
    const result = get('/api/orderlist/' + username)
    return result
}

export function postComment(id, comment) {
    const result = post('/api/submitComment', {
        id: id,//订单的唯一id
        comment: comment //评论内容
    })
    return result
}
