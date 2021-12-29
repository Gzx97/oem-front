import React, { Component } from "react";
import { Button, Toast, Icon, Modal } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
import "./TradeList.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import JiluIcon from "../../assets/images/jilu.png";
import fzIcon from "../../assets/images/fuzhi.png";
import { Link } from "react-router-dom";
import NoData from "../../components/common/NoData";
import {
  formatTags, //
  getQueryString,
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class TradeList extends Component {
  state = {
    jyList: [],
    page: 1, //当前页码
    pageSize: 20, //每页条数
    hasMore: false,
    searchValue: "",
    isSort: false, //是否排序
    by: "", //价格降序
    num: "", //销量降序
    time: "", //时间降序
  };

  componentDidMount() {
    this.paying();
    // this.getSellview();
    this.setState(
      { searchValue: decodeURI(getQueryString("key") || "") },
      () => {
        this.getSellview();
      }
    );
    // this.haveOrder()
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  gzxtest = () => {
    //测试事件
  };
  getSellview = (type) => {
    let _this = this;
    const { userM4DStore } = this.props;

    const { page, pageSize, jyList, searchValue, by } = this.state;

    userM4DStore.getUserStatus();
    CommodityApi.selllist({
      page: page,
      row: pageSize,
      open_id: userM4DStore.openid,
      key: searchValue,
      by: by,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      const arr = res.data;
      const hasMore = arr.length === pageSize;
      jyList.push(...arr);
      console.log(res.data);
      this.setState({ jyList, hasMore, page: hasMore ? page + 1 : 1 });
    });
  };
  paying = () => {
    let _this = this;
    const { userM4DStore } = this.props;
    userM4DStore.getUserStatus();
    CommodityApi.paying({
      open_id: userM4DStore.openid,
    }).then((res) => {
      // console.log(res.data);

      if (res.status === 1) {
        // Toast.info(res.msg);
        _this.haveOrder(res.data.pId);
        return;
      }
    });
  };
  onSearchChange = (event) => {
    const { value } = event.target;
    this.setState({ searchValue: value }, () => {
      this.setState(
        {
          page: "1",
          jyList: [],
        },
        () => {
          this.getSellview("search");
        }
      );
    });
    // this.mirrorList(value);
  };
  haveOrder = (pId) => {
    const { history, userM4DStore } = this.props;
    // console.log('tuichu')
    // 调取退出登录接口
    Modal.alert("您有正在进行中的订单", "", [
      {
        text: "完成订单",
        style: "default",
        onPress: () => {
          history.push("/BuyCollection?id=" + pId);
        },
      },
    ]);
  };
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { SHEQU },
      },
    } = this.props;
    const { jyList, hasMore, searchValue, by, num, time, isSort } = this.state;
    return (
      <div id="TradeList">
        <div className="it_title">交易</div>
        <div
          onClick={() => {
            history.push("/TradRecord");
          }}
          className="goto-jilu"
        >
          <img src={JiluIcon} />
        </div>

        <div className="search">
          <Icon
            className="search_icon"
            type="search"
            size={"sm"}
            color={"#8F8E94"}
          />
          <input
            placeholder={"搜索藏品"}
            type="text"
            value={searchValue}
            autoComplete="off"
            onChange={this.onSearchChange}
          />
          <Icon
            onClick={() => {
              this.setState({ searchValue: "" ,page: 1,jyList:[]}, () => {
                this.getSellview();
              });
            }}
            className="search_cross"
            type="cross"
            size={"sm"}
            color={"#8F8E94"}
          />
        </div>
        {/* 筛选 */}
        <div className="saixuan">
          <span className={"span_active"}>
            {isSort && (
              <div
                onClick={() => {
                  this.setState({ isSort: false });
                }}
                className="modal_mask"
              ></div>
            )}
            <div
              onClick={() => {
                this.setState({ isSort: !isSort });
              }}
              className="sort_text"
            >
              {by == "priceasc" && "价格升序"}
              {by == "pricedesc" && "价格降序"}
              {by == "" && "价格排序"}

              <Icon type={"down"}></Icon>
              {isSort && (
                <div className="xiala">
                  <i
                    onClick={() => {
                      this.setState(
                        {
                          by: "priceasc",
                          jyList: [],
                          page: 1,
                        },
                        () => {
                          this.getSellview();
                        }
                      );
                    }}
                  >
                    价格升序
                  </i>
                  <i
                    onClick={() => {
                      this.setState(
                        {
                          by: "pricedesc",
                          jyList: [],
                          page: 1,
                        },
                        () => {
                          this.getSellview();
                        }
                      );
                    }}
                  >
                    价格降序
                  </i>
                </div>
              )}
            </div>
          </span>
          {/* <span>销量</span> */}
          <span></span>
        </div>
        {/*流水 */}
        <InfiniteScroll
          dataLength={jyList.length} //This is important field to render the next data
          next={this.getSellview}
          hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {jyList.length <= 0 ? "" : ""}
            </p>
          }
        >
          <ul>
            {(jyList.length > 0 &&
              jyList.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      history.push("/BuyCollection?id=" + item.id);
                    }}
                  >
                     {item.integralReturn > 0 && (
                        <div className="huodong">活动</div>
                      )}
                    <div className="img_box">
                      <img src={item.pFace} />
                    </div>
                    <h2>
                      {item.pName} #{item.id}{" "}
                    </h2>
                    <div className="cp_tag">
                      {(item.tags &&
                        formatTags(item.tags).map((i) => {
                          return <span key={i}>#{i}#</span>;
                        })) || <span>#暂无标签#</span>}
                    </div>
                    <div className="fxf">授权方：{item.issuer}</div>
                    <div className="mj">卖家：{item.userName}</div>
                    <i>￥{item.sellPrice}</i>
                  </li>
                );
              })) || <NoData msg={"暂无藏品"} />}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default TradeList;
