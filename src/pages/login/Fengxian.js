import React, { Component } from 'react'
import { Button, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi } from '../../api'
// import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
// import successIcon from '../../assets/images/success_icon.png'
import './Agreement.scss'
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from 'react-router-dom'
// @inject('userStore')
@inject('localeStore')
@observer
class Fengxian extends Component {
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
    const { localeStore: { locale: { AGREEMENTS } } } = this.props;

    return (
      <div id="agreement">
        <AccountHeader />
        {/* <div className='it_title'>{AGREEMENTS.USER_AGREEMENTS}</div> */}
        <div className='it_title'>风险提示</div>
        {/* <div className='agreement_main'>
          <div dangerouslySetInnerHTML={{ __html: AGREEMENTS.XIEYI }}></div>
        </div> */}

        <div className='agreement_main'>

          {/* <h3>风险提示:</h3> */}
          <p>1. 请在详细填写完上述收款信息后反复核对，确保信息无误再点击“确定挂卖”按钮。收款信息填写错误将导致交易失败，平台将不承担由此造成的损失。</p>
          <p>2. 请使用和您本人实名认证一致的姓名和账户进行收款，严禁盗用，冒用他人信息或使用其他违法手段进行交易。若相关交易被发现涉及违法行为的，我们的风控将向相关部门进行反馈。违法者将承担相应的全部法律责任。</p>
          <p>3. 请勿轻信除官方渠道外的任何信息，仔细甄别相关风险和交易信息，若您对相关交易信息有任何问题的，可以将其反馈至客服处。</p>
    
        </div>

      </div>
    )
  }
}

export default Fengxian
