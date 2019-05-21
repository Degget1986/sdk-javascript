// describe('Administration', () => {
//     describe('/POST add account ', () => {
//         it('it should throw secret is missing error', (done) => {
//             lib.accounts.addAccount()
//                 .then(response => { done(response); })
//                 .catch(error => { expect(error.status).to.equal(400); done(); });
//         }).timeout(15000);
//     });

//     describe('/POST add account: Initialize library with secret', () => {
//         it('Expected Authorization type AMB_TOKEN', (done) => {
//             lib2.accounts.addAccount({})
//                 .then(response => { done(response); })
//                 .catch(error => { expect(error.status).to.equal(400); done(); });
//         }).timeout(15000);
//     });
// });
