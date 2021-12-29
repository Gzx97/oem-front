import Loadable from "react-loadable";
import Loading from "./components/common/Loading";

// ---------------------------------------------------------------------------------
// 登录注册

const Login = Loadable({
  loader: () => import("./pages/login/Login"),
  loading: Loading,
});

const Register = Loadable({
  loader: () => import("./pages/login/Register"),
  loading: Loading,
});

const RegisterDownload = Loadable({
  loader: () => import("./pages/login/RegisterDownload"),
  loading: Loading,
});
const Download = Loadable({
  loader: () => import("./pages/login/Download"),
  loading: Loading,
});
const PasswordNew = Loadable({
  loader: () => import("./pages/login/PasswordNew"),
  loading: Loading,
});
const PasswordNewOn = Loadable({
  loader: () => import("./pages/login/PasswordNewOn"),
  loading: Loading,
});
const OTCPassword = Loadable({
  loader: () => import("./pages/login/OTCPassword"),
  loading: Loading,
});
const Agreement = Loadable({
  loader: () => import("./pages/login/Agreement"),
  loading: Loading,
});
const Fengxian = Loadable({
  loader: () => import("./pages/login/Fengxian"),
  loading: Loading,
});
const TelPrefixM4D = Loadable({
  loader: () => import("./pages/login/TelPrefixM4D"),
  loading: Loading,
});

// ----------------------首页--------------------------
const Home = Loadable({
  loader: () => import("./pages/home/home"),
  loading: Loading,
});

// 资产
// const Recharge = Loadable({
//   loader: () => import("./pages/home/Recharge"),
//   loading: Loading,
// });

// const Extract = Loadable({
//   loader: () => import("./pages/home/Extract"),
//   loading: Loading,
// });
const Record = Loadable({
  loader: () => import("./pages/home/Record"),
  loading: Loading,
});
const Coupons = Loadable({
  loader: () => import("./pages/home/Coupons"),
  loading: Loading,
});
const Renzheng = Loadable({
  loader: () => import("./pages/home/Renzheng"),
  loading: Loading,
});
// const USDTRecord = Loadable({
//   //资产流水
//   loader: () => import("./pages/home/USDTRecord"),
//   loading: Loading,
// });
// const JifenRecord = Loadable({
//   //积分流水
//   loader: () => import("./pages/home/JifenRecord"),
//   loading: Loading,
// });

// ------------------社区----------------
const Shequ = Loadable({
  //---
  loader: () => import("./pages/shequ/shequ"),
  loading: Loading,
});
const Ruler = Loadable({
  //
  loader: () => import("./pages/shequ/Ruler"),
  loading: Loading,
});
const JifenRecord = Loadable({
  //---
  loader: () => import("./pages/shequ/JifenRecord"),
  loading: Loading,
});
const Jifen = Loadable({
  //---
  loader: () => import("./pages/shequ/Jifen"),
  loading: Loading,
});
const Jianshang = Loadable({
  //---
  loader: () => import("./pages/shequ/Jianshang"),
  loading: Loading,
});
// ---------------------我的藏品------------------------
const MyCollection = Loadable({
  //
  loader: () => import("./pages/collection/MyCollection"),
  loading: Loading,
});
const Fangwei = Loadable({
  //
  loader: () => import("./pages/collection/Fangwei"),
  loading: Loading,
});
const BuyCollection = Loadable({
  //
  loader: () => import("./pages/collection/BuyCollection"),
  loading: Loading,
});
const CollectionDetail = Loadable({
  //
  loader: () => import("./pages/collection/CollectionDetail"),
  loading: Loading,
});
const CollectionJifenDetail = Loadable({
  //
  loader: () => import("./pages/collection/CollectionJifenDetail"),
  loading: Loading,
});
const SearchCollection = Loadable({
  //
  loader: () => import("./pages/collection/SearchCollection"),
  loading: Loading,
});
const AllCollection = Loadable({
  loader: () => import("./pages/collection/AllCollection"),
  loading: Loading,
});
const BoxCollection = Loadable({
  loader: () => import("./pages/collection/BoxCollection"),
  loading: Loading,
});
const Certificate = Loadable({
  loader: () => import("./pages/collection/Certificate"),
  loading: Loading,
});
// ---------------------我的盲盒-----------------
const MyBlindBox = Loadable({
  loader: () => import("./pages/blindBox/MyBlindBox"),
  loading: Loading,
});
const Duihuan = Loadable({
  loader: () => import("./pages/blindBox/Duihuan"),
  loading: Loading,
});
const Buy️BlindBox = Loadable({
  loader: () => import("./pages/blindBox/BuyBlindBox"),
  loading: Loading,
});
const AllBindBox = Loadable({
  loader: () => import("./pages/blindBox/AllBindBox"),
  loading: Loading,
});
// -------------------我的交易---------------
const TradeList = Loadable({
  //
  loader: () => import("./pages/trade/TradeList"),
  loading: Loading,
});
const Receive = Loadable({
  //
  loader: () => import("./pages/trade/Receive"),
  loading: Loading,
});
const Transfer = Loadable({
  //
  loader: () => import("./pages/trade/Transfer"),
  loading: Loading,
});
const TradRecord = Loadable({
  //
  loader: () => import("./pages/trade/TradRecord"),
  loading: Loading,
});
const ChooseCollection = Loadable({
  //
  loader: () => import("./pages/trade/ChooseCollection"),
  loading: Loading,
});
//-----------------------------------我的---------------------------------
const MineList = Loadable({
  loader: () => import("./pages/user/MineList"),
  loading: Loading,
});

