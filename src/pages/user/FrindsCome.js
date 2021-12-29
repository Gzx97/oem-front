import React, { Component } from 'react'
import { Icon, Toast, Button } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi } from '../../api'
import { CopyToClipboard } from 'react-copy-to-clipboard'
import FuzhiImg from '../../assets/images/fuzhi.png'

// import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
// import successIcon from '../../assets/images/success_icon.png'
// import groupIcon from '../../assets/images/FENGYUNcao/user/group_icon.png'
// import groupIcon from '../../assets/images/gambidding/user/group_icon.png'
// import frindCard from '../../assets/images/domino/user/frind_card.png'

import './FrindsCome.scss'
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from 'react-router-dom'
import QrCode from 'qrcode.react'
@inject('userM4DStore')
@inject('localeStore')
@observer
class FrindsCome extends Component {
  state = {
    recommendCode: '',//邀请码
    copyValue: '',
  }

  componentDidMount() {
    let _this = this
    const { history, userM4DStore } = this.props;
    const { localeStore: { locale: { FRINDSCOME } } } = this.props;
    if (!userM4DStore.isOnline()) {
      Toast.info(FRINDSCOME.PLEASE_LOGIN, 2, () => history.push('/login'));
      return
    }
    // console.log(window.location.origin)
    userM4DStore.getUserStatus()
    userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then(
      res => {
        // console.log(res)
        _this.setState({
          userInfo: '',
          recommendCode: res.data.recommendCode,
        }, () => {
          // console.log(_this.state.recommendCode)
        })
      }
    )
  }

  componentWillUnmount() {
    window.onresize = null
  }

  copyText = (e, event) => {
    const { localeStore: { locale: { ORDER } } } = this.props;
    event.stopPropagation();
    this.setState({
      copyValue: e
    }, () => {
      let Url2 = document.getElementById("textCopy");
      Url2.select(); // 选择对象
      // Url2.focus();
      // Url2.blur();
      document.execCommand("Copy"); // 执行浏览器复制命令
      if (document.execCommand("Copy")) {
        Toast.info(ORDER.FZCG, 1)
      } else {
        if (window.webkit) {
          // window.webkit.messageHandlers.CopyText.postMessage(e);
          window.webkit.messageHandlers.CopyText.postMessage(e);
          Toast.info(ORDER.FZCG, 1)


        } else {
          Toast.info(ORDER.FZSB, 1)
        }

      }
    })


  }

  screenShot = () => {
    var canvas = document.getElementById('qrCode');
    var type = 'png';
    var d = document.getElementById("qrCode");
    var imgdata = d.toDataURL(type);
    //2.0 将mime-type改为image/octet-stream,强制让浏览器下载
    var fixtype = function (type) {
      type = type.toLocaleLowerCase().replace(/jpg/i, 'jpeg');
      var r = type.match(/png|jpeg|bmp|gif/)[0];
      return 'image/' + r;
    };
    imgdata = imgdata.replace(fixtype(type), 'image/octet-stream');
    //3.0 将图片保存到本地
    var date = new Date();
    var filename = '' + 'DMO' + date.getHours() + ':' + date.getMinutes() + ":" + date.getSeconds() + '.' + type;
    this.savaImage(imgdata, filename);
  };

  savaImage = (data, filename) => {
    var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
    save_link.href = data;
    save_link.download = filename;
    var event = document.createEvent('MouseEvents');
    event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    save_link.dispatchEvent(event);
  };

  render() {
    const { history, userM4DStore } = this.props;
    const { recommendCode, copyValue } = this.state;
    const { localeStore: { locale: { FRINDSCOME } } } = this.props;

    return (
      <div id="frindsCome">
        <textarea style={{ opacity: '0', position: 'fixed', top: '-1000px' }} readOnly id='textCopy' value={copyValue}></textarea>

        <AccountHeader />
        <div className='it_title'>{FRINDSCOME.FRIND_COME}</div>
        {/* 二维码 */}
        <div className='friends_card'>
          <p>邀请好友注册IMETA</p>
          <div className='saomiao'>{FRINDSCOME.SMXZ}</div>
          <div className='code_box'>
            <div className='canvas_code'>
              <QrCode
                includeMargin={true}
                level={'L'}
                value={window.location.origin+'/RegisterDownload?code=' + recommendCode}
                size={213}
                // fgColor="white"
                // bgColor="rgba(0,0,0,0)"
                id="qrCode" />
            </div>
          </div>
          <div onClick={(event) => { this.copyText(recommendCode, event) }} className='yaoqingma'>
            {recommendCode}<img src={FuzhiImg} />
          </div>
          {/* <div nClick={(event) => { this.copyText('www.baidu.com', event) }} className='yaoqing_link'>复制邀请链接</div> */}
        </div>
        <div className="btn-box">
          <Button
            // activeClassName="active"
            className="primary-button"
            onClick={(event) => { this.copyText(window.location.origin+'/RegisterDownload?code=' + recommendCode, event) }}>
            {FRINDSCOME.FZYQLJ}
            </Button>
        </div>
      </div>
    )
  }
}

export default FrindsCome
