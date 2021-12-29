import React, {Component} from 'react'
import {Button} from 'antd-mobile'
import {inject, observer} from 'mobx-react'
import './404.scss'

@inject('localeStore')
@observer
class NoMatch extends Component {
  // componentDidMount() {
  //   // const { history,localeStore: {
  //   locale: { EXCEPTION }
  // } } = this.props
  //   // Toast.info(EXCEPTION.UN_PAGE_TO_JUMP, TOAST_DURATION, () =>
  //   //   // history.push('/home')
  //   // )
  // }

  render() {
    const {
      history,
      localeStore: {locale: {EXCEPTION}}
    } = this.props
    return (
      <div className="no">
        <img
          src="https://dagetest.oss-cn-hongkong.aliyuncs.com/m4dfaq/1601286787.png"
          alt=""
        />
        <p className="sorry">{'页面找不到了'}</p>

        <Button
          className="goBack"
          onClick={() => history.goBack()}
        >
          {'返回上一页'}
        </Button>
      </div>
    )
  }
}

export default NoMatch
