import { Component } from '@angular/core';
import { AmbrosusService } from './ambrosus.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [AmbrosusService]
})

export class AppComponent {

  assetId: String = '0x46debb0de0e1ce401da205aa1522df7911488651089e9c5e360802decf1d987d';
  processing: Boolean = false;
  assetResponse: Object;
  eventResponse: any;

  constructor(public ambrosusService: AmbrosusService) {}

  getAssetById() {
    this.processing = true;
    this.ambrosusService.getAssetById(this.assetId).subscribe(
      data => {
        this.assetResponse = data;
        this.processing = false;
        this.getEventsById();
      }, error => {
        this.processing = false;
        alert(error);
      }
    );
  }

  getEventsById() {
    this.ambrosusService.getEventsById(this.assetId).subscribe(
      data => {
        this.eventResponse = data;
      }, error => {
        alert(error);
      }
    );
  }

}
