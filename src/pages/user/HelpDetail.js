import React, { Component } from 'react'
import { Icon, Toast } from 'antd-mobile'
import { inject, observer } from 'mobx-react'
import Cookies from "js-cookie"
import { UserApi, groupM4DApi } from '../../api'
import './NoticeDetail.scss'
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
class HelpDetail extends Component {
  state = {
    noticeInfo: '',
    page: 1,
    pageSize: 10,
    hasMore: true,
  }

  componentDidMount() {
    let _this = this
    const { userM4DStore, history, } = this.props
    const { page, pageSize } = this.state
    userM4DStore.getUserStatus()
    console.log(history.location.state.id)
    UserApi.help({ id: history.location.state.id }).then(res => {
      if (res.status !== 1) {
        Toast.info(res.msg)
        return
      }
      _this.setState({
        noticeInfo: res.data
      })
      console.log(res)
    })
  }

  componentWillUnmount() {
    window.onresize = null
  }


  render() {
    const { history } = this.props;
    const { noticeList, hasMore, noticeInfo } = this.state
    const { localeStore: { locale: { MINELIST } } } = this.props;

    return (
      <div id="noticeDetail">
        <AccountHeader/>
        <div className='it_title'>{MINELIST.BZZX}</div>

        <div className='detail'>
          <div dangerouslySetInnerHTML={{ __html: noticeInfo.content }}></div>
        </div>
        <ul>
          <li>
            <div className='notice_title'>
              {/* <h3>{noticeInfo.title}</h3> */}
              {/* <i>
                {formatTime(noticeInfo.addTime)}<br></br>
                {'DMO'}
                </i> */}
            </div>
          </li>
        </ul>
      </div>
    )
  }
}

export default HelpDetail
