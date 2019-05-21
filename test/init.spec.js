describe('Given an instance of my api library', () => {
    describe('see if library is initialised', () => {
        it('Should have all properties', () => {
            expect(Object.keys(lib)).to.have.members([
                'web3',
                '_settings',
                'assets',
                'events',
                'accounts',
                'bundles',
                'transactions',
                'blocks',
                'service',
                'contracts'
            ]);
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

    describe('/GET token', () => {
        it('it should generate the token given that SDK is initilized with a secret', done => {
            expect(lib2.getApiToken()).to.be.a('string');
            done();
        });
    });

    describe('initialize the sdk with random secret', () => {
        it('see if address and token is auto generated inside settings', () => {
            const aSDK = new AmbrosusSDK({
                secret: randomSecret
            });
            const address = aSDK.service.getAddress(randomSecret);
            expect(aSDK._settings.address).to.be.equal(address);
            const token = aSDK.getApiToken(randomSecret);
            expect(aSDK._settings.token).to.be.equal(token);
        });
    });
});
