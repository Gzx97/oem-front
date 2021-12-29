import React, { Component } from "react";
import { Button, Toast, Icon } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi,CommodityApi } from "../../api";
import { isEmail, isMobile, isNickName } from "../../utils/reg";
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
import "./Duihuan.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from "react-router-dom";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Duihuan extends Component {
  state = {
    mhSDK: "",
    password: "",
    passwordConfirm: "",
    pwType: "password",
    pwConfirmType: "password",
    oldpwType: "password",
    isSubmit: true,
  };

  componentDidMount() {
    const { match } = this.props;
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  canSubmit = () => {
    const { mhSDK } = this.state;
    return !!mhSDK;
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
    const { mhSDK } = this.state;


    this.setState({ isSubmit: false });
    userM4DStore.getUserStatus();
    CommodityApi.redeem({
      open_id: userM4DStore.openid,
      redeem_code: mhSDK,
    })
      .then((res) => {
        this.setState({ isSubmit: true });
        if (res.status !== 1) {
          Toast.info(res.msg, 2);
          this.setState({ isSubmit: true });
          return;
        }
        Toast.info(res.msg, 2, () => {
          history.push("/MyBlindBox");
        });
      })
      .catch(() => this.setState({ isSubmit: true }));
  };

  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { REGISTER, PASSWORD },
      },
    } = this.props;
    const { isSubmit, mhSDK } = this.state;

    return (
      <div id="Duihuan">
        {/* <AccountLangHeader/> */}
        <AccountHeader />
        <div className="it_title">兑换码</div>

        <div className="out_box">
          <div className="main-content">
            <label>
              <div className={"text-input"}>请输入盲盒兑换码</div>
              {/* <div className={"text-input"}>请输入产品兑换码</div> */}
              <div className="input-box">
                <input
                  className="input-main"
                  type={"text"}
                  value={mhSDK}
                  placeholder={"请输入盲盒兑换码"}
                  onChange={(e) => this.onInputChange(e, "mhSDK")}
                />
              </div>
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
              立即兑换
            </Button>
          </div>
        </div>
        <p>
          兑换后在<a onClick={()=>{history.push('/MyBlindBox')}}>我的盲盒</a>中查看
        </p>
      </div>
    );
  }
}

export default Duihuan;
