import http from "./http";
import { optionsToHump, optionsToLine } from "../utils/common";
class CommodityApi {
  /**
   * 获取首页商品信息
   *
   **/
  static commodityIndex(options = {}) {
    return http.post("/commodity/index", options);
  }

  /**
   * 获取盲盒列表
   *
   * @required page
   * @required row
   **/
  static boxList(options = {}) {
    return http.post("/commodity/boxlist", options);
  }
  /**
   * 获取藏品列表
   *
   * @required page
   * @required row
   **/
  static commodityList(options = {}) {
    return http.post("/commodity/commoditylist", options);
  }
  /**
   * 我的盲盒
   *
   * @required page
   * @required row
   **/
  static myBox(options = {}) {
    return http.post("/commodity/mybox", options);
  }
  /**
   * 我的藏品
   *
   * @required page
   * @required row
   **/
  static myCommodityList(options = {}) {
    return http.post("/commodity/mycommodity", options);
  }
  /**
   * 盲盒详情
   *
   * @required box_id
   **/
  static boxview(options = {}) {
    return http.post("/commodity/boxview", options);
  }
  /**
   * 开启盲盒
   *
   * @required box_id
   * @required type   all one
   **/
  static openbox(options = {}) {
    return http.post("/commodity/openbox", options);
  }
  /**
   * 藏品挂卖
   *
   **/
  static sellcommodity(options = {}) {
    return http.post("/commodity/sellcommodity", options);
  }
  /**
   * 藏品交易列表
   *
   * @required page
   * @required row
   **/
  static selllist(options = {}) {
    return http.post("/commodity/selllist", options);
  }
  /**
   * 藏品交易详情
   *
   * @required p_id
   **/
  static sellview(options = {}) {
    return http.post("/commodity/sellview", options);
  }
  /**
   * 藏品详情
   *
   * @required p_id
   **/
  static commodityview(options = {}) {
    return http.post("/commodity/commodityview", options);
  }
  /**
   * 立即付款
   *
   * @required p_id
   **/
  static gopay(options = {}) {
    return http.post("/commodity/gopay", options);
  }
  /**
   * 完成付款
   *
   * @required p_id
   * @required order_id
   * @required img
   **/
  static payok(options = {}) {
    return http.post("/commodity/payok", options);
  }

  /**
   * 上傳支付凭证
   * @required open_id string
   * @required file file
   **/
  static uploadphoto(options) {
    return http.post("/commodity/uploadphoto", options, {
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
   * 购买盲盒（下单）
   *
   * @required open_id
   * @required order_id
   * @required amount
   **/
  static buybox(options = {}) {
    return http.post("/commodity/buybox", options);
  }
  /**
   * 购买盲盒（下单）
   *
   * @required open_id
   **/
  static paying(options = {}) {
    return http.post("/commodity/paying", options);
  }
  /**
   * 取消订单
   *
   * @required open_id
   **/
  static cancelorder(options = {}) {
    return http.post("/commodity/cancelorder", options);
  }
  /**
   * 取消挂卖
   *
   * @required open_id
   **/
  static sellcancel(options = {}) {
    return http.post("/pay/sellcancel", options);
  }
  /**
   * 藏品转让
   *
   * @required open_id
   * @required p_id
   * @required transfer_uid
   * @required usertype
   * @required code
   **/
  static transfer(options = {}) {
    return http.post("/commodity/transfer", options);
  }

  /**
   * 兑换盲盒

   *
   * @required open_id 
   * @required redeem_code
   **/
  static redeem(options = {}) {
    return http.post("/commodity/redeem", options);
  }
  /**
   * 盲盒购买记录

   *
   * @required open_id 
   **/
  static getMyticket(options = {}) {
    return http.post("/activity/myticket", options);
  }
  /**
   * 盲盒券

   *
   * @required open_id 
   **/
  static boxBuyRecord(options = {}) {
    return http.post("/commodity/boxbuyrecord", options);
  }
  /**
   * 藏品交易记录


   *
   * @required open_id 
   **/
  static commodityOrder(options = {}) {
    return http.post("/commodity/commodityorder", options);
  }
  /**
   * 生成支付凭据charge
   *
   * @required order_id
   * @required channel
   **/
  static pingpp(options = {}) {
    return http.post("/pay/pingpp", options);
  }
  /**
   * 生成佣金支付凭据charge
   *
   * @required p_id
   * @required channel
   **/
  static pingppcommission(options = {}) {
    return http.post("/pay/pingppcommission", options);
  }
  /**
   * 兑换
   *
   * @required order_id
   **/
  static buyIntegralCommodity(options = {}) {
    return http.post("/commodity/buyIntegralCommodity", options);
  }
  /**
   * 兑换
   *
   * @required p_id
   **/
  static integralCommodityview(options = {}) {
    return http.post("/commodity/integralCommodityview", options);
  }
  /**
   * 藏品交易曲线
   *
   * @required p_id
   **/
  static getCurve(options = {}) {
    return http.post("/commodity/curve", options);
  }
  /**
   * 收款信息列表
   *
   * @required open_id
   **/
  static getBankList(options = {}) {
    return http.post("/commodity/banklist", options);
  }
  /**
   * 添加/编辑收款信息
   *
   * @required open_id
   **/
  static addBank(options = {}) {
    return http.post("/commodity/addbank", options);
  }
  /**
   * 删除收款信息
   *
   * @required open_id
   **/
  static delBank(options = {}) {
    return http.post("/commodity/delbank", options);
  }
  /**
   * 鉴赏页面
   *
   * @required open_id
   **/
  static getJianshang(options = {}) {
    return http.post("/activity/jianshang", options);
  }

    /**
   * 鉴赏页面
   *
   * @required open_id
   * @required type
   **/
     static getTicket(options = {}) {
      return http.post("/activity/getticket", options);
    }
}

export default CommodityApi;