const About = Loadable({
  loader: () => import("./pages/user/About"),
  loading: Loading,
});
const FrindsCome = Loadable({
  loader: () => import("./pages/user/FrindsCome"),
  loading: Loading,
});
const Safety = Loadable({
  loader: () => import("./pages/user/Safety"),
  loading: Loading,
});
const Notice = Loadable({
  loader: () => import("./pages/user/Notice"),
  loading: Loading,
});
const Payment = Loadable({
  loader: () => import("./pages/user/Payment"),
  loading: Loading,
});
const AddPayment = Loadable({
  loader: () => import("./pages/user/AddPayment"),
  loading: Loading,
});
const AddShoukuan = Loadable({
  loader: () => import("./pages/home/AddShoukuan"),
  loading: Loading,
});
const NoticeDetail = Loadable({
  loader: () => import("./pages/user/NoticeDetail"),
  loading: Loading,
});
const Help = Loadable({
  loader: () => import("./pages/user/Help"),
  loading: Loading,
});
const HelpDetail = Loadable({
  loader: () => import("./pages/user/HelpDetail"),
  loading: Loading,
});
const LangSwitch = Loadable({
  loader: () => import("./pages/user/LangSwitch"),
  loading: Loading,
});
const CustomerService = Loadable({
  loader: () => import("./pages/user/CustomerService"),
  loading: Loading,
});
const CustomerServiceHistory = Loadable({
  loader: () => import("./pages/user/CustomerServiceHistory"),
  loading: Loading,
});
// const MissionCenter = Loadable({
//   loader: () => import('./pages/user/MissionCenter'),
//   loading: Loading
// })
//规则说明

// 404
const NoMatch = Loadable({
  loader: () => import("./pages/exception/404"),
  loading: Loading,
});

