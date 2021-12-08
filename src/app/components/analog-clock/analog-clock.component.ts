import { AfterViewInit, Component, OnInit } from '@angular/core';

import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-analog-clock',
  templateUrl: './analog-clock.component.html',
  styleUrls: ['./analog-clock.component.css']
})

export class AnalogClockComponent {

  hourStickStyle;
  minuteStickStyle;
  secondStickStyle;
  hour: number = 0;
  minute: number = 0;
  second: number = 0;
  analogClockData: any;
  constructor(private sharedDataService: SharedDataService) { }

  ngOnInit() {
    this.getTime();
  }

  animateAnalogClock() {
    this.hourStickStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.analogClockData.hour * 30) + (this.analogClockData.minute * 0.5) + (this.analogClockData.second * (0.5 / 60))}deg)` };
    this.minuteStickStyle = { transform: `translate3d(-50%, 0, 0) rotate(${(this.analogClockData.minute * 6) + (this.analogClockData.second * 0.1)}deg)` };
    this.secondStickStyle = { transform: `translate3d(-50%, 0, 0) rotate(${this.analogClockData.second * 6}deg)` };
  }

  /**
   * Below function gets current time for Analog clock.
   * It has setInterval function which gets triggered every sec.
   * So every sec,this function reach to sharedDataService and subscribe to dateTimeObject
   * dateTimeObject is an observable  in sharedDataService service which will get the current time
   */
  getTime() {
    setInterval(() => {
      this.sharedDataService.dateTimeObject.subscribe(result => {
        this.analogClockData = result;
        this.animateAnalogClock();
      })
    }, 1000);
  }
  
}