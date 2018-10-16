describe('Events', () => {

    /*
     * Test the /GET Events endpoints
     */

    describe('/GET event by ID: Pass correct eventId', () => {
        it('it should GET specified event the by correct id', (done) => {
            lib.getEventById(eventId)
                .then(response => { expect(response.status).to.equal(200); done(); })
                .catch(error => { done(error); })
        }).timeout(15000);
    });

    describe('/GET event by ID: Pass empty parameter', () => {
        it('it should throw Event ID is missing error', (done) => {
            lib.getEventById()
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('/GET event not found (404) error: Pass eventId as null', () => {
        it('it should give a 404 error when null eventId is passed', (done) => {
            lib.getEventById({ eventId: null})
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(404); done(); })
        }).timeout(15000);
    });

    describe('/GET events: Pass legit values', () => {
        it('it should GET events based on query params', (done) => {
            const params = { createdBy: "0x9687a70513047dc6Ee966D69bD0C07FFb1102098", perPage: 1 };
            lib.getEvents(params)
                .then(response => { expect(response.status).to.equal(200); done(); })
                .catch(error => { done(error); })
        }).timeout(15000);
    });

    describe('/GET events by params: Pass incorrect values', () => {
        it('it should catch error due to wrong param values', (done) => {
            const params = { createdBy: '0x9687a70513047 ... D69bD0C07FFb110209', perPage: 1 };
            lib.getEvents(params)
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('/POST events for assetId: Pass empty assetId', () => {
        it('it should throw Asset ID is missing error', (done) => {
            lib.createEvent()
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('/POST event for assetId: Pass empty event data', () => {
        it('it should throw Event data is missing error', (done) => {
            lib.createEvent(assetId)
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('/POST event for assetId: Pass content.data as null', () => {
        it('it should throw Invalid data: No content found at content.data error', (done) => {
            lib.createEvent(assetId, { content: null })
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('should parse events: Pass legit eventsArray', () => {
        it('it should return the parsed events obj successfully', (done) => {
            lib.parseEvents(eventsArray)
                .then(response => { expect(response).to.be.a('object'); done(); })
                .catch(error => { done(error); })
        }).timeout(15000);
    });

    describe('should parse events: Pass empty obj', () => {
        it('it should return error due to empty event', (done) => {
            lib.parseEvents({})
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('should parse events: Pass random number', () => {
        it('it should return error due to number input', (done) => {
            lib.parseEvents(123)
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('should parse events: Pass a string', () => {
        it('it should return error due to string input', (done) => {
            lib.parseEvents('123')
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

});
