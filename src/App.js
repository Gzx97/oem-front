import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";
import { Provider } from "mobx-react";
import Loadable from "react-loadable";
import InterceptRouter from "./components/common/InterceptRouter";
import routes from "./routes";
import stores from "./stores";
import NoMatch from "./pages/exception/404";
import "./App.scss";
import "animate.css";
// import FastClick from "fastclick";
// import AnimatedRouter from "react-animated-router"; //我们的AnimatedRouter组件
const LoadableFooter = Loadable({
  loader: () => import("./components/common/FooterM4D"),
  loading() {
    return "";
  },
});

class App extends Component {
  componentDidMount() {
    const { localeStore } = stores;
    let lang = localStorage.getItem("LANG") || "zh-ch";
    if (lang === "zh-ch") {
      lang = "zh-cn";
    }
    localeStore.switchLang(lang);
    // document.body.addEventListener('touchmove', function (e) {
    //   e.preventDefault(); //阻止默认的处理方式(阻止下拉滑动的效果)
    // }, {passive: false}); //passive 参数不能省略，用来兼容ios和android
    document.title = "IMETA";
    // console.log('didmount')
    // console.log = function(){}
    // this.iosTrouchFn('App')
    // var ios = navigator.userAgent.indexOf("iphone"); //判断是否为ios

   
  }


  render() {
    const { ...storesArray } = stores;

    return (
      <Provider {...storesArray}>
        <div id="App" className="App">
          <Switch>
            {/* <AnimatedRouter timeout={300}> */}
            {routes.map((route) => {
              const ChildComponent = route.component;
              return (
                <Route
                  key={route.name}
                  path={route.path}
                  exact
                  render={(props) => (
                    <InterceptRouter>
                      {<ChildComponent {...props} />}
                    </InterceptRouter>
                  )}
                />
              );
            })}
            {/* </AnimatedRouter> */}

            <Route component={NoMatch} />
          </Switch>
          <LoadableFooter />
        </div>
      </Provider>
    );
  }
}

export default App;
