import React, { useRef, useEffect, useContext } from 'react';
import CopyToClipboard from 'react-copy-to-clipboard';
import SVG from 'react-svg';
import link from '../../../../assets/svg/link.svg';
import Prism from 'prismjs';
import { AppContext } from '../../../App';
import Table from '../../../components/Table';
export default function () {
    const events = useRef<HTMLDivElement>(null);
    const getEvent = useRef<HTMLDivElement>(null);
    const getEvents = useRef<HTMLDivElement>(null);
    const createEvent = useRef<HTMLDivElement>(null);
    const { setHash } = useContext(AppContext);

    useEffect(() => {
        Prism.highlightAll();
        window.addEventListener('scroll', onScroll);
        return () => {
            window.removeEventListener('scroll', onScroll);
        };
    }, []);

    const onScroll = (e: any) => {
        if (Math.abs(window.scrollY - events.current!.offsetTop) <= 30) {
            setHash('events');
        } else if (Math.abs(window.scrollY - getEvent.current!.offsetTop) <= 30) {
            setHash('get-event');
        } else if (Math.abs(window.scrollY - getEvents.current!.offsetTop) <= 30) {
            setHash('get-events');
        } else if (Math.abs(window.scrollY - createEvent.current!.offsetTop) <= 30) {
            setHash('create-event');
        }
    };

    return (
        <div id='events' ref={events}>
            <h3>
                <CopyToClipboard text={`${window.location.origin}/#assets`}>
                    <SVG className='link' src={link} wrapper='span' />
                </CopyToClipboard>
                Events</h3><br />
            <div className='para'>
                <p>
                    Events are registries of any change of state that has occurred to an Asset; the temperature, humidity, location, acceleration, quality check, etc. When registered in AMB-NET, an event will always contain the following array of JSON objects:
                </p><br />
                <ul style={{ listStyleType: 'disc', paddingLeft: '30px' }}>
                    <li>WHAT (relating to the AMB-ID of the Asset in Question)</li>
                    <li>WHERE (the location of where the Event was taken from based upon latitude or longitude coordinates or GLN). </li>
                    <li>WHO (the device, application, or user that created the Event in question). </li>
                    <li>WHEN (a timestamp of the Event indicating when it was originally created). </li>
                    <li>WHY (indicating the business procedure and its purpose).</li>
                </ul>
            </div>
            <div id='get-event' ref={getEvent} className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-asset`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Event</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns the data of a specific event.</p>
                    <Table
                        head={['Parameter', 'Requirement', 'Type', 'Defination', 'Example']}
                        body={[
                            ['eventId', 'required', 'string', 'Event\'s ID', '0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db'],
                        ]}
                    />
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
});
ambrosus.events.getEventById(eventId).then(function(response) {
    // Response if successful
    console.log(response);
  }).catch(function(error) {
    // Error if error
    console.log(error);
  );
`}
                        </code>
                    </pre>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
	"status": 200,
	"data": {
		"eventId": "0xc5cfd04.....30755ed65",
		"content": {
			"signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
			"idData": {
				"assetId": "0xc5cfd04.....30755ed65",
				"createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
				"accessLevel": 4,
				"timestamp": 1503424923,
				"dataHash": "0x01cd181cd38eb5bbd162a44701727a31f457a538"
			},
			"data": [{
				"type": "ambrosus.event.customevent",
				"customField": "customValue"
			}]
		}
	},
	"message": "success"
}`}
                        </code>
                    </pre>
                    <p>Error example for GET event. Reasons:</p>
                    <ol style={{ paddingLeft: '20px' }}>
                        <li>If event with eventId doesn't exist.</li>
                    </ol>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
  "status": 404,
  "data": null,
  "message": "Event not found"
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={getEvents} id='get-events' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-asset`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Get Events</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Returns array of events.</p>
                    <p>For this method you can apply certain filters, to get ie. all events for a specific assetId.</p>
                    <Table
                        head={['Parameter', 'Requirement', 'Type', 'Defination', 'Example']}
                        body={[
                            ['assetId', 'optional', 'string', 'Event\'s ID', '0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db'],
                            ['fromTimestamp', 'optional', 'number', 'Earliest timestamp (date in seconds)', '1503424923'],
                            ['toTimestamp', 'optional', 'number', 'Latest timestamp (date in seconds)', '1503424923'],
                            ['data', 'optional', 'string', 'Filter events by object properties in event.content.data array', 'data[type]=ambrosus.event.info'],
                            ['perPage', 'optional', 'number', 'Number of events to return per page', '20'],
                        ]}
                    />
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
});

