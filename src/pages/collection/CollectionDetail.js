import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import NoData from "../../components/common/NoData";
import Swiper from "swiper";
import AccountHeader from "../../components/partial/AccountHeader";
import ShareIcon from "../../assets/images/fenxiang.png";
import "./swiper.scss";
import "./CollectionDetail.scss";
// import Circle from 'sanyuelanv-circle'
import { Button, Toast, Tabs, Modal, Icon } from "antd-mobile";
import { CommodityApi, OtherApi } from "../../api";
import F2 from "@antv/f2";

import {
  formatZeroNumber,
  formatWalletPrice,
  getQueryString,
  // iosTrouchFn,
  formatTime,
  formatDataHourTime,
  subZeroAndDot, //去掉多余0
} from "../../utils/format";
import "./swiper.scss";
// console.log(walletData)
let myDetailSwiper = {};
@inject("userM4DStore")
// @inject('propertyM4DStore')
@inject("localeStore")
@observer
class CollectionDetail extends Component {
  state = {
    copyValue: "", //复制文字
    bannerList: [],
    cpData: {},
    showBigImg: false,
    bigSrc: "",
    price_data: [],
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
    this.commodityview();
    this.getCurve();
  }
  componentWillUnmount() {
    window.onresize = null;
  }

  componentWillUnmount() {
    // window.onresize = null
  }

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
          bannerList: res.data.imglist,
        },
        () => {
          var bannerSwiper = new Swiper(".swiper-container-card", {
            // direction: 'vertical', // 垂直切换选项
            // loop: true, // 循环模式选项
            effect: "cube",
            pagination: {
              el: ".swiper-pagination",
              dynamicBullets: true,
            },
            autoplay: {
              delay: 3000, //3秒切换一次
            },
          });
          myDetailSwiper = bannerSwiper;
        }
      );
    });
  };
  // 价格曲线
  getCurve = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.getCurve({
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
          price_data: res.data,
        },
        () => {
          res.data.length > 1 && _this.drawF2Chart();
        }
      );
    });
  };
  // 生成图表
  drawF2Chart = () => {
    // 移动端图表2
    let { price_data } = this.state;
    console.log(price_data);
    let CP_datanew = [];
    price_data.map((item, index) => {
      CP_datanew.push({ addTime: formatDataHourTime(item.addTime), price:Number(item.price)  });
    });
    CP_datanew.reverse();
    const chart = new F2.Chart({
      id: "container",
      pixelRatio: window.devicePixelRatio,
      padding: [20, 5, 50, 10],
      appendPadding: "0",
    });
    chart.source(CP_datanew, {
      addTime: {
        // type: "timeCat",
        tickCount: 7,
        range: [0, 1], //不设置的话会有边距问题
      },
      price: {
        tickCount:7,
        min: 0,
      },
    });
    chart.tooltip({
      // custom: true,
      showCrosshairs: true,
      crosshairsStyle: {
        stroke: "#FFFFFF",
        lineWidth: 1,
      }, // 配置辅助线的样式
      showItemMarker: false,
      onShow: function onShow(ev) {
        const items = ev.items;
        // console.log(items)
        items[0].name = items[0].title;
        items[0].value ="￥ "+ formatWalletPrice(items[0].value) ;
      },
    });
    // chart.tooltip(false);
    chart.area().position("addTime*price").color("l(90) 0:#EE5035 1:#E32A2A");
    // .shape("smooth");
    chart.line().position("addTime*price").color("l(90) 0:#EE5035 1:#E32A2A");
    // .shape("smooth");

    // chart.axis("price", {
    //   label: null,
    //   tickLine: null,
    // });
    chart.axis("addTime", {
      label: null,
      tickLine: null,
      line: null,
    });

    chart.axis("price", false); //背景线
    chart.render();
  };
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { WALLET },
        lang,
      },
    } = this.props;
    const { price_data, cpData, bannerList, showBigImg, bigSrc } = this.state;
    return (
      <div id="CollectionDetail">
        <AccountHeader />

        <div className="it_title">藏品</div>
        <div className="goto-jilu">{/* <img src={ShareIcon} /> */}</div>
        {/* 顶部轮播 */}
        <div className="top_box">
          {/* 轮播banner */}
          <div className="home_banner">
            <div className="swiper-container-card">
              <div className="swiper-wrapper">
                {bannerList.map((item, index) => {
                  return (
                    <div key={index.toString()} className="swiper-slide">
                      <img
                        onClick={() => {
                          this.setState({
                            bigSrc: item.url,
                            showBigImg: true,
                          });
                        }}
                        src={item.url}
                      />
                    </div>
                  );
                })}
              </div>
              <div className="swiper-pagination"></div>
            </div>
          </div>
        </div>
        {/* 小图 */}
        <div style={{ display: "none" }} className="sm_img_box">
          {bannerList.map((item, index) => {
            return (
              <div
                onClick={() => {
                  myDetailSwiper.slideTo(index);
                }}
                key={item.id}
                className="sm_img"
              >
                <img src={item.url} />
              </div>
            );
          })}
        </div>
        <h2>{cpData.pName}</h2>

        {/* 藏品信息 */}
        <div className="cp_info_box">
          {/* <div className="cp_info">
            <span>授权方</span>
            <span>{cpData.issuer}</span>
          </div> */}
          {/* <div className="cp_info">
            <span>总发行</span>
            <span>{cpData.fCount}张</span>
          </div>
          <div className="cp_info">
            <span>盲盒中剩余</span>
            <span>{cpData.boxLast}张</span>
          </div>
          <div className="cp_info">
            <span>稀有程度</span>
            <span>{formatZeroNumber(cpData.xiyou)}%</span>
          </div> */}
          <div className="cp_info">
            <span>剩余可购数</span>
            <span>{cpData.boxLast}张</span>
          </div>
        </div>

        <div className="cp_quxian_box">
          <h3>价格曲线</h3>
          {(price_data.length > 1 && (
            <div className="chart_box">
              <canvas height="108" id="container"></canvas>
            </div>
          )) || <NoData style={{ padding: "2rem 0" }} msg={"暂无交易"} />}
        </div>

        {/* 藏品说明 */}
        <div className="cp_detail_box">
          <h3>产品说明</h3>

          <p
            dangerouslySetInnerHTML={{
              __html: cpData.introduce,
            }}
          ></p>
          <h3>注意事项</h3>
          <p
            dangerouslySetInnerHTML={{
              __html: cpData.remarks,
            }}
          ></p>
        </div>
        {/* 底部 */}
        <footer>
          {/* <span>{(cpData.shoucang === 0 && "未收藏") || "已收藏"}</span> */}
          <span
            onClick={() => {
              // Toast.info('敬请期待')
              history.push("/trade?key=" + encodeURI(cpData.pName));
            }}
          >
            去交易
          </span>
          <span
            onClick={() => {
              history.push("/BuyBlindBox?id=" + cpData.boxId);
            }}
          >
            相关盲盒
            {/* 相关产品 */}
          </span>
        </footer>
        {/* 点击放大 */}
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
      </div>
    );
  }
}

export default CollectionDetail;
