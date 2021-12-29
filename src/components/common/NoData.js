import React from "react";
import N0DataImg from '../../assets/images/no_data.png'

import './NoData.scss'
import locales from '../../locales'
function getLocale() {
  const lang = localStorage.getItem('LANG') || 'zh-cn';
  // console.log(lang);
  // console.log(locales[lang]);
  return locales[lang]
}
const locale = getLocale();

function NoData(props) {
  return <div
  style={props.style||{}}
  className="no_data_common">
    <img src={props.img || N0DataImg} alt="空" />
    {props.msg||locale.ORDER.ZWSJ}
  </div>
}

export default NoData
