import { Observable } from 'rxjs';
declare let AmbrosusSDK: any;

export class AmbrosusService {
  ambrosus: any;

  constructor() {
    const apiEndpoint = 'https://hermes.ambrosus-test.com';

    this.ambrosus = new AmbrosusSDK({
      apiEndpoint: apiEndpoint
    });
  }

  getAssetById(assetId) {
    return new Observable(observer => {
      this.ambrosus.assets.getAssetById(assetId).then(response => {
        observer.next(response.data);
      }).catch(error => {
        observer.error(error.message);
      });
    });
  }

  getEventsById(assetId) {
    return new Observable(observer => {
      this.ambrosus.events.getEvents({ assetId: assetId }).then(response => {
        observer.next(response.data);
      }).catch(error => {
        observer.error(error.message);
      });
    });
  }

}
