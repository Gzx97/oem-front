import { observable, action, computed } from 'mobx'
import Cookies from 'js-cookie'
import UserApi from '../api/user'
// import AuthApi from '../api/auth'
import { isMobile } from '../utils/reg'

class UserM4DStore {
  // @observable token
  @observable openid
  @observable userid
  @observable payPassword
  // @observable lastTime
  @observable email
  @observable phone_prefix
  @observable phone_no
  // @observable vip_status
  @observable vip

  @computed
  get hasPayPassword() {
    return Number(this.payPassword) === 1
  }

  @action
  isOnline() {
    return !!(Cookies.get('OPENID'))
  }

  @action
  getUserStatus() {
    // this.token = Cookies.get('TOKEN')
    this.openid = Cookies.get('OPENID')
    // this.userid = Cookies.get('USERID')
    // this.payPassword = Cookies.get('PAY_PASSWORD')
    this.email = Cookies.get('EMAIL')
    // this.phone_prefix = Cookies.get('PHONE_PREFIX')
    this.phone_no = Cookies.get('PHONE_NO')
    this.user_name = Cookies.get('USER_NAME')
    // this.vip = Cookies.get('VIP')
    // this.vip_status = Cookies.get('VIP_STATUS')
  }

  @action
  setUserCookie(data) {
    Cookies.set('OPENID', data.openId||'', { expires: 365 })
    // Cookies.set('USERID', data.userId, { expires: 365 })
    Cookies.set('EMAIL', data.userInfo.email||'', { expires: 365 })
    // Cookies.set('PHONE_PREFIX', data.userInfo.phone_prefix, { expires: 365 })
    Cookies.set('PHONE_NO', data.userInfo.phone||'', { expires: 365 })
    Cookies.set('USER_NAME', data.userInfo.user_name||'', { expires: 365 })
    // Cookies.set('PAY_PASSWORD', data.payPassword,{ expires: 365 })
    // Cookies.set('VIP', data.vip,{ expires: 365 })
    // Cookies.set('VIP_STATUS', data.vipStatus,{ expires: 365 })
    // console.log(data)
    // console.log(data.vipStatus)
    this.getUserStatus()
  }

  @action
  register(options) {
    return UserApi.register(options).then(res => {
      if (res.status === 1) {
        // this.setUserCookie(res.data)
      }
      return res
    })
  }

  @action
  login(options) {
    return UserApi.login(options).then(res => {
      if (res.status === 1) {
        this.setUserCookie(res.data)
      }
      return res
    })
  }
  // 获取用户详细信息
  @action
  getUserInfo(options) {
    return UserApi.getUserInfo(options).then(res => {
      // if (res&&res.status === 1) {
      //   // this.setUserCookie(res.data)
      // }
      return res
    })
  }
  @action
  logout(options) {
    Cookies.remove('TOKEN')
    Cookies.remove('OPENID')
    Cookies.remove('USERID')
    Cookies.remove('PAY_PASSWORD')
    Cookies.remove('PHONE_NO')
    Cookies.remove('VIP')
    // Cookies.remove('VIP_STATUS')
    Cookies.remove('TEL_NUM')
    Cookies.remove('LOGIN_TYPE')
    Cookies.remove('EMAIL')
    Cookies.remove('USER_NAME')
    localStorage.removeItem('myInfo')
    localStorage.removeItem('index_http')
    localStorage.removeItem('walletData')
    localStorage.removeItem('gonggaoTitle')
    localStorage.removeItem('groupList')
    // localStorage.removeItem('USER_NAME')
    this.token = null
    this.openid = null
    this.userid = null
    this.email = null
    this.phone_prefix = null
    this.phone_no = null
    // this.vip_status = null
    this.vip = null
    return UserApi.loginOut(options).then(res => {
      return res
    })
  }

  @action
  changePayPasswordStatus(status) {
    Cookies.set('PAY_PASSWORD', status, { expires: 365 })
    this.payPassword = Cookies.get('PAY_PASSWORD')
  }

  // 获取验证码
  // 用 account 替代 phone 或者 email
  @action
  getCode(options, params) {
    const { account } = options
    return isMobile(account)
      ? UserApi.sendSmsCode(
        {
          // imgcode: options.captcha,
          // prefix: options.prefix ? options.prefix : '86',
          phone: account,
          type: options.type,
          // open_id: options.open_id,
        },
        params
      )
      : UserApi.sendMailCode(
        {
          imgcode: options.captcha,
          email: account,
          type: options.type,
          // open_id: options.open_id,

        },
        params
      )
  }

}

export default UserM4DStore
