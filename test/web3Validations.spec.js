describe('web3.js', () => {

    describe('/GET token', () => {
        it('it should throw web3.js required error', (done) => {
            expect(lib1.getToken().status).to.equal(400);
            done();
        });
    });

    describe('/GET token', () => {
        it('it should generate the token given that SDK is initilized with a secret', (done) => {
            expect(lib2.getToken()).to.be.a('string');
            done();
        });
    });

    describe('/GET token', () => {
        it('it should generate the token given that the secret is passed in the method call', (done) => {
            expect(lib.getToken(randomSecret)).to.be.a('string');
            done();
        });
    });

    describe('/GET address', () => {
        it('it should throw web3.js required error', (done) => {
            expect(lib1.getAddress().status).to.equal(400);
            done();
        });
    });

    describe('/GET address', () => {
        it('it should get the address given that SDK is initilized with a secret', (done) => {
            expect(lib2.getAddress()).to.be.a('string');
            done();
        });
    });

    describe('/GET address', () => {
        it('it should get the address given that the secret is passed in the method call', (done) => {
            expect(lib.getAddress(randomSecret)).to.be.a('string');
            done();
        });
    });

    describe('/GET signature', () => {
        it('it should throw web3.js required error', (done) => {
            expect(lib1.sign().status).to.equal(400);
            done();
        });
    });

    describe('/GET signature', () => {
        it('it should get the signature given that SDK is initilized with a secret', (done) => {
            expect(lib2.sign({data: 'randomData'})).to.be.a('string');
            done();
        });
    });

    describe('/GET signature', () => {
        it('it should generate the signature given that the secret is passed in the method call', (done) => {
            expect(lib.sign({data: 'randomData'}, randomSecret)).to.be.a('string');
            done();
        });
    });

    describe('/POST create asset', () => {
        it('it should throw web3.js required error', (done) => {
            lib1.createAsset()
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('/POST create event', () => {
        it('it should throw web3.js required error', (done) => {
            lib1.createEvent()
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); })
        }).timeout(15000);
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should throw web3.js required error', (done) => {
            expect(lib1.getPkPair().status).to.equal(400);
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a address', (done) => {
            expect(lib.getPkPair().address).to.be.a('string');
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a secret', (done) => {
            expect(lib.getPkPair().privateKey).to.be.a('string');
            done();
        });
    });

});
