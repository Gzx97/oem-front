import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
// import CopyIcon from '../../assets/images/imeta/fuzhi.png'

import {
  formatWalletPrice,
  formatTime,
  subZeroAndDot,
  lastsix,
} from "../../utils/format";
// import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
import "./TradRecord.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";

@inject("userM4DStore")
@inject("localeStore")
@observer
class TradRecord extends Component {
  state = {
    records: [],
    page: 1, //当前页码
    pageSize: 20, //每页条数
    hasMore: false,
    copyValue: "",
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    // const {
    //   localeStore: {
    //     locale: { TIBIRECORD },
    //   },
    // } = this.props;
    // if (!userM4DStore.isOnline()) {
    //   Toast.info(TIBIRECORD.PLEASE_LOGIN, 2, () => history.push("/login"));
    //   return;
    // }
    userM4DStore.getUserStatus();
    this.commodityOrder().then();
  }

  componentWillUnmount() {
    window.onresize = null;
  }
  commodityOrder = async () => {
    let _this = this;
    const { page, pageSize, records } = this.state;
    const { userM4DStore } = this.props;
    await userM4DStore.getUserStatus();
    CommodityApi
      .commodityOrder({
        page: page,
        row: pageSize,
        open_id: userM4DStore.openid,
      })
      .then((res) => {
        if (res.status !== 1) {
          Toast.info(res.msg);
          return;
        }
        const arr = res.data;
        const hasMore = arr.length === pageSize;
        records.push(...arr);
        this.setState({ records, hasMore, page: hasMore ? page + 1 : 1 });
        //  this.setState({ records: res.data }, () => {
        //    console.log(_this.state.records)
        //  })
      });
  };

  getStatusLabel(status) {
    // const {
    //   localeStore: {
    //     locale: { WITHDRAW_RECORD }
    //   }
    // } = this.props
    // const {
    //   localeStore: {
    //     locale: { TIBIRECORD },
    //   },
    // } = this.props;

    //状态，0待审核，1转出中，2转出成功，3审核拒绝
    switch (status) {
      case 0:
        return {
          // label: TIBIRECORD.DAI_SHEN_HE,
          // className: 'loading'
          label: "未支付",
          className: "pending",
        };
      case 1:
        return {
          label: "已支付",
          className: "succeed",
        };
      case 2:
        return {
          label: "已退款",
          className: "danger",
        };
      case 3:
        return {
          label: "已取消",
          className: "danger",
        };
      default:
        return {
          label: "",
          className: "",
        };
    }
  }

  // 复制文字
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

        document.execCommand("Copy"); // 执行浏览器复制命令
        if (document.execCommand("Copy")) {
          Toast.info(ORDER.FZCG, 1);
        } else {
          if (window.webkit) {
            window.webkit.messageHandlers.CopyText.postMessage(e);
            Toast.info(ORDER.FZCG, 1);
          } else {
            Toast.info(ORDER.FZSB, 1);
          }
        }
      }
    );
  };
  render() {
    const { history } = this.props;
    const { records, hasMore, copyValue } = this.state;
    const {
      localeStore: {
        locale: { TIBIRECORD },
      },
    } = this.props;

    return (
      <div id="TradRecord">
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>
        <AccountHeader />
        <div className="it_title">交易记录</div>
        {records.length === 0 && <NoData />}
        {/*流水 */}
        <InfiniteScroll
          dataLength={records.length} //This is important field to render the next data
          next={this.commodityOrder}
          hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {records.length <= 0 ? "" : ""}
            </p>
          }
        >
          <ul>
            {records.map((item, index) => {
              return (
                <li key={item.id}>
                  <h2>{}</h2>
                  <p>时间：{formatTime(item.addTime)}</p>
                  <p>编号：{item.id}</p>
                  <div className="time-address">藏品：{item.pName}</div>
                  <div className="time-address">
                    藏家：{item.userName}
                  </div>
                  <p>状态：{this.getStatusLabel(item.status).label}</p>

                </li>
              );
            })}

          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default TradRecord;