export default [
  // ----------------
  // 登录注册
  { path: "/login", name: "Login", component: Login },
  // {path: '/register/:type', name: 'Register', component: Register},
  { path: "/Register", name: "Register", component: Register },
  {
    path: "/RegisterDownload",
    name: "RegisterDownload",
    component: RegisterDownload,
  },
  { path: "/Download", name: "Download", component: Download },
  { path: "/PasswordNew/:type", name: "PasswordNew", component: PasswordNew },
  { path: "/PasswordNewOn/", name: "PasswordNewOn", component: PasswordNewOn },
  { path: "/OTCPassword", name: "OTCPassword", component: OTCPassword },
  { path: "/telPrefixM4D", name: "TelPrefixM4D", component: TelPrefixM4D },
  { path: "/agreement", name: "Agreement", component: Agreement },
  { path: "/Fengxian", name: "Fengxian", component: Fengxian },
  // 首页-------
  { path: "/home", name: "home", component: Home },
  { path: "/BuyBlindBox", name: "Buy️BlindBox", component: Buy️BlindBox },
  { path: "/Renzheng", name: "Renzheng", component: Renzheng },
  // 社区
  { path: "/shequ", name: "shequ", component: Shequ },
  { path: "/Ruler", name: "Ruler", component: Ruler },
  { path: "/Jifen", name: "Jifen", component: Jifen },
  { path: "/Jianshang", name: "Jianshang", component: Jianshang },
  { path: "/JifenRecord", name: "JifenRecord", component: JifenRecord },
  // 藏品
  { path: "/collection", name: "MyCollection", component: MyCollection },
  { path: "/AllCollection", name: "AllCollection", component: AllCollection },
  { path: "/BoxCollection", name: "BoxCollection", component: BoxCollection },
  { path: "/Certificate", name: "Certificate", component: Certificate },
  { path: "/Fangwei", name: "Fangwei", component: Fangwei },
  {
    path: "/BuyCollection",
    name:  "BuyCollection",component: BuyCollection, },
  {
    path: "/SearchCollection",
    name: "SearchCollection",
    component: SearchCollection,
  },
  {
    path: "/CollectionDetail",
    name: "CollectionDetail",
    component: CollectionDetail,
  },
  {
    path: "/CollectionJifenDetail",
    name: "CollectionJifenDetail",
    component: CollectionJifenDetail,
  },
  // 盲盒
  { path: "/MyBlindBox", name: "MyBlindBox", component: MyBlindBox },
  { path: "/Duihuan", name: "Duihuan", component: Duihuan },
  { path: "/AllBindBox", name: "AllBindBox", component: AllBindBox },
  // 交易
  { path: "/trade", name: "TradeList", component: TradeList },
  { path: "/Receive", name: "Receive", component: Receive },
  { path: "/Transfer", name: "Transfer", component: Transfer },
  { path: "/TradRecord", name: "TradRecord", component: TradRecord },
  { path: "/ChooseCollection", name: "ChooseCollection", component: ChooseCollection },

  // 资产
  // { path: "/wallet/recharge", name: "Recharge", component: Recharge },
  // { path: "/wallet/extract", name: "Extract", component: Extract },
  { path: "/record", name: "Record", component: Record },
  { path: "/Coupons", name: "Coupons", component: Coupons },
  // { path: "/USDTRecord", name: "USDTRecord", component: USDTRecord },
  // { path: "/JifenRecord", name: "JifenRecord", component: JifenRecord },

  // 我的
  { path: "/mineList", name: "MineList", component: MineList },
  // { path: '/activeVIP', name: 'ActiveVIP', component: ActiveVIP },
  { path: "/frindsCome", name: "FrindsCome", component: FrindsCome },
  { path: "/safety", name: "Safety", component: Safety },
  { path: "/Notice", name: "Notice", component: Notice },
  { path: "/Payment", name: "Payment", component: Payment },
  { path: "/AddPayment", name: "AddPayment", component: AddPayment },
  { path: "/AddShoukuan", name: "AddShoukuan", component: AddShoukuan },
  { path: "/noticeDetail", name: "NoticeDetail", component: NoticeDetail },
  { path: "/help", name: "Notice", component: Help },
  { path: "/helpDetail", name: "helpDetail", component: HelpDetail },
  { path: "/About", name: "About", component: About },
  { path: "/langSwitch", name: "LangSwitch", component: LangSwitch },
  {
    path: "/customerService",
    name: "CustomerService",
    component: CustomerService,
  },
  {
    path: "/customerServiceHistory",
    name: "customerServiceHistory",
    component: CustomerServiceHistory,
  },
  // { path: '/missionCenter', name: 'MissionCenter', component: MissionCenter },
  // 规则说明

  // // 主页
  // {path: '/', name: 'LoginBefore', component: LoginBefore},
  { path: "/", name: "home", component: Home },

  // 404
  {
    path: "/404",
    name: "404",
    component: NoMatch,
  },
];
