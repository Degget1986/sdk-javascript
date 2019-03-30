import React, { useEffect, useRef, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';

export default function () {
    const { setHash } = useContext(AppContext);
    const blockchain = useRef<HTMLDivElement>(null);
    const pkPair = useRef<HTMLDivElement>(null);
    const balance = useRef<HTMLDivElement>(null);
    const block = useRef<HTMLDivElement>(null);
    const latestBlock = useRef<HTMLDivElement>(null);
    const blockAccount = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - blockchain.current!.offsetTop) <= 30) {
            setHash('blockchain');
        } else if (Math.abs(window.scrollY - pkPair.current!.offsetTop) <= 30) {
            setHash('pk-pair');
        } else if (Math.abs(window.scrollY - balance.current!.offsetTop) <= 30) {
            setHash('balance');
        } else if (Math.abs(window.scrollY - block.current!.offsetTop) <= 30) {
            setHash('block');
        } else if (Math.abs(window.scrollY - latestBlock.current!.offsetTop) <= 30) {
            setHash('latest-block');
        } else if (Math.abs(window.scrollY - blockAccount.current!.offsetTop) <= 30) {
            setHash('block-account');
        }
    };

    return (
        <div id='blockchain' ref={blockchain}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#blockchain`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Blockchain</h3><hr />
            <div ref={pkPair} id='pk-pair' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#pk-pair`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Generate Private key pair</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Generates an account object with private key and public key.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK();
const account = ambrosus.service.getPkPair();`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={balance} id='balance' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#balance`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Balance</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Get the balance of an address at a given block.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const address = '...';
ambrosus.service.getBalance(address)
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={block} id='block' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#block`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Block</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns a block matching the block number or block hash.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const number = 12345;
ambrosus.service.getBlock(number)
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={latestBlock} id='latest-block' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#latest-block`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Latest Block</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns the latest block</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
ambrosus.service.getLatestBlock(number)
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={blockAccount} id='block-account' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#block-account`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Account</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Creates an account object from a private key.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const secret = '';
ambrosus.service.getAccount(secret) // No parameter if you want your secret key account object.
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
