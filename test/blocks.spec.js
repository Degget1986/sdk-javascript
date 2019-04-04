describe('Blocks', () => {
    describe('get block', () => {
        it('It should return block when block number and RPC url is provided', (done) => {
            lib3.blocks.getBlock(2019).then(block => {
                expect(block).to.be.a('object');
                done();
            }).catch(err => done(err));
        });

        it('It should return error when there is no RPC url', (done) => {
            lib2.blocks.getBlock(2019).then(block => done(block))
                .catch(err => {
                    expect(err.status).to.be.equal(400);
                    done();
                });
        });

        it('It should return error when no block number is provided', (done) => {
            lib3.blocks.getBlock().then(block => done(block))
                .catch(err => {
                    expect(err.status).to.be.equal(400);
                    done();
                });
        });
    });

    describe('get latest block', () => {
        it('It should return latest block when RPC URL is provided', (done) => {
            lib3.blocks.getLatestBlock().then(block => {
                expect(block).to.be.a('object');
                done();
            }).catch(err => done(err));
        });

        it('It should return error when RPC url is not prodvided', (done) => {
            lib2.blocks.getBlock().then(block => done(block))
                .catch(err => {
                    expect(err.status).to.be.equal(400);
                    done();
                });
        });
    });
});
