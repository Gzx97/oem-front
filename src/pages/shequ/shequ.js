import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import QrCode from "qrcode.react";
import { UserApi } from "../../api";
import "./shequ.scss";
import { Button, Toast, Icon, Tabs } from "antd-mobile";
import NoData from "../../components/common/NoData";
import FuzhiImg from "../../assets/images/fuzhi.png";
import LEFTICON from "../../assets/images/arrow-left.png";
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
class Shequ extends Component {
  state = {
    copyValue: "", //复制文字
    page: 1,
    pageSize: 10,
    streamArr: [],
    shequInfo: {},
    hasMore: false,
    copyValue: "",
    userInfo: {},
    friend_zhezhao: false,
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
    UserApi.myTream({ open_id: userM4DStore.openid }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 2);
        return;
      }
      _this.setState({
        shequInfo: res.data,
        streamArr: res.data.teamUser,
      });
      console.log(res);
    });
    // this.recommendlist()
  }

  componentWillUnmount() {
    // window.onresize = null
  }
  getShequStatus(status) {
    const {
      localeStore: {
        locale: { SHEQU },
      },
    } = this.props;

    //状态，0
    switch (status) {
      case 0:
        return {
          label: SHEQU.WU,
        };
      case 1:
        return {
          label: SHEQU.VIP1,
        };
      case 2:
        return {
          label: SHEQU.VIP2,
        };
      case 3:
        return {
          label: SHEQU.VIP3,
        };
      default:
        return {
          label: SHEQU.WU,
        };
    }
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
    const {
      shequInfo,
      hasMore,
      streamArr,
      copyValue,
      friend_zhezhao,
      userInfo,
    } = this.state;
    return (
      <div id="MinerPower">
        <AccountHeader src={LEFTICON} />
        {/* 头部卡片 加浮动卡片 */}
        <div className="top_card">
          <div className="it_title">我的小宇宙</div>
          {/* <div
            onClick={() => {
              history.push("/Ruler");
            }}
            className="to_out"
          >
            {SHEQU.GZ}
          </div> */}
          <div className="card_float_out">
            <div className="card_float">
       
              <div className="card_down">
                <div className="line"></div>
                <div className="card_info">
                  <i>{formatWalletPriceSubZeroAndDot(shequInfo.weekResults)}</i>
                  <span>昨日星能</span>
                </div>
                <div className="card_info">
                  <i>{formatWalletPriceSubZeroAndDot(shequInfo.allResults)}</i>
                  <span>累计星能</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my_title">
          <div className="title_name">我的小宇宙</div>
          <span
            onClick={() => {
              if (1 === 1) {
                // if (userInfo.vip||userInfo.fixed >0) {
                history.push("/frindsCome");
              } else {
                Toast.info(SHEQU.QXGMJF);
              }
            }}
          >
            {SHEQU.YQHY}
          </span>
        </div>
        {/* 直推 */}
        <InfiniteScroll
          dataLength={streamArr.length} //This is important field to render the next data
          // next={this.recommendlist}
          // hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {streamArr.length <= 0 ? "" : ""}
            </p>
          }
        >
          {(streamArr.length !== 0 && (
            <ul className="water-card">
              {streamArr.map((item, index) => {
                return (
                  <li key={item.user_name}>
                    <div className="li_row">
                      <div className={"water_left"}>{item.user_name}</div>
                      <div className={"water_right"}>
                        {formatWalletPrice(item.all_results)}
                      </div>
                    </div>
                    <div className="li_row2">
                      <div className={"water_left"}>
                        {formatTime(item.add_time)}
                      </div>
                      <div className={"water_right"}>累计星能</div>
                    </div>
                  </li>
                );
              })}
            </ul>
          )) || <NoData msg={SHEQU.ZWSQ} />}
        </InfiniteScroll>

        {/* 邀请好友 */}
        {friend_zhezhao && (
          <div className="friends_box">
            <div
              onClick={() => {
                this.setState({ friend_zhezhao: false });
              }}
              className="black_box"
            ></div>
            <div className="friends_in">
              <div
                onClick={() => {
                  this.setState({ friend_zhezhao: false });
                }}
                className="hui_line"
              ></div>
              <h2>邀请好友</h2>
              <p>邀请好友注册易数量化机器人得推广返佣</p>
              <div className="saomiao">扫描以下二维码注册并下载APP</div>
              <div className="code_box">
                <div className="canvas_code">
                  <QrCode
                    // includeMargin={true}
                    level={"L"}
                    value={"https://www.baidu.com"}
                    size={168}
                    // fgColor="white"
                    // bgColor="rgba(0,0,0,0)"
                    id="qrCode"
                  />
                </div>
              </div>
              <div
                onClick={(event) => {
                  this.copyText(userInfo.recommendCode, event);
                }}
                className="yaoqingma"
              >
                邀请码：{userInfo.recommendCode}
                <img src={FuzhiImg} />
              </div>
              <div
                nClick={(event) => {
                  this.copyText("www.baidu.com", event);
                }}
                className="yaoqing_link"
              >
                复制邀请链接
              </div>
            </div>
          </div>
        )}

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

export default Shequ;
