import React, { Component } from 'react'
import { withRouter } from 'react-router'
import { FOOTER } from '../../assets/static'

import './FooterM4D.scss'
import locales from '../../locales'
// import $ from 'jquery'
function getLocale() {
  const lang = localStorage.getItem('LANG') || 'zh-cn';
  // console.log(lang);
  // console.log(locales[lang]);
  return locales[lang]
}
const locale = getLocale();
// console.log(locale)
const TABS = [
  {
    pathname: '/home',
    label: '首页',
    // label: locale.FOOTERM4D.PIN_TUAN,
    image: FOOTER.ICON_SHOUYE,
    imagePre: FOOTER.ICON_SHOUYE_PRE
  },

  {
    pathname: '/collection',
    label: '藏品',
    image: FOOTER.ICON_CANGPIN,
    imagePre: FOOTER.ICON_CANGPIN_PRE
  },
  {
    pathname: '/trade',
    label: '交易',
    image: FOOTER.ICON_JIAOYI,
    imagePre: FOOTER.ICON_JIAOYI_PRE
  },
  {
    pathname: '/mineList',
    label: '我的',
    // label: locale.FOOTERM4D.MINE,
    image: FOOTER.ICON_ZHANGHU,
    imagePre: FOOTER.ICON_ZHANGHU_PRE
  }
]

const PATHS = [
  '/home',
  '/home/',
  '/collection',
  '/collection/',
  '/trade',
  '/trade/',
  '/mineList',
  '/mineList/',
  '/'
]

class Footer extends Component {
  handleChange = pathname => {
    const { history } = this.props
    history.push(pathname)
  }

  render() {
    const { location } = this.props
    const show = PATHS.includes(location.pathname)
    // console.log(location.pathname)
    // console.log(location.pathname)
    return show ? (
      <footer>
        <ul>
          {TABS.map((tab, index) => (
            <li
              key={tab.pathname}
              className={(tab.pathname === location.pathname || (index === 0 && location.pathname === '/')) ? 'active' : ''}
              // className={(tab.pathname === location.pathname||(index===2&&location.pathname==='/'))  ? 'active' : ''}
              onClick={() => this.handleChange(tab.pathname)}
            >
              <img
                src={
                  // tab.pathname === location.pathname ? tab.imagePre : tab.image
                  (tab.pathname === location.pathname || (index === 0 && location.pathname === '/')) ? tab.imagePre : tab.image
                }
                alt={tab.label}
              />
              <i>{tab.label}</i>

            </li>
          ))}
        </ul>
      </footer>
    ) : (
        ''
      )
  }
}

export default withRouter(Footer)
