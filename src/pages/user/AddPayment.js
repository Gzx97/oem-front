import React, { Component } from "react";
import { Icon, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi } from "../../api";
import "./AddPayment.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import WXICON from "../../assets/images/weixin.png";
import ZFBICON from "../../assets/images/zhifubao.png";
import YHKICON from "../../assets/images/yinhangqia.png";

@inject("userM4DStore")
@inject("localeStore")
@observer
class AddPayment extends Component {
  state = {
    page: 1,
    pageSize: 10,
    hasMore: false,
  };

  componentDidMount() {
    let _this = this;

    const { userM4DStore, history } = this.props;
    userM4DStore.getUserStatus();
    this.setState({
      [""]: "213",
    });
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  render() {
    const { history } = this.props;

    return (
      <div id="AddPayment">
        <AccountHeader />
        <div className="it_title">收款方式</div>
        <ul>
          <li
            onClick={() => {
              history.push("/AddShoukuan?type=" + encodeURI("微信"));
            }}
          >
            <img src={WXICON} />
            <h3>微信</h3>
            <Icon color="white" className="right_icon" type={"right"} />
          </li>
          <li
            onClick={() => {
              history.push("/AddShoukuan?type=" + encodeURI("支付宝"));
            }}
          >
            <img src={ZFBICON} />
            <h3>支付宝</h3>
            <Icon color="white" className="right_icon" type={"right"} />
          </li>
          <li
            onClick={() => {
              history.push("/AddShoukuan?type=" + encodeURI("银行卡"));
            }}
          >
            <img src={YHKICON} />
            <h3>银行卡</h3>
            <Icon color="white" className="right_icon" type={"right"} />
          </li>
        </ul>
      </div>
    );
  }
}

export default AddPayment;
