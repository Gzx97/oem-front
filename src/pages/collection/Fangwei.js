import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AccountHeader from "../../components/partial/AccountHeader";
import ShareIcon from "../../assets/images/fenxiang.png";
import ShareImg from "../../components/partial/ShareImg";
import fzIcon from "../../assets/images/fuzhi.png";
import wxIcon from "../../assets/images/weixin.png";
import zfbIcon from "../../assets/images/zhifubao.png";
import pingpp from "pingpp-js";
import "./swiper.scss";
import "./Fangwei.scss";
// import Circle from 'sanyuelanv-circle'
import { Button, Toast, Tabs, Modal, Icon } from "antd-mobile";
import { CommodityApi } from "../../api";
import {
  cryptoAccountDisplay,
  formatWalletPrice,
  formatZeroNumber,
  getQueryString,
  // iosTrouchFn,
  formatDate,
  formatTags,
} from "../../utils/format";
import { isIosOrAndroid, isWeixn } from "../../utils/common";

// console.log(walletData)
@inject("userM4DStore")
@inject("localeStore")
@observer
class Fangwei extends Component {
  state = {
    copyValue: "", //复制文字
    modal: false,
    modal2: false, //收款信息
    payType: "wx", //支付方式

    cpData: {},
    bank_name: "", //机构名称
    bank_user: "", //用户名
    bank_number: "", //账号
    sell_price: "", //标价
    code_img: "",
    isSubmit: true,
    base64Img: "", //base64图片
    bankList: [],
    chooseIndex: 0, //默认选择第一个
    Zhongduan: 0, //终端
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
    // console.log(formatZeroNumber(0.15));
    this.commodityview();
    this.getBankList();
    let zd = isIosOrAndroid();

    this.setState({
      Zhongduan: zd, //安卓1 ios2
    });
    // console.log(window.location);
  }
  componentWillUnmount() {
    window.onresize = null;
  }

  componentWillUnmount() {
    // window.onresize = null
  }

