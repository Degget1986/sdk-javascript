import React, { useRef, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import SVG from 'react-svg';
import './Examples.scss';
import CopyToClipboard from 'react-copy-to-clipboard';
import link from '../../../assets/svg/link.svg';
import Assets from './Assets';
import Events from './Events';
import Transactions from './Transactions';
import Blocks from './Blocks';
import Service from './Service';
import Bundles from './Bundles';

const Examples = () => {
    const {setHash} = useContext(AppContext);
    const example = useRef<HTMLDivElement>(null);

    useEffect(() => {
      window.addEventListener('scroll', onScroll);
      return () => {
        window.removeEventListener('scroll', onScroll);
      };
    }, []);

      const onScroll = (e: any) => {
        e.preventDefault();
        if (Math.abs(window.scrollY - example.current!.offsetTop) <= 30 ) {
            setHash('example');
        }
      };

    return (
    <div id='example' ref={example}>
        <h2>
          <CopyToClipboard text={`${window.location.origin}/#example`}>
            <SVG className='link' src={link} wrapper='span' />
          </CopyToClipboard>
        Example</h2>
        <hr />
        <Assets />
        <Events />
        <Bundles />
        <Transactions />
        <Blocks />
        <Service />
    </div>);
};

export default Examples;
