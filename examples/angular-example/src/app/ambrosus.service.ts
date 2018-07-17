import { Observable } from 'rxjs';
declare let AmbrosusSDK: any;

export class AmbrosusService {
  ambrosus: any;

  constructor() {
    const apiEndpoint = 'https://gateway-test.ambrosus.com';

    this.ambrosus = new AmbrosusSDK({
      apiEndpoint: apiEndpoint
    });
  }

  getAssetById(assetId) {
    return new Observable(observer => {
      this.ambrosus.getAssetById(assetId).then(response => {
        observer.next(response.data);
      }).catch(error => {
        observer.error(error.message);
      });
    });
  }

  getEventsById(assetId) {
    return new Observable(observer => {
      this.ambrosus.getEvents({ assetId: assetId }).then(response => {
        observer.next(response.data);
      }).catch(error => {
        observer.error(error.message);
      });
    });
  }

}
