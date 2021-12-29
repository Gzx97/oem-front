import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import { Button, Toast, Icon } from "antd-mobile";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { TOAST_DURATION } from "../../utils/constants";
import { isEmail, isMobile, isPassword } from "../../utils/reg";
import openPwdImg from "../../assets/images/open-pwd-shen.png";
import closePwdImg from "../../assets/images/close-pwd-shen.png";
import userIcon from "../../assets/images/imeta/login/user.png";
import passwordIcon from "../../assets/images/imeta/login/password.png";
import { OtherApi } from "../../api";

// import AccountLangHeader from "../../components/partial/AccountLangHeader";
import AccountHeader from "../../components/partial/AccountHeader";

import {
  getQueryString,

} from "../../utils/format";
import "./Login.scss";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Login extends Component {
  state = {
    keystore: "", //keystore
    account: "",
    password: "",
    // type: 'password',
    pwType: "password",
    isSubmit: true,
  };
  componentDidMount() {
    // OtherApi.appdownload()
    Cookies.remove("PHONE_NO");
    Cookies.remove("EMAIL");
    Cookies.remove("OPENID");
    Cookies.remove("PHONE_PREFIX");
    Cookies.remove("USERID");
    Cookies.remove("USER_NAME");
    Cookies.remove("FIRST_LOG");
    // Toast.info(Cookies.get('RID')||'没有rid')
    console.log(getQueryString('go'))
    
  }
  componentWillUnmount() {
    clearTimeout(this.timer);
  }

  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onSetType = (currentType) => {
    console.log(currentType);
    this.setState({ pwType: currentType === "text" ? "password" : "text" });
  };

  onSubmit = () => {
    const {
      history,
      userM4DStore,
      localeStore: {
        locale: { LOGIN },
      },
    } = this.props;
    const { account, password } = this.state;

    if (!isPassword(password)) {
      Toast.info(LOGIN.NUM_ERROR, TOAST_DURATION);
      return;
    }

    this.setState({ isSubmit: false });
    // this.setState({ isSubmit: true })

    // // 登录接口，成功后前往首页
    userM4DStore
      .login({
        // prefix: (Cookies.get('TEL_NUM') && Cookies.get('TEL_NUM') || '86'),
        // phonePrefix: isMobile(account) ? '86' : null,
        // email: isEmail(account) ? account : null,
        // phone: isMobile(account) ? account : null,
        user_name: account,
        password,
        rid: Cookies.get("RID") || "",
      })
      .then((res) => {
        this.setState({ isSubmit: true });
        if (res.status !== 1) {
          Toast.info(res.msg, TOAST_DURATION);
          return;
        }
        Toast.success(LOGIN.LOGIN_SUCCESS, TOAST_DURATION);
        // this.timer = setTimeout(() => history.push('/groupM4D'), TOAST_DURATION * 1000)
        this.timer = setTimeout(
          () =>{ 
            // history.push("/home")
            if(getQueryString('go')){
              history.goBack()
            }else{
              history.push("/home")
            }
          },
          TOAST_DURATION * 1000
        );
      })
      .catch(() => this.setState({ isSubmit: true }));
  };

  render() {
    const {
      history,
      localeStore: {
        locale: { LOGIN },
      },
    } = this.props;
    const {
      account,
      password,
      isSubmit,
      pwType,
    } = this.state;
    const unSubmit = account === "" || password === "" || !isSubmit;

    return (
      <div id="login">
        {/* <AccountHeader /> */}
        <div className="log_head">
          <h1>
           欢迎登录<span>OEM</span>
          </h1>
          <p>{LOGIN.LOGIN_TYPE}</p>
        </div> 

        {/* 输入账号密码 */}
        <div className="main-content">
          <label>
            <div className="input-box">
              <img className={"icon-img"} src={userIcon} />
              <input
                className="input-main"
                value={account}
                placeholder={LOGIN.PLEASE_INPUT}
                onChange={(e) => this.onInputChange(e, "account")}
              />
            </div>
          </label>

          <label>
            <div className="input-box">
              <img className={"icon-img"} src={passwordIcon} />
              <input
                // autoComplete="new-password"
                className="input-main"
                type={pwType}
                value={password}
                placeholder={LOGIN.PLEASE_PASSWORD}
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
        </div>
        <p
          onClick={() => {
            history.push("/passwordNew/find");
          }}
          className="forget"
        >
          {LOGIN.FORGET_PASSWORD}
        </p>
        {/* 按钮 */}
        <div className="btn-box">
          <Button
            // activeClassName="active"
            className="primary-button"
            disabled={unSubmit}
            onClick={this.onSubmit}
          >
            {LOGIN.LOGIN_NOW}
          </Button>
        </div>

        <div className="to_reg">
          {LOGIN.NO_ACCOUNT}{" "}
          <span
            onClick={() => {
              history.push("/register");
            }}
          >
            {LOGIN.REG_NOW}
          </span>
        </div>

        <div className="xieyi">
         {LOGIN.AGREE_XY}
          <span
            onClick={() => {
              history.push("/Agreement");
            }}
          >
            {LOGIN.AGREE_XY2}
          </span>
        </div>
      </div>
    );
  }
}

export default Login;
