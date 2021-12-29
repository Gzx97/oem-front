import React, { Component } from "react";
import { Button, Toast, Icon } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi } from "../../api";
import { REG, TOAST_DURATION, COUNT_DOWN } from "../../utils/constants";
import { isEmail, isMobile, isNickName } from "../../utils/reg";
import { isIosOrAndroid,isWeixn } from "../../utils/common";
// import CaptchaM4D from '../../components/common/CaptchaM4D'
import openPwdImg from "../../assets/images/open-pwd-shen.png";
import closePwdImg from "../../assets/images/close-pwd-shen.png";
import userIcon from "../../assets/images/imeta/login/user.png";
import yanzhengIcon from "../../assets/images/imeta/login/yanzheng.png";
import telIcon from "../../assets/images/imeta/login/tel.png";
import passwordIcon from "../../assets/images/imeta/login/password.png";
import yaoqingIcon from "../../assets/images/imeta/login/yaoqing.png";
import emailIcon from "../../assets/images/imeta/login/email.png";
import { OtherApi } from "../../api";
import AccountLangHeader from "../../components/partial/AccountLangHeader";

import "./Register.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from "react-router-dom";
@inject("userM4DStore")
@inject("localeStore")
@observer
class RegisterDownload extends Component {
  state = {
    regtype: "phone",
    account_token: "",
    nickname: "", //昵称
    preAccount: "",
    account: "",
    code: "",
    imgCode: "", //给个默认值
    password: "",
    passwordConfirm: "",
    recommendCode: window.location.search.split("=")[1] || "",
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
    // tel_num: '',//国家号
    canGetCode: true, //获取验证码防止重复
    Zhongduan: "",
    urlAndroid: "",
    urlIos: "",
  };

