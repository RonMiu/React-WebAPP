import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'

import './style.less'

class SearchInput extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          value:this.props.value||''
        }
    }
    ChangeHandle(e){
      this.setState({
        value:e.target.value
      })
    }
    KeyUpHandle(e){
      if(e.keyCode!==13){
        return
      }else{
        this.props.enterHandle(this.state.value)
        // console.log(this.props.match.params);
      }
    }
    componentDidMount(){

    }
    render() {
        return (

                <input type="text" className='search-input' value={this.state.value} placeholder="请输入关键字" onChange={this.ChangeHandle.bind(this)}
                onKeyUp={this.KeyUpHandle.bind(this)}/>

        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default SearchInput
// module.exports = Search
