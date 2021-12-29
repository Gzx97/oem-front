import http from './http'
// import Mock from 'mockjs'

class OtherApi {

  /**
   * 获取下载链接
   **/
   static appdownload(options = {}) {
    // options.noLogin = true;
    return http.get('/other/appdownload', options)
  }
   /**
   * 获取banner列表
   **/
    static banner(options = {}) {
      // options.noLogin = true;
      return http.get('/other/banner', options)
    }
  
  /**
   * 获取公告列表
   **/
  static getNotices(options = {}) {
    options.noLogin = true;
    return http.get('/other/noticelist', options)
  }

  /**
   * 获取公告详情
   *
   * @required id string 公告ID
   **/
  static getNoticeDetail(options = {}) {
    options.noLogin = true;
    return http.post('/other/noticeview', options)
  }

  /**
   * 轮播列表
   **/
  static getBannerList(options = {}) {
    options.noLogin = true;
    return http.get('/other/banner', options)
  }



}

export default OtherApi
