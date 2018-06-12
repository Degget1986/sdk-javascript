/* global describe, it, before */

/* Imports */
import chai from 'chai';
import {
  config
} from '../lib/ambrosus';
import request from 'request';

/* Declarations */
const expect = chai.expect;
const apiEndpoint = 'https://gateway-test.ambrosus.com';
const assetId = '0x525466324f178cef08e25cf69cffde9f149129e4ceddfaa19767bc29705cef56';
const eventId = '0x8663d7863dc5131d5ad6050d44ed625cd299b78d2ce289ffc95e63b1559c3f63';
let lib;

describe('Given an instance of my api library', () => {
  before(() => {
    lib = new config({
      apiEndpoint: apiEndpoint
    });
  });
  describe('see if library is initialised', () => {
    it('should return the name', () => {
      expect(lib.name).to.be.equal('api');
    });
  });
});

describe('Assets', () => {
  /*
   * Test the /GET Asset endpoints
   */
  describe('/GET asset by ID', () => {
    it('it should GET specified asset the by correct id', (done) => {
      request.get(`${apiEndpoint}/assets/${assetId}`, (err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    }).timeout(15000);
  });


  describe('/GET asset not found (404) error', () => {
    it('it should give a 404 error', (done) => {
      request.get(`${apiEndpoint}/assets/null`, (err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    }).timeout(15000);;
  });

});

describe('Events', () => {
  /*
   * Test the /GET Events endpoints
   */
  describe('/GET event by ID', () => {
    it('it should GET specified event the by correct id', (done) => {
      request.get(`${apiEndpoint}/events/${eventId}`, (err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    }).timeout(15000);;
  });


  describe('/GET event not found (404) error', () => {
    it('it should give a 404 error', (done) => {
      request.get(`${apiEndpoint}/events/null`, (err, res) => {
        expect(res.statusCode).to.equal(404);
        done();
      });
    }).timeout(15000);;
  });

  describe('/GET events', () => {
    it('it should GET events', (done) => {
      request.get(`${apiEndpoint}/events/`, (err, res) => {
        expect(res.statusCode).to.equal(200);
        done();
      });
    }).timeout(15000);;
  });

});
