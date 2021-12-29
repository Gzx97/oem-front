import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";
import AccountHeader from "../../components/partial/AccountHeader";
import ShareIcon from "../../assets/images/fenxiang.png";
import fzIcon from "../../assets/images/fuzhi.png";
import countDown from "time-countdown-dhms"; //倒计时
import serviceIcon from "../../assets/images/imeta/user/service-icon.png";
import dayjs from "dayjs";

import "./BuyCollection.scss";
// import Circle from 'sanyuelanv-circle'
import { Button, Toast, Tabs, Modal, Icon } from "antd-mobile";
import { CommodityApi } from "../../api";
import $ from "jquery";
import {
  formatWalletPrice,
  getQueryString,
  formatTags,
  formatTime,
} from "../../utils/format";
import "./swiper.scss";
// console.log(walletData)
@inject("userM4DStore")
@inject("localeStore")
@observer
class BuyCollection extends Component {
  state = {
    copyValue: "", //复制文字
    bannerList: [],
    modal: false,
    cpData: {},
    onPayStatus: 3, //正在支付，0待付款，1已付款，2已取消
    lastPaytime: 900, //剩余付款时间
    djsm: "--", //倒计时时间
    djss: "--", //倒计时时间
    showBigImg: "",
    bigSrc: "",
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
    this.paying();
    console.log();
    // 倒计时
  }
  componentWillUnmount() {
    window.onresize = null;
  }

