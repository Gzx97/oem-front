import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import NoData from "../../components/common/NoData";
import AccountHeader from "../../components/partial/AccountHeader";
import wxIcon from "../../assets/images/weixin.png";
import zfbIcon from "../../assets/images/zhifubao.png";
import quanIcon from "../../assets/images/qiaquan.png";
import pingpp from "pingpp-js";
// import "./swiper.scss";
import "./BuyBlindBox.scss";
// import Circle from 'sanyuelanv-circle'
import { Button, Toast, Tabs, Modal, Icon } from "antd-mobile";
import { CommodityApi } from "../../api";
// import "./animate.scss";
import {
  formatCoinPrice,
  formatWalletPrice,
  getQueryString,
  // iosTrouchFn,
  formatTime,
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Buy️BlindBox extends Component {
  state = {
    copyValue: "", //复制文字
    bannerList: [],
    boxData: {},
    modal: false,
    amount: 1,
    modal2: false,
    payType: "wx", //支付方式
    showBigImg: false,
    bigSrc: "",
    isSubmit: true,
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
    console.log(getQueryString("id"));
    this.boxview();
    // console.log(pingpp.createPayment);
  }
  componentWillUnmount() {
    // Cookies.set("HMTAG", this.state.tag_page);
    window.onresize = null;
  }

  componentWillUnmount() {
    // window.onresize = null
  }

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
  // 盲盒信息
  boxview = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.boxview({
      open_id: userM4DStore.openid,
      box_id: getQueryString("id"),
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      console.log(res.data);
      this.setState({ boxData: res.data });
      if (res.data.ticket > 0) {
        this.setState({
          payType: "quan",
        });
      }
    });
  };
  // 买盲盒
  buybox = () => {
    let _this = this;
    const { amount, payType } = this.state;
    this.setState({ isSubmit: false });

    const { userM4DStore, history } = this.props;
    CommodityApi.buybox({
      open_id: userM4DStore.openid,
      box_id: getQueryString("id"),
      amount,
      ticket: (payType === "quan" && 1) || 0,
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
      if (payType === "quan") {
        Toast.info(res.msg, 2, () => {
          // _this.boxview();
          // _this.setState({
          //   modal: false,
          //   modal2: false,
          // });
          history.push('/MyBlindBox')
        });
        return;
      } else {
        _this.pingppH5(res.data.orderId);
      }

      // window.location.href = `http://47.52.21.155:8200/api/commodity/chinapaysubmit?order_id=${res.data.orderId}`;
    });
  };
  onAmountChange = (e) => {
    const { value } = e.target;
    const { boxData } = this.state;
    if (value > Number(boxData.lastCount)) {
      return;
    }
    // boxData.lastCount
    const reg = /^\d+(\.)?\d{0,0}?$/;
    if (value && !reg.test(e.target.value)) {
      return;
    }
    this.setState({ amount: value });
  };
  // 选择支付方式
  changePayType = (payType) => {
    this.setState({
      payType,
    });
  };
  // H5支付
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
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { WALLET },
        lang,
      },
    } = this.props;
    const {
      modal,
      boxData,
      amount,
      modal2,
      showBigImg,
      bigSrc,
      payType,
      isSubmit,
    } = this.state;
    return (
      <div id="Buy️BlindBox">
        <AccountHeader
          onHandle={() => {
            history.push("/home");
          }}
        />

        <div className="it_title">{boxData.boxName}盲盒</div>
        {/* <div className="it_title">{boxData.boxName}产品</div> */}
        <div className="goto-jilu">{/* <img src={ShareIcon} /> */}</div>
        <div className="mh_img">
          <img
            src={boxData.face || "https://oss.ctm-ib.com/yishu/1632305593.png"}
          />
        </div>
        <h2>{boxData.boxName}</h2>
        <h2>
          ￥{boxData.price}
          {boxData.priceR > 0 && <del>原价:￥{boxData.priceR}</del>}
        </h2>

        {/* 藏品信息 */}
        <div className="cp_info_box">
          {/* <div className="cp_info">
            <span>授权方</span>
            <span>{boxData.issuer}</span>
          </div> */}
          {/* <div className="cp_info">
            <span>每套包含收藏卡片</span>
            <span>{boxData.pCount}</span>
          </div> */}
          {/* <div className="cp_info">
            <span>剩余可购数</span>
            <span>{boxData.lastCount}</span>
          </div> */}
        </div>
        {/* 可能抽到 */}
        <div className="maybe_have">
          <div className="ti2">
            <span>可能抽得</span>
            <span
              onClick={() => {
                history.push("/BoxCollection?id=" + getQueryString("id"));
              }}
            >
              查看全部
            </span>
          </div>
          {/* 图片 */}
          <div className="advertise">
            {boxData.commodity &&
              boxData.commodity.map((item, index) => {
                return (
                  <div key={item.id} className="every_gg">
                    <img
                      onClick={() => {
                        history.push("/CollectionDetail?id=" + item.id);
                        // this.setState({
                        //   bigSrc: item.p_face,
                        //   showBigImg: true,
                        // });
                      }}
                      src={item.p_face}
                    />
                    <span>{item.p_name}</span>
                  </div>
                );
              })}
          </div>
        </div>

        {/* 盲盒说明 */}
        <div className="cp_detail_box">
          <h3>产品说明</h3>

          <p
            dangerouslySetInnerHTML={{
              __html: boxData.introduce,
            }}
          ></p>
          <h3>注意事项</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: boxData.remarks,
            }}
          ></p>
        </div>
        {/* 底部 */}
        {/* <footer>
          <span
            onClick={() => {
              history.push("/trade");
            }}
          >
            去交易
          </span>
          <span onClick={this.showModal("modal")}>立即购买</span>
        </footer> */}
        <footer>
          <span
            style={{ display: "none" }}
            onClick={() => {
              Toast.info("暂未开放!");
              return;
              history.push("/trade");
            }}
          >
            去交易
          </span>
          <span
            onClick={
              // () => {
              //   Toast.info("暂未开放!");
              // }
              this.showModal("modal")
            }
          >
            立即购买
          </span>
        </footer>
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
            <h1>确认购买</h1>
            <div className="input_box">
              <h3>数量</h3>
              <input
                onChange={(e) => {
                  this.onAmountChange(e, "amount");
                }}
                value={amount}
                className="modal_input"
                type="number"
              />
            </div>
            <div className="md_tag">剩余：{boxData.lastCount}</div>
            <ul className="zffs">
              {/* <li
                onClick={() => {
                  this.changePayType("yhk");
                }}
                className={(payType === "yhk" && "active") || ""}
              >
                银行卡支付
                {payType === "yhk" && <Icon type="check" />}
              </li> */}
              <li
                onClick={() => {
                  this.changePayType("quan");
                }}
              >
                <span>
                  <img src={quanIcon} />
                  盲盒券支付 （剩余：{boxData.ticket}）
                </span>

                {payType === "quan" && <Icon color={"#E32A2A"} type="check" />}
              </li>
              <li
                onClick={() => {
                  // Toast.info("暂未开放！");
                  // return;
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
                  this.buybox();
                }}
              >
                确认购买
              </Button>
            </div>
          </div>
        </Modal>
        {/* 购买成功 */}
        {modal2 && (
          <div className="my_modal">
            <div className="modal_mask"> </div>
            <div className="modal_content animate__animated animate__bounceIn">
              <h3 className="">购买成功</h3>
              <img
                className="mh_img"
                src={
                  boxData.face || "https://oss.ctm-ib.com/yishu/1632305593.png"
                }
              />

              <div className="kh">
                <span
                  onClick={() => {
                    this.setState({
                      modal2: false,
                    });
                  }}
                >
                  晚点再开
                </span>
                <span
                  onClick={() => {
                    history.push("/MyBlindBox");
                  }}
                >
                  立即开盒
                </span>
              </div>
            </div>
          </div>
        )}

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

export default Buy️BlindBox;
