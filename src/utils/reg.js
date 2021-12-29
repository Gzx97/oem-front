import {REG} from "./constants";

export const isMobile = (account) => REG.MOBILE.test(account)
export const isEmail = (account) => REG.EMAIL.test(account)
export const isPassword = (password) => REG.PASSWORD.test(password)
export const isNickName = (password) => REG.NICKNAME.test(password)
export const isContractName = (contractname) => REG.CONTRACTNAME.test(contractname)
export const isHash = (hash) => REG.HASH.test(hash)
export const isAddress = (address) => REG.ADDRESS.test(address)
export const isBlock = (block) => REG.BLOCK.test( Number(block) )
export const isIdcard = (idcard) => REG.IDCARD.test(idcard)
export const isName = (name) => REG.NICKNAME.test(name)