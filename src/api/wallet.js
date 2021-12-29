import http from "./http";

class WalletApi {
 
 

  /**
   * 转出申请初始化
   *
   * @required type string 转出类型，USDT|XC
   **/
  static withdrawInit(options = {}) {
    return http.post('/user/cashini', options)
  }

  /**
   * 提交转出申请
   *
   * @required walletTo string 钱包地址
   * @required code string 邮箱验证码或手机验证码
   * @required amount number 转出数量
   * @required type string 转出类型，USDT|XC
   **/
  static withdraw(options = {}) {
    return http.post('/user/cash', options)
  }

  /**
   * 转出申请记录
   *
   * @required type string 转出类型，USDT|XC
   **/
  static withdrawRecords(options = {}) {
    return http.post('/user/cashlist', options)
  }

  /**
   * 我的钱包地址
   *
   * @required type string 转出类型，USDT|XC
   **/
  static getWalletAddress(options = {}) {
    return http.post('/newpay/mywallet', options)
  }
}

export default WalletApi
