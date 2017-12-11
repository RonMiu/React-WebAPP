import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import SearchHeader from '../../components/SearchHeader'
import SearchList from './subpage/List'

class Search extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    componentDidMount(){
      console.log(this.props.match.params);
    }
    render() {
        return (
            <div>
                <SearchHeader history={this.props.history} keyword={this.props.match.params.keyword}/>
                <SearchList keyword={this.props.match.params.keyword} category={this.props.match.params.category}/>
                {/* <p>{this.props.match.params}</p> */}
                {/* <h1>Search</h1> */}
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default Search
// module.exports = Search
