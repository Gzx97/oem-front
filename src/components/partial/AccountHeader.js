import React, { Component } from "react";
import { withRouter } from "react-router";
import "./AccountHeader.scss";
import { observer, inject } from "mobx-react";
import { Toast } from "antd-mobile";

@inject("localeStore")
@observer
class AccountHeader extends Component {
  componentDidMount() {
    const { history, onHandle } = this.props;
    // console.log(history)
    // console.log((window.history));
  }
  onBack = () => {
    const { history, onHandle } = this.props;

    if (onHandle) {
      onHandle();
      return;
    }
    if (!history.goBack) {
      // console.log('gzxtest')
      history.push("/home");
      return;
    }
    // console.log(history);
    if(window.history.length>1){
      window.history.go(-1);
    }else{
      history.push('/home')
    }
    // Toast.info(JSON.stringify( window.history.length), 2, () => {
    //   // history.goBack()
   
    // });
  };

  render() {
    const {
      src,
      localeStore: {
        // locale: { PASSWORD }
      },
    } = this.props;
    const { msg, hideBack } = this.props;
    return (
      <div style={this.props.style || {}} className="account-header">
        <img
          className={hideBack ? "hidden" : ""}
          src={(src && src) || require("../../assets/images/arrow-left.png")}
          alt="返回"
          onClick={this.onBack}
        />
        {/* <h1>{title}</h1> */}
        {/* {msg && <p>{msg}</p>} */}
      </div>
    );
  }
}

export default withRouter(AccountHeader);
