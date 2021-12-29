import React, { Component } from "react";
import { withRouter } from "react-router";
import "./ShareImg.scss";
import { observer, inject } from "mobx-react";
import { Toast } from "antd-mobile";
import html2canvas from "html2canvas";
import { UserApi } from "../../api";

// import Logo from "../../assets/images/logo.png";
import LOGO from "../../assets/images/imeta/home/logo_tm.png";
// import zhengImg from "../../assets/images/yishu/celue/zheng_sy.png";
// import fuImg from "../../assets/images/yishu/celue/fu_sy.png";
// import ShareIcon from "../../assets/images/fenxiang.png";
import shuiyinImg from "../../assets/images/shuiyin.png";
import $ from "jquery";
import QrCode from "qrcode.react";
import { formatTime } from "../../utils/format";
import {
  isIosOrAndroid,
  base64ToBlob,
  imageBase64ToFile,
} from "../../utils/common";
@inject("userM4DStore")
@inject("localeStore")
@observer
class ShareImg extends Component {
  state = {
    img_box: false,
    share_img: "", //图片url
    share_img_http: "", //网络图片url
    recommendCode: "",
    cpImage: <img />,
    canBC: true,
  };
  componentDidMount() {
    const { history, userM4DStore } = this.props;
    const { pFace, cpData } = this.props;
    // setTimeout(() => {
    //   const { pFace, cpData } = this.props;

    //   console.log(cpData);
    //   this.czImg(cpData.pFace);
    // }, 1000);

    const {
      localeStore: {
        locale: { FRINDSCOME },
      },
    } = this.props;
    let _this = this;
    userM4DStore.getUserStatus();
    userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then((res) => {
      _this.setState({
        userInfo: "",
        recommendCode: res.data.recommendCode,
      });
    });
    // this.toImage()
    // this.getImage(
    //   "https://dagetest.oss-cn-hongkong.aliyuncs.com/imetafaq/faq_5531629972592.jpg",
    //   "yz_img"
    // );
  }
  czImg = (url) => {
    let _this = this;
    let image = new Image();
    // let url = 'https://dagetest.oss-cn-hongkong.aliyuncs.com/imeta/p_B5F1629796850.jpeg'
    image.setAttribute("crossOrigin", "anonymous");
    image.src = url + "?time=" + new Date().valueOf();
    image.onload = () => {
      // ... do something
      console.log(image);
      _this.setState({ cpImage: image });
    };
    image.onerror = (err) => {
      console.log(err);
    };
  };
  // 页面元素变成图片
  toImage = () => {
    let _this = this;
    const {} = this.props;
    let imgHeight = window.document.querySelector("#share_in").offsetHeight; // 获取DOM高度
    let imgWidth = window.document.querySelector("#share_in").offsetWidth; // 获取DOM宽度
    let scale = window.devicePixelRatio; // 获取设备像素比
    this.setState({ img_box: true }, () => {
      html2canvas(document.querySelector("#share_in"), {
        allowTaint: false,
        useCORS: true,
        scale: scale,
        width: imgWidth,
        height: imgHeight,
      }).then(function (canvas) {
        // toImage
        const dataImg = new Image();
        dataImg.src = canvas.toDataURL("image/png");
        _this.setState({
          share_img: canvas.toDataURL("image/png"),
        });
      });
    });
  };
  // 点击保存图片
  savaImage = (data) => {
    let save_link = document.createElementNS(
      "http://www.w3.org/1999/xhtml",
      "a"
    );
    if (window.YishuRobot) {
      this.androidSaveImg();
      return;
    }
    let date = new Date();
    let filename =
      "" +
      "IMETA" +
      date.getHours() +
      ":" +
      date.getMinutes() +
      ":" +
      date.getSeconds() +
      "." +
      "png";
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

  // 安卓app保存图片
  androidSaveImg = () => {
    let _this = this;
    const { share_img } = this.state;
    this.setState({ canBC: false });
    if (window.YishuRobot) {
      const { userM4DStore } = this.props;

      UserApi.uploadphoto({
        open_id: userM4DStore.openid,
        file: imageBase64ToFile(share_img),
      }).then((res) => {
        if (res.status !== 1) {
          Toast.info(res.msg, 1);
          return;
        }
        this.setState({ canBC: true });

        window.YishuRobot.savePic2AlbumByUrl(res.data.fileUrl);
      });
    } else {
      Toast.info("暂无window.YishuRobot");
    }
  };

  render() {
    const {
      localeStore: {
        locale: { XIANGQING, ADD, HEYUE },
      },
    } = this.props;
    const { msg, buyTime, pFace, nftId, xiyou, pName, userName, issuer } =
      this.props;
    const { img_box, share_img, recommendCode, cpImage, canBC } = this.state;
    return (
      <div
        onClick={() => {
          this.setState(
            {
              img_box: true,
            },
            () => {
              this.toImage();
            }
          );
        }}
        className="ShareImg"
      >
        <div className="sharetext">{msg}</div>

        {img_box && (
          <div
            onClick={(e) => {
              e.stopPropagation();
              this.setState({ img_box: false });
            }}
            className="share_box"
          >
            <div id="share_in" className="share_in">
              {share_img && <img className="share" src={share_img} />}
              <h1>IMETA 数字藏品证书</h1>
              <img
                className="cp_img"
                crossOrigin="anonymous"
                // src={pFace + "?time=" + new Date().valueOf()}
                src={pFace}
              />

              <h2>{pName}</h2>
              <div className="fw_info">
                <h3>确权地址：</h3>
                <p>{nftId}</p>
              </div>
              <div className="cp_info">
                <div className="info">
                  <span>收藏者</span>
                  <span>{userName}</span>
                </div>
                <div className="info">
                  <span>藏品稀有度</span>
                  <span>{xiyou}</span>
                </div>
                <div className="info">
                  <span>授权方</span>
                  <span>{issuer}</span>
                </div>
                <div className="info">
                  <span>获得日期</span>
                  <span>{buyTime}</span>
                </div>
              </div>
              <div className="foot_box">
                <div className="qr_box">
                  <QrCode
                    // includeMargin={true}
                    level={"L"}
                    value={
                      window.location.origin +
                      "/RegisterDownload?code=" +
                      recommendCode
                    }
                    size={80}
                    id="qrCode"
                  />
                  <span>扫码注册</span>
                </div>
                <img
                  className="yz_img"
                  id="yz_img"
                  crossOrigin="anonymous"
                  src={shuiyinImg}
                />
              </div>
            </div>
            {isIosOrAndroid() === 1 && share_img && (
              <div
                style={(!canBC && { opacity: ".8" }) || {}}
                onClick={(e) => {
                  e.stopPropagation();
                  if (canBC) {
                    this.savaImage(share_img);
                  } else {
                    Toast.info("保存中");
                  }
                }}
                className="save_it"
              >
                保存图片
              </div>
            )}
          </div>
        )}
      </div>
    );
  }
}

export default withRouter(ShareImg);
