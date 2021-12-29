import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
// import CopyIcon from '../../assets/images/imeta/fuzhi.png'

import {
  getQueryString,
} from "../../utils/format";
// import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
import "./AllCollection.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";

@inject("userM4DStore")
@inject("localeStore")
@observer
class BoxCollection extends Component {
  state = {
    commodityList: [],
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
    this.getCommoditylist().then();
  }

  componentWillUnmount() {
    window.onresize = null;
  }
  getCommoditylist = async () => {
    let _this = this;
    const { page, pageSize, commodityList } = this.state;
    const { userM4DStore } = this.props;
    await userM4DStore.getUserStatus();
    CommodityApi.commodityList({
      page: page,
      row: pageSize,
      box_id:getQueryString("id"),
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      const arr = res.data;
      const hasMore = arr.length === pageSize;
      commodityList.push(...arr);
      this.setState({ commodityList, hasMore, page: hasMore ? page + 1 : 1 });
    });
  };

  render() {
    const { history } = this.props;
    const { commodityList, hasMore, copyValue } = this.state;
    const {
      localeStore: {
        locale: {},
      },
    } = this.props;

    return (
      <div id="AllCollection">
        <textarea
          style={{ opacity: "0", position: "fixed", top: "-1000px" }}
          readOnly
          id="textCopy"
          value={copyValue}
        ></textarea>
        <AccountHeader />
        <div className="it_title">全部藏品</div>
        {/*流水 */}
        <InfiniteScroll
          dataLength={commodityList.length} //This is important field to render the next data
          next={this.getCommoditylist}
          hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {commodityList.length <= 0 ? "" : ""}
            </p>
          }
        >
          <ul className="sp_list">
            {/* <li onClick={()=>{history.push('/Buy️Collection')}}> */}
            {commodityList.length > 0 &&
              commodityList.map((item, index) => {
                return (
                  (
                    <li
                      key={item.id}
                      onClick={() => {
                        history.push("/CollectionDetail?id=" + item.id);
                      }}
                    >
                      <div className="img_box">
                        <img src={item.pFace} />
                      </div>

                      <h2>{item.pName}</h2>
                      <span>总量：{item.fCount}</span>
                    </li>
                  ) || <NoData />
                );
              })}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default BoxCollection;
