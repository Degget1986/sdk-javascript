// Imports
import AmbrosusSDK from '../src/index';
import chai from 'chai';
import eventsArray from './eventsArray.json';
import chocolateJson from './../examples/demo-assets/chocolate.json';

// Initialize & Export
global.XMLHttpRequest = require('xhr2');
global.expect = chai.expect;
global.AmbrosusSDK = AmbrosusSDK;
global.apiEndpoint = 'https://hermes.ambrosus-test.com';
global.eventsArray = eventsArray;
global.chocolateJson = chocolateJson;
global.assetId =
  '0xd26603f3b7edcb15e4a073894ea78fd129678468c45d171a2e74f3a903cce313';
global.eventId =
  '0x8663d7863dc5131d5ad6050d44ed625cd299b78d2ce289ffc95e63b1559c3f63';
global.randomSecret =
  '0xf426aa4dbc1f74997fc31bbcbbdbe6f66bd11f1bf5dbe637ef242740d74080ad';

// Export Different SDK Inits
global.lib = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com'
});
global.lib2 = new AmbrosusSDK({
    apiEndpoint: 'https://hermes.ambrosus-test.com',
    secret: randomSecret
});
global.lib3 = new AmbrosusSDK({
    rpcURL: 'https://network.ambrosus-test.com',
    secret: randomSecret
});
