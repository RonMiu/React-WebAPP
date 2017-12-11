import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as userInfoActionsFromOtherFile from '../../../actions/userinfo'
import BuyAndStore from '../../../components/BuyAndStore'
import Config from '../../../config/localStoreKey'
import * as storeActionsFromOtherFile from '../../../actions/store'

class Buy extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          isStore:false
        }

    }
    componentDidMount(){
      console.log('store',this.props.store);
      console.log('storeActions',this.props.storeActions);
      this.checkStoreState()
    }

    //验证登录
    loginCheck(){
      const id = this.props.id
      const userinfo = this.props.userinfo
      if(!userinfo.userName){
        this.props.history.push('/Login/'+ encodeURIComponent('/detail/'+id))
        return false
      }else{
        return true
      }

    }

    //购买事件
    buyHandle(){
      //验证登录
      const loginFlag=this.loginCheck();
      if(!loginFlag){
        return
      }else{
        this.props.history.push('/user')
      }

      //购买流程

      //跳转到主页
      this.props.history.push('/User')
    }

    //收藏事件
    storeHandle() {
        // 验证登录，未登录则return
        const loginFlag = this.loginCheck()
        if (!loginFlag) {
            return
        }

        const id = this.props.id
        const storeActions = this.props.storeActions
        if (this.state.isStore) {
            // 已经被收藏了，则取消收藏
            storeActions.rm({id: id})
        } else {
            // 未收藏，则添加到收藏中
            storeActions.add({id: id})
        }
        // 修改状态
        this.setState({
            isStore: !this.state.isStore
        })
    }

    //检验当前商户是否被收藏
    checkStoreState(){
      const id=this.props.id
      const store=this.props.store

      //some只要有一个满足即可
      store.some(item=>{
        if(item.id===id){
          this.setState({
            isStore:true
          })
          //跳出循环
          return true
        }
      })
    }

    render() {
        return (
            <div>
              <BuyAndStore isStore={this.state.isStore} buyHandle={this.buyHandle.bind(this)} storeHandle={this.storeHandle.bind(this)}/>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
      userinfo:state.userinfo,
      store:state.store
    }
}

function mapDispatchToProps(dispatch) {
    return {
      userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
      storeActions:bindActionCreators(storeActionsFromOtherFile, dispatch),
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Buy))
