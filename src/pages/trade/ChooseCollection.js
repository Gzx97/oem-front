import React, { Component } from "react";
import { Button, Toast, Icon } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
import "./ChooseCollection.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  formatTags,
} from "../../utils/format";
import { Link } from "react-router-dom";
@inject("userM4DStore")
@inject("localeStore")
@observer
class ChooseCollection extends Component {
  state = {
    myList: [],
    page: 1, //当前页码
    pageSize: 20, //每页条数
    hasMore: false,
    count: "0",
  };

  componentDidMount() {
    this.getMyCollection();
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
          label: "收藏",
          className: "succeed",
        };
      case 1:
        return {
          label: "挂卖",
          className: "danger",
        };
      case 2:
        return {
          label: "收款",
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
    const { myList, hasMore, count } = this.state;
    return (
      <div id="ChooseCollection">
        <AccountHeader />
        <div className="it_title">选择NFT</div>
        <div className="goto-jilu">
          {/* <Icon
            onClick={() => {
              history.push("/SearchCollection");
            }}
            color={"white"}
            type={"search"}
          /> */}
        </div>
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
          <ul>
            {myList.length > 0 &&
              myList.map((item, index) => {
                return (
                  item.sell === 0 && (
                    <li
                      key={item.id}
                      onClick={() => {
                        this.props.history.push({
                          pathname: "/Transfer",
                          state: { info: item },
                        });
                        
                      }}
                    >
                      <div className="cp_top_box">
                        <div className="cp_left">
                          <div className="img_box">
                            <img src={item.p_face} />
                          </div>
                        </div>
                        <div className="cp_right">
                          <h3>{item.p_name}</h3>
                          <div className="cp_tag">
                          {item.tags&&formatTags(item.tags).map((i) => {
                            return <span key={i}>#{i}#</span>;
                          })|| <span>#暂无标签#</span>}
                        </div>
                          <div className="fxf">授权方：{item.issuer}</div>
                        </div>
                      </div>

                      <p>
                        商品防伪编号：{item.nft_id}
                        {item.ipfs_img_url_hash}
                      </p>
                    </li>
                  )
                );
              })}
          </ul>
        </InfiniteScroll>
      </div>
    );
  }
}

export default ChooseCollection;
