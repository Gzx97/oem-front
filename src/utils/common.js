import { CAPTCHA_ID } from "./constants";

export function convertCanvasToImage(canvas) {
  let image = new Image();
  //canvas.toDataURL返回的是一串Base64编码的URL,当然,浏览器自己肯定支持
  //指定格式PNG
  image.src = canvas.toDataURL("image/png");
  return image;
}

export function chineseCapital(num) {
  const capitals = [
    "零",
    "一",
    "二",
    "三",
    "四",
    "五",
    "六",
    "七",
    "八",
    "九",
    "十",
  ];
  return capitals[num];
}

/**
 * @description 初始化网易验证码
 * @param {object} config 验证码配置对象
 */
export const initNECaptcha = (config = {}) => {
  if (!window.initNECaptcha) return;
  window.initNECaptcha(
    {
      captchaId: config.captchaId || CAPTCHA_ID,
      element: config.element || "",
      mode: config.mode || "popup",
      width: config.width || 280,
      // lang: config.lang === 'zh-CN' ? 'zh-CN' : 'en',
      onReady: (instance) => {
        // 验证码一切准备就绪，此时可正常使用验证码的相关功能
        if (config.debug) {
          console.log("[NECaptcha] onReady");
        }
        config.onReady &&
          typeof config.onReady === "function" &&
          config.onReady(instance);
      },
      onVerify: (err, data) => {
        // 验证结果
        if (config.debug) {
          console.log("[NECaptcha] onVerify", data.validate);
        }
        if (err && config.debug) {
          console.error(err);
          return;
        }

        config.onVerify &&
          typeof config.onVerify === "function" &&
          config.onVerify(data);
      },
    },
    (instance) => {
      // 初始化成功
      if (config.debug) {
        console.log("[NECaptcha] Initialized");
        console.log("[NECaptcha] instance", instance);
      }
      instance.popUp();

      config.onLoad &&
        typeof config.onLoad === "function" &&
        config.onLoad(instance);
    },
    (err) => {
      // 初始化失败
      if (config.debug) {
        console.error("[NECaptcha] Fail to initialize", err);
      }
      config.onError &&
        typeof config.onError === "function" &&
        config.onError();
    }
  );
};

// 下划线转驼峰
export function optionsToHump(options) {
  const result = {};
  Object.keys(options).forEach((key) => {
    const newKey = key.replace(/_(\w)/g, (all, letter) => letter.toUpperCase());
    result[newKey] = options[key];
  });
  return result;
}

// 驼峰转换下划线
export function optionsToLine(options) {
  const result = {};
  Object.keys(options).forEach((key) => {
    const newKey = key.replace(/([A-Z])/g, "_$1").toLowerCase();
    result[newKey] = options[key];
  });
  return result;
}

/**
 * @description 把时间戳转为 JS 时间戳（毫秒，13位）
 * @param {number} [num=0] 待转换的时间戳
 * @returns {number} 13 位时间戳
 */
export const ensureMilliseconds = (num = 0) => {
  return Number(String(num).padEnd(13, 0).substr(0, 13));
};

/**
 * @description 获取query参数
 * @param {String} key
 * @returns {String} param
 */
export function getQueryParam(key) {
  const reg = new RegExp("(^|&)" + key + "=([^&]*)(&|$)", "i");
  const r = window.location.search.substr(1).match(reg);
  if (r != null) {
    return decodeURI(r[2]);
  }
  return null;
}

/**
 * @description 弹出软键盘，隐藏底部 fixed button
 * @param {function} callback
 * @returns {void}
 */
export function compatibleFixedButton(callback) {
  const windowInnerHeight = window.innerHeight;
  window.onresize = () => {
    if (window.innerHeight < windowInnerHeight) {
      callback && callback(false); // 隐藏
    } else {
      callback && callback(true); // 显示
    }
  };
}

/**
 * @description 判断是否是微信浏览器环境
 * @returns {boolean}
 */
export function isWxAgent() {
  const ua = navigator.userAgent.toLowerCase(); //获取判断用的对象
  const match = ua.match(/MicroMessenger/i);
  if (!match) return false;
  return match.toString() === "micromessenger";
}

