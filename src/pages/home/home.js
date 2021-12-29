import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import { TOAST_DURATION } from "../../utils/constants";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";
import { BiToDaxie, lastsix } from "../../utils/format";
import LOGO from "../../assets/images/imeta/home/logo_tm.png";
import LIWU from "../../assets/images/imeta/home/liwu.png";
import TKIMG from "../../assets/images/imeta/home/home_tk.png";
import LOADING from "../../assets/images/loading.gif";
import Swiper from "swiper";
import "./swiper.scss";
import "./home.scss";
// import Circle from 'sanyuelanv-circle'
import { Button, Toast, Tabs, Modal, Icon } from "antd-mobile";
import { CommodityApi, OtherApi } from "../../api";
import $ from "jquery";
// import QrCode from 'qrcode.react'
// import Slider from 'react-slick'
// import './Slider.scss'
import {
  formatWalletPrice,
  getUrlParam,
  subZeroAndDot, //去掉多余0
} from "../../utils/format";
import "./swiper.scss";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Home extends Component {
  state = {
    copyValue: "", //复制文字
    bannerList: [],
    boxList: [], //盲盒列表
    commodityList: [], //藏品列表
    tzModal: false, //通知弹窗
  };
  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;

    // Cookies.set("RID", getUrlParam("rid") || Cookies.get("RID"), {
    //   expires: 365,
    // });
    // if (!userM4DStore.isOnline()) {
    //   Toast.info("请先登录", 2, () => history.push("/login"));
    //   return;
    // }
    userM4DStore.getUserStatus();
    // 获取个人信息
    // userM4DStore.getUserInfo({ open_id: userM4DStore.openid }).then(res => {
    //   // console.log(res)
    //   if (res.status !== 1) {
    //     Toast.info(res.msg, 2)
    //     return
    //   }
    //   // console.log(res)
    //   _this.setState({
    //     newNoticeInfo: res.data.notice && res.data.notice.content
    //   })
    // })
    // swiper
    // this.getBanner();
    this.getCommodityIndex();
    // setTimeout(() => {
    //   if (!Cookies.get("FIRST_LOG")) {
    //     this.setState({ tzModal: true }, () => {
    //       Cookies.set("FIRST_LOG", "true", 365);
    //     });
    //   }
    // }, 500);
  }
  componentWillUnmount() {
    Cookies.set("HMTAG", this.state.tag_page);
    window.onresize = null;
  }

  // getBanner = () => {
  //   let _this = this;
  //   OtherApi.banner().then((res) => {
  //     if (res.status !== 1) {
  //       Toast.info(res.msg);
  //       return;
  //     }
  //     _this.setState(
  //       {
  //         bannerList: res.data,
  //       },
  //       () => {
  //         let bannerSwiper = new Swiper(".swiper-container-card", {
  //           // direction: 'vertical', // 垂直切换选项
  //           // loop: true, // 循环模式选项
  //           effect: "fade",
  //           pagination: {
  //             el: ".swiper-pagination",
  //             dynamicBullets: true,
  //           },
  //           autoplay: {
  //             delay: 3000, //3秒切换一次
  //           },
  //         });
  //       }
  //     );
  //   });
  // };

  componentWillUnmount() {
    // window.onresize = null
  }

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
  getCommodityIndex = () => {
    let _this = this;
    const { userM4DStore, history } = this.props;
    CommodityApi.commodityIndex({ open_id: userM4DStore.openid }).then(
      (res) => {
        // console.log(res)
        if (res.status !== 1) {
          Toast.info(res.msg, 2);
          return;
        }
        _this.setState(
          {
            bannerList: res.data.banner,
            boxList: res.data.box,
            commodityList: res.data.commodity,
          },
          () => {
            let bannerSwiper = new Swiper(".swiper-container-card", {
              // direction: 'vertical', // 垂直切换选项
              // loop: true, // 循环模式选项
              effect: "fade",
              pagination: {
                el: ".swiper-pagination",
                dynamicBullets: true,
              },
              autoplay: {
                delay: 3000, //3秒切换一次
              },
            });
          }
        );
      }
    );
  };
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { WALLET },
        lang,
      },
    } = this.props;
    const { copyValue, boxList, bannerList, commodityList, tzModal } =
      this.state;
    return (
      <InfiniteScroll
        refreshFunction={() => {
          window.location.reload();
        }}
        pullDownToRefresh
        pullDownToRefreshThreshold={80}
        pullDownToRefreshContent={
          <h3 style={{ textAlign: "center" }}>&#8595; 下拉刷新</h3>
        }
        releaseToRefreshContent={
          <h3 style={{ textAlign: "center", fontWeight: "400" }}>
            &#8593;{"松开立即刷新"}
          </h3>
        }
      >
        <div id="home">
          {/* 复制 */}
          <textarea
            style={{ opacity: "0", position: "fixed", top: "-1000px" }}
            readOnly
            id="textCopy"
            value={copyValue}
          ></textarea>

          <header>
            <div className="head_left">
              <img src={LOGO}></img>
              <span>IMETA</span>
            </div>
            <div
              // style={{display:'none'}}
              onClick={() => {
                // Toast.info('敬请期待！')
                history.push("/CollectionJifenDetail?id=520");
              }}
              className="head_right"
            >
              <span>活动</span>

              <img src={LIWU}></img>
            </div>
          </header>
          {/* 顶部轮播和公告 */}
          <div className="top_box">
            {/* 轮播banner */}
            <div className="home_banner">
              <div className="swiper-container-card">
                <div className="swiper-wrapper">
                  {bannerList.map((item, index) => {
                    return (
                      <div
                        onClick={() => {
                          console.log(item.link_url);
                          item.link_url && history.push("/" + item.link_url);
                        }}
                        key={item.id}
                        className="swiper-slide"
                      >
                        <img src={item.img || LOADING} />
                      </div>
                    );
                  })}
                </div>
                <div className="swiper-pagination"></div>
              </div>
            </div>
          </div>

          {/* 精选盲盒 */}
          <div className="commodity_box">
            <div className="title_2">
              <span>精选盲盒</span>
              {/* <span>精选产品</span> */}
              <span
                onClick={() => {
                  history.push("/AllBindBox");
                }}
              >
                查看全部
              </span>
            </div>
            <ul className="sp_list">
              {(boxList.length > 0 &&
                boxList.map((item, index) => {
                  return (
                    <li
                      onClick={() => {
                        history.push("/BuyBlindBox?id=" + item.id);
                      }}
                      key={item.id}
                    >
                      <div className="img_box">
                        <img src={item.face || LOADING} />
                      </div>

                      <h2>{item.box_name}</h2>
                      <span>￥{item.price}</span>
                    </li>
                  );
                })) || <NoData msg={"暂无盲盒"} />}
            </ul>
          </div>
          {/* 中间广告 */}
          <div className="advertise">
            <div className="every_gg">
              <img src="https://oss.ctm-ib.com/imetafaq/faq_E021631952524.png" />

              <span>正版授权</span>
            </div>
            <div className="every_gg">
              <img src="https://oss.ctm-ib.com/imetafaq/faq_CB41631953260.png" />

              <span>防伪溯源</span>
            </div>
            <div className="every_gg">
              <img src="https://oss.ctm-ib.com/imetafaq/faq_CEE1631952529.png" />
              <span>限量藏品</span>
            </div>
          </div>

          {/* 精选藏品 */}
          <div className="commodity_box">
            <div className="title_2">
              <span>精选藏品</span>
              <span
                onClick={() => {
                  history.push("/AllCollection");
                }}
              >
                查看全部
              </span>
            </div>
            {(commodityList.length > 0 && (
              <ul className="sp_list mh_list">
                {/* <li onClick={()=>{history.push('/Buy️Collection')}}> */}
                {commodityList.map((item, index) => {
                  return (
                    <li
                      key={item.id}
                      onClick={() => {
                        history.push("/CollectionDetail?id=" + item.id);
                      }}
                    >
                      {item.integral_return > 0 && (
                        <div className="huodong">活动</div>
                      )}

                      <div className="img_box">
                        <img src={item.p_face || LOADING} />
                      </div>

                      <h2>{item.p_name}</h2>
                      <span>总量：{item.f_count}</span>
                    </li>
                  );
                })}
              </ul>
            )) || <NoData msg={"暂无推荐藏品"} />}
          </div>

          {/* 弹窗公告 */}
          {tzModal && (
            <div className="my_modal">
              <div className="modal_mask"> </div>
              <div className="modal_content animate__animated animate__bounceIn">
                <div className="huodong_box">
                  <div className="img_box">
                    <img src={TKIMG}></img>
                  </div>
                  <div className="hd_bot_box">
                    <h2>社群开放通知</h2>
                    <p>
                      加加入IMETA官方社群，第一时间掌握最新资讯和行业动态，并有机会领取各种专属权益，请添加管理员微信进群。
                      <br></br> 管理员微信号: imeta888
                    </p>
                    <div
                      onClick={() => {
                        history.push("/noticeDetail?id=" + "8");
                      }}
                      className="ck_btn"
                    >
                      查看详情
                    </div>
                  </div>
                  <div className="close_box">
                    <Icon
                      onClick={() => {
                        this.setState({ tzModal: false });
                      }}
                      type={"cross-circle"}
                      size="lg"
                    ></Icon>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </InfiniteScroll>
    );
  }
}

export default Home;
