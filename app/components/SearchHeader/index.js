import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import {Link} from 'react-router-dom'
import SearchInput from '../SearchInput'

import './style.less'

class SearchHeader extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    clickHandle(e){
      window.history.back();
    }
    enterHandle(value){
      this.props.history.push('/search/all/'+encodeURIComponent(value))
    }
    render() {
        return (
          <div id="search-header" className="clear-fix">
            <span className="back-icon float-left" onClick={this.clickHandle.bind(this)}>
              <i className="icon-chevron-left"></i>
            </span>
            <div className='input-container'>
              <i className='icon-search'></i>
              <SearchInput  value={this.props.keyword||''} enterHandle={this.enterHandle.bind(this)}/>
            </div>
          </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default SearchHeader