const options = {
	"assetId": "0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db",
	"fromTimestamp": 1503424723,
	"toTimestamp": 1503424923,
	"perPage": 5,
	"data": "data[type]=ambrosus.event.info"
}
ambrosus.events.getEvents(options).then(function(response) {
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
			"eventId": "0xc5cfd04.....30755ed65",
			"content": {
				"signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
				"idData": {
					"assetId": "0xc5cfd04.....30755ed65",
					"createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
					"timestamp": 1503424923,
					"dataHash": "0x01cd181cd38eb5bbd162a44701727a31f457a538"
				},
				"data": [{
					"type": "ambrosus.event.customevent",
					"customField": "customValue"
				}]
			}
		}],
		"resultCount": 112
	},
	"message": "success"
}`}
                        </code>
                    </pre>
                    <p>Error example for GET events.</p>
                    <p>In this case, if you don't provide any options</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`{
  "status": 404,
  "data": null,
  "message": "Event not found"
}`}
                        </code>
                    </pre>
                </div>
            </div>
            <div ref={createEvent} id='create-event' className='para'>
                <h4>
                    <CopyToClipboard text={`${window.location.origin}/#get-asset`}>
                        <SVG className='link' src={link} wrapper='span' />
                    </CopyToClipboard>
                    Create Event</h4>
                <div style={{ paddingBottom: '0' }} className='para'>
                    <p>Creating a new Asset</p>

                    <Table
                        head={['Parameter', 'Requirement', 'Type', 'Defination', 'Example']}
                        body={[
                            ['assetId', 'required', 'string', 'Asset\'s ID', '0xc0cdb3f2b81d928369de4143cdb1a20e5ecdec09e0ea123dd828bdcc55a048db'],
                            ['eventData', 'required', 'object', 'Event data information', 'Example below'],
                        ]}
                    />
                    <br />
                    <p>Example for Asset Data</p>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {` [{
 	"type": "ambrosus.asset.info",
 	"name": "PURE DARK CHOCOLATE BAR 92%",
 	"assetType": "ambrosus.assetTypes.batch",
 	"images": {
 		"default": {
 			"url": "http://imageurlgoeshere.com/file.extension"
 		}
 	},
 	"size": "2.64 oz.",
 	"Product Information": {
 		"attributes": "No-GMOs, Vegan, Gluten Free, Kosher, Soy Free",
 		"ingredients": "Organic cocoa beans, organic sugar, organic cocoa butter",
 		"Brand": "Madecasse"
 	},
 	"Batch Information": {
 		"Origin": "Madagascar"
 	}
 }]`}
                        </code>
                    </pre>
                    <pre>
                        <code className='language-javascript line-numbers'>
                            {`import AmbrosusSDK from 'ambrosus-javascript-sdk';
const ambrosus = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
    secret: '0x6823520c03ad7b17....',
});
ambrosus.events.createEvent(assetId, eventData).then(function(response) {
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
		"eventId": "0xc5cfd04.....30755ed65",
		"content": {
			"signature": "0x30755ed65396facf86c53e6...65c5cfd04be400",
			"idData": {
				"assetId": "0xc5cfd04.....30755ed65",
				"createdBy": "0x162a44701727a31f457a53801cd181cd38eb5bbd",
				"accessLevel": 4,
				"timestamp": 1503424923,
				"dataHash": "0x01cd181cd38eb5bbd162a44701727a31f457a538"
			},
			"data": [{
				"type": "ambrosus.event.customevent",
				"customField": "customValue"
			}]
		}
	},
	"message": "success"
}`}
                        </code>
                    </pre>
                    <p>Error example for CREATE event. Reasons:</p>
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
