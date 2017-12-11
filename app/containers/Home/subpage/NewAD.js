import React from 'react';
import {getAdData} from '../../../fetch/home/home'
import HomeAd from '../../../components/HomeAd'
import './style.less'
import PureRenderMixin from 'react-addons-pure-render-mixin'

class newAD extends React.Component{
  constructor(props, context){
    super(props, context);
    this.shouldComponentUpdate=PureRenderMixin.shouldComponentUpdate.bind(this);
    this.state = {
        data: []
    }
  }
  componentDidMount(){
    const result=getAdData();//result为promise返回对象
    // console.log(result);
    result
    .then((res)=>{return res.json()})
    .then((json)=>{
      console.log('ad-json',json);
      const data=json;
      if(data.length){
        this.setState({
          data:data,
        })
      }
    })
  }
  render(){
    return(
      <div>
        {
          this.state.data.length
          ?<HomeAd data={this.state.data}/>
          :<div>加载中</div>
        }
      </div>
    )
  }
}
export default newAD
