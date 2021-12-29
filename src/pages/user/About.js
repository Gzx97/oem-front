import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi } from '../../api'
// import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
// import successIcon from '../../assets/images/success_icon.png'
import './About.scss'
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from 'react-router-dom'
// @inject('userStore')
@inject('localeStore')
@observer
class About extends Component {
  state = {

  }

  componentDidMount() {

  }

  componentWillUnmount() {
    window.onresize = null
  }

  gzxtest = () => {//测试事件

  }
  render() {
    const { history } = this.props;
    const { localeStore: { locale: { ABOUTUS } } } = this.props;

    return (
      <div id="agreement">
        <AccountHeader/>
        <div className='it_title'>{ABOUTUS.GYWM}</div>
        <div className='agreement_main'>
          <div dangerouslySetInnerHTML={{ __html:ABOUTUS.SM  }}></div>
        </div>
{/*         
        <div className='agreement_main'>
          <p>易数量化机器人是易数科技推出的跨加密货币交易平台的三方交易策略软件，通过可自由配置的量化策略来帮助用户自动交易套利。</p>
          <p>本平台将通过不断创新并且深化可为用户服务的量化工具，包括但不限于网格交易策略/马丁交易策略/定投交易策略等多种丰富的功能，让用户不用盯盘也可以轻松获利。</p>
          <p>感谢您的信任，有任何意见或建议，请您通过工单系统提交至客服，或在微信公众号及微博联系我们。</p>
          <p></p>
          <p></p>
      
        </div> */}
     
      </div>
    )
  }
}

export default About