  componentDidMount() {
    // const recommendCode = getQueryParam('recommendCode') || ''
    const { match } = this.props;
    OtherApi.appdownload().then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      this.setState({
        urlAndroid: res.data.urlAndroid,
        urlIos: res.data.urlIos,
      });
    });
    // this.getCaptchaPng()
    console.log(window.location.search.split("=")[1]);
    console.log(isIosOrAndroid());
    let zd = isIosOrAndroid();

    this.setState({
      Zhongduan: zd, //安卓1 ios2
    });
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
    const {
      account,
      code,
      password,
      passwordConfirm,
      nickname,
      recommendCode,
    } = this.state;
    return !!(account && code && password && nickname && recommendCode);
  };

  onInputChange = (e, key) => {
    const { value } = e.target;
    // console.log(ke注册时候取消确认密码功能y)
    //
    // if (key === 'password') {
    //   // console.log(key)
    //   this.setState({
    //     passwordConfirm: value
    //   })
    // }

    this.setState({ [key]: value });
  };

  onAccountBlur = (e) => {
    let _this = this;
    const { value } = e.target;
    const { canGetCode, preAccount, account, regtype } = this.state;
    const {
      localeStore: {
        locale: { REGISTER },
      },
    } = this.props;
    if (value !== preAccount) {
      this.setState({ preAccount: value });
      // this.getCaptchaPng()
    }

    if (regtype === "phone") {
      if (!isMobile(account)) {
        Toast.info("请输入正确的手机号", 1);
        _this.setState({ canGetCode: true });
        return;
      }
    }
    if (regtype === "email") {
      if (!isEmail(account)) {
        Toast.info("请输入正确的邮箱", 1);
        _this.setState({ canGetCode: true });
        return;
      }
    }
  };
  onNickBlur = (e) => {
    //昵称验证
    const {
      localeStore: {
        locale: { REGISTER },
      },
    } = this.props;

    let _this = this;
    const { value } = e.target;
    if (!isNickName(value)) {
      this.setState(
        {
          nickname: "",
        },
        () => {
          Toast.info('昵称不合规', 2);
        }
      );
      return;
    }
    // UserApi.usernameexist({ user_name: value }).then(res => {
    //   if (res.status !== 1) {
    //     Toast.info(res.msg, 2)
    //     _this.setState({
    //       nickname: ''
    //     })
    //   }

    // })
  };
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
    const { canGetCode, account, captcha, imgCode, regtype } = this.state;
    await _this.setState({ canGetCode: false });
    if (!canGetCode) {
      // console.log('正在获取')
      return;
    }
    if (regtype === "phone") {
      if (!isMobile(account)) {
        Toast.info(REGISTER.PLEASE_RIGHT_PHONE, 1)
        _this.setState({ canGetCode: true });
        return;
      }
    }
    if (regtype === "email") {
      if (!isEmail(account)) {
        Toast.info(REGISTER.PLEASE_RIGHT_EMAIL, 1)
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
        type: "reg",
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
    const { userM4DStore, history } = this.props;
    const {
      localeStore: {
        locale: { REGISTER },
      },
    } = this.props;
    const {
      account,
      code,
      password,
      passwordConfirm,
      nickname,
      recommendCode,
      regtype,
    } = this.state;
    if (!REG.PASSWORD.test(password)) {
      Toast.info(REGISTER.PASSWORD_LEAST, 2);
      return;
    }

    this.setState({ isSubmit: false });
    userM4DStore
      .register({
        // type: isMobile(account) ? 'phone' : 'email',
        usertype: regtype,
        email: isEmail(account) ? account : null,
        phone: isMobile(account) ? account : null,
        // phone_prefix: isMobile(account) ? tel_num : null,
        code,
        password,
        // passwordConfirm,
        recommend_code: recommendCode,
        user_name: nickname,
      })
      .then((res) => {
        this.setState({ isSubmit: true });
        if (res.status !== 1) {
          Toast.info(res.msg, 2);
          this.setState({ isSubmit: true, code: "", captcha: "" });
          // this.getCaptchaPng()
          return;
        }
        Toast.info(REGISTER.REGISTER_SUCESS, 2, () => {
          history.push("/Download");
        });
      })
      .catch(() => this.setState({ isSubmit: true }));
  };
  checkReg = (regtype) => {
    this.setState({
      regtype,
    });
  };

  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { REGISTER },
      },
    } = this.props;
    const {
      nickname,
      account, //手机号或者邮箱
      code, //手机验证码
      password,
      recommendCode, //邀请码
      pwType,
      count,
      isGetSms,
      isSubmit,
      canGetCode,
      regtype,
      Zhongduan,
      urlAndroid,
      urlIos,
    } = this.state;

    return (
      <div id="register">
        {/* <AccountLangHeader/> */}
        {/* <AccountLangHeader haveimg={true}/> */}
        {/* <AccountHeader onHandle={() => history.push('/login')} /> */}
        <div className="log_head">
        <h1>{REGISTER.ZCXZH}</h1>
          <p>{REGISTER.HYZC}</p>
        </div>

        <div className="reg_type_box">
          <span
            onClick={() => {
              this.checkReg("phone");
            }}
            className={(regtype === "phone" && "active") || "no_active"}
          >
            {REGISTER.PHONE_REGISTER}
          </span>
          <span
            onClick={() => {
              this.checkReg("email");
            }}
            className={(regtype === "phone" && "no_active") || "active"}
          >
            {REGISTER.EMAIL_REGISTER}
          </span>
        </div>
        <div className="out_box">
          <div className="main-content">
            <label>
              <div className="input-box">
                <img className={"icon-img"} src={userIcon} />

                <input
                  className={"input-main"}
                  type="text"
                  value={nickname}
                  placeholder={REGISTER.YHM}
                  onBlur={(e) => this.onNickBlur(e)} //失去焦点刷新验证码
                  onChange={(e) => this.onInputChange(e, "nickname")}
                />
              </div>
            </label>

            <label>
              <div className="input-box">
                <img
                  className={"icon-img"}
                  src={(regtype === "phone" && telIcon) || emailIcon}
                />

                <input
                  className={"input-main"}
                  type="text"
                  value={account}
                  placeholder={regtype === 'phone' && REGISTER.PHONE_NUM || REGISTER.EMAIL_NUM}
                  onBlur={this.onAccountBlur} //失去焦点
                  onChange={(e) => this.onInputChange(e, "account")}
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
                  // placeholder={
                  //   (regtype === "phone" && "短信验证码") || "邮箱验证码"
                  // }
                  placeholder={REGISTER.YANZHENGMA}
                  value={code}
                  onChange={(e) => this.onInputChange(e, "code")}
                />
              </div>

              <span
                style={(!canGetCode && isGetSms && { opacity: ".5" }) || {}}
                className={`sms-code  ${!isGetSms ? `event-none` : ""}`}
                onClick={this.getCode}
              >
                {isGetSms ? REGISTER.HQ_YANZHENGMA : <span>{`${count}s`}</span>}
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
            {/* 邀请码 */}
            <label>
              <div className="input-box">
                <img className={"icon-img"} src={yaoqingIcon} />

                <input
                  className="input-main"
                  type="text"
                  value={recommendCode}
                  // disabled={true}
                  placeholder={REGISTER.YQM}
                  onChange={(e) => this.onInputChange(e, "recommendCode")}
                />
              </div>
            </label>
            {/* <label>
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
              </label> */}
          </div>
          {/* <p style={{ fontWeight: "400" }}>
            支付密码默认与登录密码一致，可在安全中心中修改
          </p> */}

          <div className="btn-box">
            <Button
              activeClassName="active"
              className="primary-button"
              disabled={!this.canSubmit() || !isSubmit}
              // onClick={() => { this.props.history.push('/LookKey') }}>
              onClick={this.onSubmit}
            >
              {REGISTER.NOW_REGISTER}
            </Button>
          </div>
          <div className="to_log">
          {REGISTER.HAD_ZHANGHAO}{" "}
            <span
              onClick={() => {
                // Toast.info('暂无下载地址')
                if(isWeixn()){
                  Toast.info('请复制链接到浏览器下载app')
                  return
                }
                if (Zhongduan === 1) {
                  window.open(urlAndroid);
                }
                if (Zhongduan === 2) {
                  window.open(urlIos);
                }
              }}
            >
              {REGISTER.LJXZ}
            </span>
          </div>
        </div>
      </div>
    );
  }
}

export default RegisterDownload;
