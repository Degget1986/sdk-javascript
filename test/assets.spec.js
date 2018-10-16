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
  
    describe('/GET asset by ID', () => {
      it('it should throw Asset ID is missing error', (done) => {
        lib.getAssetById()
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(400); done(); })
      }).timeout(15000);
    });
  
    describe('/GET asset not found (404) error', () => {
      it('it should give a 404 error', (done) => {
        lib.getAssetById({assetId: null})
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(404); done(); })
      }).timeout(15000);
    });
  
    describe('/GET assets by params', () => {
      it('it should get assets array based on query params', (done) => {
        const params = { createdBy: '0x9687a70513047dc6Ee966D69bD0C07FFb1102098', perPage: 1 };
        lib.getAssets(params)
          .then(response => { expect(response.status).to.equal(200); done(); })
          .catch(error => { done(error); })
      }).timeout(15000);
    });
  
    describe('/GET assets by empty params', () => {
      it('it should get assets array', (done) => {
        lib.getAssets()
          .then(response => { expect(response.status).to.equal(200); done(); })
          .catch(error => { done(error); })
      }).timeout(15000);
    });
  
    describe('/GET assets by params', () => {
      it('it should catch error due to wrong params', (done) => {
        const params = { createdBy: '0x9687a70513047 ... D69bD0C07FFb110209', perPage: 1 };
        lib.getAssets(params)
          .then(response => { done(response); })
          .catch(error => { expect(error.status).to.equal(400); done(); })
      }).timeout(15000);
    });
  
});
