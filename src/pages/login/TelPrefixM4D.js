import React, { Component } from 'react';
import AccountHeader from "../../components/partial/AccountHeader";
import TEL_PREFIX_DATA from '../../utils/tel-prefix';
import { Icon, Toast } from 'antd-mobile'
import './TelPrefixM4D.scss';
import Cookies from "js-cookie"
import { inject, observer } from 'mobx-react'
// import agreeIcon from '../../assets/images/domino/user/agree.png'
// import noAgreeIcon from '../../assets/images/domino/user/no_agree.png'
// import { formatMessage } from 'umi-plugin-locale';
@inject('localeStore')
@observer
class TelPrefixM4D extends Component {
  state = {
    activeKey: '',
    search: '',
    list: TEL_PREFIX_DATA,
    tel_num: '86'
  };
  componentDidMount() {
    this.setState({ search: '', activeKey: '' });
  }

  onSelect = (i, key) => {
    this.setState({ activeKey: key, tel_num: i.tel });
    // this.props.confirm(i.tel);
  };
  chooseOk = () => {
    Cookies.set('TEL_NUM', this.state.tel_num, { expires: 365 })
    this.props.history.goBack()
  }
  onSearchChange = event => {
    const { value } = event.target;
    if (!value) {
      this.setState({ list: TEL_PREFIX_DATA });
    } else {
      const list = TEL_PREFIX_DATA.filter(i =>
        (i.en + i.name).toLocaleLowerCase().includes(value.toLocaleLowerCase()),
      );
      this.setState({ list });
    }
    this.setState({ search: value, activeKey: '' });
    // this.props.confirm('');
  };

  render() {
    const { activeKey, search, list } = this.state;
    const { localeStore: { locale: { TELPREFIX } } } = this.props;
    return (
      <div id='telPrefix'>
        <AccountHeader />
        <div className='it_title'>{TELPREFIX.CHOOSE_CITY}</div>
        <div onClick={() => { this.chooseOk() }} className='it_ok'>{TELPREFIX.OK}</div>
        {/* <div className='search_box'>
          <div className='search'>
            <Icon type="search" size={'sm'} color={'#8F8E94'} />
            <input
              placeholder={'搜索国家'}
              type="text"
              value={search}
              autoComplete="off"
              onChange={this.onSearchChange}
            />
          </div>

        </div> */}
        <div className='search'>
          <Icon type="search" size={'sm'} color={'#8F8E94'} />
          <input
            placeholder={TELPREFIX.SEARCH_CITY}
            type="text"
            value={search}
            autoComplete="off"
            onChange={this.onSearchChange}
          />
        </div>

        <ul className="box">
          {list.map((i, key) => (
            <li
              key={key.toString()}
              className={activeKey === key ? '' : ''}
              onClick={() => this.onSelect(i, key)}
            >
              <span>{i.en + ' ' + i.name}</span>
              {/* {activeKey === key && <i className='active'><div className='i_center'></div></i> ||
                <i></i>
              } */}
              {/* <img style={{width:'2rem'}} src={activeKey === key ? agreeIcon : noAgreeIcon} alt="" /> */}

              {/* {activeKey === key && <img src={CHECKED} alt="" />} */}
            </li>


          ))}
        </ul>
      </div>
    );
  }
}

export default TelPrefixM4D;
