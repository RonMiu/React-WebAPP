import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import Config from '../../config/localStoreKey'
import LocalStore from '../../util/localStore'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import UserInfo from '../../components/UserInfo'
import OrderList from './subpage/OrderList'
import Header from '../../components/Header'
import './style.less'

class User extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
      const userinfo=this.props.userinfo

      // if(!userinfo.userName){
      //   this.props.history.push('/Login')
      // }
    }
    clickHandle(e){
      //清空本地个人信息
      const userName=''
      const userinfo=this.props.userinfo
      userinfo.userName=userName
      this.props.userInfoActions.update(userinfo);
      LocalStore.setItem(Config.USERNAME,userName);
      this.props.history.push('/')
    }
    clickToHome(e){
      this.props.history.push('/')
    }
    render() {
      // console.log(this.props.userinfo)
      const userinfo=this.props.userinfo
        return (
            <div>
              <Header title='用户中心' backRouter='/' history={this.props.history}/>
              {/* <button onClick={this.clickHandle.bind(this)}>退出</button> */}
              <UserInfo cityName={this.props.userinfo.cityName} userName={this.props.userinfo.userName}/>
              <OrderList userName={this.props.userinfo.cityName}/>
            <button className='btn-exit' onClick={this.clickHandle.bind(this)}>退出登录</button>
            </div>
        )
    }
}


function mapStateToProps(state) {
    return {
      userinfo:state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
      userInfoActions: bindActionCreators(userInfoActionsFromOtherFile, dispatch)
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(User))
