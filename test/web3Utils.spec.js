import utils from '../src/utils';

describe('web3 utils', () => {
    describe('Testing isAddress function', () => {
        it('Should return false for invalid address', done => {
            const test = utils.isAddress('sf');
            expect(test).to.be.false;
            done();
        });
        it('Should return true for valid address', done => {
            const test = utils.isAddress(
                '0xdF42A3D185B77d445B435ed1AA5572b395DC6093'
            );
            expect(test).to.be.true;
            done();
        });
    });

    describe('Generate a random Hex', () => {
        it('Should generate a random 32 byte hex', () => {
            expect(utils.randomHex(32)).to.match(/0[xX][0-9A-Fa-f]{32}/g);
        });
    });
});
