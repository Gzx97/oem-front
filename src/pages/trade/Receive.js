import React, { Component } from "react";
import { Icon, Modal, Toast } from "antd-mobile";
// import copyIcon from '../../assets/images/yishu/fuzhi.png'
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { propertyM4DApi } from "../../api";
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'

import "./Receive.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from "react-router-dom";
import QrCode from "qrcode.react";
// import { copy } from "fs-extra";
import JiluIcon from "../../assets/images/jilu.png";
import fzIcon from "../../assets/images/fuzhi.png";

@inject("userM4DStore")
@inject("localeStore")
@observer
class Receive extends Component {
  state = {
    walletAddress: "", //钱包地址
    selectedOption: localStorage.getItem("RECHARGE_TYPE") || "USDT",
    showOption: false,
    lian_type: "TRC20", //默认选择TRC20 
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    const {
      localeStore: {
        locale: { RECHARGE },
      },
    } = this.props;

    if (!userM4DStore.isOnline()) {
      Toast.info(RECHARGE.PLEASE_LOGIN, 1, () => history.push("/login"));
      return;
    }
    userM4DStore.getUserStatus();
    // this.getWalletAddress();
  }

  componentWillUnmount() {
    // window.onresize = null
  }
  getWalletAddress = () => {
    let _this = this;
    const { userM4DStore, history } = this.props;
    const { selectedOption, lian_type } = this.state;
    let address_type = "";

    if (lian_type === "TRC20") {
      address_type = "TRX";
    } else {
      address_type = "ETH";
    }

    console.log(selectedOption);
    // TRX =》TRC20 (默认)
    // USDT=》 ERC20
    propertyM4DApi
      .getWalletAddress({
        open_id: userM4DStore.openid,
        type: address_type,
      })
      .then((res) => {
        if (res.status === 1) {
          _this.setState({
            walletAddress: res.data.wallet,
          });
        } else {
          Toast.info(res.msg, 2);
        }
      });
  };
  copyText = (e) => {
    // console.log(e)
    const {
      localeStore: {
        locale: { RECHARGE },
      },
    } = this.props;
    let Url2 = document.getElementById("textCopy");
    Url2.select(); // 选择对象
    // Url2.focus();
    document.execCommand("Copy"); // 执行浏览器复制命令
    if (document.execCommand("Copy")) {
      Toast.info('复制成功', 1);
    } else {
      // Toast.info(RECHARGE.FAIL_COPY, 1)
      window.webkit.messageHandlers.CopyText.postMessage(e);
      Toast.info('复制成功', 1);
    }
  };
  screenShot = () => {
    var canvas = document.getElementById("qrCode");
    var type = "png";
    var d = document.getElementById("qrCode");
    var imgdata = d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
      type = type.toLocaleLowerCase().replace(/jpg/i, "jpeg");
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return "image/" + r;
    };
    imgdata = imgdata.replace(fixtype(type), "image/octet-stream");
    //3.0 将图片保存到本地
    var date = new Date();
    var filename =
      "" +
      "DMO" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "." +
      type;
    this.savaImage(imgdata, filename);
  };

  savaImage = (data, filename) => {
    var save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent("MouseEvents");
    event.initMouseEvent(
      "click",
      true,
      false,
      window,
      0,
      0,
      0,
      0,
      0,
      false,
      false,
      false,
      false,
      0,
      null
    );
    save_link.dispatchEvent(event);
  };
  checkLian = (lian_type) => {
    //切换链
    this.setState({ lian_type }, () => {
      this.getWalletAddress();
    });
  };
  render() {
    const { history } = this.props;
    const { walletAddress, selectedOption, showOption, lian_type } = this.state;
    const {
      localeStore: {
        locale: { RECHARGE, EXTRACT },
      },
    } = this.props;

    return (
      <div id="Receive">
        <AccountHeader />
        <div className="it_title">接收NFT</div>
        <div className="goto-jilu">
          <img src={JiluIcon} />
        </div>
        {/* 选择方向 */}
        <div 
        onClick={()=>{history.push('/Transfer')}}
        className='direction'>
          <span>方向</span>
          <span>接收NFT <Icon type={'right'}></Icon></span>
        </div>
        {/* 二维码 */}
        <div className="code-box">
          <div className="canvas-code">
            <QrCode
              includeMargin={true}
              level={"H"}
              value={walletAddress}
              size={200}
              id="qrCode"
            />
          </div>
          <p 
          onClick={()=>{this.copyText(walletAddress)}}
          className="address_text">{walletAddress} <img src={fzIcon}/></p>
          <div className="copy-btn">
            <a
              onClick={() => {
                this.screenShot();
              }}
              id={"aId"}
            >
              {RECHARGE.JIEPING_SAVE_QRCODE}
            </a>
          </div>
          {/* <p>{walletAddress}<img style={{ width: '1.8rem' }} onClick={() => { this.copyText(walletAddress) }} src={copyIcon} /></p> */}
          <textarea
            style={{ position: "fixed", top: "-10000rem", opacity: "0" }}
            readOnly
            id="textCopy"
            value={walletAddress}
          ></textarea>

        </div>

        {/* 转入说明 */}
        <div className="explain-box">
          {/* <h4>{RECHARGE.ZHUANRU_SHUOMING}</h4> */}
          <p>
            <li>
              1.此地址是你唯一且独自使用的转入地址，你可以同时进行多次接收。
            </li>
            <li>2.本地址禁止接收除ERC20标准外的其他NFT。</li>
          </p>
        </div>
      </div>
    );
  }
}

export default Receive;
