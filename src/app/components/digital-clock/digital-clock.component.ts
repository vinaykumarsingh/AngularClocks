import { Component, OnInit } from '@angular/core';
import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-digital-clock',
  templateUrl: './digital-clock.component.html',
  styleUrls: ['./digital-clock.component.css']
})
export class DigitalClockComponent {
  digitalClockData: any;

  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.getCurrentTime();
  }
  /**
   * Below function gets current time for digital clock.
   * It has setInterval function which gets triggered every sec.
   * So every sec,this function reach to sharedDataService and call getCurrentTime function
   * getCurrentTime function in service will get the current time
   */
  getCurrentTime() {
    setInterval(() => {
      if (this.digitalClockData) {
        var totalSec = (this.digitalClockData.hour * 60 * 60) + (this.digitalClockData.minute * 60) + (this.digitalClockData.second * 1) + 1
      }
      this.sharedDataService.getCurrentTime(totalSec);
      this.sharedDataService.dateTimeObject.subscribe(result => {
        this.digitalClockData = result;
      })
    }, 1000);
  }
}
