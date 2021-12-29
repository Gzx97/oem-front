import React, { Component } from 'react'
import { Icon, Toast, ImagePicker, WingBlank, SegmentedControl, Button } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi,CommodityApi } from '../../api'
import { TOAST_DURATION } from '../../utils/constants'
import './Certificate.scss'
import AccountHeader from "../../components/partial/AccountHeader"
import InfiniteScroll from 'react-infinite-scroll-component'
import { remove } from 'fs-extra'

import {
  getQueryString,
} from "../../utils/format";
@inject('userM4DStore')
@inject('localeStore')
@observer
class Certificate extends Component {

  state = {
    files: [],//文件列表
    multiple: false,//是否支持多选
    reason: '',//条件
    serviceArr: [],//歷史記錄數組
    showBigImg: false,//查看大圖
    bigSrc: '',//大圖src
    imgLoading: false,//上傳中
    upImgArr: [],//要上傳的圖片
    page: 1,
    pageSize: 10,
    hasMore: false,
    isSubmit: true,
    valueLength: 0,
  }


  componentDidMount() {
    let _this = this
    const { userM4DStore, history, } = this.props

    userM4DStore.getUserStatus()
  }

  componentWillUnmount() {
    window.onresize = null
  }
  // 上傳图片
  onChange = (files, type, index) => {
    let _this = this
    console.log(files, type, index);
    const { userM4DStore, history, } = this.props
    const { upImgArr } = this.state

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
    }
    if (type === 'remove') {
      let removeImgArr = upImgArr
      removeImgArr.remove(index)
      console.log(removeImgArr)
      _this.setState({
        files: files,
        upImgArr: removeImgArr
      })
      return
    }
    this.setState({
      files: files,
      imgLoading: true,
    })
    CommodityApi.uploadphoto({ open_id: userM4DStore.openid, file: files[files.length - 1].file }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            imgLoading: false,
            files: [],
            upImgArr: [],
          })
        })
        return
      }
      let arr = upImgArr
      arr.push(res.data.fileUrl)
      _this.setState({
        imgLoading: false,
        upImgArr: arr
      }, () => {
        // console.log(upImgArr)
      })
      // console.log(arr)
    })

  }
  // 文字
  onInputChange = (e, key) => {
    const { localeStore: { locale: { CUSTOMERSERVIXE } } } = this.props;
    let _this = this
    const { value } = e.target
    console.log(value)
    this.setState({
      valueLength: value.length
    })
    if (value.length > 200) {
      Toast.info(CUSTOMERSERVIXE.MORE_INPUT, 1, () => {
        _this.setState({
          valueLength: 0,
        })
      })
      return
    }
    this.setState({ [key]: value })
  }


  // 格式化圖片
  imgToArr = (str) => {
    console.log(str)
    let _this = this
    let gzx = 'https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1590584610.jpg|https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1590584613.jpg|https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1590584618.jpg|'
    console.log(gzx.split('|'))
    let gzxArr = gzx.split('|')
    gzxArr.pop()
    gzxArr.map((item, index) => {
      return (
        <img
          onClick={() => {
            _this.setState({
              bigSrc: item,
              showBigImg: true,
            })
          }}
          src={item} />
      )
    })
  }
  // gzxtest = () => {//测试事件

  // }
  //提交問題
  onSubmit = () => {
    const { localeStore: { locale: { CUSTOMERSERVIXE } } } = this.props;
    const { history, userM4DStore } = this.props;
    const { upImgArr, files, reason, showBigImg, serviceArr, imgLoading } = this.state;
    let _this = this;
    this.setState({ isSubmit: false })
    console.log(reason)
    // console.log(upImgArr)
    let imgStr = ''
    upImgArr.map((item, index) => {
      imgStr += item + '|'
    })
    console.log(imgStr)
    // console.log(imgStr.split('|'))
    CommodityApi.payok({ 
      open_id: userM4DStore.openid,  
      img: imgStr,
      order_id: getQueryString("orderId"),
     }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            isSubmit: true
          })
        })
        return
      }
      Toast.info(res.msg, 1, () => {
        // this.props.history.goBack()
        this.props.history.push('/collection')
      })
    })

  }
  render() {
    const { localeStore: { locale: { CUSTOMERSERVIXE } } } = this.props;
    const { history } = this.props;
    const { upImgArr, imgLoading, showBigImg, files, reason, serviceArr, bigSrc, hasMore, isSubmit } = this.state;
    const unSubmit = ! upImgArr.length>0 || !isSubmit;
    return (
      <div id="Certificate">
        <AccountHeader />
        <div className='it_title'>支付凭证</div>
        {showBigImg &&
          <div onClick={() => {
            this.setState({
              showBigImg: false,
              bigSrc: '',
            })
          }} className='big_img'>
            <img src={bigSrc} />
          </div>
        }

        <div className='reason_box'>
          <div className='reason_textarea'>
            请提交本次支付的相关凭证
          </div>

          <ImagePicker
            files={files}
            onChange={this.onChange}
            onImageClick={(index, fs) => console.log(index, fs)}
            selectable={files.length < 3 && !imgLoading}
            multiple={this.state.multiple}
            length={3}
            // accept="image/png,image/gif,image/jpeg,image/jpg,"
            accept="image/*"
          />
          <div className="btn-box">
            <Button
              // activeClassName="active"
              className="primary-button"
              disabled={unSubmit || imgLoading}
              onClick={() => { this.onSubmit() }}>
              {imgLoading &&
                CUSTOMERSERVIXE.UPLOADING || CUSTOMERSERVIXE.TIJIAO
              }

            </Button>
          </div>
        </div>
    
      </div>
    )
  }
}

export default Certificate
