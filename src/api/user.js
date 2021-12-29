import http from "./http";
import { CONFIG } from "../config";
import { optionsToHump, optionsToLine } from "../utils/common";

class UserApi {
  /**
   * 测试接口
   **/
  static gzxTest(options = {}, params = {}) {
    return http.post("/index/test", options);
  }

  /**
   * 修改支付密码(登录状态)
   **/
  static editPaypassword(options = {}, params = {}) {
    return http.post("/user/editPaypassword", options);
  }
  /**
   * 验证用户名是否注册
   **/
  static usernameexist(options = {}, params = {}) {
    return http.post("/user/usernameexist", options);
  }
  /**
   * 绑定邀请关系
   **/
  static bindrecommend(options = {}, params = {}) {
    return http.post("/user/bindrecommend", options);
  }
  /**
   * 社区
   **/
  static myTream(options = {}, params = {}) {
    return http.post("/user/myTream", options);
  }

  /**
   * 获取图形验证码
   **/
  static getCaptchaPng(params = {}) {
    return Promise.resolve(
      `${CONFIG.API_BASE_URL}/captchapng/png?key=${params.key}`
      // `${CONFIG.API_BASE_URL}/captchapng/png`
    );
  }

  /**
   * 发送邮箱验证码
   *
   * @required imgcode string 图形验证码
   * @required email string 邮箱
   * type string 类型（reg|findpassword|setpaypassword|withdraw）
   **/
  static sendMailCode(options = {}, params = {}) {
    options.noLogin = true;
    // return http.post('/user/sendmailcode?key=' + params.key, options)
    return http.post("/user/sendmailcode", options);
  }

  /**
   * 发送手机验证码
   *
   * @required imgcode string 图形验证码
   * @required prefix string 国家码
   * @required phone string 图形验证码
   * type string 图形验证码 （reg|findpassword）
   **/
  static sendSmsCode(options, params) {
    // options.noLogin = true
    // return http.post('/user/sendsmscode?key=' + params.key, options)
    return http.post("/user/sendsmscode", options);
  }

  /**
   * 用户注册
   *
   * phonePrefix string 手机号前缀
   * @required userName string 用户名
   * @required code string 邮箱验证码
   * @required password string 密码
   * @required passwordConfirm string 密码
   * @required recommendCode string 推荐码
   **/
  static register(options) {
    // options.noLogin = true
    return http.post("/user/reg", options);
  }

  /**
   * 用户登录
   *
   * @required userName string 手机号或邮箱地址
   * @required password string 密码
   * phonePrefix string 手机号前缀（当输入账号为手机时）
   **/
  static login(options) {
    // options.noLogin = true
    return http.post("/user/login", options);
  }

  /**
   * 用户退出
   *
   **/
  static loginOut(options) {
    // options.noLogin = true
    return http.post("/user/loginOut", options);
  }
  /**
   * 绑定手机号
   *
   * @required prefix number 国际码
   * @required phone string 手机号
   * @required string 手机验证码
   **/
  static bindPhone(options) {
    return http.post("/user/bindphone", options);
  }

  /**
   * 校验手机验证码（找回密码 m4d）
   *
   * @required prefix string 手机号国家码
   * @required phone string 手机号
   * @required type string 验证类型 如reg
   * @required code string 验证码
   **/
  static checkphonecode(options) {
    // options.noLogin = true
    return http.post("/user/checkphonecode", options);
  }
  /**
   * 校验邮箱验证码（找回密码 m4d）
   *
   * @required email string 邮箱地址
   * @required type string 验证类型 如reg
   * @required code string 验证码
   **/
  static checkmailcode(options) {
    // options.noLogin = true
    return http.post("/user/checkmailcode", options);
  }

  /**
   * 找回密码
   *
   * @required password string 密码
   * @required phone string 手机号
   * @required password_confirm string 确认密码
   * @required code string 验证token
   **/
  static findPassword(options) {
    return http.post("/user/findpassword", options);
  }
  /**
   * 修改登录状态的登录密码
   *
   **/
  static editLoginpassword(options) {
    return http.post("/user/editLoginpassword", options);
  }
  /**
   * 修改密码
   *
   * @required password string 密码
   * @required password_confirm string 确认密码
   * @required verify_token string 验证token
   **/
  static editPassword(options) {
    return http.post("/user/editpassword", options);
  }

  /**
   * 修改密码
   *
   * @required password string 密码
   * @required password_confirm string 确认密码
   * @required verify_token string 验证token
   **/
  static setpaypassword(options) {
    return http.post("/user/setpaypassword", options);
  }

  /**
   * 检测手机用户是否存在
   *
   * @required phonePrefix string 国际码
   * @required phoneNo string 号
   **/
  static phoneExist(options) {
    options.noLogin = true;
    return http.post("/user/phoneexist", options);
  }

  /**
   * 检测邮箱用户是否存在
   *
   * @required email string 国际码
   **/
  static emailExist(options) {
    options.noLogin = true;
    return http.post("/user/emailexist", options);
  }

  /**
   * 获取用户详细信息
   *
   * @required open_id string
   **/
  static getUserInfo(options) {
    return http.post("/user/myinfo", options);
  }

  /**
   * 公告列表
   *
   * @required page string 頁碼
   * @required row string 每頁條數
   **/
  static noticeList(options) {
    return http.post("/other/noticelist", options);
  }
  /**
   * 公告詳情
   * @required id number id
   **/
  static notice(options) {
    return http.post("/other/notice", options);
  }
  /**
   * 帮助列表
   *
   * @required page string 頁碼
   * @required row string 每頁條數
   **/
  static helpList(options) {
    return http.post("/other/helplist", options);
  }
  /**
   * 帮助詳情
   * @required id number id
   **/
  static help(options) {
    return http.post("/other/help", options);
  }
  /**
   * 上傳問題圖片
   * @required open_id string
   * @required file file
   **/
  static uploadphoto(options) {
    return http.post("/other/uploadphoto", options, {
      transformRequest: [
        (data) => {
          data = optionsToLine(data);
          let formData = new FormData();
          for (const key of Object.keys(data)) {
            formData.append(key, data[key]);
          }
          return formData;
        },
      ],
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  /**
   * 上傳实名认证圖片
   * @required open_id string
   * @required file file
   **/
  static uploadcerphoto(options) {
    return http.post("/other/uploadcerphoto", options, {
      transformRequest: [
        (data) => {
          data = optionsToLine(data);
          let formData = new FormData();
          for (const key of Object.keys(data)) {
            formData.append(key, data[key]);
          }
          return formData;
        },
      ],
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
  /**
   * 认证
   * @required open_id string
   **/
  static userCer(options) {
    return http.post("/user/userCer", options);
  }
  /**
   * 提交問題
   * @required open_id string
   * @required content string 內容
   * @required img_list string 图片地址列表，用”|“分割
   **/
  static ask(options) {
    return http.post("/other/ask", options);
  }

  /**
   * 回答列表
   * @required open_id string
   * @required page number 頁碼
   * @required row number 每頁條數
   **/
  static asklist(options) {
    return http.post("/other/asklist", options);
  }

  /**
   * 语言切换
   * @required open_id string
   **/
  static setlang(options) {
    return http.get("/other/setlang?langs=" + options);
  }

  /**
   * 积分页
   * @required open_id string
   **/
  static myAssets(options) {
    return http.post("/asset/myAssets", options);
  }
  /**
   * 积分流水
   * @required open_id string
   * @required page 
   * @required row 
   **/
  static integralList(options) {
    return http.post("/asset/integralList", options);
  }
}

export default UserApi;
