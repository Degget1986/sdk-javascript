/* global describe, it, before */

/* Imports */
global.XMLHttpRequest = require('xhr2');
import chai from 'chai';
import AmbrosusSDK from '../src/index';
import { handleResponse, rejectResponse, successResponse } from '../src/responseHandler';
import { checkTimeStamp, parseEvents, serializeParams, serializeForHashing, base64url } from '../src/utils';
import eventsArray from './eventsArray';
const Web3 = require('web3');

/* Declarations */
const expect = chai.expect;
const apiEndpoint = 'https://gateway-test.ambrosus.com';
const assetId = '0x525466324f178cef08e25cf69cffde9f149129e4ceddfaa19767bc29705cef56';
const eventId = '0x8663d7863dc5131d5ad6050d44ed625cd299b78d2ce289ffc95e63b1559c3f63';
const bundleId = '0xc455b6d08bbfc5d8c54a90ec390373ef251a727119a88d6d9c5703bd46c3cd4d';
let lib;
let lib1;

describe('Given an instance of my api library', () => {
  before(() => {
    lib = new AmbrosusSDK({
      apiEndpoint: apiEndpoint,
      Web3: Web3
    });
    lib1 = new AmbrosusSDK({
      apiEndpoint: apiEndpoint
    });
  });
  describe('see if library is initialised', () => {
    it('should return the apiEndpoint', () => {
      expect(lib._settings.apiEndpoint).to.be.equal(apiEndpoint);
    });
  });
});

