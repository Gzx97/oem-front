(window.webpackJsonp=window.webpackJsonp||[]).push([[45],{193:function(A,e,t){"use strict";var a,n=t(194),o=t(7),E=t(8),C=t(28),g=t(27),c=t(29),r=t(1),B=t.n(r),i=t(45),s=(t(196),t(33)),l=Object(s.b)("localeStore")(a=Object(s.c)(a=function(A){function e(){var A,t;Object(o.a)(this,e);for(var a=arguments.length,n=new Array(a),E=0;E<a;E++)n[E]=arguments[E];return(t=Object(C.a)(this,(A=Object(g.a)(e)).call.apply(A,[this].concat(n)))).onBack=function(){var A=t.props,e=A.history,a=A.onHandle;a?a():e.goBack&&window.history.length>1?window.history.go(-1):e.push("/home")},t}return Object(c.a)(e,A),Object(E.a)(e,[{key:"componentDidMount",value:function(){var A=this.props;A.history,A.onHandle}},{key:"render",value:function(){var A=this.props,e=A.src;Object(n.a)(A.localeStore);var a=this.props,o=(a.msg,a.hideBack);return B.a.createElement("div",{style:this.props.style||{},className:"account-header"},B.a.createElement("img",{className:o?"hidden":"",src:e&&e||t(195),alt:"\u8fd4\u56de",onClick:this.onBack}))}}]),e}(r.Component))||a)||a;e.a=Object(i.d)(l)},194:function(A,e,t){"use strict";function a(A){if(null==A)throw new TypeError("Cannot destructure undefined")}t.d(e,"a",function(){return a})},195:function(A,e){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIqADAAQAAAABAAAAIgAAAAACeqFUAAACI0lEQVRYCb2YO0gDQRRFs34bQQiCaFDwA4pCioBFRAsLtbETG3tBLGwEK1uxsrOwshRBRKwsLKwEOxUxECsRJCKGaOI/ajwTLIbNzursTDJww8x78+55O7txJaFQgFEoFJrQJnpA52gsgI1ZCdAWlEDyeGPRaeasUQ0sgpJyB9J8QcOqZGtNSUQRANhO6hCprvxTUWovTBMd6Eq6evdUPCsRe0QPJwDd6NpNltYvzEc9Su2FAPSgGwnqnj4RGLFH9HAC0I9u3WRpnWM+7FFqLwQgiu4kqHv6SCBuj+jhBCCG7t1kaZ1hPuBRai8kAEiAVCNNImaP6OEEII7EkauGuFVRj1J7IQBDSDx8qiEe2n57xFInB0CYcAI1l6aLkQ8+Z1FSkTcJpym+dBynEKKRNdUxVCh+AqdNnMgFXfWZXJaF2j3RSA6jBgtmJhbZKqrLce91m0qJRnZ1q8qwf1ncmjqMz1CvD0D8H5LxyQdNiW/NNt+ag6IBzYhXfQqpxjGJyjxHgMSLzu/P+wH5+qCXrlUHaBA9I9XYIVGtZRp0M6Bx9K7qhPgGcoL6a9UBmkJfSDVWtQxNNtPBjKqL3/iSib9WLcDFP5qZ0zI02UwjKz7NfJObNvHXqgW27tNMntyElmHQzYCq0JZPM1lyrUH9teoA1aJ9n2bmtQxdm8VL71+D90GejZPoSFFQq4iXJ8yJNKJT18m8su4qD9HHFWgYWf2h5gfF7AOA8qMQfgAAAABJRU5ErkJggg=="},196:function(A,e,t){},211:function(A,e){A.exports="data:image/png;base64,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0p8zAAAAIGNIUk0AAHolAACAgwAA+f8AAIDpAAB1MAAA6mAAADqYAAAXb5JfxUYAAAKjSURBVHja7NtBDYAwEEVB1gJYARugFWyAFbBQDHAh4VC28wQ0bfLn2CildJKeC0AkQCRAJEAkQCRAJEAkQCRAJEAkASIBIgEiASIBIgEiASIBIgHy8rCIqh53ziP9jdavewACiAABRIAAIkAAESCACBBABAggAgQQAQKIAAEEEAECiAABRIAAIkAAESCACBBABAggAgQQAQIIIIAAAogAAUSAACJAABEggAgQQAQIIAIkMxBLqacCCCACBBABAogAAUSAACJAAAEEEEAAAQQQQAABBBBAAAFEgAAiQAARIIAIEEAECCCAAAIIIIAAAgggWYBcy+SLa74CEEAECCACBBABAogAAUSAACJAABEggAACCCCAAAIIIAIEEAECiAABRIAAIkAAESCACBBABAgggAACCCCAAAKIAAFEgAAiQAARIIAIEEAECCACBBBAAAEEEEAAAUSAACJAABEggAgQQAQIIAIEEAECiAABBBBAAAEEEEAAESCACBBABAggAgQQAQKIAAFEgABiT4AAAggggAAiQAARIIAIEEAECCACBBABAogAAUSAAAIIIIAAAggggAgQQAQIIAIEEAECiAABRIAAIkAAESCAAAIIIIAIEEAECCACBBABAogAAUSAACJAABEggAACCCCAAAIIIAIEEAECiAABRIAAIkAAUX0N2xF/vPdXuwZEgAAiQAARIIAIEEAECCACBBABAggggAACCCCAACJAABEggAgQQAQIIAIEEAECiAABRIAAAggggAACCCCACBBABAggAgQQAQKIAAFEgAAiQAABBBBAAAEEEEAECCACBBABAogAAUSAACJAABEgrQKRsgWIBIgEiASIBIgEiASIBIgEiASIJEAkQCRAJEAkQCRAJECkNN0AAAD//wMApBigvCswq5UAAAAASUVORK5CYII="},216:function(A,e){A.exports="data:image/png;base64,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"},430:function(A,e,t){},495:function(A,e,t){"use strict";t.r(e);t(73);var a,n=t(74),o=t.n(n),E=(t(70),t(34)),C=t.n(E),g=t(7),c=t(8),r=t(28),B=t(27),i=t(71),s=t(29),l=t(1),d=t.n(l),I=t(33),u=(t(9),t(18)),p=(t(430),t(193)),m=t(240),Q=t.n(m),v=t(216),w=t.n(v),f=t(211),S=t.n(f),R=Object(I.b)("userM4DStore")(a=Object(I.b)("localeStore")(a=Object(I.c)(a=function(A){function e(){var A,t;Object(g.a)(this,e);for(var a=arguments.length,n=new Array(a),o=0;o<a;o++)n[o]=arguments[o];return(t=Object(r.a)(this,(A=Object(B.a)(e)).call.apply(A,[this].concat(n)))).state={walletAddress:"",selectedOption:localStorage.getItem("RECHARGE_TYPE")||"USDT",showOption:!1,lian_type:"TRC20"},t.getWalletAddress=function(){var A=Object(i.a)(t),e=t.props,a=e.userM4DStore,n=(e.history,t.state),o=n.selectedOption,E="";E="TRC20"===n.lian_type?"TRX":"ETH",console.log(o),u.e.getWalletAddress({open_id:a.openid,type:E}).then(function(e){1===e.status?A.setState({walletAddress:e.data.wallet}):C.a.info(e.msg,2)})},t.copyText=function(A){t.props.localeStore.locale.RECHARGE;document.getElementById("textCopy").select(),document.execCommand("Copy"),document.execCommand("Copy")?C.a.info("\u590d\u5236\u6210\u529f",1):(window.webkit.messageHandlers.CopyText.postMessage(A),C.a.info("\u590d\u5236\u6210\u529f",1))},t.screenShot=function(){document.getElementById("qrCode");var A=document.getElementById("qrCode").toDataURL("png");A=A.replace(function(A){return"image/"+(A=A.toLocaleLowerCase().replace(/jpg/i,"jpeg")).match(/png|jpeg|bmp|gif/)[0]}("png"),"image/octet-stream");var e=new Date,a="DMO"+e.getHours()+":"+e.getMinutes()+":"+e.getSeconds()+".png";t.savaImage(A,a)},t.savaImage=function(A,e){var t=document.createElementNS("http://www.w3.org/1999/xhtml","a");t.href=A,t.download=e;var a=document.createEvent("MouseEvents");a.initMouseEvent("click",!0,!1,window,0,0,0,0,0,!1,!1,!1,!1,0,null),t.dispatchEvent(a)},t.checkLian=function(A){t.setState({lian_type:A},function(){t.getWalletAddress()})},t}return Object(s.a)(e,A),Object(c.a)(e,[{key:"componentDidMount",value:function(){var A=this.props,e=A.userM4DStore,t=A.history,a=this.props.localeStore.locale.RECHARGE;e.isOnline()?e.getUserStatus():C.a.info(a.PLEASE_LOGIN,1,function(){return t.push("/login")})}},{key:"componentWillUnmount",value:function(){}},{key:"render",value:function(){var A=this,e=this.props.history,t=this.state,a=t.walletAddress,n=(t.selectedOption,t.showOption,t.lian_type,this.props.localeStore.locale),E=n.RECHARGE;n.EXTRACT;return d.a.createElement("div",{id:"Receive"},d.a.createElement(p.a,null),d.a.createElement("div",{className:"it_title"},"\u63a5\u6536NFT"),d.a.createElement("div",{className:"goto-jilu"},d.a.createElement("img",{src:w.a})),d.a.createElement("div",{onClick:function(){e.push("/Transfer")},className:"direction"},d.a.createElement("span",null,"\u65b9\u5411"),d.a.createElement("span",null,"\u63a5\u6536NFT ",d.a.createElement(o.a,{type:"right"}))),d.a.createElement("div",{className:"code-box"},d.a.createElement("div",{className:"canvas-code"},d.a.createElement(Q.a,{includeMargin:!0,level:"H",value:a,size:200,id:"qrCode"})),d.a.createElement("p",{onClick:function(){A.copyText(a)},className:"address_text"},a," ",d.a.createElement("img",{src:S.a})),d.a.createElement("div",{className:"copy-btn"},d.a.createElement("a",{onClick:function(){A.screenShot()},id:"aId"},E.JIEPING_SAVE_QRCODE)),d.a.createElement("textarea",{style:{position:"fixed",top:"-10000rem",opacity:"0"},readOnly:!0,id:"textCopy",value:a})),d.a.createElement("div",{className:"explain-box"},d.a.createElement("p",null,d.a.createElement("li",null,"1.\u6b64\u5730\u5740\u662f\u4f60\u552f\u4e00\u4e14\u72ec\u81ea\u4f7f\u7528\u7684\u8f6c\u5165\u5730\u5740\uff0c\u4f60\u53ef\u4ee5\u540c\u65f6\u8fdb\u884c\u591a\u6b21\u63a5\u6536\u3002"),d.a.createElement("li",null,"2.\u672c\u5730\u5740\u7981\u6b62\u63a5\u6536\u9664ERC20\u6807\u51c6\u5916\u7684\u5176\u4ed6NFT\u3002"))))}}]),e}(l.Component))||a)||a)||a;e.default=R}}]);
//# sourceMappingURL=45.53e87198.chunk.js.map