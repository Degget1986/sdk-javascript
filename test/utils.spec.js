import { checkTimeStamp, parseEvents, serializeParams, serializeForHashing, base64url } from '../src/utils';

describe('Utils.js', () => {

    describe('should check the timestamp', () => {
        it('it should return current timestamp', (done) => {
            expect(checkTimeStamp({
                data: null
            })).to.be.a('number');
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
                .then(response => {
                    expect(response.status).equal(200);
                    done();
                })
                .catch(error => {
                    done(error);
                })
        })
    })

    describe('should parse events', () => {
        it('it should throw Results array is missing error', (done) => {
            lib.parseEvents()
                .then(response => {
                    done(response);
                })
                .catch(error => {
                    expect(error.status).to.equal(400);
                    done();
                })
        })
    })

    describe('should serialize json', () => {
        it('it should return serialized params', (done) => {
            expect(serializeParams(eventsArray)).to.be.a('string');
            done();
        })
    })

      
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