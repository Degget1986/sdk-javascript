import React, { useRef, useEffect, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';
import Table from '../../../components/Table';

export default function () {
    const assets = useRef<HTMLDivElement>(null);
    const getAsset = useRef<HTMLDivElement>(null);
    const getAssets = useRef<HTMLDivElement>(null);
    const createAsset = useRef<HTMLDivElement>(null);
    const { setHash } = useContext(AppContext);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - assets.current!.offsetTop) <= 30) {
            setHash('assets');
        } else if (Math.abs(window.scrollY - getAsset.current!.offsetTop) <= 30) {
            setHash('get-asset');
        } else if (Math.abs(window.scrollY - getAssets.current!.offsetTop) <= 30) {
            setHash('get-assets');
        } else if (Math.abs(window.scrollY - createAsset.current!.offsetTop) <= 30) {
            setHash('create-asset');
        }
    };

    return (
        <div id='assets' ref={assets}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#assets`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Assets</h3><br />
            <div className='para'>
                <p>Assets are the primary objects of analysis being monitored or traced over time; a stationary water sensor, a logistics pallet, a crate of milk, a steak, etc. As the ‘nouns’ of the system, Assets can represent an ingredient, product, package of products or any other type of container.
Importantly, an Asset functions as a handle of Events and possesses an <i>idData</i> structure containing the following pieces of information: </p><br />
                <ul style={{ listStyleType: 'disc', paddingLeft: '30px' }}>
                    <li>The AMB-ID of the Asset </li>
                    <li>User Address</li>
                    <li>Minimal Access Level Required to View the Private Data </li>
                    <li>Timestamp </li>
                    <li>Hash of the Data Field </li>
                </ul>
            </div>
            <div id='get-asset' ref={getAsset} className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-asset`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Asset</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    Returns asset with respect to the assetId provided.
                <Table
                        head={['Parameter', 'Requirement', 'Type', 'Defination', 'Example']}
                        body={[
                            ['assetId', 'required', 'string', 'Asset\'s ID', '0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db'],
                        ]} />
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
});
ambrosus.assets.getAsset(assetId).then(function(response) {
    // Successful request
    console.log(response);
}).catch(function(error) {
    // Catching the error
    console.log(error);
);
// OR you can pass an object
ambrosus.assets.getAsset({assetId: '...'}).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});
`}
                        </code>
                    </pre>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "status": 200,
    "data": {
        "assetId": "0xc5cfd04.....30755ed65",
        "content": {
            "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
            "idData": {
                "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
                "timestamp": 1503424923,
                "sequenceNumber": 3
            }
        },
        "metadata": {
            "bundleId": "0x85a427a3.....cd1d38ebbd",
            "bundleTransactionHash": "0x21ab....1cdf8e55b37"
        }
    },
    "message": "success"
}`}
                        </code>
                    </pre>
                    Error example for GET asset. Reasons:
                <ol style={{ paddingLeft: '20px' }}>
                        <li>If in the setup, address and secret are incorrect.</li>
                        <li>If assetID doesn't exist.</li>
                        <li>If you don't have permission to access the asset.</li>
                    </ol>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "status": 404,
    "data": null,
    "message": "No asset with such assetId found"
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={getAssets} id='get-assets' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-asset`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Assets</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns array of assets.</p>
                    <p>For this method you can apply certain filters, to get ie. first 20 assets.</p>
                    <Table
                        head={['Parameter', 'Requirement', 'Type', 'Defination', 'Example']}
                        body={[
                            ['perPage', 'optional', 'number', 'Number of assets to return per page', '20'],
                            ['createdBy', 'optional', 'string', 'Address of the user', '0x9687a70513047dc6Ee966D69bD0C07FFb1102098'],
                            ['page', 'optional', 'number', 'Optional number of page (more search results than specified in perPage parameter concludes more than one page)', '1'],
                            ['fromTimestamp', 'optional', 'number', 'earliest timestamp for the asset', 1554367966122],
                            ['toTimestamp', 'optional', 'number', 'latest timestamp for the asset', 1554367966122],
                        ]} />
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
});

const params = {
    perPage: 1
};
ambrosus.assets.getAssets(params).then(function(response) {
    // Successful request
    console.log(response);
}).catch(function(error) {
    // Catching the error
    console.log(error);
);
`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "status": 200,
    "data": {
        "results": [{
            "assetId": "0xc5cfd04.....30755ed65",
            "content": {
                "signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
                "idData": {
                    "createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
                    "timestamp": 1503424923,
                    "sequenceNumber": 3
                }
            },
            "metadata": {
                "bundleId": "0x85a427a3.....cd1d38ebbd",
                "bundleTransactionHash": "0x21ab....1cdf8e55b37"
            }
        }],
        "resultCount": 53
    },
    "message": "success"
}`}
                        </code>
                    </pre>
                    <p>Error example for GET assets.</p>
                    <p>In this case, if you don't have any assets, you will receive status of 200, but in the data, data.results will be empty array, as well as data.resultCount will be 0.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "status": 200,
    "data": {
      "results": [],
      "resultCount": 0
    },
    "message": ""
  }`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={createAsset} id='create-asset' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-asset`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Create Assets</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Creating a new Asset</p>
                    <Table
                        head={['Parameter', 'Requirement', 'Type', 'Defination']}
                        body={[
                            ['assetData', 'required', 'object', 'Asset data information'],
                        ]}
                    />
                    <br />
                    <p>Example for Asset Data</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`[{
    "content": {
        "idData": {
            "timestamp": 1519817101
        },
        "data": [{
            "type": "ambrosus.asset.info",
            "name": "PURE DARK CHOCOLATE BAR 92%",
            ...,
        }]
    }
}]`}
                        </code>
                    </pre>
                    <p>
                        This will first create an asset in the background of SDK, then on success it will create a first following event. It's important that event type ends with .info, all other information in example above is customizable.
                        </p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
    secret: '0x6823520c03ad7b17....',
});
ambrosus.assets.createAsset(assetData).then(function(response) {
    // Successful request
    console.log(response);
}).catch(function(error) {
    // Catching the error
    console.log(error);
);
`}
                        </code>
                    </pre>
                    <p>Response Example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
	"status": 200,
	"data": {
		"assetId": "0xc5cfd04.....30755ed65",
		"content": {
			"signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
			"idData": {
				"createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
				"timestamp": 1503424923,
				"sequenceNumber": 3
			}
		}
	},
	"message": "success"
}`}
                        </code>
                    </pre>
                    <p>Error example for CREATE asset. Reasons:</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`// If in the setup, secret is incorrect.
{
    "status": 400 or 403,
    "data": null,
    "message": "Invalid input" or "The createdBy user is not registered or has no "create_entity" permission"
}`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>);
}
