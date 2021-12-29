import http from "./http";

class propertyM4DApi {

  /**
   * 资产流水m
   * @required open_id string 钱包地址
   * @required type string 邮箱验证码或手机验证码
   * @required page number 转出数量
   * @required row string 转出类型，USDT|XC
   **/
  static getPropertyStream(options = {}) {
    return http.post('/api/userassets/stream', options)
  }


  /**
   * 获取USDT流水
   *
   * type string balance(代表USDT) 默认值：balance
   * page string 页码
   * row string 每页条数
   *
   **/
  static getUsdtStream(options = {}) {
    return http.post('/asset/userAsset', options)
  }

 /**
   * 获取积分流水
   *
   * type string balance(代表USDT) 默认值：balance
   * page string 页码
   * row string 每页条数
   *
   **/
  static getJifenStream(options = {}) {
    return http.post('/asset/integralList', options)
  }



  /**
   * 转出申请初始化
   *
   * @required type string 转出类型，USDT
   * @required open_id string 
   **/
  static withdrawInit(options = {}) {
    return http.post('/asset/cashIni', options)
  }
  /**
   * 获取站内还是站外转出及手续费比例 
   *
   * @required address string 钱包地址
   * @required type string 币种类型USDT|XC
   **/
  static serviceCharge(options = {}) {
    return http.post('/asset/walletforaddress', options)
  }
  /**
   * 提交转出申请
   *
   * @required walletTo string 钱包地址
   * @required open_id string 
   * @required code string 邮箱验证码或手机验证码
   * @required amount number 转出数量
   * @required type string 转出类型，USDT
   * @required pay_password string 资金密码
   **/
  static withdraw(options = {}) {
    return http.post('/asset/cash', options)
  }

  /**
   * 转出申请记录
   *
   * @required type string 转出类型，
   **/
  static withdrawRecords(options = {}) {
    return http.post('/asset/cashlist', options)
  }

  /**
   * 我的钱包地址 返回转出地址
   *
   * @required open_id string 
   * @required type string 
   **/
  static getWalletAddress(options = {}) {
    return http.post('/user/mywallet', options)
  }
  /**
   * 资产页面
   *
   * @required open_id string 
   **/
  static myAssets(options = {}) {
    return http.post('/asset/myAssets', options)
  }


}

export default propertyM4DApi
