import React, { Component } from "react";
import { Button, Toast, Icon,Modal } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { CommodityApi } from "../../api";
import "./MyBlindBox.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import JiluIcon from "../../assets/images/jilu.png";
import NoData from "../../components/common/NoData";

import { Link } from "react-router-dom";
import {
  getQueryString,

} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class MyBlindBox extends Component {
  state = {
    boxList: [],
    page: 1, //当前页码
    pageSize: 20, //每页条数
    hasMore: false,
    count: "0",
    mhModal: false,
    cpList: [], //开出的藏品列表
  };

  componentDidMount() {
    const { history } = this.props;
let _this = this 
    this.getMyBox();
    console.log(getQueryString('status'))
    if(getQueryString('status')==='ok'){
      // history.push('/MyBlindBox')
      Modal.alert("我已支付", "", [
        {
          text: "取消",
          style: "default",
          onPress: () => {
            window.location.href = '/MyBlindBox'
          },
        },
        {
          text: "确定",
          style: "default",
          onPress: () => {
            // _this.setState({
            //   cpList:[],
            //   page: 1, //当前页码
            //   pageSize: 20, //每页条数
            // },()=>{
            //   _this.getMyBox()
            // history.push('/MyBlindBox')
            // })
            window.location.href = '/MyBlindBox'
          },
        },
      ]);
    }
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  gzxtest = () => {
    //测试事件
  };
  getMyBox = () => {
    let _this = this;
    const { page, pageSize, boxList } = this.state;
    const { userM4DStore } = this.props;
    userM4DStore.getUserStatus();
    CommodityApi.myBox({
      page: page,
      row: pageSize,
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      const arr = res.data.list;
      const hasMore = arr.length === pageSize;
      boxList.push(...arr);
      this.setState({
        boxList,
        hasMore,
        page: hasMore ? page + 1 : 1,
        count: res.data.count,
      });
    });
  };
  // 开盲盒
  openbox = (id, type) => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    userM4DStore.getUserStatus();
    CommodityApi.openbox({
      open_id: userM4DStore.openid,
      box_id: id,
      type: type,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      console.log(res.data)
      this.setState({
        cpList: res.data,
      });
    });
  };
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { SHEQU },
      },
    } = this.props;
    const { boxList, hasMore, count, mhModal, cpList } = this.state;
    return (
      <div id="MyBlindBox">
        <AccountHeader onHandle={()=>{history.push('/mineList')}} />
        <div className="it_title">我的盲盒</div>
        {/* <div className="it_title">我的产品</div> */}
        <div className="goto-jilu">
          {/* <img src={JiluIcon} /> */}
        </div>

        <p className="have_num">您共有{count}个盲盒</p>
        {/* <p className="have_num">您共有{count}个产品</p> */}
        {/*流水 */}
        <InfiniteScroll
          dataLength={boxList.length} //This is important field to render the next data
          next={this.getMyBox}
          hasMore={hasMore}
          loader={<p className="loading">{""}</p>}
          endMessage={
            <p style={{ textAlign: "center", color: "#ccc" }}>
              {boxList.length <= 0 ? "" : ""}
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
            {(boxList.length > 0 &&
              boxList.map((item, index) => {
                return (
                  <li
                    key={item.id}
                    onClick={() => {
                      // history.push("/CollectionDetail?id=84");
                    }}
                  >
                    <div className="cp_top_box">
                      <div className="cp_left">
                        <img
                          src={
                            item.face||"https://oss.ctm-ib.com/yishu/1632305593.png"
                          }
                        />
                      </div>
                      <div className="cp_right">
                        <h3>{item.box_name}</h3>

                        <div className="fxf">授权方：{item.issuer}</div>
                        <div className="fxf">数量：{item.amount}</div>
                      </div>
                    </div>
                    <div className="btn_box">
                      <span
                        onClick={() => {
                          this.openbox(item.id, "one");
                        }}
                      >
                        立即开盒（{item.amount}）
                      </span>
                      <span
                        onClick={() => {
                          this.openbox(item.id, "all");
                        }}
                      >
                        全部打开
                      </span>
                    </div>
                  </li>
                );
              })) || <NoData msg={"暂无待开盲盒"} />}
          </ul>
        </InfiniteScroll>
        {cpList.length > 0 && (
          <div className="my_modal">
            <div className="modal_mask"> </div>
            <div className="modal_content animate__animated animate__bounceIn">
              <h3 className="">
                获得
                <br />"{cpList[0].pName}"
              </h3>
              <div className="img_box">
                <img
                  className="mh_img"
                  src={
                    cpList[0].pFace
                    // "https://oss.ctm-ib.com/yishu/1632305593.png"
                  }
                />
              </div>

              <div className="kh">
                <span onClick={()=>{history.push('/collection')}}>查看藏品</span>
                {(cpList.length > 1 && (
                  <span
                    onClick={() => {
                      cpList.shift();
                      this.setState({ cpList: cpList });
                    }}
                  >
                    下一个（{cpList.length}）
                  </span>
                )) || (
                  <span
                    onClick={() => {
                      window.location.reload();
                    }}
                  >
                    确定
                  </span>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default MyBlindBox;
