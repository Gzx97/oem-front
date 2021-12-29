import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";
import Swiper from "swiper";
import AccountHeader from "../../components/partial/AccountHeader";
import ShareIcon from "../../assets/images/fenxiang.png";
import pingpp from "pingpp-js";
import wxIcon from "../../assets/images/weixin.png";
import zfbIcon from "../../assets/images/zhifubao.png";
import "./swiper.scss";
import "./CollectionDetail.scss";
// import Circle from 'sanyuelanv-circle'
import { Button, Toast, Tabs, Modal, Icon } from "antd-mobile";
import { CommodityApi, OtherApi } from "../../api";
import $ from "jquery";
import {
  formatZeroNumber,
  formatWalletPrice,
  getQueryString,
  // iosTrouchFn,
  formatTime,
  formatWalletPriceSubZeroAndDot,
  subZeroAndDot, //去掉多余0
} from "../../utils/format";
import "./swiper.scss";
// console.log(walletData)
let myDetailSwiper = {};
@inject("userM4DStore")
// @inject('propertyM4DStore')
@inject("localeStore")
@observer
class CollectionJifenDetail extends Component {
  state = {
    copyValue: "", //复制文字
    bannerList: [],
    cpData: {},
    showBigImg: false,
    bigSrc: "",

    payType: "wx", //支付方式
    isSubmit: true,
    modal: false,
    nodata: true,
  };
  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    const {
      localeStore: {
        locale: { WALLET, ADD },
        lang,
      },
      localeStore,
    } = this.props;

