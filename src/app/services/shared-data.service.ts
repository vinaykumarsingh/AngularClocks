import { Injectable } from '@angular/core';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SharedDataService {
  date = new Date();
  dateObj: any = {};
  dateObjNew: any = {};
  isTimeModified: boolean = false;

  private dateTime = new Subject<object>();
  dateTimeObject = this.dateTime.asObservable()

  constructor() { }

  /**
   * 
   * @param totalSec - this is total no of seconds if current time is converted to seconds. 
   * This value will be passed from componnets
   */
  getCurrentTime(totalSec) {
    /**
     * If user has modified time in clocks then isTimeModified willbe true.
     */
    if (this.isTimeModified) {
      /**
       * converting totalSec into hours,menutes, seconds
       * above converted value is assgned into a new object, which will be then passed to componnet for subscription
       */
      let d = Number(totalSec);
      var h = Math.floor(d / 3600);
      var m = Math.floor(d % 3600 / 60);
      var s = Math.floor(d % 3600 % 60);

      this.dateObjNew = {
        'hour': h,
        'minute': m,
        'second': s
      };

      this.dateTime.next(this.dateObjNew);
    } else {
      /**
       * if user has not modified the clocks time then below code will exicute.
       * below code gets hours, min,and sec from current actual time and 
       * create an object which willbe subscribed to componnets for subscription
       */
      this.date = new Date();
      let hour = this.date.getHours()
      this.dateObj = {
        'hour': this.date.getHours(),
        'minute': this.date.getMinutes(),
        'second': this.date.getSeconds(),
        'isAMPM': hour >= 12 ? 'PM' : 'AM'
      };

      this.dateTime.next(this.dateObj);
    }

  }
  /**
   * Below code receives the value to reset into clocks
   * @param dateObj - This object is user selected value of hrs,mnts and secs
   */
  setCurrentTime(dateObj) {
    this.isTimeModified = true;
    this.dateObjNew = {
      'hour': dateObj.hours,
      'minute': dateObj.minutes,
      'second': dateObj.seconds
    };
 
    this.dateTime.next(this.dateObjNew);
  }

  /**
   * If user clicks the reset button, code will reset the flag
   * this will result in componnets to get current origanal time
   */
  resetToCurrentTime() {
    this.isTimeModified= false;
  }
}
