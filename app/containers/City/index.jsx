import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import LocalStore from '../../util/localStore'
import Config from '../../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../../actions/userinfo'
import Header from '../../components/Header'
import CurrentCity from '../../components/CurrentCity'
import CityList from '../../components/CityList'

class City extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }

    changeCity(newCity){
      if (newCity==null){
        return
      }

      //修改redux
      const userinfo = this.props.userinfo;
      userinfo.cityName=newCity;
      this.props.userInfoActions.update(userinfo);

      //修改LocalStore值
      LocalStore.setItem(Config.CITYNAME,newCity)

      //跳转到首页
      this.props.history.replace('/');
    }
    componentDidMount(){
      console.log(LocalStore);
    }
    render() {
        return (
            <div>
                <Header title='选择城市' history={this.props.history}/>
                <CurrentCity cityName={this.props.userinfo.cityName}/>
                <CityList changeFn={this.changeCity.bind(this)}/>
            </div>
        )
    }
    componentDidMount(){
      console.log(this.props.userinfo);
      console.log(this.props.userInfoActions);
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
)(City))
