import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'

import './style.less'

class LoadMore extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
    }
    render() {
        return (
            <div className="load-more" ref="wrapper">
                {
                    this.props.isLoadingMore
                    ? <span>加载中...</span>
                    : <span onClick={this.loadMoreHandle.bind(this)}>加载更多</span>
                }
            </div>
        )
    }
    loadMoreHandle() {
        // 执行传输过来的loadMoreData函数
        this.props.loadMoreFn();
        // console.log(this.props.isLoadingMore);
    }
    componentDidMount(){
      const self =this;
      //绑定屏幕滚动
      let timeoutId;
      const loadMoreFn =this.props.loadMoreFn;
      // console.log(loadMoreFn);
      const wrapper= this.refs.wrapper;
      // console.log(wrapper);
      function callback(){
        const top=wrapper.getBoundingClientRect().top;
        // console.log('top',top);
        const windowHeight=window.screen.height;//屏幕I高度
        // console.log(windowHeight);
        if(top && top < windowHeight){
          // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
          loadMoreFn();
        }
      }
      window.addEventListener('scroll',function(){
        // console.log(123);
        if(self.props.isLoadingMore){
          return
        }
        if(timeoutId){
          clearTimeout(timeoutId)
        }
        timeoutId=setTimeout(callback,50)
      },false)
    }
    // componentDidMount() {
    //     // 使用滚动时自动加载更多
    //     const loadMoreFn = this.props.loadMoreFn
    //     const wrapper = this.refs.wrapper
    //     let timeoutId
    //     function callback() {
    //         const top = wrapper.getBoundingClientRect().top
    //         const windowHeight = window.screen.height
    //         if (top && top < windowHeight) {
    //             // 证明 wrapper 已经被滚动到暴露在页面可视范围之内了
    //             loadMoreFn()
    //         }
    //     }
    //     window.addEventListener('scroll', function () {
    //         if (this.props.isLoadingMore) {
    //             return
    //         }
    //         if (timeoutId) {
    //             clearTimeout(timeoutId)
    //         }
    //         timeoutId = setTimeout(callback, 50)
    //     }.bind(this), false);
    // }
}

export default LoadMore