/**
 * @description 隐藏联系客服按钮
 * @returns {void}
 */

export function hideChatButton() {
  let iframes = document.querySelectorAll("iframe");
  const len = iframes.length || 0;
  if (len <= 0) return;
  for (let i = 0; i < len; i++) {
    let win = iframes[i].contentWindow;
    let button = win.document.querySelector("#Embed");
    if (button) {
      button.style.display = "none";
    }
  }
}
/**
 * @description 判断终端
 * @returns {void}
 */
export function isIosOrAndroid() {
  var u = navigator.userAgent,
    app = navigator.appVersion;
  var isAndroid = u.indexOf("Android") > -1 || u.indexOf("Adr") > -1; //android终端
  if (isAndroid) {
    return 1;
  }
  var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios终端
  if (isiOS) {
    return 2;
  }
  return 0;
}
export function isWeixn() {
  let ua = navigator.userAgent.toLowerCase();
  let isWeixin = ua.indexOf("micromessenger") != -1;
  if (isWeixin) {
    return true;
  } else {
    return false;
  }
}
export function base64ToBlob({
  b64data = "",
  contentType = "",
  sliceSize = 512,
} = {}) {
  return new Promise((resolve, reject) => {
    // 使用 atob() 方法将数据解码
    let byteCharacters = atob(b64data);
    let byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += sliceSize) {
      let slice = byteCharacters.slice(offset, offset + sliceSize);
      let byteNumbers = [];
      for (let i = 0; i < slice.length; i++) {
        byteNumbers.push(slice.charCodeAt(i));
      }
      // 8 位无符号整数值的类型化数组。内容将初始化为 0。
      // 如果无法分配请求数目的字节，则将引发异常。
      byteArrays.push(new Uint8Array(byteNumbers));
    }
    let result = new Blob(byteArrays, {
      type: contentType,
    });
    result = Object.assign(result, {
      // 这里一定要处理一下 URL.createObjectURL
      preview: URL.createObjectURL(result),
      name: `XXX.png`,
    });
    resolve(result);
  });
}

export function imageBase64ToFile(imageBase64) {
  const arr = imageBase64.split(',');
  const binary = atob(arr[1]); // base64解码
  const mine = arr[0].match(/:(.*?);/)[1]; // 文件类型
  const array = [];
  for (let i = 0; i < binary.length; i++) {
    array.push(binary.charCodeAt(i)); //  Unicode 编码
  }
  const blob = new Blob([new Uint8Array(array)], {type: mine}); // Blob对象可以看做是存放二进制数据的容器；Uint8Array类型数组：8位无符号整数数组
  /**
   * blobParts： 数组类型， 数组中的每一项连接起来构成Blob对象的数据，数组中的每项元素可以是ArrayBuffer(二进制数据缓冲区), ArrayBufferView,Blob,DOMString。或其他类似对象的混合体。
   * options： 可选项，字典格式类型，可以指定如下两个属性：
       type，默认值为""，它代表了将会被放入到blob中的数组内容的MIME类型。
       endings， 默认值为"transparent"，用于指定包含行结束符\n的字符串如何被写入。 它是以下两个值中的一个： "native"，表示行结束符会被更改为适合宿主操作系统文件系统的换行符； "transparent"，表示会保持blob中保存的结束符不变。
   */
  // 转换成file对象
  const file = new File([blob],Date.now() + '.png', {type:mine});
  /**
  * filebits：ArrayBuffer，ArrayBufferView，Blob，或者 DOMString 对象的 Array — 或者任何这些对象的组合。这是 UTF-8 编码的文件内容。
  * name：文件名称，或者文件路径
  * options 可选：选项对象，包含文件的可选属性。可用的选项如下：
      type: DOMString，表示将要放到文件中的内容的 MIME 类型。默认值为 “” 。
      lastModified: 数值，表示文件最后修改时间的 Unix 时间戳（毫秒）。默认值为 Date.now()。
   */
  return file
}