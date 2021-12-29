import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
// import CopyIcon from '../../assets/images/imeta/fuzhi.png'

import { formatWalletPrice, downFixed, formatTime } from "../../utils/format";

import "./Coupons.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";

@inject("userM4DStore")
@inject("localeStore")
@observer
class Coupons extends Component {
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
    userM4DStore.getUserStatus();
    this.boxBuyRecord().then();
  }

  componentWillUnmount() {
    window.onresize = null;
  }
  boxBuyRecord = async () => {
    let _this = this;
    const { page, pageSize, records } = this.state;
    const { userM4DStore } = this.props;
    await userM4DStore.getUserStatus();
    CommodityApi.getMyticket({
      page: page,
      row: pageSize,
      open_id: userM4DStore.openid,
    }).then((res) => {
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

    return (
      <div id="Coupons">
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>
        <AccountHeader />
        <div className="it_title">我的卡券</div>
        {records.length === 0 && <NoData />}
        {/*流水 */}
        <InfiniteScroll
          dataLength={records.length} //This is important field to render the next data
          next={this.boxBuyRecord}
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
                item.status == 0 &&
                <li key={item.id}>
                  <h2>{item.caption}</h2>
                  <p>有效期至{formatTime(item.addTime)}</p>
                  <p className="sm">{item.remark}</p>
                  <div className="li_right">
                    <i>￥{formatWalletPrice(item.val)}</i>
                    <p>价值</p>
                    <div
                      onClick={() => {
                        // history.push("/trade?key=" + encodeURI("瓷器"));
                        if (item.boxId != '0') {
                          history.push("/BuyBlindBox?id=" + item.boxId);
                        } else {
                          history.push("/AllBindBox");
                        }

                        //
                      }}
                      className="use_btn"
                    >
                      去使用
                    </div>
                  </div>
                </li>
              );
            })}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default Coupons;
