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
