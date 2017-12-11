import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import Header from '../../components/Header/'
import LoginComponent from '../../components/Login'
import LocalStore from '../../util/localStore'
import Config from '../../config/localStoreKey'

class Login extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          checking:true
        }
    }
    componentDidMount(){
      this.doCheck()
      console.log(this.props.match.params)
    }
    doCheck(){
      // let username = LocalStore.getItem(Config.USERNAME)
      // if(username){
      //   //已经登录
      //   this.goUserPage()
      // }else{
      //   this.setState({
      //     checking:false
      //   })
      // }
      const userinfo = this.props.userinfo
      if(userinfo.userName){
        //已经登录
        this.goUserPage()
      }else{
        //尚未登录
        this.setState({
          checking:false
        })
      }
    }

    goUserPage(){
      this.props.history.push('/User')
    }

    //登录成功的业务处理
    loginHandle(userName){
      //保存用户名
      const actions = this.props.userInfoActions
      let userinfo = this.props.userinfo
      userinfo.userName=userName
      LocalStore.setItem(Config.USERNAME,userName)
      actions.update(userinfo)
      console.log('aa',userinfo)
      //跳转链接
      const params=this.props.match.params
      const router=params.router
      if(router){
        //跳转到指定页
        this.props.history.push(router)
      }else{
        //跳转到默认页面——即用户中心页
        this.goUserPage()
      }
    }

    render() {
        return (
            <div>
              <Header title='登录' history={this.props.history}/>
              {
                this.state.checking
              ?<div>aaa</div>
              :<LoginComponent loginHandle={this.loginHandle.bind(this)}/>
              }
            </div>
        )
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
      userinfo:state.userinfo
    }
}

// bindActionCreators() 可以自动把多个 action 创建函数 绑定到 dispatch() 方法上。
function mapDispatchToProps(dispatch) {
    return {
        userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch),
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Login))
