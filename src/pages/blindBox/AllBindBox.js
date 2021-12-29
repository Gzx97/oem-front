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
import "./AllBindBox.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";

@inject("userM4DStore")
@inject("localeStore")
@observer
class AllBindBox extends Component {
  state = {
    boxList: [],
    page: 1, //当前页码
    pageSize: 20, //每页条数
    hasMore: false,
    copyValue: "",
  };

  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;
    const {
      localeStore: {
        locale: {},
      },
    } = this.props;

    userM4DStore.getUserStatus();
    this.getBoxList().then();
  }

  componentWillUnmount() {
    window.onresize = null;
  }
  getBoxList = async () => {
    let _this = this;
    const { page, pageSize, boxList } = this.state;
    const { userM4DStore } = this.props;
    await userM4DStore.getUserStatus();
    CommodityApi.boxList({
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
      boxList.push(...arr);
      this.setState({ boxList, hasMore, page: hasMore ? page + 1 : 1 });
    });
  };

  render() {
    const { history } = this.props;
    const { boxList, hasMore, copyValue } = this.state;
    const {
      localeStore: {
        locale: {},
      },
    } = this.props;

    return (
      <div id="AllBindBox">
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>
        <AccountHeader />
        <div className="it_title">全部盲盒</div>
        {/* <div className="it_title">全部产品</div> */}
        {/*流水 */}
        <InfiniteScroll
          dataLength={boxList.length} //This is important field to render the next data
          next={this.getBoxList}
          hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {boxList.length <= 0 ? "" : ""}
            </p>
          }
        >
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
                      <img
                        src={
                          item.face ||
                          "https://oss.ctm-ib.com/yishu/1632305593.png"
                        }
                      />
                    </div>

                    <h2>{item.boxName}</h2>
                    <span>￥{item.price}</span>
                  </li>
                );
              })) || <NoData msg={"暂无盲盒"} />}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default AllBindBox;