describe('Assets', () => {
  /*
   * Test the /GET Asset endpoints
   */

  describe('/GET asset by ID', () => {
    it('it should GET specified asset the by correct id', (done) => {
      lib.getAssetById(assetId)
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    }).timeout(15000);
  });

  describe('/GET asset by ID', () => {
    it('it should throw Asset ID is missing error', (done) => {
      lib.getAssetById()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/GET asset not found (404) error', () => {
    it('it should give a 404 error', (done) => {
      lib.getAssetById({assetId: null})
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(404); done(); })
    }).timeout(15000);
  });

  describe('/GET assets by params', () => {
    it('it should get assets array based on query params', (done) => {
      const params = { createdBy: '0x9687a70513047dc6Ee966D69bD0C07FFb1102098', perPage: 1 };
      lib.getAssets(params)
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    }).timeout(15000);
  });

  describe('/GET assets by empty params', () => {
    it('it should get assets array', (done) => {
      lib.getAssets()
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    }).timeout(15000);
  });

  describe('/GET assets by params', () => {
    it('it should catch error due to wrong params', (done) => {
      const params = { createdBy: '0x9687a70513047 ... D69bD0C07FFb110209', perPage: 1 };
      lib.getAssets(params)
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('should serialize json', () => {
    it('it should return stringified JSON', (done) => {
      expect(serializeForHashing(eventsArray)).to.be.a('string');
      done();
    })
  });

  describe('should serialize json', () => {
    it('it should return single string (base64url)', (done) => {
      expect(base64url(serializeForHashing(eventsArray))).to.be.a('string');
      done();
    })
  });

});

describe('Events', () => {

  /*
   * Test the /GET Events endpoints
   */

  describe('/GET event by ID', () => {
    it('it should GET specified event the by correct id', (done) => {
      lib.getEventById(eventId)
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    }).timeout(15000);;
  });

  describe('/GET event by ID', () => {
    it('it should throw Event ID is missing error', (done) => {
      lib.getEventById()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/GET event not found (404) error', () => {
    it('it should give a 404 error when null eventId is passed', (done) => {
      lib.getEventById({eventId: null})
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(404); done(); })
    }).timeout(15000);;
  });

  describe('/GET events', () => {
    it('it should GET events based on query params', (done) => {
      const params = { createdBy: "0x9687a70513047dc6Ee966D69bD0C07FFb1102098", perPage: 1 }
      lib.getEvents(params)
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    }).timeout(15000);
  });

  describe('/GET events by params', () => {
    it('it should catch error due to wrong params', (done) => {
      const params = { createdBy: '0x9687a70513047 ... D69bD0C07FFb110209', perPage: 1 };
      lib.getEvents(params)
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/POST events for assetId', () => {
    it('it should throw Asset ID is missing error', (done) => {
      lib.createEvent()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/POST event for assetId', () => {
    it('it should throw Event data is missing error', (done) => {
      lib.createEvent(assetId)
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/POST event for assetId', () => {
    it('it should throw Invalid data: No content found at content.data error', (done) => {
      lib.createEvent(assetId, {content: null})
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

});

describe('Response Handler', () => {

  describe('rejectResponse should handle reject response', () => {
    it('it should return status === 400', (done) => {
      rejectResponse('Failure').status === 400;
      done();
    })
  });

  describe('successResponse should handle success response', () => {
    it('it should return status === 200', (done) => {
      successResponse({data: null}).status === 200;
      done();
    })
  });

  describe('responseHandler should handle failure response', () => {
    it('it should return status === 400', (done) => {
      const request = {
        status: 404,
        response: JSON.stringify({
          reason: "sample reason"
        })
      }
      handleResponse(request)
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(404); done(); })
    })
  });

  describe('responseHandler should handle success response', () => {
    it('it should return status === 200', (done) => {
      const request = {
        status: 200,
        response: JSON.stringify({
          data: null
        })
      }
      handleResponse(request)
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    })
  });

  describe('/GET bundle by ID', () => {
    it('it should GET specified bundle the by correct bundle id', (done) => {
      lib.getBundleById(bundleId)
        .then(response => { expect(response.status).to.equal(200); done(); })
        .catch(error => { done(error); })
    }).timeout(15000);
  });

  describe('/GET bundle by ID', () => {
    it('it should throw Bundle ID is missing error', (done) => {
      lib.getBundleById()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

});


describe('Utils.js', () => {

  describe('should check the timestamp', () => {
    it('it should return current timestamp', (done) => {
      expect(checkTimeStamp({data: null})).to.be.a('number');
      done();
    })
  });

  describe('should check the provided timestamp', () => {
    it('it should return the provided timestamp', (done) => {
      const data = {
        content: {
          idData: {
            timestamp: 1496250888
          }
        }
      };
      expect(checkTimeStamp(data)).to.equal(1496250888);
      done();
    })
  })

  describe('should parse events', () => {
    it('it should return the parsed events obj', (done) => {
      expect(parseEvents(eventsArray)).to.be.a('object');
      done();
    })
  })

  describe('should parse events', () => {
    it('it should return the parsed events obj', (done) => {
      lib.parseEvents(eventsArray)
        .then(response => { expect(response.status).equal(200); done(); })
        .catch(error => { done(error); })
    })
  })
  
  describe('should parse events', () => {
    it('it should throw Results array is missing error', (done) => {
      lib.parseEvents()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    })
  })

  describe('should serialize json', () => {
    it('it should return serialized params', (done) => {
      expect(serializeParams(eventsArray)).to.be.a('string');
      done();
    })
  })

});


describe('web3.js validations', () => {

  describe('/GET token', () => {
    it('it should throw web3.js required error', (done) => {
      const token = lib1.getToken();
      expect(token.status).to.equal(400); done();
    });
  });

  describe('/GET address from secret', () => {
    it('it should throw web3.js required error', (done) => {
      const token = lib1.getAddress();
      expect(token.status).to.equal(400); done();
    });
  });

  describe('/GET sign transaction', () => {
    it('it should throw web3.js required error', (done) => {
      const token = lib1.sign();
      expect(token.status).to.equal(400); done();
    });
  });

  describe('/POST create asset', () => {
    it('it should throw web3.js required error', (done) => {
      lib1.createAsset()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/POST create event', () => {
    it('it should throw web3.js required error', (done) => {
      lib1.createEvent()
        .then(response => { done(response); })
        .catch(error => { expect(error.status).to.equal(400); done(); })
    }).timeout(15000);
  });

  describe('/GET publicKey & privateKey pair ', () => {
    it('it should throw web3.js required error', (done) => {
      const response = lib1.getPkPair();
      expect(response.status).to.equal(400); done();
    });
  });

  describe('/GET publicKey & privateKey pair ', () => {
    it('it should provide a pk pair', (done) => {
      const response = lib.getPkPair();
      expect(response.address).to.be.a('string'); done();
    });
  });

});
