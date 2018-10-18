// Imports
import AmbrosusSDK from '../src/index';
const Web3 = require('web3');
const apiEndpoint = 'https://gateway-test.ambrosus.com';
import chai from 'chai';
import eventsArray from './eventsArray';

// Initialize & Export
global.XMLHttpRequest = require('xhr2');
global.expect = chai.expect;
global.AmbrosusSDK = AmbrosusSDK;
global.apiEndpoint = 'https://gateway-test.ambrosus.com';
global.Web3 = Web3;
global.eventsArray = eventsArray;
global.assetId = '0x525466324f178cef08e25cf69cffde9f149129e4ceddfaa19767bc29705cef56';
global.eventId = '0x8663d7863dc5131d5ad6050d44ed625cd299b78d2ce289ffc95e63b1559c3f63';
global.randomSecret = '0x8663d7863dc5131d5ad6050d44ed625cd299b78d2ce289ffc95e63b1559c3f63';

// Export Different SDK Inits
global.lib = new AmbrosusSDK({apiEndpoint, Web3});
global.lib1 = new AmbrosusSDK({ apiEndpoint });
global.lib2 = new AmbrosusSDK({ secret: randomSecret, Web3 });