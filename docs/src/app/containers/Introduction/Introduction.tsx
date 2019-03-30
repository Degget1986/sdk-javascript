import React, { useRef, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import amb_logo from '../../../assets/svg/amb_logo.svg';
import SVG from 'react-svg';
import './Introduction.scss';
import CopyToClipboard from 'react-copy-to-clipboard';
import link from '../../../assets/svg/link.svg';

const Introduction = () => {
  const { setHash } = useContext(AppContext);
  const intro = useRef<HTMLDivElement>(null);

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  const onScroll = (e: any) => {
    e.preventDefault();
    if (Math.abs(window.scrollY - intro.current!.offsetTop) <= 30) {
      setHash('intro');
    }
  };

  return (
    <div id='intro' ref={intro}>
      <SVG wrapper='div' className='logo' src={amb_logo} />
      <h2>
        <CopyToClipboard text={`${window.location.origin}/#intro`}>
          <SVG className='link' src={link} wrapper='span' />
        </CopyToClipboard>
        Ambrosus SDK</h2>
      <hr />
      <div className='para'>
        <p>The purpose of this document is to provide an overview and breakdown of how to utilize the Ambrosus JavaScript SDK to interact with and build solutions on the Ambrosus Network (AMB-NET). In the context of the Ambrosus Ecosystem, the Ambrosus JavaScript SDK provides a clear and easily digestible introduction to sending or pulling data from the Ambrosus blockchain using JavaScript. More specifically, it allows any interested developer to build (decentralised) applications, as well as create and manage ‘Assets’ and ‘Events’ on the Ambrosus Network (AMB-NET).</p><br />
        <p>The document proceeds as follows: <br /><br />First, information is provided with regards to setting up the JavaScript SDK and creating an ‘Account’ on the Ambrosus Network. This section discusses how to create a private key, as well as what expected ‘response’ mechanisms from the SDK entail. <br /><br />Second, the core data model of the Ambrosus Network, is explained. This involves a breakdown of the fundamental objects within the Ambrosus Ecosystem: Assets and Events. Further information is also provided concerning how to create Assets and Events using the JavaScript SDK. <br /><br />Third, the document details how to pull Assets and Events stored on the Ambrosus blockchain via Hermes Masternodes; this in particular allows JavaScript developers to easily and quickly build custom applications on the Ambrosus Network. </p>

        </div>
    </div>);
};

export default Introduction;
