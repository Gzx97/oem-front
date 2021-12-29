import React, { Component } from "react";
import { Button, Toast, ImagePicker } from "antd-mobile";
import { inject, observer } from "mobx-react";
import { REG, TOAST_DURATION, COUNT_DOWN } from "../../utils/constants";
import { UserApi, propertyM4DApi } from "../../api";
import { isEmail, isMobile, isIdcard, isName } from "../../utils/reg";
import { Icon } from "antd-mobile";

import "./Renzheng.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import {
  formatCoinPrice,
  formatWalletPrice,
  formatTime,
  formatSpecialOffer2,
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Renzheng extends Component {
  state = {
    copyValue: "",
    files1: [], //文件列表
    files2: [], //文件列表
    files3: [], //文件列表
    multiple: false, //是否支持多选
    imgLoading: false, //上傳中
    upImgArr: [], //要上傳的圖片
    isSubmit: true,

    topupData: {}, //充值初始化信息
    amount: "",
    trueName: "", //真实姓名
    idCard: "", //身份证号
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    const {
      localeStore: {
        locale: { RECHARGE },
      },
    } = this.props;

    userM4DStore.getUserStatus();
    // 获取个人信息
    // userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then((res) => {
    //   // console.log(res)
    //   _this.setState({
    //     userInfo: res.data,
    //   });
    // });
  }

  componentWillUnmount() {
    // window.onresize = null
    clearTimeout(this.timer);
  }

  goTibi = () => {
    let { selectedOption } = this.state;
    this.props.history.push("/wallet/RechargeRecord");
  };
  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };
  onAmountChange = (e) => {
    const { value } = e.target;
    // const reg = /^\d+(\.)?\d{0,5}?$/;
    // if (value && !reg.test(e.target.value)) {
    //   return;
    // }
    this.setState({ amount: value });
  };

  canSubmit = () => {
    const { idCard, trueName, upImgArr } = this.state;

    return !!(trueName && isIdcard(idCard) && upImgArr.length == 3);
  };
  // 上傳图片
  onChange1 = (files1, type, index) => {
    let _this = this;
    console.log(files1, type, index);
    const { userM4DStore, history } = this.props;
    const { upImgArr } = this.state;
    if (type !== "remove") {
      console.log(files1[files1.length - 1].file);
      if (files1[files1.length - 1].file.size > 8192000) {
        Toast.info("图片不能大于8M请重新选择！");
        return;
      }
    }
    //删除数组指定下标或指定对象
    Array.prototype.remove = function (obj) {
      for (let i = 0; i < this.length; i++) {
        let temp = this[i];
        if (!isNaN(obj)) {
          temp = i;
        }
        if (temp == obj) {
          for (let j = i; j < this.length; j++) {
            this[j] = this[j + 1];
          }
          this.length = this.length - 1;
        }
      }
    };
    if (type === "remove") {
      let removeImgArr = upImgArr;
      removeImgArr.remove(index);
      console.log(removeImgArr);
      _this.setState({
        files1: files1,
        upImgArr: removeImgArr,
      });
      return;
    }
    this.setState({
      files1: files1,
      imgLoading: true,
    });
    UserApi.uploadcerphoto({
      open_id: userM4DStore.openid,
      file: files1[files1.length - 1].file,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            imgLoading: false,
            files1: [],
            upImgArr: [],
          });
        });
        return;
      }
      let arr = upImgArr;
      arr.push(res.data.fileUrl);
      _this.setState(
        {
          imgLoading: false,
          upImgArr: arr,
        },
        () => {
          // console.log(upImgArr)
        }
      );
    });
  };
  onChange2 = (files2, type, index) => {
    let _this = this;
    console.log(files2, type, index);
    const { userM4DStore, history } = this.props;
    const { upImgArr } = this.state;
    if (type !== "remove") {
      console.log(files2[files2.length - 1].file);
      if (files2[files2.length - 1].file.size > 8192000) {
        Toast.info("图片不能大于8M请重新选择！");
        return;
      }
    }
    //删除数组指定下标或指定对象
    Array.prototype.remove = function (obj) {
      for (let i = 0; i < this.length; i++) {
        let temp = this[i];
        if (!isNaN(obj)) {
          temp = i;
        }
        if (temp == obj) {
          for (let j = i; j < this.length; j++) {
            this[j] = this[j + 1];
          }
          this.length = this.length - 1;
        }
      }
    };
    if (type === "remove") {
      let removeImgArr = upImgArr;
      removeImgArr.remove(index);
      console.log(removeImgArr);
      _this.setState({
        files2: files2,
        upImgArr: removeImgArr,
      });
      return;
    }
    this.setState({
      files2: files2,
      imgLoading: true,
    });
    UserApi.uploadcerphoto({
      open_id: userM4DStore.openid,
      file: files2[files2.length - 1].file,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            imgLoading: false,
            files2: [],
            upImgArr: [],
          });
        });
        return;
      }
      let arr = upImgArr;
      arr.push(res.data.fileUrl);
      _this.setState(
        {
          imgLoading: false,
          upImgArr: arr,
        },
        () => {
          // console.log(upImgArr)
        }
      );
    });
  };
  onChange3 = (files3, type, index) => {
    let _this = this;
    console.log(files3, type, index);
    const { userM4DStore, history } = this.props;
    const { upImgArr } = this.state;
    if (type !== "remove") {
      console.log(files3[files3.length - 1].file);
      if (files3[files3.length - 1].file.size > 8192000) {
        Toast.info("图片不能大于8M请重新选择！");
        return;
      }
    }
    //删除数组指定下标或指定对象
    Array.prototype.remove = function (obj) {
      for (let i = 0; i < this.length; i++) {
        let temp = this[i];
        if (!isNaN(obj)) {
          temp = i;
        }
        if (temp == obj) {
          for (let j = i; j < this.length; j++) {
            this[j] = this[j + 1];
          }
          this.length = this.length - 1;
        }
      }
    };
    if (type === "remove") {
      let removeImgArr = upImgArr;
      removeImgArr.remove(index);
      console.log(removeImgArr);
      _this.setState({
        files3: files3,
        upImgArr: removeImgArr,
      });
      return;
    }
    this.setState({
      files3: files3,
      imgLoading: true,
    });
    UserApi.uploadcerphoto({
      open_id: userM4DStore.openid,
      file: files3[files3.length - 1].file,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            imgLoading: false,
            files3: [],
            upImgArr: [],
          });
        });
        return;
      }
      let arr = upImgArr;
      arr.push(res.data.fileUrl);
      _this.setState(
        {
          imgLoading: false,
          upImgArr: arr,
        },
        () => {
          // console.log(upImgArr)
        }
      );
    });
  };
  onSubmit = () => {
    //提交转出
    const {
      localeStore: {
        locale: { RECHARGE },
      },
    } = this.props;
    let _this = this;

    const { userM4DStore, history } = this.props;
    const { trueName, idCard, upImgArr } = this.state;
    console.log(!trueName);
    console.log(trueName);
    if (!trueName || !idCard) {
      Toast.info("Error");
      return;
    }
    this.setState({ isSubmit: false });
    let imgStr = "";
    upImgArr.map((item, index) => {
      imgStr += item + "|";
    });
    UserApi.userCer({
      open_id: userM4DStore.openid,
      img_list: imgStr,
      name: trueName,
      card: idCard,
    }).then((res) => {
      this.setState({ isSubmit: true });

      if (res.status !== 1) {
        Toast.info(res.msg, 2, () => {
          this.setState({ isSubmit: true });
        });
        return;
      }
      Toast.info(res.msg, 2, () => {
        history.goBack();
      });
    });
  };

  render() {
    const { history, userM4DStore } = this.props;
    const {
      localeStore: {
        locale: { RECHARGE, ADDEMAIL, EXTRACT },
      },
    } = this.props;

    const {
      isSubmit,
      imgLoading,
      files1,
      files2,
      files3,
      topupData,
      idCard,
      trueName,
    } = this.state;
    return (
      <div id="Renzheng">
        <AccountHeader />
        <div className="it_title">实名认证</div>

        {/* <div
          onClick={() => {
            this.goTibi();
          }}
          className="goto-jilu"
        >
          <img src={jiluIcon} alt="" />
        </div> */}
        <div className="main-box">
          <div className="row">
            <h4>真实姓名</h4>

            <div className="input-box">
              <input
                type="text"
                placeholder={"请输入真实姓名"}
                value={trueName}
                onChange={(e) => {
                  this.onInputChange(e, "trueName");
                }}
                // onBlur={this.onNumberBlur}
              />
            </div>
          </div>
          <div className="row">
            <h4>身份证号</h4>

            <div className="input-box">
              <input
                type="text"
                placeholder={"请输入身份证号"}
                value={idCard}
                onChange={(e) => {
                  this.onInputChange(e, "idCard");
                }}
                // onBlur={this.onNumberBlur}
              />
            </div>
          </div>
        </div>

        {/* 上传身份证 */}
        <div className="up_box">
          <h4>上传身份信息(图片小于8M)</h4>
          <div className="img_list">
            <div className="every_upimg">
              <ImagePicker
                files={files1}
                onChange={this.onChange1}
                onImageClick={(index, fs) => console.log(index, fs)}
                selectable={files1.length < 1 && !imgLoading}
                multiple={false}
                length={1}
                // accept="image/png,image/gif,image/jpeg,image/jpg,"
                accept="image/*"
                className="tx_img"
              />
            </div>
            <div className="every_upimg">
              <ImagePicker
                files={files2}
                onChange={this.onChange2}
                onImageClick={(index, fs) => console.log(index, fs)}
                // selectable={files2.length < 1 && !imgLoading}
                selectable={files2.length < 1}
                multiple={false}
                length={1}
                // accept="image/png,image/gif,image/jpeg,image/jpg,"
                accept="image/*"
                className="gh_img"
              />
            </div>
            <div className="every_upimg">
              <ImagePicker
                files={files3}
                onChange={this.onChange3}
                onImageClick={(index, fs) => console.log(index, fs)}
                // selectable={files3.length < 1 && !imgLoading}
                selectable={files3.length < 1}
                multiple={false}
                length={1}
                // accept="image/png,image/gif,image/jpeg,image/jpg,"
                accept="image/*"
                className="sc_img"
              />
            </div>
          </div>
        </div>
        <p className="sfz-sm">
          <span>身份证头像面</span>
          <span>身份证国徽面</span>
          <span>手持身份证</span>
        </p>
        <div className="btn-box">
          <Button
            activeClassName="active"
            className="primary-button"
            disabled={!this.canSubmit() || !isSubmit || imgLoading}
            onClick={this.onSubmit}
          >
            {(imgLoading && "图片上传中") || "立即上传"}
          </Button>
        </div>
        <div className="tishi-box">
          <h4>尊敬的用户您好：</h4>
          <p>
            <li>
              根据国家相关要求，请您如实填写您的本人的身份信息并完成身份证头像面，身份证国徽面，以及您本人手持身份证的照片上传。
            </li>
            <li>
              请确保您提交的身份材料照片无水印，无污渍，文字和头像信息清晰完整，照片勿进行PS处理，或冒用他人信息。如您未按要求填写信息或上传相关资料，您可能将无法使用您账户的部分功能。
            </li>
            <li>
              提交实名身份验证信息即代表您已知晓imeta平台的相关风险并愿意自愿参与，自担风险。同时您需保证不适用本账户从事任何非法活动，如有违反，您将承担一切相应的法律责任。
            </li>
          </p>
        </div>
      </div>
    );
  }
}

export default Renzheng;
