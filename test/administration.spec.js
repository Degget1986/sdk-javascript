describe('Administration', () => {

    describe('/POST add account ', () => {
        it('it should throw secret is missing error', (done) => {
            lib.addAccount()
                .then(response => {
                    done(response);
                })
                .catch(error => {
                    expect(error.status).to.equal(400);
                    done();
                })
        }).timeout(15000);
    });

});