  componentWillUnmount() {
    // window.onresize = null
    for (var i = 1; i < 1000; i++) {
      clearInterval(i);
      clearTimeout(i);
    }
  }
  // 检测正在进行中的交易
  paying = () => {
    let _this = this;
    const { userM4DStore } = this.props;
    userM4DStore.getUserStatus();
    CommodityApi.paying({
      open_id: userM4DStore.openid,
    }).then((res) => {
      console.log(res.data);

      if (res.status === 1) {
        this.setState({ cpData: res.data, onPayStatus: res.data.status });
        this.countTime(res.data.lastPaytime);
        return;
      } else {
        _this.sellview();
      }
    });
  };
  // 商品详细信息
  sellview = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.sellview({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      console.log(res.data);
      this.setState({ cpData: res.data });
    });
  };
  copyText = (e, event) => {
    event.stopPropagation();

    const {
      localeStore: {
        locale: { ORDER },
      },
    } = this.props;
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
  // 点击付款
  wantPay = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.gopay({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      _this.paying();
      console.log(res.data);
    });
  };
  // 完成付款
  payok = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.payok({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
      img: "",
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      console.log(res.data);
    });
  };
  // 取消交易订单
  cancelorder = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore, history } = this.props;
    CommodityApi.cancelorder({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      Toast.info(res.msg, 2, () => {
        history.push("/trade");
      });
      console.log(res.data);
    });
  };
  // 倒计时
  countTime = (time, notime) => {
    let _this = this;
    let date = dayjs().add(time, "second").format("YYYY/MM/DD HH:mm:ss");
    // let date = new Date("2022/06/22 18:00");
    //传入要倒计时的时间 '2022/06/22 18:00'或者'2022-06-22 18:00'
    //input the time to count down//传入要倒计时的时间 '2022/06/22 18:00'或者'2022-06-22 18:00'
    //请自行增加定时器监听，Vue的话自行做响应式绑定，并记得在组件销毁前清除定时器，react差不多相同的，客官老爷自行取用
    //please add Inerverval urself ,and bind data with vue or react urself too,:)
    this.timer = setInterval(() => {
      //第一个参数为需要倒计时的时间，
      //第二参数为格式化时间 ,dhms代表天小时分秒，hms小时分秒,ms分秒
      let djs = countDown(date, "ms");
      console.log(djs);
      if (!djs) {
        console.log("倒计时结束");
        //  Toast.info('倒计时结束')
      }
      if (!djs) {
        for (var i = 1; i < 1000; i++) {
          clearInterval(i);
          clearTimeout(i);
        }
      }

      djs && _this.setState({ djsm: djs.m, djss: djs.s });

      // console.log(djs.m);
      // console.log(djs.s);
    }, 1000);
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
      modal,
      onPayStatus,
      djsm,
      djss,
      showBigImg,
      bigSrc,
    } = this.state;
    return (
      <div id="BuyCollection">
        <AccountHeader />
        {/* 复制 */}
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>

        <div className="it_title">交易藏品</div>
        {onPayStatus === 0 && (
          <div
            onClick={() => {
              this.cancelorder();
            }}
            style={{ color: "rgb(237, 78, 52)" }}
            className="goto-jilu"
          >
            {/* <img src={ShareIcon} /> */}
            取消订单
          </div>
        )}

        <div className="cp_card">
          <div className="cp_top_box">
            <div className="cp_left">
              <div className="img_box">
                <img src={cpData.pFace} />
              </div>
            </div>
            <div className="cp_right">
              <h3>{cpData.pName}</h3>
              <div className="cp_tag">
                {(cpData.tags &&
                  formatTags(cpData.tags).map((i) => {
                    return <span key={i}>#{i}#</span>;
                  })) || <span>#暂无标签#</span>}
              </div>
              <div className="fxf">
                防伪编号：{cpData.mintHash}?a={cpData.nftId}
              </div>
            </div>
          </div>
        </div>
        {/* 藏品信息 */}
        <div className="cp_info_box">
          <div className="cp_info">
            <span>用户姓名</span>
            <span
              onClick={(e) => {
                this.copyText(cpData.bankUser, e);
              }}
            >
              {cpData.bankUser} <img src={fzIcon} />
            </span>
          </div>
          <div className="cp_info">
            <span>收款方式</span>
            <span>{cpData.bankName} </span>
          </div>
          <div className="cp_info">
            <span>收款账号</span>
            <span
              onClick={(e) => {
                this.copyText(cpData.bankNumber, e);
              }}
            >
              {cpData.bankNumber} <img src={fzIcon} />
            </span>
          </div>
          {cpData.codeImg && (
            <div className="cp_info">
              <span>收款码</span>
              <img
                onClick={() => {
                  this.setState({ showBigImg: true });
                }}
                src={cpData.codeImg}
              />
            </div>
          )}

          {/* <div className="cp_info">
            <span></span>
            <span
              onClick={(e) => {
                this.copyText("高振兴", e);
              }}
              style={{ color: "#ED4E34" }}
            >
              复制卡号
              <img src={fzIcon} />
            </span>
          </div> */}
        </div>

        {/* 交易说明 */}
        <div className="cp_detail_box">
          <h3>交易说明</h3>
          <p>
            所有交易挂单均为用户自主发起并完成，请您确定付款后点击下方“我已付款”按钮，商户将在确认收到转账后的15分钟内将数字藏品转到你的账号。
            <br></br>
            本交易为用户之间的点对点交易，如交易过程中有任何问题，请及时举报或通过客服中心提出申诉。
          </p>
        </div>
        {/* 底部 */}
        {/*  */}
        {onPayStatus === 3 && (
          <footer>
            <span>￥{cpData.sellPrice}</span>
            <span
              onClick={() => {
                this.wantPay();
              }}
            >
              立即付款
            </span>
          </footer>
        )}

        {onPayStatus === 0 && (
          <footer>
            <span>￥{cpData.sellPrice}</span>
            <span
              onClick={() => {
                history.push("/Certificate?orderId=" + cpData.orderId);
              }}
            >
              我已付款（{djsm}m{djss}s）
            </span>
          </footer>
        )}

        {onPayStatus === 1 && (
          <footer>
            <span>￥{cpData.sellPrice}</span>
            <span
              onClick={() => {
                history.push("/collection");
              }}
            >
              已转让，立即查看
            </span>
          </footer>
        )}

        {/* 购买弹框 */}
        {/* <Modal
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
              onChange={()=>{}}
              value={1} className="modal_input" type="number" />
            </div>
            <div className='md_tag'>剩余：34</div>
            <div className="btn_box">
              <Button className="primary-button" onClick={this.onClose("modal")}>
                确认购买
              </Button>
            </div>
          </div>
        </Modal>
     */}
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
            <img src={cpData.codeImg} />
          </div>
        )}
      </div>
    );
  }
}

export default BuyCollection;
