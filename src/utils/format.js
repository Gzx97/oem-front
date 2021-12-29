import dayjs from "dayjs";
import { COIN_POINT_LENGTH } from "./constants";
import locales from "../locales";
function getLocale() {
  const lang = localStorage.getItem("LANG") || "zh-cn";
  // console.log(lang);
  // console.log(locales[lang]);
  return locales[lang];
}
const locale = getLocale();
// 转换币种格式
export function BiToDaxie(bi) {
  if (!bi) return "";
  return bi.replace(/usdt/g, "/USDT").toUpperCase();
}
export function formatDate(timestamp) {
  if (!timestamp) return "";
  return dayjs(timestamp * 1000).format("YYYY年MM月DD日");
}

export function formatTime(timestamp) {
  if (!timestamp) return "";
  return dayjs(timestamp * 1000).format("YYYY.MM.DD HH:mm");
}

export function formatDateTime(timestamp) {
  if (!timestamp) return "";
  return dayjs(timestamp * 1000).format("YYYY.MM.DD HH:mm:ss");
}
export function formatDataHourTime(timestamp) {
  if (!timestamp) return "";
  return dayjs(timestamp * 1000).format("MM月DD日 HH:mm:ss");
}
export function formatHourTime(timestamp) {
  if (!timestamp) return "";
  return dayjs(timestamp * 1000).format("HH:mm");
}
// 斜杠
export function formatDateTimeXiegang(timestamp) {
  if (!timestamp) return "";
  return dayjs(timestamp * 1000).format("YYYY/MM/DD HH:mm:ss");
}
// 币种价格与数量位数格式化
export function formatCoinPrice(price, length = 2) {
  if (!price) return "--";
  return downFixed(price, length);
}

// 币种价格与数量位数格式化
export function formatWalletPrice(price, length) {
  length = length || COIN_POINT_LENGTH;
  if (!price) return 0;
  return subZeroAndDot(downFixed(price, length));
}
// 币种价格与数量位数格式化4
export function formatWalletPrice4(price, length = 4) {
  if (!price) return 0;
  return downFixed(price, length);
}
// 币种价格与数量位数格式化 (4位去掉多余0)
export function formatWalletPriceSubZeroAndDot(
  price,
  length = COIN_POINT_LENGTH
) {
  if (!price) return 0;
  // price=price+'';//这一步是将data转换成string类型;
  // price = price.substring(0, price.lastIndexOf(".") + 3)
  // return subZeroAndDot(downFixed(price, length))
  return subZeroAndDot(downFixed(price, length));
}
// 保留2位
export function formatSpecialOffer(price) {
  if (!price) return "0.00";
  return downFixed(price, 2);
  // price = Number(price).toFixed(2)
  // return parseFloat(price)
}
// 去掉多余的0
export function subZeroAndDot(price) {
  // console.log(price)
  if (!price) return "0";
  if (typeof price == "undefined" || price == null || price.trim() == "") {
    return price;
  }
  return Number(String(parseFloat(price)));
}
// 特价算力数量保留2位
export function formatSpecialOffer2(price) {
  if (!price) return 0;
  return downFixed(price, 2);
  // price = Number(price).toFixed(2)
  // return parseFloat(price)
}
// 账号加*显示
export function cryptoAccountDisplay(account) {
  account = account.toString();
  return account.slice(0, 3) + "****" + account.substring(account.length-4);
  // return account ? account.replace(account.slice(3, 7), '****') : account;
}
// 账号截取最后六位
export function lastsix(account) {
  account = account.toString();
  // console.log(account)
  let str = account; //截取后4位
  return str.substring(str.length - 6);
}

