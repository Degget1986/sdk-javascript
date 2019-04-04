import React, { useEffect, useRef, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';

export default function () {
    const { setHash } = useContext(AppContext);
    const transaction = useRef<HTMLDivElement>(null);
    const getTransaction = useRef<HTMLDivElement>(null);
    const getTransactionReceipt = useRef<HTMLDivElement>(null);
    const getTransactionCount = useRef<HTMLDivElement>(null);
    const sendTransaction = useRef<HTMLDivElement>(null);
    const balance = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - transaction.current!.offsetTop) <= 30) {
            setHash('transaction');
        } else if (Math.abs(window.scrollY - getTransaction.current!.offsetTop) <= 30) {
            setHash('get-transaction');
        } else if (Math.abs(window.scrollY - getTransactionReceipt.current!.offsetTop) <= 30) {
            setHash('get-transaction-receipt');
        } else if (Math.abs(window.scrollY - getTransactionCount.current!.offsetTop) <= 30) {
            setHash('get-transaction-count');
        } else if (Math.abs(window.scrollY - sendTransaction.current!.offsetTop) <= 30) {
            setHash('send-transaction');
        } else if (Math.abs(window.scrollY - balance.current!.offsetTop) <= 30) {
            setHash('balance');
        }
    };

    return (
        <div id='transaction' ref={transaction}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#transaction`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Transaction</h3><hr />
            <div id='get-transaction' ref={getTransaction} className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-transaction`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Transaction</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    Returns a transaction matching the given transaction hash.
                        <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const transactionHash = '...';
ambrosus.transactions.getTransaction('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b')
.then(console.log);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "hash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
    "nonce": 2,
    "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
    "blockNumber": 3,
    "transactionIndex": 0,
    "from": "0xa94f5374fce5edbc8e2a8697c15331677e6ebf0b",
    "to": "0x6295ee1b4f6dd65047762f924ecd367c17eabf8f",
    "value": '123450000000000000',
    "gas": 314159,
    "gasPrice": '2000000000000',
    "input": "0x57cb2fc4"
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div id='get-transaction-receipt' ref={getTransactionReceipt} className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-transaction-receipt`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Transaction Receipt</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns the transaction recepit.</p>
                    <p>The receipt is not available for pending transactions and returns null.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const transactionHash = '...';
ambrosus.transactions.getTransactionRecepit('0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b')
.then(console.log);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
  "status": true,
  "transactionHash": "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b",
  "transactionIndex": 0,
  "blockHash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
  "blockNumber": 3,
  "contractAddress": "0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe",
  "cumulativeGasUsed": 314159,
  "gasUsed": 30234,
  "logs": [{
         // logs as returned by getPastLogs, etc.
     }, ...]
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div id='get-transaction-count' ref={getTransactionCount} className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-transaction-count`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Transaction Count</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Get the numbers of transactions sent from this address.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const address = '0x...';
ambrosus.transactions.getTransactionCount('0x11f4d0A3c12e86B4b5F39B213F7E19D048276DAe') // Or no parameter if you want to get the count for the private key you have provided.
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
            <div id='send-transaction' ref={sendTransaction} className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#send-transaction`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Send Transaction</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Signs and sends the transaction to the network</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-dev.com',
    secret: '0xdfds...',
});
const address = '...';
const value = '...';
const data = '..';
ambrosus.transactions.sendTransaction(address, value, data)
.then((receipt) => { console.log(recepit); })
.catch(err => console.log(err));`}
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
ambrosus.transactions.getBalance(address) // Or no parameter if you want to get the balance for the private key you have provided.
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
