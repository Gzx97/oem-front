import React, { Component } from "react";
import { inject, observer } from "mobx-react";
import AccountHeader from "../../components/partial/AccountHeader";
import InfiniteScroll from "react-infinite-scroll-component";
import { CommodityApi } from "../../api";
import "./Jianshang.scss";
import { Button, Toast, Icon, Steps } from "antd-mobile";
import NoData from "../../components/common/NoData";

const Step = Steps.Step;
const customIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 42 42"
    className="am-icon am-icon-md"
  >
    <g fillRule="evenodd" stroke="transparent" strokeWidth="4">
      <path d="M21 0C9.402 0 0 9.402 0 21c0 11.6 9.402 21 21 21s21-9.4 21-21C42 9.402 32.598 0 21 0z" />
      <path
        fill="#FFF"
        d="M29 18.73c0-.55-.447-1-1-1H23.36l4.428-5.05c.407-.46.407-1.208 0-1.668-.407-.46-1.068-.46-1.476 0l-5.21 5.89-5.21-5.89c-.406-.46-1.067-.46-1.475 0-.406.46-.406 1.207 0 1.667l4.43 5.05H14.23c-.55 0-.998.45-.998 1 0 .554.448.97 1 .97h5.9v3.942h-5.9c-.552 0-1 .448-1 1s.448.985 1 .985h5.9v4.896c0 .552.448 1 1 1 .55 0 .968-.284.968-.836v-5.06H28c.553 0 1-.433 1-.985s-.447-1-1-1h-5.9v-3.94H28c.553 0 1-.418 1-.97z"
      />
    </g>
  </svg>
);

@inject("userM4DStore")
@inject("localeStore")
@observer
class Jianshang extends Component {
  state = {
    tab: 1,
    cimuInfo: {},
    tiaozhan: {},
    xinhuo: {},
    current: 0, //步骤
    myModal: false,
  };
  componentDidMount() {
    let _this = this;
    const { userM4DStore, history } = this.props;

    userM4DStore.getUserStatus();

    this.getJianshang();
  }

