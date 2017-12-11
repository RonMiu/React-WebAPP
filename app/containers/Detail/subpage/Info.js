import React from 'react'
import PureRenderMixin from 'react-addons-pure-render-mixin'
import { getInfoData} from '../../../fetch/detail/detai'
import DetailInfo from '../../../components/DetailInfo'

class Info extends React.Component {
    constructor(props, context) {
        super(props, context);
        this.shouldComponentUpdate = PureRenderMixin.shouldComponentUpdate.bind(this);
        this.state={
          info:false,
        }
    }
    componentDidMount(){
      const id=this.props.id;
      // console.log('id',id);
      const result = getInfoData(id);
      // console.log(result);
      result.then(res=>{
        // console.log('res',res);
        return res.json()
      }).then(json =>{
        // console.log('json',json);
        this.setState({
          info:json
        })
      })
    }
    render() {
        return (
            <div>
              {
                this.state.info
                ?
                <DetailInfo data={this.state.info}/>
                :
                ''
              }
            </div>
        )
    }
}

// 使用 require.ensure 异步加载，还不支持 ES6 的 export
export default Info
// module.exports = Detail
