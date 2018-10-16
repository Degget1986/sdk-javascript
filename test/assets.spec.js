describe('Assets', () => {
    /*
     * Test the /GET Asset endpoints
     */
  
    describe('/GET asset by ID', () => {
      it('it should GET specified asset the by correct id', (done) => {
        lib.getAssetById(assetId)
          .then(response => { expect(response.status).to.equal(200); done(); })
          .catch(error => { done(error); })
      }).timeout(15000);
    });
  
    describe('/GET asset by ID: Pass empty parameter', () => {
      it('it should throw Asset ID is missing error', (done) => {
        lib.getAssetById()
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(400); done(); })
      }).timeout(15000);
    });

    describe('/GET asset by ID: Pass assetId as a number', () => {
      it('it should throw Asset ID not found error (404)', (done) => {
        lib.getAssetById(123)
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(404); done(); })
      }).timeout(15000);
    });

    describe('/GET asset by ID: Pass assetId as string', () => {
      it('it should throw Asset ID not found error (404)', (done) => {
        lib.getAssetById('123')
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(404); done(); })
      }).timeout(15000);
    });
  
    describe('/GET asset by ID: Pass assetId as null value', () => {
      it('it should throw Asset ID not found error (404)', (done) => {
        lib.getAssetById({assetId: null})
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(404); done(); })
      }).timeout(15000);
    });
  
    describe('/GET assets by params: Pass legit values', () => {
      it('it should get assets array based on query params', (done) => {
        const params = { createdBy: '0x9687a70513047dc6Ee966D69bD0C07FFb1102098', perPage: 1 };
        lib.getAssets(params)
          .then(response => { expect(response.status).to.equal(200); done(); })
          .catch(error => { done(error); })
      }).timeout(15000);
    });

    describe('/GET assets by params: Pass incorrect parameter values', () => {
      it('it should catch error due to wrong params', (done) => {
        const params = { createdBy: '0x9687a70513047 ... D69bD0C07FFb110209', perPage: 1 };
        lib.getAssets(params)
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(400); done(); })
      }).timeout(15000);
    });

    describe('/GET assets by params: Pass incorrect parameters keys', () => {
      it('it should catch error due to wrong params', (done) => {
        const params = { anyKey: '0x9687a70513047 ... D69bD0C07FFb110209', irrelevantKey: 1 };
        lib.getAssets(params)
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(400); done(); })
      }).timeout(15000);
    });

    describe('/GET assets by params: Pass a string instead of json object', () => {
      it('it should catch error due to no parameters', (done) => {
        const params = `{ createdBy: 0x9687a70513047dc6Ee966D69bD0C07FFb1102098, perPage: 1 }`;
        lib.getAssets(params)
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(400); done(); })
      }).timeout(15000);
    });
  
});
