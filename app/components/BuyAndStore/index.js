import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import './style.less'

class BuyAndStore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    stoerClickHandle(){
      this.props.storeHandle()
      console.log(this.props.isStore);
    }
    buyClickHandle(){
      this.props.buyHandle()
    }
    render() {
        return (


            <div className="buy-store-container clear-fix">
              <div className="item-container float-left">
              {
                this.props.isStore
                ?<button className="selected" onClick={this.stoerClickHandle.bind(this)}>已收藏</button>
                :<button onClick={this.stoerClickHandle.bind(this)}>收藏</button>
              }
              </div>
              <div className="item-container float-right">
                <button onClick={this.buyClickHandle.bind(this)}>购买</button>
              </div>
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default BuyAndStore
// module.exports = Detail
