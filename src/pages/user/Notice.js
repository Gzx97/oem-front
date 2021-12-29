import React, { Component } from "react";
import { Icon, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi } from "../../api";
import "./Notice.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import {
  formatCoinPrice,
  formatWalletPrice,
  formatTime,
  formatSpecialOffer2,
} from "../../utils/format";
@inject("userM4DStore")
@inject("localeStore")
@observer
class Notice extends Component {
  state = {
    noticeList: [],
    page: 1,
    pageSize: 10,
    hasMore: false,
  };

  componentDidMount() {
    let _this = this;
    const {
      localeStore: {
        locale: { NOTICE },
      },
    } = this.props;
    const { userM4DStore, history } = this.props;
    const { page, pageSize } = this.state;
    userM4DStore.getUserStatus();
    this.setState(
      {
        noticeList: [],
      },
      () => {
        _this.noticeList().then();
      }
    );
  }

  componentWillUnmount() {
    window.onresize = null;
  }

  // 获取文章列表
  noticeList = async () => {
    let _this = this;
    const { page, pageSize, noticeList, hasMore } = this.state;
    const { userM4DStore } = this.props;
    await userM4DStore.getUserStatus();
    UserApi.noticeList({ page: page, row: pageSize }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      const arr = res.data.sort((a, b) => b.addTime - a.addTime);
      const hasMore = arr.length === pageSize;
      noticeList.push(...arr);
      this.setState({ noticeList, hasMore, page: hasMore ? page + 1 : 1 });
    });
  };
  render() {
    const { history } = this.props;
    const { noticeList, hasMore } = this.state;
    const {
      localeStore: {
        locale: { NOTICE },
      },
    } = this.props;

    return (
      <div id="notice">
        <AccountHeader onBack={() => history.push("/mineList")} />
        <div className="it_title">{NOTICE.GONG_GAO_LIST}</div>
        {noticeList.length === 0 && (
          <div className="no_data">{NOTICE.NO_DATA}</div>
        )}
        <InfiniteScroll
          dataLength={noticeList.length} //This is important field to render the next data
          next={this.noticeList}
          hasMore={hasMore}
        >
          <ul>
            {noticeList.map((item, index) => {
              return (
                <li
                  onClick={() => history.push("/noticeDetail?id=" + item.id)}
                  key={item.id}
                >
                  {/* <div className='line'></div> */}
                  <div className="notice_title">
                    <h3>{item.title}</h3>
                    <i>{formatTime(item.addTime)}</i>
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

export default Notice;
