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
import emailIcon from '../../assets/images/imeta/login/email.png'

import './PasswordNew.scss'
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from 'react-router-dom'
@inject('userM4DStore')
@inject('localeStore')
@observer
class PasswordNew extends Component {
  state = {
    regtype: 'phone',
    account_token: '',
    step: 1,//创建钱包步骤
    agree: false,//阅读并同意
    nickname: '',//昵称
    preAccount: '',
    account: '',
    code: '',
    imgCode: '',//给个默认值
    password: '',
    passwordConfirm: '',
    recommendCode: '',
    showCaptchaPng: false,
    pwType: 'password',
    pwConfirmType: 'password',
    imgSrc: '',
    captcha: undefined,
    captchaKey: +new Date(),
    count: COUNT_DOWN,
    isGetSms: true,
    showBtn: true,
    isSubmit: true,
    isSuccessToast: false,//注册成功当Toast
    regType: 'email',//注册方式
    tel_num: '',//国家号
    canGetCode: true,//获取验证码防止重复
  }

  componentDidMount() {
    // const recommendCode = getQueryParam('recommendCode') || ''
    const { match } = this.props;
    // this.setState({
    //   tel_num: Cookies.get('TEL_NUM') && Cookies.get('TEL_NUM') || '86'
    // })
    // this.getCaptchaPng()
  }

  componentWillUnmount() {
    window.onresize = null
  }

  // getCaptchaPng = () => {
  //   const key = +new Date()
  //   UserApi.getCaptchaPng({ key }).then(res => {
  //     this.setState({ captchaKey: key, imgSrc: res })
  //   })
  // }

