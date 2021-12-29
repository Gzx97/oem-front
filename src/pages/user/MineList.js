import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { TOAST_DURATION } from "../../utils/constants";
import "./MineList.scss";
// import vipIconFC from '../../assets/images/FENGYUNcao/user/vip.png'
// import vipActiveIconFC from '../../assets/images/FENGYUNcao/user/vip-active.png'
import safetyIcon from "../../assets/images/imeta/user/safety.png";
import vipedIcon from "../../assets/images/imeta/user/viped-icon.png";
import inviteIcon from "../../assets/images/imeta/user/invite-icon.png";
import noticeIcon from "../../assets/images/imeta/user/notice-icon.png";
import serviceIcon from "../../assets/images/imeta/user/service-icon.png";
import exitIcon from "../../assets/images/imeta/user/exit-icon.png";
import groupIcon from "../../assets/images/imeta/user/group_icon.png";
import logoIcon from "../../assets/images/imeta/user/logo.png";
import renwuIcon from "../../assets/images/imeta/user/renwu-icon.png";
import langIcon from "../../assets/images/imeta/user/lang-icon.png";
import heziIcon from "../../assets/images/imeta/user/wodehezi.png";
import fukuanIcon from "../../assets/images/imeta/user/fukuan-icon.png";
import kaquanIcon from "../../assets/images/imeta/user/kaquan-icon.png";

import AccountHeader from "../../components/partial/AccountHeader";

import { Icon, Modal, Toast } from "antd-mobile";
import { cryptoAccountDisplay } from "../../utils/format";
import { icons } from "react-icons";
const alert = Modal.alert;
// const myInfo = JSON.parse(localStorage.getItem("myInfo"));
// import QrCode from 'qrcode.react'
@inject("userM4DStore")
@inject("localeStore")
@observer
class MineList extends Component {
  state = {
    myInfo: {},
    isVip: false,
    // email: (myInfo && myInfo.email) || "",
    // phone_no: (myInfo && myInfo.phoneNo) || "",
    email: "",
    phone_no: "",
    faq_re: false, //是否有回復
    rewardSUM: "",
    tankuang: false, //弹框
    langTankuang: false, //切换语言
    nowlang: "", //现在的语言
    // recommendCode: (myInfo && myInfo.recommendCode) || "*******",
    recommendCode: "*******",
    cer: 0, //身份认证
  };

  componentDidMount() {
    // console.log('didmount')
    let _this = this;
    const { history, userM4DStore } = this.props;
    // const { localeStore: { locale: { MINELIST } } } = this.props;
    const {
      localeStore: { languages },
    } = this.props;
    languages.map((language) => {
      if (this.props.localeStore.lang === language.value) {
        _this.setState({
          nowlang: language.label,
        });
      }
    });
    // const { USER_CENTER } = locale;
    // if (!userM4DStore.isOnline()) {
    //   Toast.info('請先登錄', 2, () => history.push('/login'));
    //   return
    // }
    // console.log('didmount')
    userM4DStore.getUserStatus();
    // console.log(userM4DStore)
    // 获取个人信息
    userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then((res) => {
      // console.log(res)
      if (res.status !== 1) {
        Toast.info(res.msg, TOAST_DURATION);
        return;
      }
      localStorage.setItem("myInfo", JSON.stringify(res.data));

      _this.setState({
        myInfo: res.data,
        phone_no: res.data.phone, //手機號
        email: res.data.email, //
        rewardSUM: Number(res.data.rewardSUM), //使用
        faq_re: res.data.faqRe,
        recommendCode: res.data.recommendCode, //邀请码
        cer: res.data.cer,
      });
    });
  }

  logout = () => {
    const {
      localeStore: {
        locale: { MINELIST, ORDER, POOL },
      },
    } = this.props;
    // const { USER_CENTER } = locale;
    const { history, userM4DStore } = this.props;
    // console.log('tuichu')
    // 调取退出登录接口
    Modal.alert("确定退出", "", [
      {
        text: "取消",
        style: "default",
      },
      {
        text: "确定",
        style: "default",
        onPress: () => {
          userM4DStore
            .logout({
              open_id: userM4DStore.openid,
              rid: Cookies.get("RID") || "",
            })
            .then((res) => {
              history.push("/login");
              return;
            });
        },
      },
    ]);
  };

