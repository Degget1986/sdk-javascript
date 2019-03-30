describe('Given an instance of my api library', () => {
    describe('see if library is initialised', () => {
        it('Should have all properties', () => {
            expect(Object.keys(lib)).to.have.members(['_settings', 'service', 'accounts', 'assets', 'events']);
        });
    });

    describe('see if library is initialised with private key', () => {
        it('_settings object should contain token property', () => {
            expect(Object.keys(lib2._settings)).to.have.members(['secret', 'address', 'apiEndpoint', 'token', 'headers']);
            expect(lib2._settings.headers).to.have.property('Authorization');
        });
    });

    describe('pass a string while initializing the sdk', () => {
        it('should return an error', () => {
            const aSDK = new AmbrosusSDK('randomString');
            expect(aSDK.status).to.equal(400);
        });
    });

    describe('pass a number while initializing the sdk', () => {
        it('should return an error', () => {
            const aSDK = new AmbrosusSDK(1234);
            expect(aSDK.status).to.equal(400);
        });
    });

    describe('initialize the sdk with random secret', () => {
        it('see if address and token is auto generated inside settings', () => {
            const aSDK = new AmbrosusSDK({ secret: randomSecret });
            const address = aSDK.service.getAddress(randomSecret);
            expect(aSDK._settings.address).to.be.equal(address);
            const token = aSDK.service.getApiToken(randomSecret);
            expect(aSDK._settings.token).to.be.equal(token);
        });
    });
});
