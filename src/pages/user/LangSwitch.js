import React, { Component } from "react";
import { inject, observer } from "mobx-react";
// import Header from '../../components/common/Header'
import AccountHeader from "../../components/partial/AccountHeader";
import { ASSET_USER } from "../../assets/static";
import "./LangSwitch.scss";

@inject("localeStore")
@observer
class LangSwitch extends Component {
  state = {
    nowlang: "",
  };
  componentDidMount() {
    let _this = this;
    this.setState({
      nowlang: localStorage.getItem("LANG"),
    });
    const {
      history,
      localeStore: {
        locale: { USER_CENTER },
        languages,
        lang,
      },
    } = this.props;
    console.log(languages);
    languages.map((item) => {
      console.log(item.value);
    });
  }
  changeLang = (lang) => {
    const { history, localeStore } = this.props;
    this.setState({
      nowlang: lang,
    });
    localeStore.switchLang(lang);
    setTimeout(() => {
      // history.push('/mineList')
      // history.goBack()
      window.location.reload();
    }, 100);
  };

  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { LANGSWITCH },
        languages,
        lang,
      },
    } = this.props;
    // console.log( this.props)
    const { nowlang } = this.state;
    return (
      <div id="lang-switch">
        <AccountHeader />
        <div className="it_title">{LANGSWITCH.CHOOSE_CITY}</div>

        <ul>
          {languages.map((language) => (
            <li key={language.value} onClick={() => this.changeLang(language.value)}>
              <span>{language.label}</span>
              {(nowlang == language.value && (
                <i className="active">
                  <div className="i_center"></div>
                </i>
              )) || <i></i>}
            </li>
          ))}
          {/* <li onClick={() => this.changeLang('zh-cn')}>
            <span>简体中文</span>
            {nowlang == 'zh-cn' &&
              <i className='active'><div className='i_center'></div></i> ||
              <i></i>
            }

          </li>
          <li onClick={() => this.changeLang('en-us')}>
            <span>English</span>
            {nowlang == 'en-us' &&
              <i className='active'><div className='i_center'></div></i> ||
              <i></i>
            }
          </li> */}
          {/* <li onClick={() => this.changeLang('zh-hk')}>
            <span>繁體中文</span>
            {nowlang == 'zh-hk' &&
              <i className='active'><div className='i_center'></div></i> ||
              <i></i>
            }

          </li>
          <li onClick={() => this.changeLang('ko-kr')}>
            <span>한글</span>
            {nowlang == 'ko-kr' &&
              <i className='active'><div className='i_center'></div></i> ||
              <i></i>
            }
          </li>
          <li onClick={() => this.changeLang('ja-jp')}>
            <span>日本語</span>
            {nowlang == 'ja-jp' &&
              <i className='active'><div className='i_center'></div></i> ||
              <i></i>
            }
          </li> */}
        </ul>
        {/*                 
        <ul className="list">
          {languages.map(language => (
            <li
              key={language.value}
              onClick={() => this.changeLang(language.value)}
            >
              <span>{language.label}</span>
              {language.value === lang && (
                <img src={''} alt="" />
              )}
            </li>
          ))}
        </ul> */}
      </div>
    );
  }
}

export default LangSwitch;