function downFixed(num, fix) {
  // num为原数字，fix是保留的小数位数
  let result = "0";
  if (Number(num) && fix > 0) {
    // 简单的做个判断
    fix = +fix || 2;
    num = num + "";

    if (/e/.test(num)) {
      // 如果是包含e字符的数字直接返回
      // result = num
      result = 0;
    } else if (!/\./.test(num)) {
      // 如果没有小数点
      result = num + `.${Array(fix + 1).join("0")}`;
    } else {
      // 如果有小数点
      num = num + `${Array(fix + 1).join("0")}`;
      let reg = new RegExp(`-?\\d*.\\d{0,${fix}}`);
      result = reg.exec(num)[0];
    }
  }
  return result;
}
export function toChinesNum(num) {
  let changeNum = ["零", "一", "二", "三", "四", "五", "六", "七", "八", "九"];
  let unit = ["", "十", "百", "千", "万"];
  num = parseInt(num);
  let getWan = (temp) => {
    let strArr = temp.toString().split("").reverse();
    let newNum = "";
    for (var i = 0; i < strArr.length; i++) {
      newNum =
        (i == 0 && strArr[i] == 0
          ? ""
          : i > 0 && strArr[i] == 0 && strArr[i - 1] == 0
          ? ""
          : changeNum[strArr[i]] + (strArr[i] == 0 ? unit[0] : unit[i])) +
        newNum;
    }
    return newNum;
  };
  let overWan = Math.floor(num / 10000);
  let noWan = num % 10000;
  if (noWan.toString().length < 4) {
    noWan = "0" + noWan;
  }
  return overWan ? getWan(overWan) + "万" + getWan(noWan) : getWan(num);
}
// 判断是几秒前
export function getDateDiff(setdateTimeStamp) {
  let minute = 1000 * 60;
  let hour = minute * 60;
  let day = hour * 24;
  let halfamonth = day * 15;
  let month = day * 30;
  let dateTimeStamp = new Date(setdateTimeStamp * 1000);
  let now = new Date().getTime();
  let diffValue = now - dateTimeStamp;
  if (diffValue < 0) {
    //若日期不符则弹出窗口告之
    return "结束日期不能小于开始日期！";
  }
  let monthC = diffValue / month;
  let weekC = diffValue / (7 * day);
  let dayC = diffValue / day;
  let hourC = diffValue / hour;
  let minC = diffValue / minute;
  let result = "";
  if (monthC >= 1) {
    // result = parseInt(monthC) + locale.BROWSER.GYQ;
    result = parseInt(monthC) + "月";
  } else if (weekC >= 1) {
    result = parseInt(weekC) + "周";
  } else if (dayC >= 1) {
    result = parseInt(dayC) + "天";
  } else if (hourC >= 1) {
    result = parseInt(hourC) + "小时";
  } else if (minC >= 1) {
    result = parseInt(minC) + "分钟";
    // console.log( parseInt(diffValue/1000))
  } else result = parseInt(diffValue / 1000) + locale.BROWSER.MQ;

  // result = parseInt(diffValue);
  // alert(result);
  return result;
}
// 数组去重
export function unique(arr) {
  return Array.from(new Set(arr));
}

//对象数组的去重
export function uniqObjInArray(objarray) {
  let len = objarray.length;
  let tempJson = {};
  let res = [];
  for (let i = 0; i < len; i++) {
    //取出每一个对象
    tempJson[JSON.stringify(objarray[i])] = true;
  }
  let keyItems = Object.keys(tempJson);
  for (let j = 0; j < keyItems.length; j++) {
    res.push(JSON.parse(keyItems[j]));
  }
  return res;
}
export function daojishi(thisTime, type) {
  let expire_time = formatDateTimeXiegang(thisTime);
  let NowTime = new Date(),
    EndTime = new Date(expire_time),
    t = NowTime.getTime() - EndTime.getTime(),
    day = Math.floor(t / 1000 / 60 / 60 / 24),
    hours = Math.floor((t / 1000 / 60 / 60) % 24),
    minutes = Math.floor((t / 1000 / 60) % 60),
    seconds = Math.floor((t / 1000) % 60);

  let Day = day < 10 ? (day < 0 ? "00" : "0" + day) : day;
  // $Hours: hours < 10 ? (hours < 0 ? '00' : '0' + hours) : hours,
  let Hour = hours < 10 ? (hours < 0 ? "00" : "0" + hours) : hours;
  let Minutes = minutes < 10 ? (minutes < 0 ? "00" : "0" + minutes) : minutes;

  let Seconds = seconds < 10 ? (seconds < 0 ? "00" : "0" + seconds) : seconds;
  if (type === "时") {
    return (Day || 0) + locale.ORDER.TIAN + (Hour || 0) + locale.ORDER.SHI;
  }
  return (
    Day +
    locale.ORDER.TIAN +
    Hour +
    locale.ORDER.SHI +
    Minutes +
    locale.ORDER.FEN
  );
}

/**
 * [getUrlParam 获取地址栏传参]
 * @param  {[String]} paramname [参数名]
 * @return {[String]}           [参数值]
 */
export function getUrlParam(paramname) {
  var reg = new RegExp("(^|&)" + paramname + "=([^&]*)(&|$)");

  // 查询匹配 substr(1)删除? match()匹配
  var s = window.location.search.substr(1).match(reg);

  if (s != null) {
    return unescape(s[2]); // unescape() 函数可对通过 escape() 编码的字符串进行解码。
    // return s[2]; //
  }

  return null;
}

//获取地址栏参数的方法
export function getQueryString(name) {
  // console.log(name)
  var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
  var r = window.location.search.substr(1).match(reg);
  if (r != null) return r[2];
  return null;
}

/**
 * 格式化秒
 * @param int  value 总秒数
 * @return string result 格式化后的字符串
 */
