import React, { useContext } from 'react';
import { NavHashLink as NavLink } from 'react-router-hash-link';
import { AppContext } from '../../App';
import './Navigation.scss';
import rightArrow from '../../../assets/svg/arrow_right.svg';
import SVG from 'react-svg';

const Navigation = () => {
  const value = useContext(AppContext);

  const isActive = (path: string[]) => {
    if (path.indexOf(value.hash) > -1) {
      return 'active';
    }
    return '';
  };

  const onScroll = (hash: string) => (el: any) => {
    value.setHash(hash);
    el.scrollIntoView({ behavior: 'instant', block: 'start' });
  };

  return (
    <div className='Navigation'>
      <h3>Documentation</h3>
      <ul className='data'>
        <li className={isActive(['intro'])}>
          <NavLink scroll={onScroll('intro')} to='/#intro'>Introduction</NavLink>
        </li>
        <li className={isActive(['started', 'prerequisite', 'installation', 'usage'])}>
          <NavLink scroll={onScroll('started')} to='/#started'>Getting Started
            <SVG className='arrow-right' wrapper='span' src={rightArrow} />
          </NavLink>
          <ul className='sub-data'>
            <li className={isActive(['prerequisite'])}>
              <NavLink scroll={onScroll('prerequisite')} to='/#prerequisite'>Prerequisite</NavLink>
            </li>
            <li className={isActive(['installation'])}>
              <NavLink scroll={onScroll('installation')} to='/#installation'>Installation</NavLink>
            </li>
            <li className={isActive(['usage'])}>
              <NavLink scroll={onScroll('usage')} to='/#usage'>Usage</NavLink>
            </li>
          </ul>
        </li>
        <li className={isActive(['example', 'assets', 'get-asset', 'get-assets', 'create-asset',
          'events', 'get-event', 'get-events', 'create-event', 'transaction', 'get-transaction',
          'get-transaction-receipt', 'get-transaction-count', 'send-transaction',
          'blockchain', 'pk-pair', 'balance', 'block', 'latest-block', 'block-account'])}>
          <NavLink to='/#example' scroll={onScroll('example')}>Examples
            <SVG className='arrow-right' wrapper='span' src={rightArrow} />
          </NavLink>
          <ul className='sub-data'>
            <li className={isActive(['assets', 'get-asset', 'get-assets', 'create-asset'])}>
              <NavLink scroll={onScroll('assets')} to='/#assets'>Assets
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['get-asset'])}>
                  <NavLink scroll={onScroll('get-asset')} to='/#get-asset'>Get Asset</NavLink>
                </li>
                <li className={isActive(['get-assets'])}>
                  <NavLink scroll={onScroll('get-assets')} to='/#get-assets'>Get Assets</NavLink>
                </li>
                <li className={isActive(['create-asset'])}>
                  <NavLink scroll={onScroll('create-asset')} to='/#create-asset'>Create Assets</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['events', 'get-event', 'get-events', 'create-event'])}>
              <NavLink scroll={onScroll('events')} to='/#events'>Events
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['get-event'])}>
                  <NavLink scroll={onScroll('get-event')} to='/#get-event'>Get Event</NavLink>
                </li>
                <li className={isActive(['get-events'])}>
                  <NavLink scroll={onScroll('get-events')} to='/#get-events'>Get Events</NavLink>
                </li>
                <li className={isActive(['create-event'])}>
                  <NavLink scroll={onScroll('create-event')} to='/#create-event'>Create Events</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['transaction', 'get-transaction', 'get-transaction-receipt', 'get-transaction-count', 'send-transaction'])}>
              <NavLink scroll={onScroll('transaction')} to='/#transaction'>Transaction
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['get-transaction'])}>
                  <NavLink scroll={onScroll('get-transaction')} to='/#get-transaction'>Get Transaction</NavLink>
                </li>
                <li className={isActive(['get-transaction-receipt'])}>
                  <NavLink scroll={onScroll('get-transaction-receipt')} to='/#get-transaction-receipt'>Get Transaction Receipt</NavLink>
                </li>
                <li className={isActive(['get-transaction-count'])}>
                  <NavLink scroll={onScroll('get-transaction-count')} to='/#get-transaction-count'>Get Transaction Count</NavLink>
                </li>
                <li className={isActive(['send-transaction'])}>
                  <NavLink scroll={onScroll('send-transaction')} to='/#send-transaction'>Send Transaction</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['blockchain', 'pk-pair', 'balance', 'block', 'latest-block', 'block-account'])}>
              <NavLink scroll={onScroll('blockchain')} to='/#transaction'>Blockchain
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['pk-pair'])}>
                  <NavLink scroll={onScroll('pk-pair')} to='/#pk-pair'>Private Key Pair</NavLink>
                </li>
                <li className={isActive(['balance'])}>
                  <NavLink scroll={onScroll('balance')} to='/#balance'>Get Balance</NavLink>
                </li>
                <li className={isActive(['block'])}>
                  <NavLink scroll={onScroll('block')} to='/#block'>Get Block</NavLink>
                </li>
                <li className={isActive(['latest-block'])}>
                  <NavLink scroll={onScroll('latest-block')} to='/#latest-block'>Latest Block</NavLink>
                </li>
                <li className={isActive(['block-account'])}>
                  <NavLink scroll={onScroll('block-account')} to='/#block-account'>Get Account</NavLink>
                </li>
              </ul>
            </li>
          </ul>
        </li>
      </ul>
    </div>
  );
};

export default Navigation;
