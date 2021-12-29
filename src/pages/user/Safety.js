import React, { Component } from 'react'
import { Icon, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi } from '../../api'
import './Safety.scss'
import anquanfuben from '../../assets/images/imeta/user/anquanfuben.png'

import AccountHeader from "../../components/partial/AccountHeader";
// @inject('userStore')
@inject('localeStore')
@observer
class Safety extends Component {
  state = {
    vipType: 1,
    oldVipType: 0,
  }

  componentDidMount() {
    this.setState({
      oldVipType: 0,
      vipType: 1,
    })
  }

  componentWillUnmount() {
    window.onresize = null
  }

  gzxtest = () => {//测试事件

  }
  render() {
    const { history } = this.props;
    const { localeStore: { locale: { SAFETY } } } = this.props;

    return (
      <div id="safety">
        <AccountHeader/>
        <div className='it_title'>{SAFETY.ANQUAN_ZHONGXIN}</div>
        <ul>
          {/* <li onClick={() => { this.props.history.push('/OTCPassword') }}>
            <img src={anquanfuben}/>
            <p>{SAFETY.ZHIFU_PWD}</p>
            <Icon color={'#8D8D8D'} type="right" size={'sm'} />
          </li> */}
          <li onClick={() => { this.props.history.push('/PasswordNewOn') }}>
          <img src={anquanfuben}/>

            <p>{SAFETY.XIUGAI_PWD}</p>
            <Icon color={'#8D8D8D'} type="right" size={'sm'} />
          </li>
        </ul>
      </div>
    )
  }
}

export default Safety
