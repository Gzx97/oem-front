import React, { Component } from 'react'
import { Button, Toast, Icon } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi } from '../../api'
import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
import { isEmail, isMobile, isNickName } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
// import CaptchaM4D from '../../components/common/CaptchaM4D'
import openPwdImg from '../../assets/images/open-pwd-shen.png'
import closePwdImg from '../../assets/images/close-pwd-shen.png'
import userIcon from '../../assets/images/imeta/login/user.png'
import yanzhengIcon from '../../assets/images/imeta/login/yanzheng.png'
import telIcon from '../../assets/images/imeta/login/tel.png'
import passwordIcon from '../../assets/images/imeta/login/password.png'
import yaoqingIcon from '../../assets/images/imeta/login/yaoqing.png'

import './PasswordNew.scss'
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from 'react-router-dom'
@inject('userM4DStore')
@inject('localeStore')
@observer
class PasswordNew extends Component {
  state = {
    oldpassword:'',
    password: '',
    passwordConfirm: '',
    pwType: 'password',
    pwConfirmType: 'password',
    oldpwType:'password',
    isSubmit: true,
  }

  componentDidMount() {
    const { match } = this.props;
  }

  componentWillUnmount() {
    window.onresize = null
  }


  canSubmit = () => {
    const {oldpassword, password, passwordConfirm } = this.state
    return !!(oldpassword,password && passwordConfirm )
  }

  onInputChange = (e, key) => {
    const { value } = e.target
    // console.log(ke注册时候取消确认密码功能y)
    // 
    // if (key === 'password') {
    //   // console.log(key)
    //   this.setState({
    //     passwordConfirm: value
    //   })
    // }

    this.setState({ [key]: value })
  }


  onSetType = (currentType, key) => {
    const type = currentType === 'password' ? 'text' : 'password'
    this.setState({ [key]: type })
  }

  onSubmit = () => {

    const { userM4DStore, history } = this.props;
    const { localeStore: { locale: { REGISTER } } } = this.props;
    const {

      password,
      passwordConfirm,
      oldpassword,
    } = this.state;

    if (password !== passwordConfirm) {
      Toast.info(REGISTER.PASSWORD_NOSAME, 2)
      return
    }
    this.setState({ isSubmit: false })
    userM4DStore.getUserStatus()

    UserApi.editLoginpassword({
      open_id: userM4DStore.openid,
      old_password:oldpassword,
      new_password:  password,
      new_password_confirm:  passwordConfirm,
      // recommend_code: recommendCode
    }).then(res => {
      this.setState({ isSubmit: true })
      if (res.status !== 1) {
        Toast.info(res.msg, 2)
        this.setState({ isSubmit: true,  })
        // this.getCaptchaPng()
        return
      }
      Toast.info(res.mag, 2,()=>{history.push('/mineList')})
    }).catch(() => this.setState({ isSubmit: true }))
  }

  render() {
    const { history } = this.props;
    const { localeStore: { locale: { REGISTER ,PASSWORD} } } = this.props;
    const {
      password,
      passwordConfirm,//确认密码
      pwType,
      pwConfirmType,
      isSubmit,
      oldpassword,
      oldpwType
    } = this.state

    return (
      <div id="password">
        {/* <AccountLangHeader/> */}
        <AccountHeader />
        <div className='log_head'>
          <h1>{PASSWORD.XGDLMM}</h1>
        </div>


        <div className='out_box'>
          <div className="main-content">

          <label>
              <div className='input-box'>
                <img className={'icon-img'} src={passwordIcon} />

                <input
                  className="input-main"
                  type={oldpwType}
                  value={oldpassword}
                  placeholder={PASSWORD.QSRYMM}
                  onChange={e => this.onInputChange(e, 'oldpassword')}
                />
              </div>

              <img
                className="eye-img"
                src={oldpwType === 'text' ? openPwdImg : closePwdImg}
                alt="睁眼闭眼"
                onClick={() => this.onSetType(oldpwType, 'oldpwType')}
              />
            </label>
            {/* 密码 */}
            <label>
              <div className='input-box'>
                <img className={'icon-img'} src={passwordIcon} />

                <input
                  className="input-main"
                  type={pwType}
                  value={password}
                  placeholder={REGISTER.PLEASE_PASSWORD}
                  onChange={e => this.onInputChange(e, 'password')}
                />
              </div>

              <img
                className="eye-img"
                src={pwType === 'text' ? openPwdImg : closePwdImg}
                alt="睁眼闭眼"
                onClick={() => this.onSetType(pwType, 'pwType')}
              />
            </label>
            <label>
              <div className='input-box'>
                <img className={'icon-img'} src={passwordIcon} />

                <input
                  className="input-main"
                  type={pwConfirmType}
                  value={passwordConfirm}
                  placeholder={REGISTER.PLEASE_PASSWORD2}
                  onChange={e => this.onInputChange(e, 'passwordConfirm')}
                />
              </div>

              <img
                className="eye-img"
                src={pwConfirmType === 'text' ? openPwdImg : closePwdImg}
                alt="睁眼闭眼"
                onClick={() => this.onSetType(pwConfirmType, 'pwConfirmType')}
              />
            </label>


          </div>
          <div className="btn-box">
            <Button
              activeClassName="active"
              className="primary-button"
              disabled={!this.canSubmit() || !isSubmit}
              // onClick={() => { this.props.history.push('/LookKey') }}>
              onClick={this.onSubmit}>
              {PASSWORD.OK}
            </Button>
          </div>
        </div>





      </div>

    )
  }
}

export default PasswordNew
