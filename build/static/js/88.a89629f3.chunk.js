(window.webpackJsonp=window.webpackJsonp||[]).push([[88],{488:function(e,t,a){"use strict";a.r(t);var n,o=a(194),c=a(204),i=a.n(c),l=a(203),r=(a(70),a(36)),s=a.n(r),p=a(205),m=a(7),u=a(8),d=a(28),h=a(27),y=a(71),g=a(29),b=a(1),f=a.n(b),v=a(33),O=(a(9),a(18)),j=a(197),E=(a(281),a(193)),w=a(199),S=a.n(w),x=a(200),C=Object(v.b)("userM4DStore")(n=Object(v.b)("localeStore")(n=Object(v.c)(n=function(e){function t(){var e,a;Object(m.a)(this,t);for(var n=arguments.length,o=new Array(n),c=0;c<n;c++)o[c]=arguments[c];return(a=Object(d.a)(this,(e=Object(h.a)(t)).call.apply(e,[this].concat(o)))).state={commodityList:[],page:1,pageSize:20,hasMore:!1,copyValue:""},a.getCommoditylist=Object(p.a)(i.a.mark(function e(){var t,n,o,c,r;return i.a.wrap(function(e){for(;;)switch(e.prev=e.next){case 0:return Object(y.a)(a),t=a.state,n=t.page,o=t.pageSize,c=t.commodityList,r=a.props.userM4DStore,e.next=5,r.getUserStatus();case 5:O.a.commodityList({page:n,row:o,box_id:Object(j.i)("id"),open_id:r.openid}).then(function(e){if(1===e.status){var t=e.data,i=t.length===o;c.push.apply(c,Object(l.a)(t)),a.setState({commodityList:c,hasMore:i,page:i?n+1:1})}else s.a.info(e.msg)});case 6:case"end":return e.stop()}},e)})),a}return Object(g.a)(t,e),Object(u.a)(t,[{key:"componentDidMount",value:function(){var e=this.props,t=e.userM4DStore;e.history;Object(o.a)(this.props.localeStore.locale),t.getUserStatus(),this.getCommoditylist().then()}},{key:"componentWillUnmount",value:function(){window.onresize=null}},{key:"render",value:function(){var e=this.props.history,t=this.state,a=t.commodityList,n=t.hasMore,c=t.copyValue;return Object(o.a)(this.props.localeStore.locale),f.a.createElement("div",{id:"AllCollection"},f.a.createElement("textarea",{style:{opacity:"0",position:"fixed",top:"-1000px"},readOnly:!0,id:"textCopy",value:c}),f.a.createElement(E.a,null),f.a.createElement("div",{className:"it_title"},"\u5168\u90e8\u85cf\u54c1"),f.a.createElement(S.a,{dataLength:a.length,next:this.getCommoditylist,hasMore:n,loader:f.a.createElement("p",{className:"loading"},""),endMessage:f.a.createElement("p",{style:{textAlign:"center",color:"#ccc"}},(a.length,""))},f.a.createElement("ul",{className:"sp_list"},a.length>0&&a.map(function(t,a){return f.a.createElement("li",{key:t.id,onClick:function(){e.push("/CollectionDetail?id="+t.id)}},f.a.createElement("div",{className:"img_box"},f.a.createElement("img",{src:t.pFace})),f.a.createElement("h2",null,t.pName),f.a.createElement("span",null,"\u603b\u91cf\uff1a",t.fCount))||f.a.createElement(x.a,null)}))))}}]),t}(b.Component))||n)||n)||n;t.default=C}}]);
//# sourceMappingURL=88.a89629f3.chunk.js.map