import { observable, action, computed } from "mobx";
import locales from "../locales";
import UserApi from "../api/user";
class LocaleStore {
  @observable lang = "zh-cn";
  // @observable langLabel = '中文';
  @observable languages = [
    {
      label: "简体中文",
      value: "zh-cn",
    },
    {
      label: "English",
      value: "en-us",
    },
    {
      label: "한국어",
      value: "ko-kr",
    },
    {
      label: "日本語",
      value: "ja-jp",
    },
    
    {
      label: "IndonesiaName",
      value: "id-id",
    },
    {
      label: "ภาษาไทย",
      value: "th-th",
    },
  ];

  @computed
  get locale() {
    return locales[this.lang] || locales["zh-cn"];
  }

  @action
  switchLang(lang) {
    this.lang = lang;
    localStorage.setItem("LANG", lang);
    // console.log(lang)
    return UserApi.setlang(lang).then((res) => {
      return res;
    });
  }

  @action
  getLang() {
    this.lang = localStorage.getItem("LANG") || "zh-cn";
  }
}

export default LocaleStore;
