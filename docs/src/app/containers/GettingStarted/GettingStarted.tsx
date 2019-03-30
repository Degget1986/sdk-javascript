import React, { useRef, useContext, useEffect } from 'react';
import { AppContext } from '../../App';
import SVG from 'react-svg';
import './GettingStarted.scss';
import CopyToClipboard from 'react-copy-to-clipboard';
import link from '../../../assets/svg/link.svg';
import Prism from 'prismjs';
import Table from '../../components/Table';

const GettingStarted = () => {
    const {setHash} = useContext(AppContext);
    const started = useRef<HTMLDivElement>(null);
    const prerequisite = useRef<HTMLDivElement>(null);
    const installation = useRef<HTMLDivElement>(null);
    const usage = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
          window.removeEventListener('scroll', onScroll);
        };
      }, []);

      const onScroll = (e: any) => {
        e.preventDefault();
        if (Math.abs(window.scrollY - started.current!.offsetTop) <= 30 ) {
            setHash('started');
        } else if (Math.abs(window.scrollY - prerequisite.current!.offsetTop) <= 30 ) {
          setHash('prerequisite');
        } else if (Math.abs(window.scrollY - installation.current!.offsetTop) <= 30 ) {
          setHash('installation');
        } else if (Math.abs(window.scrollY - usage.current!.offsetTop) <= 30 ) {
          setHash('usage');
        }
      };

    return (
    <div id='started' ref={started}>
        <h2>
          <CopyToClipboard text={`${window.location.origin}/#started`}>
            <SVG className='link' src={link} wrapper='span' />
          </CopyToClipboard>
        Getting Started</h2>
        <hr /><br />
        <div id='prerequisite' ref={prerequisite}>
          <h3>
            <CopyToClipboard text={`${window.location.origin}/#prerequisite`}>
              <SVG className='link' src={link} wrapper='span' />
            </CopyToClipboard>
            Prerequisite
          </h3>
            <div className='para'>
              <p>In order to use Ambrosus SDK, first you need to have a developers account.
              You can <a target='_blank' href='https://selfservice-test.ambrosus.com/create'>apply for one here.</a><br /><br />
              Ambrosus team will send you an email with your account <strong>address</strong> and <strong>secret</strong> key.<br /><br />
              <strong>Important note:</strong> PLEASE DO NOT SHARE YOUR SECRET WITH ANYONE.<br />
              We do not store your secret for security reasons, so please save it somewhere safe, in order to use it in SDK.<br /><br />
              <i>To use Ambrosus SDK, you will need your <strong>address</strong> and <strong>secret</strong>.</i>
              Now we can go to setup.</p>
            </div>
        </div>
        <div id='installation' ref={installation}>
          <h3>
            <CopyToClipboard text={`${window.location.origin}/#installation`}>
              <SVG className='link' src={link} wrapper='span' />
            </CopyToClipboard>
            Installation
           </h3>
          <div className='para'>
            npm
            <pre>
              <code className='language-bash'>
  {`$ npm install ambrosus-javascript-sdk --save`}
              </code>
            </pre>
          </div>
        </div>
        <div id='usage' ref={usage}>
          <h3>
            <CopyToClipboard text={`${window.location.origin}/#usage`}>
              <SVG className='link' src={link} wrapper='span' />
            </CopyToClipboard>
            Usage
           </h3>
           <div className='para'>
           Import the SDK in your javascript file<br />
            <pre>
              <code className='language-javascript line-numbers'>
{`// with the classic require...
const AmbrosusSDK = require('ambrosus-javascript-sdk')
// ... or with the new import directive.
import AmbrosusSDK from 'ambrosus-javascript-sdk'`}
              </code>
            </pre>
            <br />
            <p>Initializing the Ambrosus library. The following properties can be passed while initializing the library.<br /> The ideal way to pass the properties is using the environment variables.</p>
            <Table
              head={['Property', 'Type', 'Defination', 'Example']}
              body={[
                ['rpcURL', 'string', 'RPC URL of the blockchain network.', 'https://network.ambrosus-dev.com'],
                ['secret', 'string', 'Secret key you received in email.', '0x34353sdgdsHd...'],
                ['apiEndpoint', 'string', 'API endpoint of the ambrosus network.', 'https://hermes.ambrosus-test.com'],
              ]} />
            <br />
            Intializing SDK to request or querying data.
            <pre>
              <code className='language-javascript line-numbers'>
{`const ambrosus = new AmbrosusSDK({
  apiEndpoint: 'https://hermes.ambrosus-test.com',
});`}
              </code>
            </pre>
            Initializing SDK to create assets and events.
            <pre>
              <code className='language-javascript line-numbers'>
{`const ambrosus = new AmbrosusSDK({
  secret: '0x6823520c03ad7b17....',
  apiEndpoint: 'https://hermes.ambrosus-test.com',
});`}
              </code>
            </pre>
            Initializing SDK to work with the blockchain network.
            <pre>
              <code className='language-javascript line-numbers'>
{`const ambrosus = new AmbrosusSDK({
  rpcURL: 'https://network.ambrosus-dev.com',
  secret: '0x6823520c03ad7b17....',
});`}
              </code>
            </pre>
           </div>
        </div>
    </div>);
};

export default GettingStarted;
