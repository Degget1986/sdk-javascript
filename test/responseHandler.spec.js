import { handleResponse, rejectResponse, successResponse } from '../src/responseHandler';

describe('Response Handler', () => {
    describe('rejectResponse should handle reject response', () => {
        it('it should return status === 400', (done) => {
            rejectResponse('Failure').status === 400;
            done();
        });
    });

    describe('successResponse should handle success response', () => {
        it('it should return status === 200', (done) => {
            successResponse({ data: null }).status === 200;
            done();
        });
    });

    describe('responseHandler should handle failure response', () => {
        it('it should return status === 400', (done) => {
            const request = {
                status: 404,
                response: JSON.stringify({ reason: 'sample reason' })
            };
            handleResponse(request)
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(404); done(); });
        });
    });

    describe('responseHandler should handle success response', () => {
        it('it should return status === 200', (done) => {
            const request = {
                status: 200,
                response: JSON.stringify({ data: null })
            };
            handleResponse(request)
                .then(response => { expect(response.status).to.equal(200); done(); })
                .catch(error => { done(error); });
        });
    });
});
