import utils from '../src/utils';

describe('Utils.js', () => {
    describe('Timestamp', () => {
        describe('should check the timestamp: pass data as null', () => {
            it('it should return current timestamp', done => {
                expect(utils.checkTimeStamp({ data: null })).to.be.a('number');
                done();
            });
        });

        describe('should check timestamp: pass a valid numeric timestamp', () => {
            it('it should return the provided timestamp', done => {
                const data = { content: { idData: { timestamp: 1496250888 } } };
                expect(utils.checkTimeStamp(data)).to.equal(1496250888);
                done();
            });
        });

        describe('should check the provided timestamp: pass a random string as timestamp', () => {
            it('it should return the current timestamp', done => {
                const data = { content: { idData: { timestamp: 'somethingstringy' } } };
                expect(utils.checkTimeStamp(data)).to.be.a('number');
                done();
            });
        });
    });

    describe('Parse Events', () => {
        describe('should parse events: pass legit eventsArray', () => {
            it('it should return the parsed events obj', done => {
                lib.events
                    .parseEvents(eventsArray)
                    .then(response => {
                        expect(response.status).equal(200);
                        done();
                    })
                    .catch(error => {
                        done(error);
                    });
            });
        });

        describe('should parse events: without any parameters', () => {
            it('it should throw events array is missing error', done => {
                lib.events
                    .parseEvents()
                    .then(response => {
                        done(response);
                    })
                    .catch(error => {
                        expect(error.status).to.equal(400);
                        done();
                    });
            });
        });

        describe('should parse events: pass numeric value', () => {
            it('it should throw events array is missing error', done => {
                lib.events
                    .parseEvents(1234)
                    .then(response => {
                        done(response);
                    })
                    .catch(error => {
                        expect(error.status).to.equal(400);
                        done();
                    });
            });
        });

        describe('should parse events', () => {
            it('it should return the parsed events obj', done => {
                expect(utils.parseEvents(eventsArray)).to.be.a('object');
                done();
            });
        });
    });

    describe('Serialize', () => {
        describe('should serialize json: pass a legit json obj', () => {
            it('it should return serialized params', done => {
                expect(utils.serializeParams(eventsArray)).to.be.a('string');
                done();
            });
        });

        describe('should serialize json: pass a string', () => {
            it('it should return stringified input', done => {
                expect(utils.serializeForHashing('eventsArray')).to.be.a('string');
                done();
            });
        });

        describe('should serialize json: pass a number', () => {
            it('it should return stringified input', done => {
                expect(utils.serializeForHashing(1234)).to.be.a('string');
                done();
            });
        });

        describe('should serialize json', () => {
            it('it should return single string (base64url)', done => {
                expect(utils.base64url(utils.serializeForHashing(eventsArray))).to.be.a(
                    'string'
                );
                done();
            });
        });
    });

    describe('check if passed data is object', () => {
        it('it should return true', () => {
            expect(utils.isObject({ hello: 'hi' })).to.be.true;
        });
        it('it should return false', () => {
            expect(utils.isObject(['hi'])).to.be.false;
        });
    });

    describe('check if timestamp is valid', () => {
        it('it should return true for valid timestamp', () => {
            expect(utils.validTimestamp('December 17, 1995 03:24:00')).to.be.true;
        });
        it('it should return false or invalid timestamp', () => {
            expect(utils.validTimestamp('hello')).to.be.false;
        });
    });

    describe('check access level of the event', () => {
        it('it should return access level 0', () => {
            expect(
                utils.checkAccessLevel({ content: { idData: { accessLevel: 0 } } })
            ).to.equal(0);
        });
        it('it should return access level 0 for provided event', () => {
            expect(utils.checkAccessLevel(eventsArray.results[0])).to.equal(0);
        });
    });

    describe('check for image URL', () => {
        it('it should return the image URL from the event', () => {
            expect(utils.getImage(eventsArray.results[0].content.data[0])).to.equal(
                ''
            );
            expect(utils.getImage(eventsArray.results[8].content.data[0])).to.equal(
                'https://madecasse.com/wp-content/uploads/2016/10/92-dark-chocolate-hero-2.jpg'
            );
        });
    });

    describe('check for event location', () => {
        it('it should return the location', () => {
            const locationObj = {
                location: {
                    name: 'Waitrose, Brunswick Centre',
                    city: 'London',
                    country: 'UK',
                    locationId: '809c578721b74cae1d56504594819285',
                    GLN: 9501101530003
                }
            };
            const location = utils.getLocation(locationObj);
            expect(location).to.equal('London, UK, Waitrose, Brunswick Centre');
        });
        it('it should return no location', () => {
            expect(utils.getLocation({})).to.equal('No place attached');
        });
    });

    describe('Get type and name of the event', () => {
        it('it should return name and type of the event', () => {
            expect(utils.getName(eventsArray.results[0].content.data[0])).to.equal(
                'Arrived at Customs'
            );
        });
        it('it should return no title', () => {
            expect(utils.getName({})).to.equal('No title');
        });
    });

    describe('Time Utils', () => {
        it('It should return date from the provided date', () => {
            const date = new Date();
            date.setDate(date.getHours() - 2);
            expect(utils.timeSince(date)).to.be.ok;
        });

        it('It should return true for valid date', () => {
            expect(utils.validTimestamp(new Date())).to.be.ok;
        });
    });

    describe('Calculate the hash', () => {
        it('it should calculate the hash for the data', done => {
            const hash = utils.calculateHash('test data');
            expect(hash).to.be.a('string');
            done();
        });

        it('it should throw error if no data provided', done => {
            const hash = utils.calculateHash();
            expect(hash.status).to.be.equal(400);
            done();
        });
    });
});
