import React, { Component } from "react";
import { Button, Icon, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
import "./Payment.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import Bianji from "../../assets/images/bianji.png";
import Erweima from "../../assets/images/erweima.png";
import NoData from "../../components/common/NoData";

import {
  formatCoinPrice,
  formatWalletPrice,
  formatTime,
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Payment extends Component {
  state = {
    bankList: [],
    page: 1,
    pageSize: 10,
    hasMore: false,
  };

  componentDidMount() {
    let _this = this;

    const { userM4DStore, history } = this.props;

    userM4DStore.getUserStatus();
    this.getBankList();
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  // 获取支付方式列表
  getBankList = async () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.getBankList({
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      _this.setState({
        bankList: res.data,
      });
    });
  };
  // 删除支付方式
  delBank = (id) => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.delBank({
      open_id: userM4DStore.openid,
      id,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
    });
  };
  getPayColor = (type) => {
    //状态，
    switch (type) {
      case "微信":
        return {
          label: "微信",
          color: "#6DD400",
        };
      case "支付宝":
        return {
          label: "支付宝",
          color: "#0091FF",
        };
      case "银行卡":
        return {
          label: "银行卡",
          color: "#F7B500",
        };
      default:
        return {
          label: "支付方式",
          color: "#F7B500",
        };
    }
  };
  render() {
    const { history } = this.props;
    const { bankList } = this.state;

    return (
      <div id="Payment">
        <AccountHeader />
        <div className="it_title">收款方式</div>
        {(bankList.length > 0 && (
          <ul>
            {bankList.map((item, index) => {
              return (
                <li key={item.id}>
                  <div className="sk_title">
                    <h3>
                      <i
                        style={{
                          backgroundColor: this.getPayColor(item.bankType)
                            .color,
                        }}
                      ></i>
                      <img
                        onClick={() => {
                          history.push(
                            "/AddShoukuan?type=" +
                              encodeURI(item.bankType) +
                              "&id=" +
                              item.id +
                              "&bank_number=" +
                              encodeURI(item.bankNumber) +
                              "&bank_user=" +
                              encodeURI(item.bankUser) +
                              "&code_img=" +
                              encodeURI(item.codeImg) +
                              "&bank_name=" +
                              encodeURI(item.bankName)
                          );
                        }}
                        src={Bianji}
                      />
                      {item.bankType}
                    </h3>
                    <div className="u_name">{item.bankUser}</div>
                    <div className="u_num">{item.bankNumber}</div>
                    {item.bankName && (
                      <div className="u_code">{item.bankName}</div>
                    )}

                    {item.codeImg && (
                      <div className="u_code">
                        <img src={Erweima} />
                      </div>
                    )}
                  </div>
                </li>
              );
            })}

            {/* <li>
            <div className="sk_title">
              <h3>
                <i style={{ backgroundColor: "#0091FF" }}></i>
                <img src={Bianji} />
                支付宝
              </h3>
              <div className="u_name">陈冠希</div>
              <div className="u_num">15242821635</div>
              <div className="u_code">
                <img src={Erweima} />
              </div>
            </div>
          </li>
          <li>
            <div className="sk_title">
              <h3>
                <i style={{ backgroundColor: "#F7B500" }}></i>
                <img src={Bianji} />
                银行卡
              </h3>
              <div className="u_name">陈冠希</div>
              <div className="u_num">55846441414654646456</div>
              <div className="u_code">中国工商银行</div>
            </div>
          </li> */}
          </ul>
        )) || <NoData msg={"暂无收款方式"} />}

        <div className="btn-box">
          <Button
            activeClassName="active"
            className="primary-button"
            onClick={() => {
              this.props.history.push("/AddPayment");
            }}
          >
            添加收款方式
          </Button>
        </div>
      </div>
    );
  }
}

export default Payment;
