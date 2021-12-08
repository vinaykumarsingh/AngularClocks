import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';

import { SharedDataService } from 'src/app/services/shared-data.service';

@Component({
  selector: 'app-edit-clock',
  templateUrl: './edit-clock.component.html',
  styleUrls: ['./edit-clock.component.css']
})
export class EditClockComponent {
  editTimeForm: FormGroup;
  submitted = false;
  hours = [];
  minutes = [];
  seconds = [];

  constructor(private sharedDataService: SharedDataService, private formBuilder: FormBuilder) {
    /**
     * Creating hours, minutes and seconds array
     * hours [0-24]
     * minuts [0-60]
     * seconds [0-60]
     */
    Array(24).fill(0).map((x, i) => {
      this.hours.push({ id: `${i}`, value: i })
    });
    Array(60).fill(0).map((x, i) => {
      this.minutes.push({ id: `${i}`, value: i })
    });
    Array(60).fill(0).map((x, i) => {
      this.seconds.push({ id: `${i}`, value: i })
    });

  }

  ngOnInit() {
    // Form To Edit clocks. All the fields are required
    this.editTimeForm = this.formBuilder.group({
      hours: ['', Validators.required],
      minutes: ['', Validators.required],
      seconds: ['', Validators.required]
    })
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid and show validation error
    if (this.editTimeForm.invalid) {
      return;
    }
    /**
     * Calling sharedDataService.setCurrentTime with editTimeForm forms value
     * This function call will set the current time to form fields value
     */
    this.sharedDataService.setCurrentTime(this.editTimeForm.value)
  }

  /**
   * resetTime function will reset the form 
   * this function calls resetToCurrentTime on sharedDataService which will reset a flag that will result in 
   * showing real time value in clocks
   */
   resetTime() {
    this.submitted = false;
    this.editTimeForm.reset();
    this.sharedDataService.resetToCurrentTime()
  }

}
