import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import QrCode from "qrcode.react";
import { UserApi } from "../../api";
import "./Jifen.scss";
import { Button, Toast, Icon, Tabs } from "antd-mobile";
import NoData from "../../components/common/NoData";
import FuzhiImg from "../../assets/images/fuzhi.png";
import LEFTICON from "../../assets/images/arrow-left.png";
import JLICON from "../../assets/images/jilu.png";
// import QrCode from 'qrcode.react'
// import Slider from 'react-slick'
// import './Slider.scss'
import {
  formatWalletPrice,
  formatTime,
  formatWalletPriceSubZeroAndDot,
  subZeroAndDot, //去掉多余0
} from "../../utils/format";
// console.log(walletData)
@inject("userM4DStore")
// @inject('propertyM4DStore')
@inject("localeStore")
@observer
class Jifen extends Component {
  state = {
    copyValue: "", //复制文字
    jifenInfo: {},
  };
  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    // if (!userM4DStore.isOnline()) {
    //   Toast.info(WALLET.PLEASE_LOGIN, 2, () => history.push('/loginBefore'))
    //   return
    // }
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
      });
    });
    // return
    UserApi.myAssets({ open_id: userM4DStore.openid }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 2);
        return;
      }
      this.setState({
        jifenInfo: res.data,
      });
      console.log(res.data);
    });
    // this.recommendlist()
  }

  componentWillUnmount() {
    // window.onresize = null
  }

  copyText = (e, event) => {
    const {
      localeStore: {
        locale: { ORDER },
      },
    } = this.props;
    event.stopPropagation();
    this.setState(
      {
        copyValue: e,
      },
      () => {
        let Url2 = document.getElementById("textCopy");
        Url2.select(); // 选择对象
        // Url2.focus();
        // Url2.blur();
        document.execCommand("Copy"); // 执行浏览器复制命令
        if (document.execCommand("Copy")) {
          Toast.info(ORDER.FZCG, 1);
        } else {
          if (window.webkit) {
            // window.webkit.messageHandlers.CopyText.postMessage(e);
            window.webkit.messageHandlers.CopyText.postMessage(e);
            Toast.info(ORDER.FZCG, 1);
          } else {
            Toast.info(ORDER.FZSB, 1);
          }
        }
      }
    );
  };

  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { SHEQU },
      },
    } = this.props;
    const { copyValue, jifenInfo } = this.state;
    return (
      <div id="Jifen">
        <AccountHeader />
        {/* 头部卡片 加浮动卡片 */}
        <div className="top_card">
          <div className="it_title">收藏家任务</div>
          <div
            onClick={() => {
              history.push("/JifenRecord");
            }}
            className="to_out"
          >
            <img src={JLICON} />
          </div>
          <div className="card_float_out">
            <div className="card_float">
              <div className="card_down">
                <div className="line"></div>
                <div className="card_info">
                  <i>{formatWalletPriceSubZeroAndDot(jifenInfo.integral)}</i>
                  <span>我的星能余额</span>
                </div>
                <div className="card_info">
                  <i>{formatWalletPriceSubZeroAndDot(jifenInfo.integralAll)}</i>
                  <span>累计获得星能</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my_title">
          <div className="title_name">任务列表</div>
          <div className="sm">
            完成以下任务可获得对应星能，某些任务包含每日积累上限
          </div>
        </div>

        {/* 直推 */}

        <ul>
          <li>
            <h4>
              购买藏品
              <i>
                {jifenInfo.selfBuyAmount}/{jifenInfo.selfBuyMax}
              </i>
            </h4>
            <div className="li_info">
              <p>
                交易指定的活动藏品即可获得交易额至多
                {/* {formatWalletPrice(jifenInfo.selfBuyProportion * 100)} */}
                50%的星能奖励
              </p>
              <div
                onClick={() => {
                  // history.push("/trade");
                  if (jifenInfo.pName) {
                    history.push("/trade?key=" + encodeURI(jifenInfo.pName));
                  } else {
                    Toast.info("敬请期待");
                  }
                }}
                className="btn"
                style={(jifenInfo.pName && {}) || { opacity: "0.5" }}
              >
                立即参加
              </div>
            </div>
          </li>
          <li>
            <h4>
              好友购买藏品
              <i>
                {jifenInfo.friendBuyAmount}/{jifenInfo.friendBuyMax}
              </i>
            </h4>
            <div className="li_info">
              <p>
                邀请好友参加交易奖励活动即可获得好友至多
                {/* {formatWalletPrice(jifenInfo.friendBuyProportion * 100)} */}
                20%的星能奖励
              </p>
              <div
                onClick={() => {
                  history.push("/frindsCome");
                }}
                className="btn"
              >
                邀请好友
              </div>
            </div>
          </li>
          {/* <li>
            <h4>
              小宇宙运营
            </h4>
            <div className="li_info">
              <p>
                小宇宙单日购买指定藏品额度达到一定标准后可获得，具体标准咨询商务
              </p>
              <div
                onClick={() => {
                  history.push("/trade");
                }}
                className="btn"
              >
                购买藏品
              </div>
            </div>
            <span
              onClick={() => {
                history.push("/Shequ");
              }}
            >
              查看我的小宇宙
            </span>
          </li> */}
        </ul>

        {/* 复制 */}
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>
      </div>
    );
  }
}

export default Jifen;
