// 前端访问链接
// http://47.52.21.155:8202

// 前端git仓库
// ssh://www@47.52.21.155/data/git/imeta-front.git  http://ctm-ib.com/
// git:
// imeta-api
// imeta-front 
// api:  8200
// front:  8202
// 切换开发和生产API
// background: linear-gradient(90deg, #EE5035 0%, #E32A2A 100%);  #EC4B33  background-color: rgba(26 ,32 ,46,1);

export let ONLINE = true;
// console.log(window.location.hostname)
if (
  window.location.hostname === "localhost" ||
  window.location.hostname === "47.52.21.155"
) {
  ONLINE = false;
}
if (ONLINE) {
  console.log = function () {};
}
const COIN = {
  PROD: {
    API_BASE_URL: "https://api.ctm-ib.com/api",
  },
  DEV: {
    API_BASE_URL: "http://47.52.21.155:8200/api",
    // XC_AUTH_URL: 'https://test.zbx.one/xplan_authorization',
  },
};

export const CONFIG = ONLINE ? COIN.PROD : COIN.DEV;
const HYL = `
作曲：戚建波

作词：车行

编曲：张宏光

（好运来祝你好运来）

（好运带来了喜和爱）

（好运来我们好运来）

（迎着好运兴旺发达通四海）

叠个千纸鹤 再系个红飘带

愿善良的人们天天好运来

你勤劳生活美 你健康春常在

你一生的忙碌为了笑逐颜开

打个中国结 请春风剪个彩

愿祖国的日月年年好运来

你凤舞太平年 你龙腾新时代

你幸福的家园迎来百花盛开

好运来祝你好运来

好运带来了喜和爱

好运来 我们好运来

迎着好运兴旺发达通四海

叠个千纸鹤 再系个红飘带

愿善良的人们天天好运来

你勤劳生活美 你健康春常在

你一生的忙碌为了笑逐颜开

打个中国结 请春风剪个彩

愿祖国的日月年年好运来

你凤舞太平年 你龙腾新时代

你幸福的家园迎来百花盛开

好运来祝你好运来

好运带来了喜和爱

好运来 我们好运来

迎着好运兴旺发达通四海

好运来祝你好运来

好运带来了喜和爱

好运来 我们好运来

迎着好运兴旺发达通四海

好运来祝你好运来

好运带来了喜和爱

好运来 我们好运来

迎着好运兴旺发达通四海

通四海 好运来

`;