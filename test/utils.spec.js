import { checkTimeStamp, parseEvents, serializeParams, serializeForHashing, base64url } from '../src/utils';

describe('Utils.js', () => {

    describe('Timestamp', () => {

        describe('should check the timestamp: pass data as null', () => {
            it('it should return current timestamp', (done) => {
                expect(checkTimeStamp({ data: null })).to.be.a('number');
                done();
            });
        });

        describe('should check timestamp: pass a valid numeric timestamp', () => {
            it('it should return the provided timestamp', (done) => {
                const data = { content: { idData: { timestamp: 1496250888 } } };
                expect(checkTimeStamp(data)).to.equal(1496250888);
                done();
            });
        });

        describe('should check the provided timestamp: pass a random string as timestamp', () => {
            it('it should return the current timestamp', (done) => {
                const data = { content: { idData: { timestamp: 'somethingstringy' } } };
                expect(checkTimeStamp(data)).to.be.a('number');
                done();
            });
        });
    });

    describe('Parse Events', () => {

        describe('should parse events: pass legit eventsArray', () => {
            it('it should return the parsed events obj', (done) => {
                lib.parseEvents(eventsArray)
                    .then(response => { expect(response.status).equal(200); done(); })
                    .catch(error => { done(error); })
            });
        });

        describe('should parse events: without any parameters', () => {
            it('it should throw events array is missing error', (done) => {
                lib.parseEvents()
                    .then(response => { done(response); })
                    .catch(error => { expect(error.status).to.equal(400); done(); })
            });
        });

        describe('should parse events: pass numeric value', () => {
            it('it should throw events array is missing error', (done) => {
                lib.parseEvents(1234)
                    .then(response => { done(response); })
                    .catch(error => { expect(error.status).to.equal(400); done(); })
            });
        });

        describe('should parse events', () => {
            it('it should return the parsed events obj', (done) => {
                expect(parseEvents(eventsArray)).to.be.a('object');
                done();
            });
        });
    });

    describe('Serialize', () => {

        describe('should serialize json: pass a legit json obj', () => {
            it('it should return serialized params', (done) => {
                expect(serializeParams(eventsArray)).to.be.a('string');
                done();
            });
        });

        describe('should serialize json: pass a string', () => {
            it('it should return stringified input', (done) => {
                expect(serializeForHashing('eventsArray')).to.be.a('string');
                done();
            });
        });

        describe('should serialize json: pass a number', () => {
            it('it should return stringified input', (done) => {
                expect(serializeForHashing(1234)).to.be.a('string');
                done();
            });
        });
        
        describe('should serialize json', () => {
            it('it should return single string (base64url)', (done) => {
            expect(base64url(serializeForHashing(eventsArray))).to.be.a('string');
            done();
            });
        });
    });

    describe('Miscellaneous', () => {
        
        describe('/GET bundle by ID', () => {
            it('it should throw Bundle ID is missing error', (done) => {
                lib.getBundleById()
                    .then(response => { done(response); })
                    .catch(error => { expect(error.status).to.equal(400); done(); })
            }).timeout(15000);
        });

        describe('/SET token as header', () => {
            it('it should set the token as header given that sdk is initialized with web3', (done) => {
                lib.setTokenHeader(randomSecret);
                expect(lib._settings.headers.Authorization).to.be.a('string'); done();
            }).timeout(15000);
        });

        describe('/SET token as header: without passing secret in method call', () => {
            it('it should set the token as header given that sdk is initialized with web3 & secret', (done) => {
                lib2.setTokenHeader();
                expect(lib2._settings.headers.Authorization).to.be.a('string'); done();
            }).timeout(15000);
        });

        describe('/SET token as header', () => {
            it('it should throw web3 is required error', (done) => {
                const response = lib1.setTokenHeader(randomSecret);
                expect(response.status).to.equal(400); done();
            }).timeout(15000);
        });
    });

});
