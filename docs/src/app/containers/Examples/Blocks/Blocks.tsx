import React, { useEffect, useRef, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';

export default function () {
    const { setHash } = useContext(AppContext);
    const blocks = useRef<HTMLDivElement>(null);
    const block = useRef<HTMLDivElement>(null);
    const latestBlock = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - blocks.current!.offsetTop) <= 30) {
            setHash('blocks');
        } else if (Math.abs(window.scrollY - block.current!.offsetTop) <= 30) {
            setHash('block');
        } else if (Math.abs(window.scrollY - latestBlock.current!.offsetTop) <= 30) {
            setHash('latest-block');
        }
    };

    return (
        <div id='blocks' ref={blocks}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#blocks`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Blocks</h3><hr />
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
const number = 3;
ambrosus.blocks.getBlock(number)
.then(console.log);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "number": 3,
    "hash": "0xef95f2f1ed3ca60b048b4bf67cde2195961e0bba6f70bcbea9a2c4e133e34b46",
    "parentHash": "0x2302e1c0b972d00932deb5dab9eb2982f570597d9d42504c05d9c2147eaf9c88",
    "nonce": "0xfb6e1a62d119228b",
    "sha3Uncles": "0x1dcc4de8dec75d7aab85b567b6ccd41ad312451b948a7413f0a142fd40d49347",
    "logsBloom": "0x00000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000",
    "transactionsRoot": "0x3a1b03875115b79539e5bd33fb00d8f7b7cd61929d5a3c574f507b8acf415bee",
    "stateRoot": "0xf1133199d44695dfa8fd1bcfe424d82854b5cebef75bddd7e40ea94cda515bcb",
    "receiptsRoot: '0x56e81f171bcc55a6ff8345e692c0f86e5b48e01b996cadc001622fb5e363b421',
    "miner": "0x8888f1f195afa192cfee860698584c030f4c9db1",
    "difficulty": '21345678965432',
    "totalDifficulty": '324567845321',
    "size": 616,
    "extraData": "0x",
    "gasLimit": 3141592,
    "gasUsed": 21662,
    "timestamp": 1429287689,
    "transactions": [
        "0x9fc76417374aa880d4449a1f7f31ec597f00b1f6f3dd2d66f4c9c6c445836d8b"
    ],
    "uncles": []
}`}
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
ambrosus.blocks.getLatestBlock(number)
.then(console.log);`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
