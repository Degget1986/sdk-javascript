describe('web3.js validations', () => {

    describe('/GET token', () => {
        it('it should throw web3.js required error', (done) => {
            const token = lib1.getToken();
            expect(token.status).to.equal(400);
            done();
        });
    });

    describe('/GET address from secret', () => {
        it('it should throw web3.js required error', (done) => {
            const token = lib1.getAddress();
            expect(token.status).to.equal(400);
            done();
        });
    });

    describe('/GET sign transaction', () => {
        it('it should throw web3.js required error', (done) => {
            const token = lib1.sign();
            expect(token.status).to.equal(400);
            done();
        });
    });

    describe('/POST create asset', () => {
        it('it should throw web3.js required error', (done) => {
            lib1.createAsset()
                .then(response => {
                    done(response);
                })
                .catch(error => {
                    expect(error.status).to.equal(400);
                    done();
                })
        }).timeout(15000);
    });

    describe('/POST create event', () => {
        it('it should throw web3.js required error', (done) => {
            lib1.createEvent()
                .then(response => {
                    done(response);
                })
                .catch(error => {
                    expect(error.status).to.equal(400);
                    done();
                })
        }).timeout(15000);
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should throw web3.js required error', (done) => {
            const response = lib1.getPkPair();
            expect(response.status).to.equal(400);
            done();
        });
    });

    describe('/GET publicKey & privateKey pair ', () => {
        it('it should provide a pk pair', (done) => {
            const response = lib.getPkPair();
            expect(response.address).to.be.a('string');
            done();
        });
    });

});