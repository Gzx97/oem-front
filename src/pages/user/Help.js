import React, { Component } from 'react'
import { Icon, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi } from '../../api'
import './Notice.scss'
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from 'react-infinite-scroll-component'
import {
  formatCoinPrice,
  formatWalletPrice,
  formatTime,
  formatSpecialOffer2,
} from '../../utils/format'
@inject('userM4DStore')
@inject('localeStore')
@observer
class Help extends Component {
  state = {
    helpList: [],
    page: 1,
    pageSize: 10,
    hasMore: false,
  }

  componentDidMount() {
    let _this = this
    const { localeStore: { locale: { NOTICE } } } = this.props;
    const { userM4DStore, history, } = this.props
    const { page, pageSize } = this.state
    userM4DStore.getUserStatus()
    this.setState({
      helpList: []
    }, () => {
      _this.helpList().then()
    })
  }

  componentWillUnmount() {
    window.onresize = null
  }

  // 获取文章列表
  helpList = async () => {
    let _this = this
    const { page, pageSize, helpList, hasMore } = this.state
    const { userM4DStore } = this.props
    await userM4DStore.getUserStatus()
    UserApi.helpList({ page: page, row: pageSize }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return
      }
      const arr = res.data.sort((a, b) => b.addTime - a.addTime)
      const hasMore = arr.length === pageSize
      helpList.push(...arr)
      this.setState({ helpList, hasMore, page: hasMore ? page + 1 : 1 })
    })
  }
  render() {
    const { history } = this.props;
    const { helpList, hasMore } = this.state
    const { localeStore: { locale: { NOTICE } } } = this.props;

    return (
      <div id="notice">
        <AccountHeader onBack={() => history.push('/mineList')} />
        <div className='it_title'>{NOTICE.BZZX}</div>
        {helpList.length === 0 &&
          <div className='no_data'>{NOTICE.NO_DATA}</div>
        }
        <InfiniteScroll
          dataLength={helpList.length} //This is important field to render the next data
          next={this.helpList}
          hasMore={hasMore}
        >
          <ul>
            {helpList.map((item, index) => {
              return (
                <li onClick={() => history.push({
                  pathname: "/helpDetail", state: { id: item.id }
                })} key={item.id}>
                  {/* <div className='line'></div> */}
                  <div className='notice_title'>
                    <h3>{item.title}</h3>
                    <i>{formatTime(item.addTime)}</i>
                  </div>
                </li>
              )
            })}

          </ul>
        </InfiniteScroll>
        {/* <ul>
          <li>
            <div className='notice_title'>
              <h3>关于MG活动开发说明</h3>
              <i>2019-06-10</i>
            </div>
          </li>
          <li>
            <div className='notice_title'>
              <h3>关于MG活动开发说明</h3>
              <i>2019-06-10</i>
            </div>
          </li>
          <li>
            <div className='notice_title'>
              <h3>关于MG活动开发说明</h3>
              <i>2019-06-10</i>
            </div>
            <p>活動開放時間暫未確定，請用戶耐心等待通知，時會有詳細活動玩法規則</p>
          </li>
        </ul> */}
      </div>
    )
  }
}

export default Help