  getBase64 = (imgUrl) => {
    let _this = this;
    window.URL = window.URL || window.webkitURL;
    let xhr = new XMLHttpRequest();
    xhr.open("get", imgUrl, true);
    // 至关重要
    xhr.responseType = "blob";
    xhr.onload = function () {
      if (this.status == 200) {
        //得到一个blob对象
        let blob = this.response;
        // console.log("blob", blob);
        // 至关重要
        let oFileReader = new FileReader();
        oFileReader.onloadend = function (e) {
          // 此处拿到的已经是 base64的图片了
          let base64 = e.target.result;
          // console.log("方式一》》》》》》》》》", base64);
          _this.setState({ base64Img: base64 });
        };
        oFileReader.readAsDataURL(blob);
      }
    };
    xhr.send();
  };

  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };
  onAmountChange = (e) => {
    const { value } = e.target;
    const reg = /^\d+(\.)?\d{0,2}?$/;
    if (value && !reg.test(e.target.value)) {
      return;
    }
    this.setState({ sell_price: value });
  };
  // 商品详细信息
  commodityview = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.commodityview({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      // console.log(res.data);
      this.setState(
        {
          cpData: res.data,
          bank_name: res.data.bankName, //机构名称
          bank_user: res.data.bankUser, //用户名
          bank_number: res.data.bankNumber, //账号
          sell_price:
            (Number(res.data.sellPrice) !== 0 && res.data.sellPrice) || "", //标价
          // sell_price: '', //标价
        },
        () => {
          _this.getBase64(res.data.pFace);
        }
      );
    });
  };
  // 藏品挂卖
  sellcommodity = () => {
    let _this = this;
    const {
      bank_name, //机构名称
      bank_user, //用户名
      bank_number, //账号
      sell_price, //标价
      bank_type,
      code_img,
      cpData,
    } = this.state;
    if (sell_price > Number(cpData.sellPriceMax)) {
      Toast.info("标价不可高于" + cpData.sellPriceMax);
      return;
    }
    if (sell_price < Number(cpData.sellPriceMin)) {
      Toast.info("标价不可低于" + cpData.sellPriceMin);
      return;
    }
    this.setState({ isSubmit: false });

    const { userM4DStore } = this.props;
    CommodityApi.sellcommodity({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
      bank_name: bank_name,
      bank_user: bank_user,
      bank_number: bank_number,
      sell_price: sell_price,
      code_img: code_img,
      bank_type: bank_type,
    }).then((res) => {
      this.setState({ isSubmit: true });

      if (res.status !== 1) {
        Toast.info(res.msg, 2, () => {
          _this.setState({
            modal: false,
            modal2: false,
          });
        });
        return;
      }

      Toast.info("正在跳转", 2, () => {
        _this.commodityview();
        _this.pingppH5();
        _this.setState({
          modal: false,
          modal2: false,
        });
      });
    });
  };
  // 取消挂卖
  sellcancel = () => {
    let _this = this;
    const {} = this.state;
    this.setState({ isSubmit: false });

    const { userM4DStore } = this.props;
    CommodityApi.sellcancel({
      open_id: userM4DStore.openid,
      p_id: getQueryString("id"),
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 2, () => {
          _this.setState({
            modal: false,
            isSubmit: true,
          });
        });
        return;
      }
      Toast.info(res.msg, 2, () => {
        _this.commodityview();
        _this.setState({
          modal: false,
          isSubmit: true,
        });
      });
    });
  };
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

  showModal = (key) => (e) => {
    e.preventDefault(); // 修复 Android 上点击穿透\
    // console.log(key)

    this.setState({
      [key]: true,
    });
  };
  // toBase64 = (url) => {
  //   if(!url){
  //     return
  //   }
  //   let _this = this;
  //   let base64Data = "";
  //   imageToBase64(url, {
  //     mode: "no-cors",
  //   }) // Image URL
  //     .then((response) => {
  //       console.log(url.split(".").pop().toLowerCase())

  //       let type = url.split(".").pop().toLowerCase();
  //       base64Data = `data:image/${type};base64,` + response;
  //       // _this.setState({testImg:`data:image/${type};base64,`+response})
  //     })
  //     .catch((error) => {
  //       console.log(error); // Logs an error if there was one
  //     });
  //   return base64Data;
  // };

  onClose = (key) => () => {
    this.setState({
      [key]: false,
    });
  };
  canSubmit = () => {
    const {
      bank_name, //机构名称
      bank_user, //用户名
      bank_number, //账号
      sell_price, //标价
    } = this.state;
    // return !!(bank_name && bank_user && bank_number && sell_price);
    return !!(bank_number && sell_price);
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
    CommodityApi.pingppcommission({
      p_id: getQueryString("id"),
      channel,
    }).then((res) => {
      this.setState({ isSubmit: true });

      if (res.status !== 1) {
        Toast.info(res.msg, 2, () => {
          _this.setState({
            modal: false,
            modal2: false,
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

  // 获取收款方式列表
  getBankList = () => {
    let _this = this;
    const { chooseIndex } = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.getBankList({
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      setTimeout(() => {
        _this.setState({
          bankList: res.data,
          bank_name: res.data[0].bankName, //银行名字
          bank_type: res.data[0].bankType, //支付宝 微信
          bank_user: res.data[0].bankUser, //用户名
          bank_number: res.data[0].bankNumber, //账号
          code_img: res.data[0].codeImg, //二维码
        });
      }, 500);
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
  // 选择收款方式
  choosePayType = (index) => {
    const { bankList } = this.state;
    this.setState({
      chooseIndex: index,
      bank_name: bankList[index].bankName, //机构名称
      bank_type: bankList[index].bankType, //支付宝 微信
      bank_user: bankList[index].bankUser, //用户名
      bank_number: bankList[index].bankNumber, //账号
      code_img: bankList[index].codeImg, //二维码
    });
    console.log(index);
    console.log(bankList[index]);
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
      bank_name, //机构名称
      bank_user, //用户名
      bank_number, //账号
      sell_price, //标价
      isSubmit,
      copyValue,
      modal,
      modal2,
      payType,
      cpData,
      testImg,
      base64Img,
      bankList,
      chooseIndex,
      Zhongduan,
    } = this.state;
    return (
      <div id="Fangwei">
        <AccountHeader />
        {/* 复制 */}
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>

        <div className="it_title">藏品信息</div>
        <div className="goto-jilu">
          {/* <img src={ShareIcon} /> */}
          <ShareImg
            cpData={cpData}
            pName={cpData.pName}
            buyTime={formatDate(cpData.createTime)}
            // pFace={cpData.pFace}
            pFace={base64Img}
            nftId={cpData.ipfsNftInfoUrlHash}
            userName={cpData.userName}
            xiyou={formatZeroNumber(cpData.xiyou) + "%"}
            issuer={cpData.issuer}
            msg={"分享"}
          />
        </div>

        <div
          onClick={() => {
            history.push("/CollectionDetail?id=" + getQueryString("id"));
          }}
          className="cp_card"
        >
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
              <div className="fxf">授权方：{cpData.issuer}</div>
            </div>
          </div>
        </div>

        {/* 藏品信息 */}
        <div className="cp_info_box">
          <div className="cp_info">
            <span>发售日期</span>
            <span>{formatDate(cpData.createTime)}</span>
          </div>
          <div className="cp_info">
            <span>获得日期</span>
            <span>{formatDate(cpData.buyTime)}</span>
          </div>
        </div>

        {/* 其他 */}
        <div className="cp_detail_box">
          <h3>防伪编号</h3>
          <p>
            {cpData.mintHash}?a={cpData.nftId}
          </p>
          <h3>确权地址</h3>
          <p
            onClick={(e) => {
              this.copyText(cpData.ipfsNftInfoUrlHash, e);
            }}
          >
            {cpData.ipfsNftInfoUrlHash || "暂无"}
            <img src={fzIcon} />
          </p>
          <h3>藏品介绍</h3>
          <p>{cpData.copyright || "暂无"}</p>
          <h3>注意事项</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: cpData.remarks,
            }}
          ></p>
        </div>
        {/* 底部 */}
        {cpData.sell === 0 && (
          <footer>
            <span onClick={this.showModal("modal")}>藏品转让</span>
            {/* <span
              onClick={() => {
                this.props.history.push({
                  pathname: "/Transfer",
                  state: { info: cpData },
                });
              }}
            >
              缺权转移
            </span> */}
          </footer>
        )}
        {cpData.sell === 1 && (
          <footer>
            <span className="is_sell">
              正在挂卖，标价：{cpData.sellPrice}￥
              <div>
                {/* <i onClick={this.showModal("modal")}>编辑</i> */}
                <i
                  onClick={() => {
                    this.sellcancel();
                  }}
                >
                  取消
                </i>
              </div>
            </span>
          </footer>
        )}
        {cpData.sell === 2 && (
          <footer>
            <span className="is_sell">
              买家正在付款，标价：{cpData.sellPrice}￥
            </span>
          </footer>
        )}

        {/* 编辑收款信息 */}
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
            <h1>编辑收款信息</h1>
            <div className="input_box">
              <h3>标价（￥）</h3>
              <input
                onChange={(e) => this.onAmountChange(e, "sell_price")}
                value={sell_price}
                className="modal_input"
                type="number"
                placeholder={"请输入售卖价格"}
              />
              <ul className="skfs">
                <h3>选择收款方式</h3>

                {bankList.map((item, index) => {
                  return (
                    <li
                      className={(index === chooseIndex && "active_li") || ""}
                      key={item.id}
                      onClick={() => {
                        this.choosePayType(index);
                      }}
                    >
                      <i
                        style={{
                          backgroundColor: this.getPayColor(item.bankType)
                            .color,
                        }}
                      ></i>

                      <span>{item.bankType}</span>
                      <span>{cryptoAccountDisplay(item.bankNumber)}</span>
                    </li>
                  );
                })}
                <div
                  style={{ color: "white", padding: "2rem 0" }}
                  className="add_sk"
                  onClick={() => {
                    history.push("/AddPayment");
                  }}
                >
                  + 添加收款方式
                </div>
              </ul>

              {/* <h3>收款机构名称（如支付宝，微信或XX银行xx分行/支行）</h3>
              <input
                onChange={(e) => this.onInputChange(e, "bank_name")}
                value={bank_name}
                className="modal_input"
                type="text"
                placeholder={"请输入收款机构名称"}
              />
              <h3>收款账号</h3>
              <input
                onChange={(e) => this.onInputChange(e, "bank_number")}
                value={bank_number}
                className="modal_input"
                type="text"
                placeholder={"请输入收款账号"}
              />
              <h3>收款人姓名</h3>
              <input
                onChange={(e) => this.onInputChange(e, "bank_user")}
                value={bank_user}
                className="modal_input"
                type="text"
                placeholder={"请输入收款人姓名"}
              /> */}
            </div>
            {/* <div className="md_tag">剩余：{cpData.shoucang}</div> */}
            <div className="md_tag">
              请仔细阅读{" "}
              <i
                onClick={() => {
                  history.push("/Fengxian");
                }}
                style={{ color: "#E84848" }}
              >
                《风险提示》
              </i>
            </div>
            <div className="btn_box">
              <Button
                className="primary-button"
                onClick={() => {
                  this.setState({
                    modal: false,
                    modal2: true,
                  });
                  // this.sellcommodity();
                }}
                disabled={!this.canSubmit() || !isSubmit}
              >
                确定挂卖
              </Button>
            </div>
          </div>
        </Modal>

        {/* 支付押金 */}
        <Modal
          popup
          visible={modal2}
          onClose={this.onClose("modal2")}
          animationType="slide-up"
          // afterClose={() => {
          //   // alert("afterClose");
          // }}
        >
          <div className="myModal">
            {/* <h4>支付押金</h4> */}
            <div className="zf_num">￥{formatWalletPrice(sell_price / 10)}</div>
            <div className="zf_sm">挂卖收取10%佣金，取消挂卖时原路退回</div>
            <div className="md_tag">请选择支付方式</div>
            <ul className="zffs">
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
                  // this.buybox();
                  this.sellcommodity();
                }}
              >
                确认支付
              </Button>
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}

export default Fangwei;
