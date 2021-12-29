import React, { Component } from "react";
import { Button, Toast, Icon } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi } from "../../api";
import { REG, TOAST_DURATION, COUNT_DOWN } from "../../utils/constants";
import { isEmail, isMobile, isNickName } from "../../utils/reg";
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
// import CaptchaM4D from '../../components/common/CaptchaM4D'
import openPwdImg from "../../assets/images/open-pwd-shen.png";
import closePwdImg from "../../assets/images/close-pwd-shen.png";
import userIcon from "../../assets/images/imeta/login/user.png";
import yanzhengIcon from "../../assets/images/imeta/login/yanzheng.png";
import telIcon from "../../assets/images/imeta/login/tel.png";
import passwordIcon from "../../assets/images/imeta/login/password.png";
import yaoqingIcon from "../../assets/images/imeta/login/yaoqing.png";
import emailIcon from "../../assets/images/imeta/login/email.png";

import "./OTCPassword.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from "react-router-dom";
@inject("userM4DStore")
@inject("localeStore")
@observer
class OTCPassword extends Component {
  state = {
    account_token: "",
    step: 1, //创建钱包步骤
    agree: false, //阅读并同意
    nickname: "", //昵称
    preAccount: "",
    account: "",
    code: "",
    imgCode: "", //给个默认值
    password: "",
    passwordConfirm: "",
    recommendCode: "",
    showCaptchaPng: false,
    pwType: "password",
    pwConfirmType: "password",
    imgSrc: "",
    captcha: undefined,
    captchaKey: +new Date(),
    count: COUNT_DOWN,
    isGetSms: true,
    showBtn: true,
    isSubmit: true,
    isSuccessToast: false, //注册成功当Toast
    usertype: "email", //注册方式
    tel_num: "", //国家号
    canGetCode: true, //获取验证码防止重复
  };

