import React, { Component } from "react";
import {
  Icon,
  Toast,
  ImagePicker,
  WingBlank,
  SegmentedControl,
  Button,
} from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi } from "../../api";
import { TOAST_DURATION } from "../../utils/constants";
import "./CustomerService.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { remove } from "fs-extra";
import NoData from "../../components/common/NoData";

const data = [
  {
    url: "https://zos.alipayobjects.com/rmsportal/hqQWgTXdrlmVVYi.jpeg",
    id: "2122",
  },
];
@inject("userM4DStore")
@inject("localeStore")
@observer
class CustomerServiceHistory extends Component {
  state = {
    files: [], //文件列表
    multiple: false, //是否支持多选
    reason: "", //条件
    serviceArr: [], //歷史記錄數組
    showBigImg: false, //查看大圖
    bigSrc: "", //大圖src
    imgLoading: false, //上傳中
    upImgArr: [], //要上傳的圖片
    page: 1,
    pageSize: 10,
    hasMore: false,
    isSubmit: true,
    valueLength: 0,
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    // const { localeStore: { locale: { CUSTOMERSERVIXE } } } = this.props;

    // if (!userM4DStore.isOnline()) {
    //   Toast.info('請先登錄', 1, () => history.push('/login'))
    //   return
    // }
    userM4DStore.getUserStatus();
    // console.log(userM4DStore.openid)
    this.getAasklist().then();
  }

