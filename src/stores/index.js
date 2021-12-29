import UserM4DStore from './userM4D'
import WalletStore from './wallet'
import NoticeStore from './notice'
import LocaleStore from './locale'
// import WsStore from './wsdata'

class Stores {
  constructor() {
    // this.userStore = new UserStore()
    this.userM4DStore = new UserM4DStore()//m4duser
    this.walletStore = new WalletStore()
    this.noticeStore = new NoticeStore()
    this.localeStore = new LocaleStore()
  }
}

export default new Stores()
