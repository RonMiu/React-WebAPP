import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class OrderListItem extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          commentState:2 //0-未评价 1-评价中 2-已评价
        }
    }
    componentDidMount(){
      this.setState({
        commentState:this.props.item.commentState
      })
    }
    showCommentArea(e){
      this.setState({
        commentState:1
      })
    }
    submitClickHandle(){
      const submitComment=this.props.submitComment
      const id = this.props.item.id
      const commentTextDom=this.refs.commentText
      const value = commentTextDom.value.trim()
      if(!value){
        return
      }
      submitComment(id,value,this.commentOK.bind(this))
    }

    //回调函数
    commentOK(){
      //已经评价后改变状态
      this.setState({
        commentState:2
      })
    }

    cancelComment(){
      this.setState({
        commentState:0
      })
    }
    render() {
        const data=this.props.item
        return (
          <div className="clear-fix order-item-container">
                <div className="order-item-img float-left">
                    <img src={data.img} alt={data.title}/>
                </div>
                <div className="order-item-comment float-right">
                  {
                    this.state.commentState === 0
                    //未评价
                    ?
                    <button className='btn' onClick={this.showCommentArea.bind(this)}>评价</button>
                    :
                      this.state.commentState===1
                      //评价中
                      ?
                      ''
                      :
                      //已评价
                      <button className='btn unseleted-btn'>已评价</button>
                  }
                </div>
                <div className="order-item-content">
                    <span>商户：{data.title}</span>
                    <span>数量：{data.count}</span>
                    <span>价格：￥{data.price}</span>
                </div>
                {
                  this.state.commentState===1
                  ?
                  <div className='comment-text-container'>
                    <textarea style={{width: '100%', height: '80px'}} className="comment-text" ref='commentText'></textarea>
                  <button className='btn' onClick={this.submitClickHandle.bind(this)}>提交</button>
                &nbsp;
                <button className='btn unseleted-btn' onClick={this.cancelComment.bind(this)}>取消</button>
                  </div>
                  :
                  ''
                }
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default OrderListItem
// module.exports = NotFound
