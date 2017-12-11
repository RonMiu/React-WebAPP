import React from 'react'
import { getListData } from '../../../fetch/home/home'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import ListCompoent from '../../../components/List'
import LoadMore from '../../../components/LoadMore'

class Newlist extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          data:[], //存储列表信息
          hasMore:false, //记录当前状态下有没有更多的数据加载
          isLoadingMore:false, //记录当前状态下是“加载中...”还是“点击加载更多”
          page:1 //下一页的页码
        }
    }

    componentDidMount (){
      //获取首页数据
      this.loadFirstPageData();
    }

    loadFirstPageData(){
      const cityName= this.props.cityName;
      const resule = getListData(cityName,0);//获取数据
      // console.log(resule);
      //处理数据
      this.resultHandle(resule);
    }

    //加载更多数据，点击‘加载更多数据时触发’
    loadMoreData(){
      this.setState({
        isLoadingMore:true
      })
      const cityName = this.props.cityName;
      const page = this.state.page;
      const result = getListData(cityName,page);
      this.resultHandle(result)

      //增加page计数
      this.setState({
        page:page+1,
        isLoadingMore:false
      })
    }

    //处理数据函数
    resultHandle(result){
      result
      .then(res=>{
        return res.json()
      })
      .then(json=>{
        // console.log(json);
        const hasMore=json.hasMore;
        const data = json.data;
        this.setState({
          data:this.state.data.concat(data),
          hasMore:hasMore,
        })
      })
    }

    render() {
        return (
          <div>
            {/* <h1>{this.props.cityName}</h1> */}
            <h2 className='home-list-title'>猜你喜欢</h2>
            {
                this.state.data.length
                ? <ListCompoent data={this.state.data}/>
                : <div>{/* 加载中... */}</div>
            }
            {
              this.state.hasMore
              ?<LoadMore isLoadingMore={this.state.isLoadingMore} loadMoreFn={this.loadMoreData.bind(this)}/>
              :''
            }

            {/* <div>
              {this.state.hasMore}
              {this.state.data.length}
            </div> */}
          </div>
        )
    }
}

export default Newlist
