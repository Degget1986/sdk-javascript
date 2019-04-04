describe('service.js', () => {
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
            expect(lib2.service.sign({
                data: 'randomData'
            })).to.be.a('string');
            done();
        });
    });

    describe('/GET signature', () => {
        it('it should generate the signature given that the secret is passed in the method call', (done) => {
            expect(lib.service.sign({
                data: 'randomData'
            }, randomSecret)).to.be.a('string');
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

    describe('Encrypt the privateKey', () => {
        it('it should encrypt the provided private key', (done) => {
            expect(lib2.service.encryptPrivateKey('testToken')).to.be.a('object');
            done();
        });
    });

    describe('Decrypt the privateKey', () => {
        it('it should decrypt the private key with the correct tokken', (done) => {
            const encryptedKey = lib2.service.encryptPrivateKey('testToken', randomSecret);
            const decryptedKey = lib2.service.decryptPrivateKey(encryptedKey, 'testToken');
            expect(decryptedKey[1]).to.be.equal(randomSecret);
            done();
        });

        it('it should not decrypt the private key if passed wrong value', (done) => {
            const encryptedKey = lib2.service.encryptPrivateKey('testToken', randomSecret);
            const decryptedKey = lib2.service.decryptPrivateKey(encryptedKey, 'wrongToken');
            expect(decryptedKey[1]).to.be.equal(undefined);
            done();
        });
    });

    describe('Verify the events', () => {
        it('it should verify the right event', (done) => {
            lib2.service.verifyEvents('0x52933fb3cc270a214ae304285582ad472413bd0b145110de53bd76a9c1193f66')
                .then(response => {
                    expect(response.flag).to.be.equal(true);
                    done();
                }).catch(err => {
                    done(err);
                });
        });

        it('it should return error 400 for no eventId', (done) => {
            lib2.service.verifyEvents()
                .then(response => {
                    done(response);
                }).catch(err => {
                    expect(err.status).to.be.equal(400);
                    done();
                });
        });

        it('it should return error 404 for wrong eventId', (done) => {
            lib2.service.verifyEvents('df')
                .then(response => {
                    done(response);
                }).catch(err => {
                    expect(err.status).to.be.equal(404);
                    done();
                });
        });
    });
});