  componentWillUnmount() {
    window.onresize = null;
  }
  // 上傳图片
  onChange = (files, type, index) => {
    let _this = this;
    console.log(files, type, index);
    const { userM4DStore, history } = this.props;
    const { upImgArr } = this.state;

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
        files: files,
        upImgArr: removeImgArr,
      });
      return;
    }
    this.setState({
      files: files,
      imgLoading: true,
    });
    UserApi.uploadphoto({
      open_id: userM4DStore.openid,
      file: files[files.length - 1].file,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            imgLoading: false,
            files: [],
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
      // console.log(arr)
    });
  };
  // 文字
  onInputChange = (e, key) => {
    const {
      localeStore: {
        locale: { CUSTOMERSERVIXE },
      },
    } = this.props;
    let _this = this;
    const { value } = e.target;
    console.log(value);
    this.setState({
      valueLength: value.length,
    });
    if (value.length > 200) {
      Toast.info(CUSTOMERSERVIXE.MORE_INPUT, 1, () => {
        _this.setState({
          valueLength: 0,
        });
      });
      return;
    }
    this.setState({ [key]: value });
  };
  // 获取客服回復
  getAasklist = async () => {
    const { page, pageSize, serviceArr } = this.state;
    const { userM4DStore } = this.props;
    let _this = this;
    await userM4DStore.getUserStatus();
    UserApi.asklist({
      open_id: userM4DStore.openid,
      page: page,
      row: pageSize,
    }).then((res) => {
      if (res.status === 1) {
        const arr = res.data.sort((a, b) => b.addTime - a.addTime);
        const hasMore = arr.length === pageSize;
        serviceArr.push(...arr);
        _this.setState({ serviceArr, hasMore, page: hasMore ? page + 1 : 1 });
        return;
      }
      Toast.info(res.msg);
    });
  };

  // 格式化圖片
  imgToArr = (str) => {
    console.log(str);
    let _this = this;
    let gzx =
      "https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1590584610.jpg|https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1590584613.jpg|https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1590584618.jpg|";
    console.log(gzx.split("|"));
    let gzxArr = gzx.split("|");
    gzxArr.pop();
    gzxArr.map((item, index) => {
      return (
        <img
          onClick={() => {
            _this.setState({
              bigSrc: item,
              showBigImg: true,
            });
          }}
          src={item}
        />
      );
    });
  };
  // gzxtest = () => {//测试事件

  // }
  //提交問題
  onSubmit = () => {
    const {
      localeStore: {
        locale: { CUSTOMERSERVIXE },
      },
    } = this.props;
    const { history, userM4DStore } = this.props;
    const { upImgArr, files, reason, showBigImg, serviceArr, imgLoading } =
      this.state;
    let _this = this;
    this.setState({ isSubmit: false });
    console.log(reason);
    // console.log(upImgArr)
    let imgStr = "";
    upImgArr.map((item, index) => {
      imgStr += item + "|";
    });
    console.log(imgStr);
    // console.log(imgStr.split('|'))
    UserApi.ask({
      open_id: userM4DStore.openid,
      content: reason,
      img_list: imgStr,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg, 1, () => {
          _this.setState({
            isSubmit: true,
          });
        });
        return;
      }
      Toast.info(res.msg, 1, () => {
        window.location.reload();
      });
    });
  };
  render() {
    const {
      localeStore: {
        locale: { CUSTOMERSERVIXE },
      },
    } = this.props;
    const { history } = this.props;
    const {
      valueLength,
      imgLoading,
      showBigImg,
      files,
      reason,
      serviceArr,
      bigSrc,
      hasMore,
      isSubmit,
    } = this.state;
    const unSubmit = reason === "" || !isSubmit;
    return (
      <div id="customerService">
        <AccountHeader />
        <div className="it_title">{CUSTOMERSERVIXE.GDJL}</div>
        <div
          onClick={() => {
            this.props.history.push("/customerService");
          }}
          className="to_out"
        >
          {CUSTOMERSERVIXE.TJGD}
        </div>
        {/* <div
        style={{display:'flex',alignItems:'center',justifyContent:'center'}}
        className='kfrx'>客服热线:13062703996</div> */}
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
            <img src={bigSrc} />
          </div>
        )}

        <div className="history_box">
          {/* <div className='history_title'>{CUSTOMERSERVIXE.HISTORY}</div> */}
          <ul>
            {/* <li>
              <div className='question'>為什麽充值的USDT未到賬?</div>
              <img
                onClick={() => {
                  this.setState({
                    bigSrc: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
                    showBigImg: true,
                  })
                }}
                src={'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'} />
              <img src={'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'} />
              <img src={'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'} />
              <div className='answer'>回復: 可能是鏈上擁堵或者您的充值的地址不正確,請仔細查看地址是否正確</div>
            </li>
            <li>
              <div className='question'>為什麽充值的未到賬?</div>
              <img
                onClick={() => {
                  this.setState({
                    bigSrc: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
                    showBigImg: true,
                  })
                }}
                src={'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'} />
              <div className='answer'>回復: 可能是鏈上擁堵或者您的充值的地址不正確,請仔細查看地址是否正確</div>
            </li> */}

            <InfiniteScroll
              dataLength={serviceArr.length} //This is important field to render the next data
              next={this.getAasklist}
              hasMore={hasMore}
            >
              {(serviceArr.length !== 0 && (
                <ul className="water-card">
                  {serviceArr.map((item, index) => {
                    return (
                      <li key={item.id}>
                        <div className="question">{item.content}</div>
                        {item.imgList &&
                          item.imgList.split("|").map((t, i) => {
                            return (
                              t && (
                                <img
                                  key={t}
                                  onClick={() => {
                                    this.setState({
                                      bigSrc: t,
                                      showBigImg: true,
                                    });
                                  }}
                                  src={t}
                                />
                              )
                            );
                          })}
                        {/* <img
                          onClick={() => {
                            this.setState({
                              bigSrc: 'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg',
                              showBigImg: true,
                            })
                          }}
                          src={'https://zos.alipayobjects.com/rmsportal/PZUUCKTRIHWiZSY.jpeg'} /> */}
                        {item.contentRe && (
                          <div className="answer">
                            {CUSTOMERSERVIXE.HUIFU}
                            {item.contentRe}
                          </div>
                        )}
                      </li>
                    );
                  })}
                </ul>
              )) || (
                // <div className='no_data'>{CUSTOMERSERVIXE.NO_DATA}</div>
                <NoData></NoData>
              )}
            </InfiniteScroll>
          </ul>
        </div>
      </div>
    );
  }
}

export default CustomerServiceHistory;
