(window.webpackJsonp=window.webpackJsonp||[]).push([[47],{193:function(A,n,t){"use strict";var e,a=t(194),r=t(7),c=t(8),i=t(28),o=t(27),s=t(29),l=t(1),u=t.n(l),B=t(45),m=(t(196),t(33)),w=Object(m.b)("localeStore")(e=Object(m.c)(e=function(A){function n(){var A,t;Object(r.a)(this,n);for(var e=arguments.length,a=new Array(e),c=0;c<e;c++)a[c]=arguments[c];return(t=Object(i.a)(this,(A=Object(o.a)(n)).call.apply(A,[this].concat(a)))).onBack=function(){var A=t.props,n=A.history,e=A.onHandle;e?e():n.goBack&&window.history.length>1?window.history.go(-1):n.push("/home")},t}return Object(s.a)(n,A),Object(c.a)(n,[{key:"componentDidMount",value:function(){var A=this.props;A.history,A.onHandle}},{key:"render",value:function(){var A=this.props,n=A.src;Object(a.a)(A.localeStore);var e=this.props,r=(e.msg,e.hideBack);return u.a.createElement("div",{style:this.props.style||{},className:"account-header"},u.a.createElement("img",{className:r?"hidden":"",src:n&&n||t(195),alt:"\u8fd4\u56de",onClick:this.onBack}))}}]),n}(l.Component))||e)||e;n.a=Object(B.d)(w)},194:function(A,n,t){"use strict";function e(A){if(null==A)throw new TypeError("Cannot destructure undefined")}t.d(n,"a",function(){return e})},195:function(A,n){A.exports="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACIAAAAiCAYAAAA6RwvCAAAAAXNSR0IArs4c6QAAAERlWElmTU0AKgAAAAgAAYdpAAQAAAABAAAAGgAAAAAAA6ABAAMAAAABAAEAAKACAAQAAAABAAAAIqADAAQAAAABAAAAIgAAAAACeqFUAAACI0lEQVRYCb2YO0gDQRRFs34bQQiCaFDwA4pCioBFRAsLtbETG3tBLGwEK1uxsrOwshRBRKwsLKwEOxUxECsRJCKGaOI/ajwTLIbNzursTDJww8x78+55O7txJaFQgFEoFJrQJnpA52gsgI1ZCdAWlEDyeGPRaeasUQ0sgpJyB9J8QcOqZGtNSUQRANhO6hCprvxTUWovTBMd6Eq6evdUPCsRe0QPJwDd6NpNltYvzEc9Su2FAPSgGwnqnj4RGLFH9HAC0I9u3WRpnWM+7FFqLwQgiu4kqHv6SCBuj+jhBCCG7t1kaZ1hPuBRai8kAEiAVCNNImaP6OEEII7EkauGuFVRj1J7IQBDSDx8qiEe2n57xFInB0CYcAI1l6aLkQ8+Z1FSkTcJpym+dBynEKKRNdUxVCh+AqdNnMgFXfWZXJaF2j3RSA6jBgtmJhbZKqrLce91m0qJRnZ1q8qwf1ncmjqMz1CvD0D8H5LxyQdNiW/NNt+ag6IBzYhXfQqpxjGJyjxHgMSLzu/P+wH5+qCXrlUHaBA9I9XYIVGtZRp0M6Bx9K7qhPgGcoL6a9UBmkJfSDVWtQxNNtPBjKqL3/iSib9WLcDFP5qZ0zI02UwjKz7NfJObNvHXqgW27tNMntyElmHQzYCq0JZPM1lyrUH9teoA1aJ9n2bmtQxdm8VL71+D90GejZPoSFFQq4iXJ8yJNKJT18m8su4qD9HHFWgYWf2h5gfF7AOA8qMQfgAAAABJRU5ErkJggg=="},196:function(A,n,t){},308:function(A,n,t){},309:function(A,n){A.exports="data:image/png;base64,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"},467:function(A,n,t){"use strict";t.r(n);t(112);var e,a=t(72),r=t.n(a),c=(t(70),t(34)),i=t.n(c),o=t(7),s=t(8),l=t(28),u=t(27),B=t(29),m=t(1),w=t.n(m),g=t(33),E=(t(9),t(18)),d=(t(308),t(193)),p=t(309),b=t.n(p),C=t(20),M=Object(g.b)("localeStore")(e=Object(g.c)(e=function(A){function n(){var A,t;Object(o.a)(this,n);for(var e=arguments.length,a=new Array(e),r=0;r<e;r++)a[r]=arguments[r];return(t=Object(l.a)(this,(A=Object(u.a)(n)).call.apply(A,[this].concat(a)))).state={Zhongduan:"",urlAndroid:"",urlIos:""},t.gzxtest=function(){},t.onSubmit=function(){var A=t.state,n=A.Zhongduan,e=A.urlAndroid,a=A.urlIos;console.log(n),1===n&&window.open(e),2===n&&window.open(a)},t}return Object(B.a)(n,A),Object(s.a)(n,[{key:"componentDidMount",value:function(){var A=this;E.b.appdownload().then(function(n){1===n.status?A.setState({urlAndroid:n.data.urlAndroid,urlIos:n.data.urlIos}):i.a.info(n.msg)}),console.log(Object(C.c)());var n=Object(C.c)();this.setState({Zhongduan:n})}},{key:"componentWillUnmount",value:function(){window.onresize=null}},{key:"render",value:function(){this.props.history;var A=this.state.Zhongduan,n=this.props.localeStore.locale.DOWNLOAD;return w.a.createElement("div",{id:"Download"},w.a.createElement(d.a,null),w.a.createElement("div",{className:"it_title"},n.ZCWC),w.a.createElement("div",{className:"down_card"},w.a.createElement("img",{src:b.a}),w.a.createElement("p",null,n.GXN),w.a.createElement("p",null,n.SLWCZC),w.a.createElement("p",null,n.DJZZAPP),w.a.createElement("div",{className:"btn-box"},w.a.createElement(r.a,{className:"primary-button",onClick:this.onSubmit},1===A&&n.XZAZ||n.XZIOS))))}}]),n}(m.Component))||e)||e;n.default=M}}]);
//# sourceMappingURL=47.83202263.chunk.js.map