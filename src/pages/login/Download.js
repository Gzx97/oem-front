import React, { Component } from "react";
import { Icon, Modal, Toast, Button } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi, OtherApi } from "../../api";
import "./Download.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from "react-router-dom";
import DP from "../../assets/images/imeta/login/dengpao.png";
import { isIosOrAndroid } from "../../utils/common";
// @inject('userStore')
@inject("localeStore")
@observer
class Download extends Component {
  state = {
    Zhongduan: "",
    urlAndroid:'',
    urlIos: '',
  };

  componentDidMount() {
    OtherApi.appdownload().then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      this.setState({
        urlAndroid: res.data.urlAndroid,
        urlIos: res.data.urlIos,
      });
    });
    console.log(isIosOrAndroid());
    let zd = isIosOrAndroid();

    this.setState({
      Zhongduan: zd, //安卓1 ios2
    });
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  gzxtest = () => {
    //测试事件
  };
  onSubmit = () => {
    const { Zhongduan ,urlAndroid,urlIos} = this.state;
    console.log(Zhongduan);
    if (Zhongduan === 1) {
      window.open(urlAndroid);
    }
    if (Zhongduan === 2) {
      window.open(urlIos);
    }
  };
  render() {
    const { history } = this.props;
    const { Zhongduan } = this.state;
    const {
      localeStore: {
        locale: { DOWNLOAD },
      },
    } = this.props;

    return (
      <div id="Download">
        <AccountHeader />
        <div className="it_title">{DOWNLOAD.ZCWC}</div>
        <div className="down_card">
          <img src={DP} />
          <p>{DOWNLOAD.GXN}</p>
          <p>{DOWNLOAD.SLWCZC}</p>
          <p>{DOWNLOAD.DJZZAPP}</p>
          {/* 按钮 */}
          <div className="btn-box">
            <Button
              // activeClassName="active"
              className="primary-button"
              onClick={this.onSubmit}
            >
              {(Zhongduan === 1 && DOWNLOAD.XZAZ) || DOWNLOAD.XZIOS}
            </Button>
          </div>
        </div>
        {/* <p>完成API授权后才能开始策略，请先前往对应交易所创建API，并在本页中完成绑定授权</p> */}
      </div>
    );
  }
}

export default Download;
