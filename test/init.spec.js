describe('Given an instance of my api library', () => {
    before(() => {
        lib = new AmbrosusSDK({ apiEndpoint: apiEndpoint, Web3: Web3 });
        lib1 = new AmbrosusSDK({ apiEndpoint: apiEndpoint });
    });

    describe('see if library is initialised', () => {
        it('should return the apiEndpoint', () => {
            expect(lib._settings.apiEndpoint).to.be.equal(apiEndpoint);
        });
    });

    describe('see if library is initialised', () => {
        it('should return the apiEndpoint', () => {
            expect(lib1._settings.apiEndpoint).to.be.equal(apiEndpoint);
        });
    });

    describe('see if library initializes with a random key value pair', () => {
        it('should initalize with randomKey and randomString', () => {
            const randomKey = 'randomString';
            const aSDK = new AmbrosusSDK({ randomKey });
            expect(aSDK._settings.randomKey).to.be.equal('randomString');
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

    describe('initialize the sdk with no settings or parameters', () => {
        it('should initialize the sdk', () => {
            const aSDK = new AmbrosusSDK();
            expect(aSDK._settings.apiEndpoint).to.be.equal(apiEndpoint);
        });
    });

    describe('initialize the sdk with random secret and web3', () => {
        it('see if address is generated', () => {
            const aSDK = new AmbrosusSDK({ Web3: Web3, secret: randomSecret });
            const address = aSDK.getAddress(randomSecret);
            expect(aSDK._settings.address).to.be.equal(address);
        });
    });

    describe('initialize the sdk with random secret and web3', () => {
        it('see if token is generated', () => {
            const aSDK = new AmbrosusSDK({ Web3: Web3, secret: randomSecret });
            const token = aSDK.getToken(randomSecret);
            expect(aSDK._settings.token).to.be.equal(token);
        });
    });
});
