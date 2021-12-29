import React from 'react'
import './CaptchaM4D.scss'
import locales from '../../locales'

function getLocale() {
  const lang = localStorage.getItem('LANG') || 'zh-cn'
  return locales[lang]
}
function CaptchaPng(props) {
  const { imgSrc, value, placeholder, onChange, getCaptchaPng } = props
  const locale = getLocale()

  return (

    <div className='input-box' id="captcha-box">
      <input
        type="text"
        className='input-main '
        maxLength={4}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
      />
      <img id="captcha" src={imgSrc} onClick={getCaptchaPng} alt="图形验证码" />
    </div>
  )
}

export default CaptchaPng