export function formatSeconds(value) {
  var theTime = parseInt(value); // 需要转换的时间秒
  var theTime1 = 0; // 分
  var theTime2 = 0; // 小时
  var theTime3 = 0; // 天
  if (theTime > 60) {
    theTime1 = parseInt(theTime / 60);
    theTime = parseInt(theTime % 60);
    if (theTime1 > 60) {
      theTime2 = parseInt(theTime1 / 60);
      theTime1 = parseInt(theTime1 % 60);
      if (theTime2 > 24) {
        //大于24小时
        theTime3 = parseInt(theTime2 / 24);
        theTime2 = parseInt(theTime2 % 24);
      }
    }
  }
  var result = "";
  if (theTime > 0) {
    // result = "" + parseInt(theTime) + "秒";
  }
  // if (theTime1 > 0) {
  //   result = "" + parseInt(theTime1) + "分" + result;
  // } else {
  //   result = "" + "00分" + result;
  // }
  if (theTime2 > 0) {
    result = "" + parseInt(theTime2) + locale.ORDER.SHI + result;
  } else {
    result = "" + "00" + locale.ORDER.SHI + result;
  }
  if (theTime3 > 0) {
    result = "" + parseInt(theTime3) + locale.ORDER.TIAN + result;
  } else {
    result = "" + "00" + locale.ORDER.TIAN + result;
  }
  return result;
}

export function compareToIndexValue(arr, int, arrIndex) {
  if (
    arr[arrIndex].substring(int, int + 1) ==
    arr[arrIndex + 1].substring(int, int + 1)
  )
    compareToIndexValue(arr, int + 1, arrIndex);
  //如果第一位相等,则继续比较第二个字符
  else if (
    arr[arrIndex].substring(int, int + 1) >
    arr[arrIndex + 1].substring(int, int + 1)
  ) {
    var temp = arr[arrIndex + 1];
    arr[arrIndex + 1] = arr[arrIndex];
    arr[arrIndex] = temp;
  } /*else if(arr[arrIndex].substring(int,int+1) < arr[arrIndex + 1].substring(int,int+1)) return;*/
  return;
}
/**
 * 传入数组
 * 按字母顺序,升序
 * 冒泡排序
 */
export function getKeySort(strArr) {
  var count = 0;
  var compareInt = 0;
  for (var i = 0; i < strArr.length; i++) {
    for (var j = 0; j < strArr.length - 1 - i; j++) {
      /*if(strArr [j].substring(0,1) > strArr[j + 1].substring(0,1)){
				var temp = strArr[j + 1];
				strArr[j + 1] = strArr[j];
				strArr[j] = temp;
			}
			if(strArr [j].substring(0,1) == strArr[j + 1].substring(0,1)){
				if(strArr [j].substring(1,2) > strArr[j + 1].substring(1,2)){
					var temp = strArr[j + 1];
					strArr[j + 1] = strArr[j];
					strArr[j] = temp;
				}
			}*/
      compareToIndexValue(strArr, compareInt, j);
      count++;
    }
  }
  /*console.log("遍历次数:"+count);*/
  /*console.log(strArr);*/
  return strArr;
}

//由星期的数字转换为星期的名称,date格式：2016-01-07，用"-"分割
export function toWeekName(date) {
  var newDate = new Date(date.replace(/-/g, "/"));
  var weekday = new Array(7);
  weekday[0] = "星期日";
  weekday[1] = "星期一";
  weekday[2] = "星期二";
  weekday[3] = "星期三";
  weekday[4] = "星期四";
  weekday[5] = "星期五";
  weekday[6] = "星期六";
  return weekday[newDate.getDay()];
}
//解决ios橡皮筋问题
export function iosTrouchFn(el) {
  //el需要滑动的元素
  el.addEventListener("touchmove", function (e) {
    e.isSCROLL = true;
  });
  document.body.addEventListener(
    "touchmove",
    function (e) {
      if (!e.isSCROLL) {
        e.preventDefault(); //阻止默认事件(上下滑动)
      } else {
        //需要滑动的区域
        var top = el.scrollTop; //对象最顶端和窗口最顶端之间的距离
        var scrollH = el.scrollHeight; //含滚动内容的元素大小
        var offsetH = el.offsetHeight; //网页可见区域高
        var cScroll = top + offsetH; //当前滚动的距离

        //被滑动到最上方和最下方的时候
        if (top == 0) {
          top = 1; //0～1之间的小数会被当成0
        } else if (cScroll === scrollH) {
          el.scrollTop = top - 0.1;
        }
      }
    },
    { passive: false }
  ); //passive防止阻止默认事件不生效
}
export function formatZeroNumber(price) {
  if (!price) return 0;
  if (price>0){
    return formatWalletPrice(price)
  }
  const nStr = price.toString();
  // 点开头 后面接任意个0 也可能没有0 然后是非0的数第一次出现 后面接任意数字
  const pattern = /\.0*?[^0].?/;
  return nStr.split(".")[0] + pattern.exec(nStr)[0];
}
// 格式化tags
export function formatTags(tags){
  let newTags = []
  newTags =  tags.split(',')
  // console.log(newTags)
  return newTags
}
