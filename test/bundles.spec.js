describe('Bundles', () => {
    describe('/GET bundle by ID', () => {
        it('it should GET specified bundle with the provided ID', (done) => {
            lib.bundles.getBundle('0x2b512565ccdd3affb889babfe4a5b47ac2b5084e8de608f5b8d8a0e62aadce51')
                .then(response => {
                    expect(response.status).to.equal(200);
                    done();
                }).catch(err => {
                    done(err);
                });
        }).timeout(15000);

        it('it should GET specified bundle with the provided object property', (done) => {
            lib.bundles.getBundle({
                bundleId: '0x2b512565ccdd3affb889babfe4a5b47ac2b5084e8de608f5b8d8a0e62aadce51'
            }).then(response => {
                expect(response.status).to.equal(200);
                done();
            }).catch(err => {
                done(err);
            });
        }).timeout(15000);

        it('it should throw error bundleID is missing', (done) => {
            lib.bundles.getBundle().then(response => {
                done(response);
            }).catch(err => {
                expect(err.status).to.equal(400);
                done();
            });
        }).timeout(15000);

        it('it should throw bundle not found with wrong bundleId(string)', (done) => {
            lib.bundles.getBundle('sdf').then(response => {
                done(response);
            }).catch(err => {
                expect(err.status).to.equal(404);
                done();
            });
        }).timeout(15000);

        it('it should throw bundle not found with wrong bundleId(number)', (done) => {
            lib.bundles.getBundle(232).then(response => {
                done(response);
            }).catch(err => {
                expect(err.status).to.equal(404);
                done();
            });
        }).timeout(15000);
    });
});