  componentDidMount() {
    // const recommendCode = getQueryParam('recommendCode') || ''
    // const { match } = this.props;
    let _this = this;
    const { history, userM4DStore } = this.props;
    userM4DStore.getUserStatus();
    // 获取个人信息
    userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 2);
        return;
      }
      // console.log(res.data.faqRe)
      _this.setState({
        userInfo: res.data,
        account: res.data.phone || res.data.email || "error",
        usertype: (res.data.phone && "phone") || "email",
      });
    });
    // this.getCaptchaPng()
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  // getCaptchaPng = () => {
  //   const key = +new Date()
  //   UserApi.getCaptchaPng({ key }).then(res => {
  //     this.setState({ captchaKey: key, imgSrc: res })
  //   })
  // }

  canSubmit = () => {
    const { account, code, password, passwordConfirm } = this.state;
    return !!(account && code && password && passwordConfirm);
  };

  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  // onAccountBlur = e => {
  //   let _this = this
  //   const { value } = e.target
  //   const { canGetCode, preAccount, account, regType, tel_num } = this.state
  //   const { localeStore: { locale: { REGISTER } } } = this.props;
  //   if (value !== preAccount) {
  //     this.setState({ preAccount: value })
  //     // this.getCaptchaPng()
  //   }

  //   if (!isMobile(account)) {
  //     Toast.info('请输入正确的手机号', TOAST_DURATION)
  //     return
  //   }

  //   // if (regType === 'email') {
  //   //   if (!isEmail(account)) {
  //   //     Toast.info(REGISTER.PLEASE_RIGHT_EMAIL, TOAST_DURATION, () => {
  //   //       _this.setState({ account: '' })
  //   //     })
  //   //     return
  //   //   }
  //   // }

  //   if (isMobile(account)) {
  //     UserApi.phoneExist({ prefix: tel_num, phone: account }).then(res => {
  //       if (res.status !== 1) {
  //         Toast.info(res.msg, TOAST_DURATION)
  //         _this.setState({
  //           account: ''
  //         })
  //       }

  //     })
  //   }
  //   if (isEmail(account)) {
  //     UserApi.emailExist({ email: account }).then(res => {
  //       if (res.status !== 1) {
  //         Toast.info(res.msg, TOAST_DURATION)
  //         _this.setState({
  //           account: ''
  //         })
  //       }
  //     })
  //   }

  // }

  codeCountDown = () => {
    let count = this.state.count;

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({ isGetSms: true, count: COUNT_DOWN });
        this.setState({ canGetCode: true });
        clearInterval(this.timer);
      } else {
        this.setState({ isGetSms: false, count: count-- });
      }
    }, 1000);
  };

  // 获取验证码
  getCode = async () => {
    const { userM4DStore } = this.props;
    const {
      localeStore: {
        locale: { REGISTER },
      },
    } = this.props;
    let _this = this;
    const { canGetCode, account, captcha, imgCode, usertype } = this.state;
    await _this.setState({ canGetCode: false });
    if (!canGetCode) {
      // console.log('正在获取')
      return;
    }
    if (usertype === "phone") {
      if (!isMobile(account)) {
        Toast.info("请输入正确的手机号", 1);
        _this.setState({ canGetCode: true });
        return;
      }
    }
    if (usertype === "email") {
      if (!isEmail(account)) {
        Toast.info("请输入正确的邮箱", 1);
        _this.setState({ canGetCode: true });
        return;
      }
    }
    // if (!captcha) {
    //   Toast.info(REGISTER.PLEASE_YANZHENGMA, 1)
    //   _this.setState({ canGetCode: true })
    //   return
    // }
    userM4DStore
      .getCode({
        // captcha,
        account,
        // prefix: tel_num,
        type: "editpaypassword",
      })
      .then((res) => {
        if (res.status !== 1) {
          Toast.info(res.msg);
          // this.getCaptchaPng()
          _this.setState({ canGetCode: true });
          // _this.setState({ isSubmit: true, code: '', captcha: '' })
          return;
        }
        this.codeCountDown(); //开启计时
      });
  };

  onSetType = (currentType, key) => {
    const type = currentType === "password" ? "text" : "password";
    this.setState({ [key]: type });
  };

  onSubmit = () => {
    const { userM4DStore, history, userInfo } = this.props;
    const {
      localeStore: {
        locale: { REGISTER },
      },
    } = this.props;
    const { account, code, password, passwordConfirm, usertype } = this.state;
    if (!REG.EMAIL.test(account) && !REG.MOBILE.test(account)) {
      Toast.info(REGISTER.NUM_ERROR, 2);
      return;
    }
    if (!REG.PASSWORD.test(password)) {
      Toast.info(REGISTER.PASSWORD_LEAST, 2);
      return;
    }
    if (password !== passwordConfirm) {
      Toast.info(REGISTER.PASSWORD_NOSAME, 2);
      return;
    }
    this.setState({ isSubmit: false });

    UserApi.editPaypassword({
      open_id: userM4DStore.openid,
      phone: (usertype === "phone" && account) || "",
      email: (usertype === "email" && account) || "",
      usertype,
      code,
      password,
      passwordConfirm,
    })
      .then((res) => {
        this.setState({ isSubmit: true });
        if (res.status !== 1) {
          Toast.info(res.msg, 2);
          this.setState({ isSubmit: true, code: "" });
          return;
        }
        Toast.info("修改成功", 2, () => {
          history.push("/mineList");
        });
      })
      .catch(() => this.setState({ isSubmit: true }));
  };

  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { REGISTER,OTCPASSWORD },
      },
    } = this.props;
    const {
      account, //手机号或者邮箱
      code, //手机验证码
      password,
      passwordConfirm, //确认密码
      pwType,
      pwConfirmType,
      count,
      isGetSms,
      // showSuccess,
      // showBtn,
      isSubmit,
      canGetCode,
      usertype,
    } = this.state;

    return (
      <div id="otc-password">
        {/* <AccountLangHeader/> */}
        <AccountHeader />
        <div className="log_head">
          <h1>{OTCPASSWORD.MODIFY_PAY_PASSWORD}</h1>
        </div>

        <div className="out_box">
          <div className="main-content">
            <label>
              <div className="input-box">
                <img
                  className={"icon-img"}
                  src={(usertype === "phone" && telIcon) || emailIcon}
                />

                <input
                  className={"input-main"}
                  type="text"
                  value={account}
                  placeholder={"手机号"}
                  // disabled={true}
                  readOnly={true}
                  // onBlur={this.onAccountBlur}//失去焦点
                  // onChange={(e) => this.onInputChange(e, "account")}
                />
              </div>
            </label>

            <label>
              <div className="input-box">
                <img className={"icon-img"} src={yanzhengIcon} />

                <input
                  className="input-main"
                  type="text"
                  maxLength={6}
                  placeholder={
                    // (usertype === "phone" && "短信验证码") || "邮箱验证码"
                    OTCPASSWORD.PLEASE_YZM
                  }
                  value={code}
                  onChange={(e) => this.onInputChange(e, "code")}
                />
              </div>

              <span
                style={(!canGetCode && isGetSms && { opacity: ".5" }) || {}}
                className={`sms-code  ${!isGetSms ? `event-none` : ""}`}
                onClick={this.getCode}
              >
                {isGetSms ? OTCPASSWORD.HQ_YANZHENGMA : <span>{`${count}s`}</span>}
              </span>
            </label>

            {/* 密码 */}
            <label>
              <div className="input-box">
                <img className={"icon-img"} src={passwordIcon} />

                <input
                  className="input-main"
                  type={pwType}
                  value={password}
                  placeholder={REGISTER.PLEASE_PASSWORD}
                  onChange={(e) => this.onInputChange(e, "password")}
                />
              </div>

              <img
                className="eye-img"
                src={pwType === "text" ? openPwdImg : closePwdImg}
                alt="睁眼闭眼"
                onClick={() => this.onSetType(pwType, "pwType")}
              />
            </label>
            <label>
              <div className="input-box">
                <img className={"icon-img"} src={passwordIcon} />

                <input
                  className="input-main"
                  type={pwConfirmType}
                  value={passwordConfirm}
                  placeholder={REGISTER.PLEASE_PASSWORD2}
                  onChange={(e) => this.onInputChange(e, "passwordConfirm")}
                />
              </div>

              <img
                className="eye-img"
                src={pwConfirmType === "text" ? openPwdImg : closePwdImg}
                alt="睁眼闭眼"
                onClick={() => this.onSetType(pwConfirmType, "pwConfirmType")}
              />
            </label>
          </div>
          <div className="btn-box">
            <Button
              activeClassName="active"
              className="primary-button"
              disabled={!this.canSubmit() || !isSubmit}
              // onClick={() => { this.props.history.push('/LookKey') }}>
              onClick={this.onSubmit}
            >
              {OTCPASSWORD.OK}
            </Button>
          </div>
        </div>
      </div>
    );
  }
}

export default OTCPassword;