  componentWillUnmount() {
    // window.onresize = null
  }
  getJianshang = () => {
    let _this = this;
    const {} = this.state;
    const { userM4DStore } = this.props;
    CommodityApi.getJianshang({
      open_id: userM4DStore.openid,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      console.log(res.data);
      this.setState({
        cimuInfo: res.data.cimuInfo,
        tiaozhan: res.data.tiaozhan,
        xinhuo: res.data.xinhuo,
      });
      let current = 0;
      if (res.data.xinhuo.step3.done >= res.data.xinhuo.step1.aim) {
        current = 1;
      }
      if (res.data.xinhuo.step3.done >= res.data.xinhuo.step2.aim) {
        current = 2;
      }
      // console.log(res.data.xinhuo.step1.done)
      // console.log(res.data.xinhuo.step1.aim)
      // console.log(current)
      // if (res.data.xinhuo.step3 == 1) {
      //   current = 2;
      // } else if (res.data.xinhuo.step2 == 1) {
      //   current = 2;
      // } else if (res.data.xinhuo.step1 == 1) {
      //   current = 1;
      // } else if (res.data.xinhuo.step1 == 0) {
      //   current = 0;
      // }
      this.setState({
        current,
      });
    });
  };
  getTicket = (type) => {
    let _this = this;
    const { userM4DStore } = this.props;

    CommodityApi.getTicket({
      open_id: userM4DStore.openid,
      type: type,
    }).then((res) => {
      if (res.status !== 1) {
        Toast.info(res.msg);
        return;
      }
      if (type === "cimu") {
        this.setState({ myModal: true });
        this.getJianshang();

        return;
      }
      Toast.info(res.msg);
      this.getJianshang();
    });
  };
  // 切换任务
  checkRenwu = (tab) => {
    this.setState({
      tab,
    });
  };
  // getRenwuStatus = (status, buzhou) => {
  //   const { history } = this.props;
  //   const { current } = this.state;
  //   if (buzhou == 0) {
  //     if (status == 0) {
  //       return (
  //         <div
  //           onClick={() => {
  //             history.push("/frindsCome");
  //           }}
  //           className="btn"
  //         >
  //           邀请好友
  //         </div>
  //       );
  //     }
  //     if (status == 1) {
  //       return <div style={{ color: "#EE4F35" }}>已完成</div>;
  //     }
  //   }
  //   if (buzhou == 1) {
  //     if (current <= 1) {
  //       return <div style={{ color: "#6D778B" }}>未开启</div>;
  //     }
  //     if (status == 0) {
  //       return (
  //         <div
  //           onClick={() => {
  //             history.push("/frindsCome");
  //           }}
  //           className="btn"
  //         >
  //           邀请好友
  //         </div>
  //       );
  //     }
  //     if (status == 1) {
  //       return <div style={{ color: "#EE4F35" }}>已完成</div>;
  //     }
  //   }
  //   if (buzhou == 2) {
  //     if (current <= 2) {
  //       return <div style={{ color: "#6D778B" }}>未开启</div>;
  //     }
  //     if (status == 0) {
  //       return (
  //         <div
  //           onClick={() => {
  //             history.push("/frindsCome");
  //           }}
  //           className="btn"
  //         >
  //           邀请好友
  //         </div>
  //       );
  //     }
  //     if (status == 1) {
  //       return <div style={{ color: "#EE4F35" }}>已完成</div>;
  //     }
  //   }
  // };
  render() {
    const { history } = this.props;

    const { tab, cimuInfo, tiaozhan, xinhuo, current, myModal } = this.state;
    return (
      <div id="Jianshang">
        <AccountHeader />
        {/* 头部卡片 加浮动卡片 */}
        <div className="it_title">鉴赏</div>

        <div className="cp_top_box">
          <div className="cp_left">
            <div className="img_box">
              <img src={cimuInfo.p_face} />
            </div>
          </div>
          <div className="cp_right">
            <p>
              本次邀请藏友们鉴赏的是来自故宫博物馆的国宝“瓷母”，参与鉴赏活动就有机会获得“瓷母”，快来参与吧！
            </p>
            <span
              onClick={() => {
                history.push("/CollectionDetail?id=" + cimuInfo.id);
              }}
            >
              查看该藏品
            </span>
          </div>
        </div>
        <div className="tab_box">
          <div
            onClick={() => {
              this.checkRenwu(1);
            }}
            className={(tab === 1 && "tab_title active_title") || "tab_title"}
          >
            薪火相传
          </div>
          <div
            onClick={() => {
              this.checkRenwu(2);
            }}
            className={(tab === 2 && "tab_title active_title") || "tab_title"}
          >
            挑战任务
          </div>
        </div>
        {/* 薪火相传 */}
        {tab === 1 && (
          <div className="xhxc">
            <Steps size="small" current={current}>
              <Step
                icon={<Icon size={"xs"} type={"check-circle"} />}
                title={
                  <h2>
                    微光
                    <i>
                      {(xinhuo.step1 && xinhuo.step1.done) || 0}/
                      {(xinhuo.step1 && xinhuo.step1.aim) || 0}
                    </i>
                  </h2>
                }
                description={
                  <div className="xh_info">
                    <p>
                      邀请{(xinhuo.step1 && xinhuo.step1.aim) || 0}
                      位好友完成实名认证
                      <br />
                      赠送：“故宫瓷器系列”盲盒券*1
                    </p>
                    {/* 
                    {this.getRenwuStatus(
                      (xinhuo.step1 && xinhuo.step1.status) || 0,
                      0
                    )} */}
                    {xinhuo.step1 && xinhuo.step1.button == 0 && (
                      <div
                        onClick={() => {
                          history.push("/frindsCome");
                        }}
                        className="btn"
                      >
                        邀请好友
                      </div>
                    )}
                    {xinhuo.step1 && xinhuo.step1.button == 1 && (
                      <div
                        onClick={() => {
                          // history.push("/frindsCome");
                          this.getTicket("jianShang");
                        }}
                        className="lq btn"
                      >
                        领取
                      </div>
                    )}
                    {xinhuo.step1 && xinhuo.step1.button == 2 && (
                      <div style={{ color: "#EE4F35" }}>已领取</div>
                    )}
                  </div>
                }
              />
              <Step
                icon={<Icon size={"xs"} type={"check-circle"} />}
                title={
                  <h2>
                    暖流
                    <i>
                      {(xinhuo.step2 && xinhuo.step2.done) || 0}/
                      {(xinhuo.step2 && xinhuo.step2.aim) || 0}
                    </i>
                  </h2>
                }
                description={
                  <div className="xh_info">
                    <p>
                      邀请{(xinhuo.step2 && xinhuo.step2.aim) || 0}
                      位好友完成实名认证
                      <br />
                      赠送：“故宫瓷器系列”盲盒券*1
                    </p>
                    {/* {this.getRenwuStatus(
                      (xinhuo.step1 && xinhuo.step1.status) || 0,
                      1
                    )} */}
                    {xinhuo.step2 && xinhuo.step2.button == 0 && current == 1 && (
                      <div
                        onClick={() => {
                          history.push("/frindsCome");
                        }}
                        className="btn"
                      >
                        邀请好友
                      </div>
                    )}
                    {xinhuo.step2 &&
                      xinhuo.step2.button == 0 &&
                      current < 1 && (
                        <div style={{ color: "#6D778B" }}>未开启</div>
                      )}
                    {xinhuo.step2 && xinhuo.step2.button == 1 && (
                      <div
                        onClick={() => {
                          this.getTicket("jianShang");
                        }}
                        className="lq btn"
                      >
                        领取
                      </div>
                    )}
                    {xinhuo.step2 && xinhuo.step2.button == 2 && (
                      <div style={{ color: "#EE4F35" }}>已领取</div>
                    )}
                  </div>
                }
              />
              <Step
                icon={<Icon size={"xs"} type={"check-circle"} />}
                title={
                  <h2>
                    薪火
                    <i>
                      {(xinhuo.step3 && xinhuo.step3.done) || 0}/
                      {(xinhuo.step3 && xinhuo.step3.aim) || 0}
                    </i>
                  </h2>
                }
                description={
                  <div className="xh_info">
                    <p>
                      邀请{(xinhuo.step3 && xinhuo.step3.aim) || 0}
                      位好友完成实名认证
                      <br />
                      赠送：“故宫瓷器系列”盲盒券*1
                    </p>
                    {xinhuo.step3 && xinhuo.step3.button == 0 && current == 2 && (
                      <div
                        onClick={() => {
                          history.push("/frindsCome");
                        }}
                        className="btn"
                      >
                        邀请好友
                      </div>
                    )}
                    {xinhuo.step3 &&
                      xinhuo.step3.button == 0 &&
                      current < 2 && (
                        <div style={{ color: "#6D778B" }}>未开启</div>
                      )}
                    {xinhuo.step3 && xinhuo.step3.button == 1 && (
                      <div
                        onClick={() => {
                          this.getTicket("jianShang");
                        }}
                        className="lq btn"
                      >
                        领取
                      </div>
                    )}
                    {xinhuo.step3 && xinhuo.step3.button == 2 && (
                      <div style={{ color: "#EE4F35" }}>已领取</div>
                    )}
                  </div>
                }
              />
            </Steps>
          </div>
        )}
        {/* 挑战任务 */}
        {tab === 2 && (
          <ul>
            <li>
              <h4>
                瓷母挑战
                <i>
                  {(tiaozhan.cimu && tiaozhan.cimu.done) || 0}/
                  {(tiaozhan.cimu && tiaozhan.cimu.aim) || 0}
                </i>
              </h4>
              <div className="li_info">
                <p>
                  集齐{(tiaozhan.cimu && tiaozhan.cimu.aim) || 0}
                  张瓷器系列藏品即可获得空投“瓷母”藏品的机会 <br />
                  {/* <span>注：2022.02.02 统一空投</span> */}
                </p>
                {tiaozhan.cimu && tiaozhan.cimu.button == 0 && (
                  <div
                    onClick={() => {
                      // history.push("/trade?key=" + encodeURI("瓷器"));
                      // history.push("/BuyBlindBox?id=" + 25);
                      history.push("/AllBindBox");
                    }}
                    className="btn"
                  >
                    购买藏品
                  </div>
                )}
                {tiaozhan.cimu && tiaozhan.cimu.button == 1 && (
                  <div
                    onClick={() => {
                      // history.push("/trade?key=" + encodeURI("瓷器"));
                      // history.push("/BuyBlindBox?id=" + 25);
                      this.getTicket("cimu");
                    }}
                    className="lq btn"
                  >
                    领取
                  </div>
                )}
                {tiaozhan.cimu && tiaozhan.cimu.button == 2 && (
                  <div style={{ color: "#EE4F35" }}>已领取</div>
                )}
              </div>
            </li>
            <li>
              <h4>
                大胃王挑战
                <i>
                  {(tiaozhan.daweiwang && tiaozhan.daweiwang.done) || 0}/
                  {(tiaozhan.daweiwang && tiaozhan.daweiwang.aim) || 0}
                </i>
              </h4>
              <div className="li_info">
                <p>
                  一次性购买
                  {(tiaozhan.daweiwang && tiaozhan.daweiwang.aim) || 0}
                  个盲盒可获得“故宫瓷器系列”盲盒券*1 <br />
                  <span>注：每日仅限一次</span>
                </p>
                {/* <div
                  onClick={() => {
                    history.push("/AllBindBox");
                  }}
                  className="btn"
                >
                  购买盲盒
                </div> */}
                {tiaozhan.daweiwang && tiaozhan.daweiwang.button == 0 && (
                  <div
                    onClick={() => {
                      history.push("/AllBindBox");
                    }}
                    className="btn"
                  >
                    购买盲盒
                  </div>
                )}
                {tiaozhan.daweiwang && tiaozhan.daweiwang.button == 1 && (
                  <div
                    onClick={() => {
                      // history.push("/trade?key=" + encodeURI("瓷器"));
                      // history.push("/BuyBlindBox?id=" + 25);
                      this.getTicket("dayTen");
                    }}
                    className="lq btn"
                  >
                    领取
                  </div>
                )}
                {tiaozhan.daweiwang && tiaozhan.daweiwang.button == 2 && (
                  <div style={{ color: "#EE4F35" }}>已领取</div>
                )}
              </div>
            </li>
          </ul>
        )}
        {myModal && (
          <div className="my_modal">
            <div className="modal_mask"> </div>
            <div className="modal_content animate__animated animate__bounceIn">
              <h3 className="">
                获得
                <br />
                "瓷母"
              </h3>
              <div className="img_box">
                <img className="mh_img" src={cimuInfo.p_face} />
              </div>

              <div className="kh">
                <span
                  onClick={() => {
                    history.push("/collection");
                  }}
                >
                  查看藏品
                </span>
                <span
                  onClick={() => {
                    this.setState({
                      myModal: false,
                    });
                  }}
                >
                  确定
                </span>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default Jianshang;
