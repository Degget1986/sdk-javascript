describe('Assets', () => {
    describe('/GET asset by ID', () => {
        it('it should GET specified asset the by correct id', (done) => {
            lib.assets.getAsset(assetId).then(response => {
                expect(response.status).to.equal(200);
                done();
            }).catch(error => {
                done(error);
            });
        }).timeout(15000);
    });

    describe('/GET asset by ID: Pass assetId as property', () => {
        it('it should GET specified asset the by correct id', (done) => {
            lib.assets.getAsset({
                assetId
            }).then(response => {
                expect(response.status).to.equal(200);
                done();
            }).catch(error => {
                done(error);
            });
        }).timeout(15000);
    });

    describe('/GET asset by ID: Pass empty parameter', () => {
        it('it should throw Asset ID is missing error', (done) => {
            lib.assets.getAsset().then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(400);
                done();
            });
        }).timeout(15000);
    });

    describe('/GET asset by ID: Pass assetId as a number', () => {
        it('it should throw Asset ID not found error (404)', (done) => {
            lib.assets.getAsset(123).then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(404);
                done();
            });
        }).timeout(15000);
    });

    describe('/GET asset by ID: Pass assetId as string', () => {
        it('it should throw Asset ID not found error (404)', (done) => {
            lib.assets.getAsset('123').then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(404);
                done();
            });
        }).timeout(15000);
    });

    describe('/GET asset by ID: Pass assetId as null value', () => {
        it('it should throw Asset ID not found error (404)', (done) => {
            lib.assets.getAsset({
                assetId: null
            }).then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(404);
                done();
            });
        }).timeout(15000);
    });

    describe('/GET assets', () => {
        it('it should get assets when passing no params', (done) => {
            lib.assets.getAssets().then(response => {
                expect(response.status).to.equal(200);
                done();
            }).catch(error => {
                done(error);
            });
        }).timeout(15000);
    });

    describe('/GET assets by params: Pass legit values', () => {
        it('it should get assets array based on query params', (done) => {
            const params = {
                createdBy: '0x9687a70513047dc6Ee966D69bD0C07FFb1102098',
                perPage: 1
            };
            lib.assets.getAssets(params).then(response => {
                expect(response.status).to.equal(200);
                done();
            }).catch(error => {
                done(error);
            });
        }).timeout(15000);
    });

    describe('/GET assets by params: Pass incorrect parameter values', () => {
        it('it should catch error due to wrong params', (done) => {
            const params = {
                createdBy: '0x9687a70513047 ... D69bD0C07FFb110209',
                perPage: 1
            };
            lib.assets.getAssets(params).then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(400);
                done();
            });
        }).timeout(15000);
    });

    describe('/GET assets by params: Pass incorrect parameters keys', () => {
        it('it should catch error due to wrong params', (done) => {
            const params = {
                irrelevantKey: 1
            };
            lib.assets.getAssets(params).then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(400);
                done();
            });
        }).timeout(15000);
    });

    describe('/GET assets by params: Pass a string instead of json object', () => {
        it('it should catch error due to no parameters', (done) => {
            const params = 'assetId';
            lib.assets.getAssets(params).then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(400);
                done();
            });
        }).timeout(15000);
    });

    describe('/POST create empty asset', () => {
        it('it should create an empty asset', (done) => {
            lib2.assets.createAsset().then(response => {
                expect(response.status).to.equal(201);
                done();
            }).catch((error) => {
                done(error);
            });
        }).timeout(15000);
    });

    describe('/POST create asset and bulk events: pass a legit json object', () => {
        it('it should create a new asset', (done) => {
            lib2.assets.createAsset(chocolateJson).then(response => {
                expect(error.status).to.equal(201);
                done(response);
            }).catch(() => {
                done();
            });
        }).timeout(15000);
    });

    describe('/POST create asset and bulk events: pass a random string', () => {
        it('it should throw (400) error, asset should be an object', (done) => {
            lib2.assets.createAsset('randomString').then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(400);
                done();
            });
        }).timeout(15000);
    });

    describe('/POST create asset and bulk events: pass a number', () => {
        it('it should throw (400) error', (done) => {
            lib2.assets.createAsset(1234).then(response => {
                done(response);
            }).catch(error => {
                expect(error.status).to.equal(400);
                done();
            });
        }).timeout(15000);
    });
});
