import React, { useRef, useEffect, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';

export default function () {
    const bundles = useRef<HTMLDivElement>(null);
    const getBundle = useRef<HTMLDivElement>(null);
    const { setHash } = useContext(AppContext);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - bundles.current!.offsetTop) <= 30) {
            setHash('bundles');
        } else if (Math.abs(window.scrollY - getBundle.current!.offsetTop) <= 30) {
            setHash('get-bundle');
        }
    };

    return (
        <div id='bundles' ref={bundles}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#bundles`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Bundles</h3><hr />
            <div ref={getBundle} id='get-bundle' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-bundle`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Bundle</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns bundle with respect to the bundleId provided.</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
});
ambrosus.bundles.getBundle(bundleId).then(function(response) {
    // Successful request
    console.log(response);
}).catch(function(error) {
    // Catching the error
    console.log(error);
);
// OR you can pass an object
ambrosus.bundles.getBundle({bundleId: '...'}).then((response) => {
    console.log(response);
}).catch((error) => {
    console.log(error);
});`}
                        </code>
                    </pre>
                    <p>Response example</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
    "status": 200,
    "data": {
        "bundleId": "0x2b512565ccdd3affb889babfe4a5b47ac2b5084e8de608f5b8d8a0e62aadce51",
		"content": {
			"signature": "0x2a018d1c4daa0c80110e4132ff0180c0d8793c9e268a41ce5921feee23e11b45485c71f127ca47716051b0c8bc5a42f8145790179e4b0ae0f03f8a587e8411ea1b",
			"idData": {
				"createdBy": "0x6717083A10aa3137E3748C41ac22B1bA73B5D6e7",
				"entriesHash": "0xfad37c12d39ad96319b06e7d22b402fcd0b993e95d0b6ed4a77ad2224e75bff3",
				"timestamp": 1545920989
			},
			"entries": [{
				"content": {
					"idData": {
						"createdBy": "0x75B15Aad10Cf363CEf7e1A53dfBA31F03711bDD5",
						"timestamp": 1545920689,
						"sequenceNumber": 0.1934714669598997
					},
					"signature": "0x5605876c696983d0381dd088e5278bd96b89723df8472aed7c72e9c75d87015768f634e60406b5f6b7c287f9f810e4f89d956407060616dc8d1dcba28a1f74861c"
				},
				"assetId": "0x66b1456aa186e75f2d252bd0718301f735acc80320aabacbf6bf8e90edae5929",
				"metadata": {
					"entityUploadTimestamp": 1545920689
				}
			},
    },
    "message": "success"
}`}
                        </code>
                    </pre>
                    <p>Error Response if no bundleId is provided</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
	status: 400,
	data: null,
	message: 'Bundle ID is missing.'
}`}
                        </code>
                    </pre>
                </div>
            </div>
        </div>
    );
}
