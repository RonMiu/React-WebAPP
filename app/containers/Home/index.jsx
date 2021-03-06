import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import {withRouter} from 'react-router-dom'
import HomeHeader from '../../components/HomeHeader'
import Category from '../../components/Category'
import Ad from './subpage/Ad'
import NewAD from './subpage/NewAD'
import List from './subpage/List'
import NewList from './subpage/NewList'


class Home extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div>
                <HomeHeader history={this.props.history} cityName={this.props.userinfo.cityName}/>
                <Category/>
                {/* <div style={{height: '15px'}}></div> */}
                {/* <NewAD/> */}
                <Ad/>
                <NewList cityName={this.props.userinfo.cityName}/>
                {/* <List cityName={this.props.userinfo.cityName}/> */}
            </div>
        )
    }
}

// -------------------redux react 绑定--------------------

function mapStateToProps(state) {
    return {
        userinfo: state.userinfo
    }
}

function mapDispatchToProps(dispatch) {
    return {
    }
}
export default withRouter(connect(
    mapStateToProps,
    mapDispatchToProps
)(Home))