    userM4DStore.getUserStatus();
    // console.log(getQueryString("id"));
    this.integralCommodityview();
  }
  componentWillUnmount() {
    window.onresize = null;
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
  // 商品详细信息
  integralCommodityview = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.integralCommodityview({
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      console.log(!!res.data);
      if (res.msg !== "暂时没有商品") {
        console.log("有数据");
        this.setState({
          cpData: res.data,
          bannerList: res.data.imglist,
          nodata: false,
        });
      } else {
        console.log("没有数据");

        this.setState({
          nodata: true,
        });
      }
    });
  };
  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透
    this.setState({
      [key]: true,
    });
  };

  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };
  // 选择支付方式
  changePayType = (payType) => {
    this.setState({
      payType,
    });
  };
  // 支付
  pingppH5 = (orderId) => {
    let _this = this;
    const { payType } = this.state;
    this.setState({ isSubmit: false });
    let channel = "";
    if (payType === "zfb") {
      channel = "alipay_wap";
    }
    if (payType === "wx") {
      channel = "wx_wap";
    }
    // const { userM4DStore, history } = this.props;
    CommodityApi.pingpp({
      order_id: orderId,
      channel,
    }).then((res) => {
      this.setState({ isSubmit: true });

      if (res.status !== 1) {
        Toast.info(res.msg, 2, () => {
          _this.setState({
            modal: false,
          });
        });
        return;
      }
      console.log(res.data);
      let object = res.data;
      // return;
      pingpp.createPayment(object, function (result, err) {
        // object 需是 Charge/Order/Recharge 的 JSON 字符串
        // 可按需使用 alert 方法弹出 log
        //console.log(JSON.stringify(object));
        console.log("result:" + result);
        console.log("err.msg:" + err.msg);
        console.log("err.extra:" + err.extra);
        if (result == "success") {
          // 只有微信JSAPI (wx_pub)、微信小程序（wx_lite）、QQ 公众号 (qpay_pub)、支付宝小程序（alipay_lite）支付成功的结果会在这里返回，其他的支付结果都会跳转到 extra 中对应的 URL
        } else if (result == "fail") {
          // Ping++ 对象 object 不正确或者微信JSAPI/微信小程序/QQ公众号支付失败时会在此处返回
        } else if (result == "cancel") {
          // 微信JSAPI、微信小程序、QQ 公众号、支付宝小程序支付取消支付
        }
      });
      // window.location.href = `http://47.52.21.155:8200/api/commodity/chinapaysubmit?order_id=${res.data.orderId}`;
    });
  };
  // 买盲盒
  buyIntegralCommodity = () => {
    let _this = this;
    const { cpData } = this.state;
    this.setState({ isSubmit: false });
    const { userM4DStore, history } = this.props;
    CommodityApi.buyIntegralCommodity({
      open_id: userM4DStore.openid,
      box_id: cpData.boxId,
    }).then((res) => {
      if (res.status !== 1) {
        this.setState({ isSubmit: true });

        Toast.info(res.msg, 2, () => {
          _this.setState({
            modal: false,
          });
        });
        return;
      }
      // console.log(1)
      _this.pingppH5(res.data.orderId);

      // if (cpData.priceR > 0) {
      //   _this.pingppH5(res.data.orderId);
      // }else{
      //   console.log(2)
      //   history.push('/collection')
      // }
    });
  };
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { WALLET },
        lang,
      },
    } = this.props;
    const {
      copyValue,
      cpData,
      bannerList,
      showBigImg,
      bigSrc,
      payType,
      isSubmit,
      modal,
      nodata,
    } = this.state;
    return (
      <div id="CollectionDetail">
        <AccountHeader />

        <div className="it_title">活动兑换</div>
        <div className="goto-jilu">{/* <img src={ShareIcon} /> */}</div>

        {(nodata && <NoData msg={"暂无活动"} />) || (
          <div className="have_data">
            {/* 顶部轮播 */}
            <div className="top_box">
              {/* 轮播banner */}
              <div className="home_banner">
                <div className="swiper-container-card">
                  <div className="swiper-wrapper">
                    {bannerList.map((item, index) => {
                      return (
                        <div key={index.toString()} className="swiper-slide">
                          <img
                            onClick={() => {
                              this.setState({
                                bigSrc: item.url,
                                showBigImg: true,
                              });
                            }}
                            src={item.url}
                          />
                        </div>
                      );
                    })}
                  </div>
                  <div className="swiper-pagination"></div>
                </div>
              </div>
            </div>

            <h2>{cpData.pName}</h2>
            <h2>
              {cpData.priceIntegral} 积分
              {cpData.priceR > 0 && <i>加￥{cpData.price}</i>}
            </h2>
            {/* 藏品信息 */}
            <div className="cp_info_box">
              {/* <div className="cp_info">
        <span>授权方</span>
        <span>{cpData.issuer}</span>
      </div> */}
              {/* <div className="cp_info">
        <span>总发行</span>
        <span>{cpData.fCount}张</span>
      </div>
      <div className="cp_info">
        <span>盲盒中剩余</span>
        <span>{cpData.boxLast}张</span>
      </div>
      <div className="cp_info">
        <span>稀有程度</span>
        <span>{formatZeroNumber(cpData.xiyou)}%</span>
      </div> */}
              <div className="cp_info">
                <span>剩余可兑换数</span>
                <span>{cpData.boxLast}张</span>
              </div>
            </div>
            {/* 藏品说明 */}
            <div className="cp_detail_box">
              <h3>产品说明</h3>

              <p
                dangerouslySetInnerHTML={{
                  __html: cpData.introduce,
                }}
              ></p>
              <h3>活动说明</h3>
              <p
                dangerouslySetInnerHTML={{
                  __html: cpData.remarks,
                }}
              ></p>
            </div>
            {/* 底部 */}
            <footer>
              {/* <span>{(cpData.shoucang === 0 && "未收藏") || "已收藏"}</span> */}
              <span
                className="jifen_foot"
                onClick={() => {
                  // Toast.info('敬请期待')
                  // history.push("/trade?key=" + encodeURI(cpData.pName) );
                }}
              >
                {cpData.priceIntegral} <i>积分</i>
              </span>
              <span
                onClick={() => {
                  // history.push("/BuyBlindBox?id=" + cpData.boxId);
                  if (cpData.priceR > 0) {
                    this.setState({ modal: true });
                  } else {
                    this.buyIntegralCommodity();
                  }
                }}
              >
                立即兑换
              </span>
            </footer>
          </div>
        )}

        {/* 购买弹框 */}
        <Modal
          popup
          visible={modal}
          onClose={this.onClose("modal")}
          animationType="slide-up"
          // afterClose={() => {
          //   // alert("afterClose");
          // }}
        >
          <div className="myModal">
            <h1>￥{cpData.price}</h1>

            <ul className="zffs">
              <li
                onClick={() => {
                  this.changePayType("wx");
                }}
                // className={(payType === "wx" && "active") || ""}
              >
                <span>
                  <img src={wxIcon} />
                  微信支付
                </span>

                {payType === "wx" && <Icon color={"#E32A2A"} type="check" />}
              </li>
              <li
                onClick={() => {
                  this.changePayType("zfb");
                }}
                // className={(payType === "zfb" && "active") || ""}
              >
                <span>
                  <img src={zfbIcon} />
                  支付宝支付
                </span>
                {payType === "zfb" && <Icon color={"#E32A2A"} type="check" />}
              </li>
            </ul>
            <div className="btn_box">
              <Button
                className="primary-button"
                disabled={!isSubmit}
                onClick={() => {
                  this.buyIntegralCommodity();
                }}
              >
                确认支付
              </Button>
            </div>
          </div>
        </Modal>
        {/* 点击放大 */}
        {showBigImg && (
          <div
            onClick={() => {
              this.setState({
                showBigImg: false,
                bigSrc: "",
              });
            }}
            className="big_img"
          >
            <img src={bigSrc} />
          </div>
        )}
      </div>
    );
  }
}

export default CollectionJifenDetail;