  // 认证状态
  // 认证状态
  getRzLable = (status) => {
    //状态，
    switch (status) {
      case 0:
        return {
          label: "未认证",
          className: "drz",
        };
      case 1:
        return {
          label: "审核中",
          className: "shz",
        };
      case 2:
        return {
          label: "已认证",
          className: "yrz",
        };
      case 3:
        return {
          label: "未通过",
          className: "rzsb",
        };
      default:
        return {
          label: "",
          className: "",
        };
    }
  };
  render() {
    const { userM4DStore } = this.props;
    const {
      localeStore: {
        locale: { MINELIST, ADDEMAIL },
      },
    } = this.props;
    const {
      email,
      phone_no,
      nowlang,
      langTankuang,
      faq_re,
      recommendCode,
      myInfo,
      cer,
    } = this.state;
    return (
      <div id="mine-list">
        {/* <AccountHeader /> */}
        <div className="my-info">
          <div className="name">
            <h1>我的</h1>
          </div>

          <div className="mine_top">
            <div className="vip_active">
              <img src={logoIcon} alt="" />
            </div>
            <div className="num">
              <h2>
                {/* {cryptoAccountDisplay((phone_no && phone_no) || email)} */}
                {myInfo.userName || "**"}
              </h2>
              {/* {cer != 2 && <p>{ADDEMAIL.XWCSMRZ}</p>} */}
              <small
                onClick={() => {
                  if (cer == 0 || cer == 3) {
                    this.props.history.push("/Renzheng");
                  } else {
                    Toast.info("不支持修改认证信息");
                  }
                }}
              >
                <span className={this.getRzLable(cer).className}>
                  {this.getRzLable(cer).label}
                </span>
                {(cer == 0 || cer == 3) && (
                  <Icon color={"white"} size={"sm"} type={"right"} />
                )}
              </small>
            </div>
            <div className="yaoqingma">
              用户ID： {(myInfo && myInfo.id) || "XX"}
            </div>
          </div>
        </div>
        <div className="card_box">
          <div
            onClick={() => {
              this.props.history.push("/Jifen");
            }}
            className="jf_card"
          >
            <h3>收藏家任务</h3>
            <p>完成任务获得奖励</p>
            <div className="i_right">
              <Icon color="#000000" type="right" />
            </div>
          </div>
          <div
            onClick={() => {
              // this.props.history.push("/Jifen");
              this.props.history.push("/CollectionJifenDetail?id=520");
            }}
            className="jf_card"
          >
            <h3>福利中心</h3>
            <p>兑换特殊藏品或权益</p>
            <div className="i_right">
              <Icon color="#000000" type="right" />
            </div>
          </div>
        </div>

        <ul>
          <li>
            <h3> 我的账户 </h3>
            <div
              onClick={() => {
                // Toast.info('暂不可查看')
                this.props.history.push("/record");
              }}
              className="user_icon"
            >
              <img src={vipedIcon} alt="" />
              <p>购买记录 </p>
            </div>
            <div
              //  onClick={() => { this.props.history.push('/safety') }}
              onClick={() => {
                this.props.history.push("/Safety");
              }}
              className="user_icon"
            >
              <img src={safetyIcon} alt="" />
              <p>安全中心</p>
            </div>
            <div
              //  onClick={() => { this.props.history.push('/safety') }}
              onClick={() => {
                this.props.history.push("/Duihuan");
              }}
              className="user_icon"
            >
              <img src={renwuIcon} alt="" />
              <p>兑换中心</p>
            </div>
            <div
              onClick={() => {
                // Toast.info('敬请期待！')
                this.props.history.push({
                  pathname: "/Payment",
                });
              }}
              className="user_icon"
            >
              <img src={fukuanIcon} alt="" />
              <p>收款方式</p>
            </div>
          </li>
          <li style={{ marginTop: "0rem" }}>
            <div
              onClick={() => {
                // Toast.info('敬请期待！')
                this.props.history.push({
                  // pathname: "/ChooseCollection",
                  pathname: "/shequ",
                  // state: { open_id: userM4DStore.openid, no: "" },
                });
              }}
              className="user_icon"
            >
              <img src={groupIcon} alt="" />
              <p>小宇宙</p>
            </div>
            <div
              onClick={() => {
                this.props.history.push("/frindsCome");
              }}
              className="user_icon"
            >
              <img src={inviteIcon} alt="" />
              <p>邀请好友</p>
            </div>
            <div
              onClick={() => {
                this.props.history.push("/MyBlindBox");
              }}
              className="user_icon"
            >
              <img
                style={{ transform: "scale(75%, 75%)" }}
                src={heziIcon}
                alt=""
              />
              <p>我的盲盒</p>
              {/* <p>我的产品</p> */}
            </div>
            <div
              onClick={() => {
                this.props.history.push("/Coupons");
              }}
              className="user_icon"
            >
              <img
                src={kaquanIcon}
                alt=""
              />
              <p>我的卡券</p>
            </div>
          </li>

          <li>
            <h3>系统服务 </h3>
            <div
              onClick={() => {
                this.props.history.push("/CustomerServiceHistory");
              }}
              className="user_icon"
            >
              <img src={serviceIcon} alt="" />
              {faq_re >= 1 && <i className="red_point"></i>}
              <p>联系客服</p>
            </div>
            <div
              onClick={() => {
                this.props.history.push("/notice");
              }}
              className="user_icon"
            >
              <img src={noticeIcon} alt="" />
              <p>系统公告</p>
            </div>
            <div
              onClick={() => {
                this.logout();
              }}
              className="user_icon"
            >
              <img src={exitIcon} alt="" />
              <p>退出登录</p>
            </div>
          </li>
        </ul>
        <div style={{ display: "none" }} className="bqsm">
          Copyright@2021 <br></br>
          野莓信息技术有限公司 版权所有
        </div>
      </div>
    );
  }
}

export default MineList;
