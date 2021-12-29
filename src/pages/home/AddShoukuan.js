import React, { Component } from "react";
import { Button, Toast, ImagePicker } from "antd-mobile";
import { inject, observer } from "mobx-react";
import { REG, TOAST_DURATION, COUNT_DOWN } from "../../utils/constants";
import { CommodityApi, UserApi } from "../../api";
import { isEmail, isMobile, isIdcard, isName } from "../../utils/reg";
import { Icon } from "antd-mobile";

import "./AddShoukuan.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { getQueryString } from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class AddShoukuan extends Component {
  state = {
    copyValue: "",
    files1: [], //文件列表
    multiple: false, //是否支持多选
    imgLoading: false, //上傳中
    upImgArr: [], //要上傳的圖片
    isSubmit: true,

    bankUser: "", //真实姓名
    bankNumber: "", //账号
    bankId: "",
    bankName: "",
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;

    userM4DStore.getUserStatus();
    this.setState({
      files1:
        (getQueryString("code_img") !== "null" && getQueryString("code_img")&& [
          {
            url: getQueryString("code_img"),
            id: "2121",
          },
        ]) ||
        [],
      upImgArr:
        (getQueryString("code_img") !== "null"&& getQueryString("code_img")&& [
          getQueryString("code_img"),
        ]) ||
        [],
      bankUser:
        (getQueryString("bank_number") &&
          decodeURI(getQueryString("bank_user"))) ||
        "", //真实姓名
      bankNumber:
        (getQueryString("bank_number") &&
          decodeURI(getQueryString("bank_number"))) ||
        "", //账号
        bankName:
        (getQueryString("bank_name") &&
          decodeURI(getQueryString("bank_name"))) ||
        "", //银行名称
      bankId: (getQueryString("id") && decodeURI(getQueryString("id"))) || "",
    });
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

  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  canSubmit = () => {
    const { bankNumber, bankUser, bankName } = this.state;
    if (decodeURI(getQueryString("type")) == "银行卡") {
      return !!(bankUser && bankNumber && bankName);
    } else {
      return !!(bankUser && bankNumber);
    }
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
      _this.setState({
        imgLoading: false,
        upImgArr: arr,
      });
    });
  };

  onSubmit = () => {
    //确认添加
    const {
      localeStore: {
        locale: { RECHARGE },
      },
    } = this.props;
    let _this = this;

    const { userM4DStore, history } = this.props;
    const { bankUser, bankNumber, upImgArr, bankId, bankName } = this.state;

    if (!bankUser || !bankNumber) {
      Toast.info("Error");
      return;
    }
    this.setState({ isSubmit: false });
    // let imgStr = "";
    // upImgArr.map((item, index) => {
    //   imgStr += item + "|";
    // });
    CommodityApi.addBank({
      open_id: userM4DStore.openid,
      code_img: upImgArr[0],
      bank_user: bankUser,
      bank_number: bankNumber,
      bank_type: decodeURI(getQueryString("type")),
      id: bankId,
      bank_name: bankName,
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

    const { isSubmit, imgLoading, files1, bankNumber, bankUser, bankName } =
      this.state;
    return (
      <div id="AddShoukuan">
        <AccountHeader />
        <div className="it_title">
          {(getQueryString("id") && "编辑") || "添加"}
          {decodeURI(getQueryString("type"))}收款
        </div>
        <div className="main-box">
          <div className="row">
            <h4>姓名</h4>

            <div className="input-box">
              <input
                type="text"
                placeholder={"请输入姓名"}
                value={bankUser}
                onChange={(e) => {
                  this.onInputChange(e, "bankUser");
                }}
                // onBlur={this.onNumberBlur}
              />
            </div>
          </div>
          <div className="row">
            <h4>{decodeURI(getQueryString("type"))}账号</h4>

            <div className="input-box">
              <input
                type="text"
                placeholder={"请输入账号"}
                value={bankNumber}
                onChange={(e) => {
                  this.onInputChange(e, "bankNumber");
                }}
                // onBlur={this.onNumberBlur}
              />
            </div>
          </div>
          {decodeURI(getQueryString("type")) == "银行卡" && (
            <div className="row">
              <h4>银行名称</h4>

              <div className="input-box">
                <input
                  type="text"
                  placeholder={"请输入您的银行名称"}
                  value={bankName}
                  onChange={(e) => {
                    this.onInputChange(e, "bankName");
                  }}
                  // onBlur={this.onNumberBlur}
                />
              </div>
            </div>
          )}
        </div>

        {/* 上传身份证 */}
        {decodeURI(getQueryString("type")) !== "银行卡" && (
          <div className="up_box">
            <h4>上传收款码</h4>
            <div className="img_list">
              <div className="every_upimg">
                <ImagePicker
                  files={files1}
                  onChange={this.onChange1}
                  onImageClick={(index, fs) => console.log(index, fs)}
                  selectable={files1.length < 1 && !imgLoading}
                  multiple={false}
                  length={3}
                  // accept="image/png,image/gif,image/jpeg,image/jpg,"
                  accept="image/*"
                  className="tx_img"
                />
              </div>
            </div>
          </div>
        )}

        <div className="btn-box">
          <Button
            activeClassName="active"
            className="primary-button"
            disabled={!this.canSubmit() || !isSubmit || imgLoading}
            onClick={this.onSubmit}
          >
            {(imgLoading && "图片上传中") || "确认"}
          </Button>
        </div>
        <div className="tishi-box">
          <h4>特别提示：</h4>
          <p>
            <li>
              请确保添加的收款信息为您本人经过实名认证的身份所对应的收款信息，如因添加信息不正确导致的资金损失，平台概不负责。
            </li>
          </p>
        </div>
      </div>
    );
  }
}

export default AddShoukuan;
