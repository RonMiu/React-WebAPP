import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {getOrderListData,postComment} from '../../../fetch/user/orderlist'
import OrderListComponent from '../../../components/OrderList'

class OrderList extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          data:[]
        }
    }
    componentDidMount(){
      const userName=this.props.userName
      if(userName){
        this.loadOlderList(userName)
      }
      else{
        console.log('未传参数');
      }
    }
    loadOlderList(userName){
      const result = getOrderListData(userName)
      result.then(res=>{
        return res.json()
      }).then(json=>{
        this.setState({
          data:json
        })
        console.log(this.state.data);
      })
    }

    //提交评价
    submitComment(id,value,callback){
      const result = postComment(id,value)
      result.then(res=>{
        return res.json()
      }).then(
        json=>{
          // console.log(json)
          if(json.errno===0){
            //已经评价完,修改状态
            callback()
          }
        }
      )
    }
    render() {
        return (
          <div>
            <h4>您的订单</h4>
            {
              this.state.data.length
              ?<OrderListComponent data={this.state.data} submitComment={this.submitComment.bind(this)}/>
              :<div>'无数据'</div>
            }
          </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default OrderList
// module.exports = NotFound
