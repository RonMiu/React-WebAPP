import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import Header from '../../components/Header'
import Info from './subpage/Info'
import Comment from './subpage/Comment'
import Buy from './subpage/Buy'

class Detail extends React.Component {
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
              <Header title='商户详情' history={this.props.history}/>
              <Info id={this.props.match.params.id}/>
              <Buy id={this.props.match.params.id}/>
              <Comment id={this.props.match.params.id}/>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default Detail
// module.exports = Detail
