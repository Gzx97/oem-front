import React, { Component } from 'react'
import { withRouter } from "react-router";
import { inject, observer } from "mobx-react";
import { Icon } from 'antd-mobile';
import './AccountLangHeader.scss'

@inject('localeStore')
@observer
class AccountLangHeader extends Component {
  state = {
    nowlang: '',
    tankuang: false,
  }
  componentDidMount() {
    let _this = this
    const { localeStore: { languages } } = this.props
    languages.map(language => {
      if (this.props.localeStore.lang === language.value) {
        _this.setState({
          nowlang: language.label
        })
      }
    }
    )
  }

  onBack = () => {
    const { history, onBack } = this.props;
    if (onBack) {
      onBack();
      return
    }
    history.goBack();
  };
  changeLang = lang => {
    const { history, localeStore } = this.props
    const { localeStore: { languages } } = this.props
    let _this = this
    localeStore.switchLang(lang).then(
      languages.map((language) => {
        if (this.props.localeStore.lang === language.value) {
          _this.setState({
            nowlang: language.label,
            tankuang: false,
          })
        }
        window.location.reload()
      })
    )

  }

  render() {
    const { localeStore: { locale: { MINELIST } } ,haveimg} = this.props;
    const { tankuang, nowlang } = this.state
    return (
      <div className="account-lang__header">
        <img
          style={!haveimg&&{ display: 'none' }||{}}
          src={require("../../assets/images/left-black.png")}
          alt="返回"
          onClick={this.onBack}
        />
        {/* <ul style={{opacity:1,display:'none'}}> */}
        <ul>
          <li onClick={() => {
            //  this.setState({ tankuang: true })
            this.props.history.push('/LangSwitch')
          }}>
            <span>{nowlang}</span>
            <Icon type="down" size={'sm'} />
          </li>
        </ul>
        {tankuang &&
          <div className='switch-box'>
            <div onClick={() => { this.setState({ tankuang: false }) }} className='black_box'></div>
            <div className='kuang'>
            <div
                onClick={() => { this.changeLang('zh-hk') }}
                className={nowlang === '繁体中文' && 'active-lang lang' || 'lang'}>
                繁体中文
                {nowlang === '繁体中文' &&
                  <Icon className='check_icon' color={'rgba(110,16,255,1)'} type="check" />
                }

              </div>
              <div
                onClick={() => { this.changeLang('zh-cn') }}
                className={nowlang === '简体中文' && 'active-lang lang' || 'lang'}>
                简体中文
                {nowlang === '简体中文' &&
                  <Icon className='check_icon' color={'rgba(110,16,255,1)'} type="check" />
                }

              </div>
              <div
                onClick={() => { this.changeLang('en-us') }}
                className={nowlang === 'English' && 'active-lang lang' || 'lang'}>
                English
                {nowlang === 'English' &&
                  <Icon className='check_icon' color={'rgba(110,16,255,1)'} type="check" />
                }
              </div>
              <div
                onClick={() => { this.changeLang('ko-kr') }}
                className={nowlang === '한국어' && 'active-lang lang' || 'lang'}>
                한국어
                {nowlang === '한국어' &&
                  <Icon className='check_icon' color={'#FFFFFF'} type="check" />
                }
              </div>
              <div
                onClick={() => { this.setState({ tankuang: false }) }}
                className='quxiao'> {MINELIST.QUXIAO} </div>
            </div>
          </div>
        }

      </div>
    );
  }
}

export default withRouter(AccountLangHeader)