  canSubmit = () => {
    const { account, code, password, passwordConfirm, nickname } = this.state
    return !!(account && code && password && passwordConfirm)
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

  onAccountBlur = e => {
    let _this = this
    const { value } = e.target
    const { canGetCode, preAccount, account, regtype } = this.state
    const { localeStore: { locale: { PASSWORD } } } = this.props;
    if (value !== preAccount) {
      this.setState({ preAccount: value })
      // this.getCaptchaPng()
    }

    
    if (regtype === 'phone') {
      if (!isMobile(account)) {
        Toast.info(PASSWORD.PLEASE_RIGHT_NUMBER, 1)
        _this.setState({ canGetCode: true })
        return
      }
    }
    if (regtype === 'email') {
      if (!isEmail(account)) {
        Toast.info(PASSWORD.PLEASE_RIGHT_NUMBER, 1)
        _this.setState({ canGetCode: true })
        return
      }
    }

   

  }

  codeCountDown = () => {
    let count = this.state.count

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({ isGetSms: true, count: COUNT_DOWN })
        this.setState({ canGetCode: true })
        clearInterval(this.timer)
      } else {
        this.setState({ isGetSms: false, count: count-- })
      }
    }, 1000)
  }

  getCode = async () => {
    const { userM4DStore } = this.props;
    const { localeStore: { locale: { REGISTER,PASSWORD} } } = this.props;
    let _this = this
    const { canGetCode, account, captcha, imgCode, regtype } = this.state
    await _this.setState({ canGetCode: false })
    if (!canGetCode) {
      // console.log('正在获取')
      return
    }
    if (regtype === 'phone') {
      if (!isMobile(account)) {
        Toast.info(PASSWORD.PLEASE_RIGHT_NUMBER, 1)
        _this.setState({ canGetCode: true })
        return
      }
    }
    if (regtype === 'email') {
      if (!isEmail(account)) {
        Toast.info(PASSWORD.PLEASE_RIGHT_NUMBER, 1)
        _this.setState({ canGetCode: true })
        return
      }
    }
    userM4DStore.getCode({
      account,
      type: 'findpassword '
    }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        // this.getCaptchaPng()
        _this.setState({ canGetCode: true })
        // _this.setState({ isSubmit: true, code: '', captcha: '' })
        return
      }
      this.codeCountDown()//开启计时
    })
  }

  onSetType = (currentType, key) => {
    const type = currentType === 'password' ? 'text' : 'password'
    this.setState({ [key]: type })
  }

  onSubmit = () => {

    const { userM4DStore, history } = this.props;
    const { localeStore: { locale: { REGISTER } } } = this.props;
    const {
      account,
      code,
      password,
      passwordConfirm,
      regtype,
    } = this.state;
    if (!REG.EMAIL.test(account) && !REG.MOBILE.test(account)) {
      Toast.info(REGISTER.NUM_ERROR, 2)
      return
    }
    if (!REG.PASSWORD.test(password)) {
      Toast.info(REGISTER.PASSWORD_LEAST, 2)
      return
    }
    if (password !== passwordConfirm) {
      Toast.info(REGISTER.PASSWORD_NOSAME, 2)
      return
    }
    this.setState({ isSubmit: false })

    UserApi.findPassword({
      usertype: regtype,
      email: isEmail(account) ? account : null,
      phone: isMobile(account) ? account : null,
      code,
      password,
      passwordConfirm,
      // recommend_code: recommendCode
    }).then(res => {
      this.setState({ isSubmit: true })
      if (res.status !== 1) {
        Toast.info(res.msg, 2)
        this.setState({ isSubmit: true, code: '', captcha: '' })
        // this.getCaptchaPng()
        return
      }
      Toast.info(res.msg, 2, () => { history.push('/login') })
    }).catch(() => this.setState({ isSubmit: true }))
  }
  checkReg = (regtype) => {
    this.setState({
      regtype
    })
  }
  render() {
    const { history } = this.props;
    const { localeStore: { locale: { REGISTER,PASSWORD } } } = this.props;
    const {
      account,//手机号或者邮箱
      code,//手机验证码
      password,
      passwordConfirm,//确认密码
      pwType,
      pwConfirmType,
      count,
      isGetSms,
      // showSuccess,
      // showBtn,
      isSubmit,
      regtype,//注册方式
      canGetCode,
    } = this.state

    return (
      <div id="password">
        {/* <AccountLangHeader/> */}
        <AccountHeader />
        <div className='log_head'>
          <h1>{PASSWORD.ZHAOHUI_PASSWORD}</h1>
          <p>{PASSWORD.TIPS}</p>
        </div>
        <div className='reg_type_box'>
          <span
            onClick={() => { this.checkReg('phone') }}
            className={regtype === 'phone' && 'active' || 'no_active'}>{PASSWORD.PHONE_NUM}</span>
          <span
            onClick={() => { this.checkReg('email') }}
            className={regtype === 'phone' && 'no_active' || 'active'}>{PASSWORD.EMAIL_NUM}</span>
        </div>

        <div className='out_box'>
          <div className="main-content">

            <label>
              <div className='input-box'>
                <img className={'icon-img'} src={regtype === 'phone' && telIcon || emailIcon} />

                <input
                  className={'input-main'}
                  type="text"
                  value={account}
                  placeholder={regtype === 'phone' && PASSWORD.PHONE_NUM || PASSWORD.EMAIL_NUM}
                  onBlur={this.onAccountBlur}//失去焦点
                  onChange={e => this.onInputChange(e, 'account')}
                />
              </div>
            </label>

            <label>
              <div className='input-box'>
                <img className={'icon-img'} src={yanzhengIcon} />

                <input
                  className="input-main"
                  type="text"
                  maxLength={6}
                  // placeholder={regtype === 'phone' && '短信验证码' || '邮箱验证码'}
                  placeholder={PASSWORD.PLEASE_YZM}
                  value={code}
                  onChange={e => this.onInputChange(e, 'code')}
                />
              </div>

              <span
                style={!canGetCode && isGetSms && { opacity: '.5' } || {}}
                className={`sms-code  ${!isGetSms ? `event-none` : ''}`}
                onClick={this.getCode}>
                {isGetSms ? PASSWORD.HQ_YANZHENGMA : <span>{`${count}s`}</span>}
              </span>
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
