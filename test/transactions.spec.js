describe('Transactions', () => {
    describe('Get the balance', () => {
        it('It should return the balance when the secret key and RPC URL is provided', (done) => {
            lib3.transactions.getBalance().then(balance => {
                expect(balance).to.be.a('string');
                done();
            }).catch(err => done(err));
        });

        it('It should return the balance when address is provided', (done) => {
            lib3.transactions.getBalance('0x344A89A8837AA647870778a72FFb731C671010B6').then(balance => {
                expect(balance).to.be.a('string');
                done();
            }).catch(err => done(err));
        });

        it('It should throw error if no RPC url is provided', (done) => {
            lib2.transactions.getBalance().then(balance => {
                done(balance);
            }).catch(err => {
                expect(err.status).to.be.equal(400);
                done();
            });
        });
    });

    describe('Get the Transaction', () => {
        it('It should throw error if no hash is provided', (done) => {
            lib3.transactions.getTransaction().then(transaction => done(transaction))
                .catch(err => {
                    expect(err.status).to.be.equal(400);
                    done();
                });
        });

        it('It should throw error if no RPC url is provided', (done) => {
            lib2.transactions.getTransaction().then(transaction => {
                done(transaction);
            }).catch(err => {
                expect(err.status).to.be.equal(400);
                done();
            });
        });
    });
});
