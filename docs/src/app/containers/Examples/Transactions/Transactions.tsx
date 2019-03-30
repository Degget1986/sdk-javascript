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
ambrosus.service.getTransaction(transactionHash)
.then(console.log);`}
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
ambrosus.service.getTransactionRecepit(transactionHash)
.then(console.log);`}
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
ambrosus.service.getTransactionCount(address) // Or no parameter if you want to get the count for the private key you have provided.
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
ambrosus.service.sendTransaction(address, value, data)
.then((receipt) => { console.log(recepit); });
// We can also use the event emitter for more details
ambrosus.service.sendTransaction(address, value, data)
.on('transactionHash', function(hash){
    ...
})
.on('receipt', function(receipt){
    ...
})
.on('confirmation', function(confirmationNumber, receipt){ ... })
.on('error', console.error); // If a out of gas error, the second parameter is the receipt.`}
                            </code>
                        </pre>
                    </div>
            </div>
        </div>
    );
}
