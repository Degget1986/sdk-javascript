describe('service.js', () => {
    describe('/GET token', () => {
        it('it should generate the token given that SDK is initilized with a secret', (done) => {
            expect(lib2.service.getToken()).to.be.a('string');
            done();
        });
    });

    describe('/GET token', () => {
        it('it should generate the token given that the secret is passed in the method call', (done) => {
            expect(lib.service.getToken(randomSecret)).to.be.a('string');
            done();
        });
    });

    describe('/GET address', () => {
        it('it should get the address given that SDK is initilized with a secret', (done) => {
            expect(lib2.service.getAddress()).to.be.a('string');
            done();
        });
    });

    describe('/GET address', () => {
        it('it should get the address given that the secret is passed in the method call', (done) => {
            expect(lib.service.getAddress(randomSecret)).to.be.a('string');
            done();
        });
    });

    describe('/GET signature', () => {
        it('it should get the signature given that SDK is initilized with a secret', (done) => {
            expect(lib2.service.sign({ data: 'randomData' })).to.be.a('string');
            done();
        });
    });

    describe('/GET signature', () => {
        it('it should generate the signature given that the secret is passed in the method call', (done) => {
            expect(lib.service.sign({ data: 'randomData' }, randomSecret)).to.be.a('string');
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a address', (done) => {
            expect(lib.service.getPkPair().address).to.be.a('string');
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a secret', (done) => {
            expect(lib.service.getPkPair().privateKey).to.be.a('string');
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a address', (done) => {
            expect(lib2.service.getPkPair().address).to.be.a('string');
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a secret', (done) => {
            expect(lib2.service.getPkPair().privateKey).to.be.a('string');
            done();
        });
    });
});
