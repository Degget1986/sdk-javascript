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
          'events', 'get-event', 'get-events', 'create-event', 'parse-event',
          'transaction', 'get-transaction', 'get-transaction-receipt', 'get-transaction-count', 'send-transaction',
          'blocks', 'pk-pair', 'balance', 'block', 'latest-block', 'block-account',
          'bundles', 'get-bundle',
          'service', 'block-account', 'pk-pair', 'encrypt-pk', 'decrypt-pk', 'sign-data', 'verify-event', 'rpc-valid'])}>
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
            <li className={isActive(['events', 'get-event', 'get-events', 'create-event', 'parse-event'])}>
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
                <li className={isActive(['parse-event'])}>
                  <NavLink scroll={onScroll('parse-event')} to='/#parse-event'>Parse Events</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['bundles', 'get-bundle'])}>
              <NavLink scroll={onScroll('transaction')} to='/#bundles'>Bundles
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['get-bundle'])}>
                  <NavLink scroll={onScroll('get-bundle')} to='/#get-bundle'>Get Bundle</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['transaction', 'balance', 'get-transaction', 'get-transaction-receipt', 'get-transaction-count', 'send-transaction'])}>
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
                <li className={isActive(['balance'])}>
                  <NavLink scroll={onScroll('balance')} to='/#balance'>Get Balance</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['blocks', 'block', 'latest-block'])}>
              <NavLink scroll={onScroll('blocks')} to='/#transaction'>Blocks
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['block'])}>
                  <NavLink scroll={onScroll('block')} to='/#block'>Get Block</NavLink>
                </li>
                <li className={isActive(['latest-block'])}>
                  <NavLink scroll={onScroll('latest-block')} to='/#latest-block'>Latest Block</NavLink>
                </li>
              </ul>
            </li>
            <li className={isActive(['service', 'block-account', 'pk-pair', 'encrypt-pk', 'decrypt-pk', 'sign-data', 'verify-event', 'rpc-valid'])}>
              <NavLink scroll={onScroll('service')} to='/#service'>Service
                <SVG className='arrow-right' wrapper='span' src={rightArrow} />
              </NavLink>
              <ul className='sub-data'>
                <li className={isActive(['block-account'])}>
                  <NavLink scroll={onScroll('block-account')} to='/#block-account'>Get Account</NavLink>
                </li>
                <li className={isActive(['pk-pair'])}>
                  <NavLink scroll={onScroll('pk-pair')} to='/#pk-pair'>Private Key Pair</NavLink>
                </li>
                <li className={isActive(['encrypt-pk'])}>
                  <NavLink scroll={onScroll('encrypt-pk')} to='/#encrypt-pk'>Encrypt PK</NavLink>
                </li>
                <li className={isActive(['decrypt-pk'])}>
                  <NavLink scroll={onScroll('decrypt-pk')} to='/#decrypt-pk'>Decrypt PK</NavLink>
                </li>
                <li className={isActive(['sign-data'])}>
                  <NavLink scroll={onScroll('sign-data')} to='/#sign-data'>Sign Data</NavLink>
                </li>
                <li className={isActive(['verify-event'])}>
                  <NavLink scroll={onScroll('verify-event')} to='/#verify-event'>Verify Event</NavLink>
                </li>
                <li className={isActive(['rpc-valid'])}>
                  <NavLink scroll={onScroll('rpc-valid')} to='/#rpc-valid'>RPC Validation</NavLink>
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
