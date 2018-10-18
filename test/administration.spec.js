describe('Administration', () => {

    describe('/POST add account ', () => {
        it('it should throw secret is missing error', (done) => {
            lib.addAccount()
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(400); done(); });
        }).timeout(15000);
    });

    describe('/POST add account: Initialize library with secret', () => {
        it('it should throw permission denied (403) error', (done) => {
            lib2.addAccount({})
                .then(response => { done(response); })
                .catch(error => { expect(error.status).to.equal(403); done(); });
        }).timeout(15000);
    });

});
