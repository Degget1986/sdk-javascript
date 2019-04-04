import React, { useEffect, useRef, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';

export default function () {
    const { setHash } = useContext(AppContext);
    const service = useRef<HTMLDivElement>(null);
    const pkPair = useRef<HTMLDivElement>(null);
    const blockAccount = useRef<HTMLDivElement>(null);
    const encryptPK = useRef<HTMLDivElement>(null);
    const decryptPK = useRef<HTMLDivElement>(null);
    const verifyEvent = useRef<HTMLDivElement>(null);
    const rpcValid = useRef<HTMLDivElement>(null);
    const signData = useRef<HTMLDivElement>(null);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - service.current!.offsetTop) <= 30) {
            setHash('service');
        } else if (Math.abs(window.scrollY - pkPair.current!.offsetTop) <= 30) {
            setHash('pk-pair');
        } else if (Math.abs(window.scrollY - blockAccount.current!.offsetTop) <= 30) {
            setHash('block-account');
        } else if (Math.abs(window.scrollY - encryptPK.current!.offsetTop) <= 30) {
            setHash('encrypt-pk');
        } if (Math.abs(window.scrollY - decryptPK.current!.offsetTop) <= 30) {
            setHash('decrypt-pk');
        } if (Math.abs(window.scrollY - verifyEvent.current!.offsetTop) <= 30) {
            setHash('verify-event');
        } if (Math.abs(window.scrollY - rpcValid.current!.offsetTop) <= 30) {
            setHash('rpc-valid');
        } if (Math.abs(window.scrollY - signData.current!.offsetTop) <= 30) {
            setHash('sign-data');
        }
    };

    return (
        <div id='blocks' ref={service}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#service`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Service</h3><hr />
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
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    address: '0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01',
    privateKey: '0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709',
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}`}
                        </code>
                    </pre>
                </div>
            </div>
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
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    address: "0xb8CE9ab6943e0eCED004cDe8e3bBed6568B2Fa01",
    privateKey: "0x348ce564d427a3311b6536bbcff9390d69395b06ed6c486954e971d960fe8709",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={encryptPK} id='encrypt-pk' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#encrypt-pk`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Encrypt Private Key</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Encrypts a private key to the web3 keystore v3 standard.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK();
const account = ambrosus.service.encryptPrivateKey(token, secret);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    version: 3,
    id: '04e9bcbb-96fa-497b-94d1-14df4cd20af6',
    address: '2c7536e3605d9c16a7a3d7b1898e529396a65c23',
    crypto: {
        ciphertext: 'a1c25da3ecde4e6a24f3697251dd15d6208520efc84ad97397e906e6df24d251',
        cipherparams: { iv: '2885df2b63f7ef247d753c82fa20038a' },
        cipher: 'aes-128-ctr',
        kdf: 'scrypt',
        kdfparams: {
            dklen: 32,
            salt: '4531b3c174cc3ff32a6a7a85d6761b410db674807b2d216d022318ceee50be10',
            n: 262144,
            r: 8,
            p: 1
        },
        mac: 'b8b010fff37f9ae5559a352a185e86f9b9c1d7f7a9f1bd4e82a5dd35468fc7f6'
    }
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={decryptPK} id='decrypt-pk' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#decrypt-pk`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Decrypt Private Key</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Decrypts a keystore v3 JSON, and creates the account.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK();
const account = ambrosus.service.decryptPrivateKey(keyStoreJSON, password);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    address: "0x2c7536E3605D9C16a7a3D7b1898e529396a65c23",
    privateKey: "0x4c0883a69102937d6231471b5dbb6204fe5129617082792ae468d01a3f362318",
    signTransaction: function(tx){...},
    sign: function(data){...},
    encrypt: function(password){...}
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={signData} id='sign-data' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#sign-data`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Sign Data</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Signs arbitrary data. This data is before UTF-8 HEX decoded and enveloped as follows:
                        <pre>
                            <code className='language-bash'>
                                \x19Ethereum Signed Message:\n" + message.length + message.
                                </code>
                        </pre>
                    </p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK();
const account = ambrosus.service.sign(data, secret);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    message: 'Some data',
    messageHash: '0x1da44b586eb0729ff70a73c326926f6ed5a25f5b056e7f47fbc6e58d86871655',
    v: '0x1c',
    r: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd',
    s: '0x6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a029',
    signature: '0xb91467e570a6466aa9e9876cbcd013baba02900b8979d43fe208a4a4f339f5fd6007e74cd82e037b800186422fc2da167c747ef045e5d18a5f5d4300f8e1a0291c'
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={verifyEvent} id='verify-event' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#verify-event`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Verify Event</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Validate event data & signatures (prove event data is legit)</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK();
const account = ambrosus.service.verifyEvents(eventId);`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
flag: true,
verified: {
    hash: true,
    createdBy: true,
    eventId: true
    }
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={rpcValid} id='rpc-valid' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#rpc-valid`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Validate RPC URL</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Checks if the provided RPC URL is valid</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK();
const account = ambrosus.service.isRPCValid('https://network.ambrosus-test.com')
.then(valid => {
    console.log(valid) // true or false
});`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
