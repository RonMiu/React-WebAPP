import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'
import SearchInput from '../SearchInput'

import './style.less'

class HomeHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          kwd:''
        }
    }
    ChangeHandle(e){
      // console.log(e.target);
      var val = e.target.value;
      this.setState({
        kwd:val
      })
    }
    KeyUpHandle(e){
      if(e.keyCode!==13){
        return
      }else{
        this.props.history.push('/search/all/'+encodeURIComponent(this.state.kwd))
      }
    }
    enterHandle(value){
      this.props.history.push('/search/all/'+encodeURIComponent(value))
    }
    render() {
        return (
            <div id="home-header" className="clear-fix">
                <div className="home-header-left float-left">
                  <Link to='/city'>
                    <span>{this.props.cityName}</span>
                    &nbsp;
                    <i className="icon-angle-down"></i>
                  </Link>
                </div>
                <div className="home-header-right float-right">
                    <Link to='/Login'>
                      <i className="icon-user"></i>
                    </Link>
                </div>
                <div className="home-header-middle">
                    <div className="search-container">
                        <i className="icon-search"></i>
                        <SearchInput value='' enterHandle={this.enterHandle.bind(this)}/>
                        {/* <input type="text" placeholder="请输入关键字" value={this.state.kwd} onChange={this.ChangeHandle.bind(this)} onKeyUp={this.KeyUpHandle.bind(this)}/> */}
                    </div>
                </div>
            </div>
            // <div>Homeheader</div>
        )
    }
}

export default HomeHeader
