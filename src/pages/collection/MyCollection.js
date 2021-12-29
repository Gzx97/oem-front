import React, { Component } from "react";
import { Button, Toast, Icon } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
import "./MyCollection.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import NoData from "../../components/common/NoData";

import { Link } from "react-router-dom";
import {
  formatTags, //
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class MyCollection extends Component {
  state = {
    myList: [],
    page: 1, //当前页码
    pageSize: 5, //每页条数
    hasMore: false,
    count: "0",
  };

  componentDidMount() {
    this.getMyCollection();
    // console.log(formatTags('文化,爱情,地方'))
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  gzxtest = () => {
    //测试事件
  };
  getMyCollection = () => {
    let _this = this;
    const { page, pageSize, myList } = this.state;
    const { userM4DStore } = this.props;
    userM4DStore.getUserStatus();
    CommodityApi.myCommodityList({
      page: page,
      row: pageSize,
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      const arr = res.data.list;
      console.log(arr);
      const hasMore = arr.length === pageSize;
      myList.push(...arr);
      this.setState({
        myList,
        hasMore,
        page: hasMore ? page + 1 : 1,
        count: res.data.count,
        guzhi:res.data.guzhi,
      });
    });
  };
  getStatusLabel(status) {
    // const {
    //   localeStore: {
    //     locale: { TIBIRECORD },
    //   },
    // } = this.props;

    //是否售卖，0未售卖，1售卖中，2付款中
    switch (status) {
      case 0:
        return {
          // label: TIBIRECORD.DAI_SHEN_HE,
          // className: 'loading'
          label: "收藏中",
          className: "succeed",
        };
      case 1:
        return {
          label: "挂卖中",
          className: "danger",
        };
      case 2:
        return {
          label: "收款中",
          className: "danger",
        };
      default:
        return {
          label: "",
          className: "",
        };
    }
  }
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { SHEQU },
      },
    } = this.props;
    const { myList, hasMore, count,guzhi } = this.state;
    return (
      <div id="MyCollection">
        <div className="it_title">藏品</div>
        <div className="goto-jilu">
          <Icon
            onClick={() => {
              history.push("/SearchCollection");
            }}
            color={"white"}
            type={"search"}
          />
        </div>

        <p className="have_num">
          <span>您当前共持有<i style={{color:'#E84848'}}>{count||0}</i>件藏品</span>
          <span>预估价值约为 <i style={{color:'#E84848'}}>￥{guzhi||0}</i> </span>
          
          
          </p>
        {/*流水 */}
        <InfiniteScroll
          dataLength={myList.length} //This is important field to render the next data
          next={this.getMyCollection}
          hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {myList.length <= 0 ? "" : ""}
            </p>
          }
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
              &#8593;松开立即刷新
            </h3>
          }
        >
          {(myList.length > 0 && (
            <ul>
              {myList.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      history.push("/Fangwei?id=" + item.id);
                    }}
                  >
                    <div className="cp_top_box">
                      <div className="cp_left">
                        <div className="img_box">
                          <img src={item.p_face} />
                        </div>
                      </div>
                      <div className="cp_right">
                        <h3>
                          {item.p_name}#{item.id}#
                          <i
                            className={this.getStatusLabel(item.sell).className}
                          >
                            {this.getStatusLabel(item.sell).label}
                          </i>
                        </h3>
                        <div className="cp_tag">
                          {(item.tags &&
                            formatTags(item.tags).map((i) => {
                              return <span key={i}>#{i}#</span>;
                            })) || <span>#暂无标签#</span>}
                        </div>
                        <div className="fxf">授权方：{item.issuer}</div>
                      </div>
                    </div>

                    <p>
                      防伪编号：
                      {item.ipfs_img_url_hash}
                    </p>
                  </li>
                );
              })}
            </ul>
          )) || <NoData msg={"暂无藏品"} />}
        </InfiniteScroll>
      </div>
    );
  }
}

export default MyCollection;
