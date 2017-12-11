import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import LocalStore from '../util/localStore'
import Config from '../config/localStoreKey'
import * as userInfoActionsFromOtherFile from '../actions/userinfo'

class App extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state = {
            initDone: false
        }
    }
    render() {
        return (
            <div>
                {
                    this.state.initDone
                    ? this.props.children
                    : <div>正在加载...</div>
                }
            </div>
        )
    }
    componentDidMount() {
      // console.log(Config)
      console.log('this.props.children',this.props.children);
        // 获取位置信息
        let cityName = LocalStore.getItem(Config.CITYNAME)
        let userName=LocalStore.getItem(Config.USERNAME)
        console.log('LocalStore.CITYNAME',cityName)
        console.log('LocalStore.USERNAME',userName);
        if (cityName == null) {
            cityName = '广州'
        }
        // console.log(cityName);
        this.props.userInfoActions.update({
            cityName: cityName,
            userName: userName
        })

        // 更改状态
        this.setState({
            initDone: true
        })
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
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
)(App))
// export default App
