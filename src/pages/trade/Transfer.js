import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import { REG, TOAST_DURATION, COUNT_DOWN } from "../../utils/constants";
import { UserApi, CommodityApi } from "../../api";
import { isEmail, isMobile } from "../../utils/reg";
import { Icon } from "antd-mobile";

// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
import Cookies from "js-cookie";
import CaptchaM4D from "../../components/common/CaptchaM4D";
// import jiluIcon from '../../assets/images/gambidding/property/jilu-icon.png'
import openPwdImg from "../../assets/images/open-pwd-shen.png";
import closePwdImg from "../../assets/images/close-pwd-shen.png";
import "./Transfer.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import JiluIcon from "../../assets/images/jilu.png";

import {
  formatWalletPrice,
  formatTags
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Transfer extends Component {
  state = {
    account: "", //手机号或者邮箱
    code: "", //验证码
    idTo: "", //转出地址
    count: COUNT_DOWN, //时间
    type: "",
    captcha: "",
    isGetSms: true,
    isSubmit: true,
    canGetCode: true, //获取验证码防止重复
    nftInfo:{},//NFT信息
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    const {
      localeStore: {
        locale: { EXTRACT },
      },
    } = this.props;
    console.log( this.props.location.state.info)
    userM4DStore.getUserStatus();
    // console.log(userM4DStore)
    // 获取个人信息
    userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then((res) => {
      // console.log(res)
      _this.setState({
        userInfo: res.data,
        account: res.data.phone || res.data.email || "error",
        usertype: (res.data.phone && "phone") || "email",
        nftInfo :  _this.props.location.state.info,
      });
    });
    // this.getCaptchaPng()//获取图形验证码
    // 转出申请初始化
  }

  componentWillUnmount() {
    // window.onresize = null
    clearTimeout(this.timer);
  }

  onInputChange = (e, key) => {
    const { value } = e.target;
    this.setState({ [key]: value });
  };

  onCountDown = () => {
    //倒计时
    let { count } = this.state;
    this.timer = setTimeout(() => {
      if (count <= 0) {
        this.setState({ isGetSms: false, count: COUNT_DOWN });
        clearTimeout(this.timer);
      } else {
        this.setState({ count: --count });
        this.onCountDown();
      }
    }, 1000);
  };



  getCode = async () => {
    const {
      localeStore: {
        locale: { EXTRACT },
      },
    } = this.props;
    let _this = this;
    const { userM4DStore } = this.props;
    const { canGetCode, account, captcha, captchaKey, tel_num } = this.state;
    // console.log(captcha)
    await _this.setState({ canGetCode: false });
    if (!canGetCode) {
      // console.log('正在获取')
      return;
    }
    userM4DStore
      .getCode(
        {
          captcha,
          account,
          type: "transfer",
          prefix: tel_num,
        },
        { key: captchaKey }
      )
      .then((res) => {
        if (res.status !== 1) {
          Toast.info(res.msg);
          // this.getCaptchaPng()
          _this.setState({ canGetCode: true });
          return;
        }
        this.codeCountDown();
      });
  };
  // 倒计时
  codeCountDown = () => {
    let count = this.state.count;

    this.timer = setInterval(() => {
      if (count <= 0) {
        this.setState({ isGetSms: true, count: COUNT_DOWN });
        this.setState({ canGetCode: true });
        clearInterval(this.timer);
      } else {
        this.setState({ isGetSms: false, count: count-- });
      }
    }, 1000);
  };

  canSubmit = () => {
    const { idTo, captcha, code } = this.state;
    return !!(idTo  && code);
  };
  onSubmit = () => {
    //提交转出
    const {
      localeStore: {
        locale: { EXTRACT },
      },
    } = this.props;
    let _this = this;
    const { account, idTo, nftInfo,code } =
      this.state;
    const { userM4DStore, history } = this.props;
    this.setState({ isSubmit: false });
    if (!isMobile(account) && !isEmail(account)) {
      Toast.info('账号错误');
      return;
    }
  
    CommodityApi
    .transfer({
      open_id: userM4DStore.openid,
      p_id: nftInfo.id,
      transfer_uid: idTo,
      usertype: isMobile(account)&&'phone'||'email',
      code:code,
    })
    .then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 2);
        _this.setState({ isSubmit: true, code: "", captcha: "" });
        // this.getCaptchaPng()//获取图形验证码
        return;
      }
      Toast.info(res.msg, 2 ,()=>{
        history.push('/collection')
      });
    
    })
    .catch(() => this.setState({ isSubmit: true }));
  
  };
  render() {
    const { history, userM4DStore } = this.props;
    const {
      localeStore: {
        locale: { EXTRACT },
      },
    } = this.props;

    const {
      count,
      isSubmit,
      isGetSms,
      idTo, //转出地址
      canGetCode,
      nftInfo,
    } = this.state;
    return (
      <div id="Transfer">
        <AccountHeader onHandle={()=>{history.push('/mineList')}} />
        <div className="it_title">转让NFT</div>

        <div className="goto-jilu">{/* <img src={JiluIcon} /> */}</div>
        <div className="main-box">
          {/* 选择方向 */}
          {/* <div
            onClick={() => {
              history.push("/Transfer");
            }}
            className="direction"
          >
            <span>方向</span>
            <span>
              转让NFT <Icon type={"right"}></Icon>
            </span>
          </div>
        */}
          {/* 选择卡片 */}
          <div onClick={()=>{history.push('/ChooseCollection')}} className="direction_cp">
            <span>转让NFT</span>
            <span>
              选择 <Icon type={"right"}></Icon>
            </span>
          </div>

          {/* 藏品卡片 */}
          <div className="cp_card">
            <div className="cp_top_box">
              <div className="cp_left">
                <div className="img_box">
                  <img
                    src={
                      nftInfo.p_face|| nftInfo.pFace
                    }
                  />
                </div>
              </div>
              <div className="cp_right">
                <h3>{nftInfo.p_name||nftInfo.pName}</h3>
                <div className="cp_tag">
                          {nftInfo.tags&&formatTags(nftInfo.tags).map((i) => {
                            return <span key={i}>#{i}#</span>;
                          })|| <span>#暂无标签#</span>}
                        </div>
                <div className="fxf">授权方：{nftInfo.issuer}</div>
              </div>
            </div>
          </div>

          <div className="row">
            <h4>接收者ID</h4>
            <div className="input-box">
              <input
                type="text"
                placeholder={"请输入接收者ID"}
                value={idTo}
                onChange={(e) => this.onInputChange(e, "idTo")}
              />
            </div>
          </div>

          <div className="row">
            <h4>验证码</h4>

            <div className="input-box">
              <input
                type="text"
                placeholder={"请输入验证码"}
                value={this.state.code}
                onChange={(e) => this.onInputChange(e, "code")}
              />
              <button
                style={(!canGetCode && isGetSms && { opacity: ".5" }) || {}}
                className={!isGetSms ? "count-down" : ""}
                onClick={this.getCode}
              >
                {isGetSms ? "获取验证码" : <span>{`${count}s`}</span>}
              </button>
            </div>
          </div>
        </div>
        <div className="btn-box">
          <Button
            activeClassName="active"
            className="primary-button"
            disabled={!this.canSubmit() || !isSubmit}
            onClick={this.onSubmit}
          >
            确认转让
          </Button>
        </div>
        <div className="tishi-box">
          <h4>友好提示：</h4>
          <p>
            <li>1.刚通过C2C交易获得的NFT在24H内无法转让。</li>
            <li>2.为了保障安全，我们会对NFT转让进行人工审核，请耐心等待。</li>
          </p>
        </div>
      </div>
    );
  }
}

export default Transfer;
