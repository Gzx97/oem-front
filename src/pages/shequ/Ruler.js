import React, { Component } from "react";
import { Button, Toast } from "antd-mobile";
import { inject, observer } from "mobx-react";
import Cookies from "js-cookie";
import { UserApi } from "../../api";
// import { REG, TOAST_DURATION, COUNT_DOWN } from '../../utils/constants'
// import { isEmail, isMobile } from "../../utils/reg"
// import { compatibleFixedButton, getQueryParam } from '../../utils/common'
// import successIcon from '../../assets/images/success_icon.png'
import "./Ruler.scss";
import AccountHeader from "../../components/partial/AccountHeader";
import { Link } from "react-router-dom";
// @inject('userStore')
@inject("localeStore")
@observer
class Ruler extends Component {
  state = {};

  componentDidMount() {}

  componentWillUnmount() {
    window.onresize = null;
  }

  gzxtest = () => {
    //测试事件
  };
  render() {
    const { history } = this.props;
    const {
      localeStore: {
        locale: { SHEQU },
      },
    } = this.props;

    return (
      <div id="ruler">
        <AccountHeader />
        <div className="it_title">{SHEQU.GZSM}</div>
        <div className="ruler_main">
          <div dangerouslySetInnerHTML={{ __html: SHEQU.GUIZHE }}></div>
        </div>

        <div className="ruler_main">
          {/* <h3>VIP会员:</h3>
          <p>只要购买过一次积分套餐的用户即为VIP会员。未镜像他人的用户结束机器人后统一扣除等值盈利部分10%的积分；已镜像他人的用户结束机器人后统一扣除等值盈利部分20%的积分。</p>

          <h3>激励机制一 ——推荐奖（秒结）：</h3>
          <p>
            直推用户可获得服务积分的10%作为奖励；<br></br>
            间推用户可获得服务积分的5%作为奖励。</p>

          <h3>激励机制二 ——社区奖（级差/日结）:</h3>
          <p>
            初级VIP：直推5个VIP会员即可成为初级VIP，可获得服务积分的5%作为奖励；<br></br>
            中级VIP：直推3个初级VIP即可成为中级VIP，可获得服务积分的10%作为奖励；<br></br>
            高级VIP：直推3个中级VIP即可成为高级VIP，可获得服务积分的16%作为奖励。
          </p>

          <h3>激励机制三 ——分红奖（日结）:</h3>
          <p>
            所有初级VIP按业绩比例加权分3；<br></br>
            所有中级VIP按业绩比例加权分3%；<br></br>
            所有高级VIP按业绩比例加权分3%。
          </p>
          <h3>激励机制四 ——镜像分红（按策略结算）:</h3>
          <p>
           开启镜像策略的，可获得镜像用户消耗服务积分的40%作为奖励。<br></br>
          </p>
          <h3>特别说明:</h3>
          <p>  
            以上规则均通过易数机器人APP客户端自动运行，如有人以代管等任何形式索取佣金，请勿相信！
          </p> */}
        </div>
      </div>
    );
  }
}

export default Ruler;
