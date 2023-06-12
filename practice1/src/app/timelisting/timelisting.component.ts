import { Component, OnInit ,OnDestroy } from '@angular/core';
import html2canvas from 'html2canvas';
import { TimelistingserviceService } from './timelistingservice.service';

@Component({
  selector: 'app-timelisting',
  templateUrl: './timelisting.component.html',
  styleUrls: ['./timelisting.component.css']
})


export class TimelistingComponent implements OnInit , OnDestroy{
  edit: boolean = false
  st: string = "";
  et: string = "";
  td: string = "";
  min: any;
  stime: string = "";
  etime: string = "";
  todayDate: string = "";
  daytmin: number = NaN;
  daythr: number = NaN;

  DATA: data[] =[];

  constructor(private timelistingservice : TimelistingserviceService) {
    this.todaydate()
  }

  ngOnInit() {
     this.timelistingservice.loadData(this.todayDate).subscribe(({ pdata, ttime }) => {
      console.log(pdata);
      this.DATA = pdata;
      this.daytmin = ttime;
      this.daythr = ttime / 60;
    });
  }

  todaydate() {
    const currentDate = new Date();
    this.todayDate = currentDate.toISOString().substring(0, 10);
  }

  //adding task to list and database
  addtask() {
    this.min = this.calculateTimeDifference(this.st, this.et)
    this.stime = this.convertTo12HourFormat(this.st)
    this.etime = this.convertTo12HourFormat(this.et)
    this.DATA.push({ Starttime: this.stime.toUpperCase(), Endtime: this.etime.toUpperCase(), Minute: this.min, Taskdesc: this.td, date: this.todayDate })


    this.timelistingservice.createpost({ Starttime: this.stime, Endtime: this.etime, Minute: this.min, Taskdesc: this.td, date: this.todayDate })

    this.daytmin += this.min
    this.daythr = (this.daythr * 60 + this.min) / 60
    this.st = "";
    this.et = "";
    this.td = "";
    this.edit = false
  }

  //editing task
  edittask(elem: any) {
    this.edit = true
    this.st = elem.Starttime;
    this.et = elem.Endtime;
    this.td = elem.Taskdesc;
    const index = this.DATA.indexOf(elem);
    this.DATA.splice(index, 1);
    this.timelistingservice.delData(elem._id);
  }

  //deleting task from list and database
  deletetask(elem: any) {
    this.timelistingservice.delData(elem._id)
    const index = this.DATA.indexOf(elem);
    this.DATA.splice(index, 1);

    this.daytmin -= elem.Minute;
    this.daythr = this.daytmin/60;
  }

  loadData(){
    this.timelistingservice.loadData(this.todayDate).subscribe(({ pdata, ttime }) => {
      console.log(pdata);
      this.DATA = pdata;
      this.daytmin = ttime;
      this.daythr = ttime / 60;
    });
  }
  //converting to image and downloading it
  exportAreaAsPNG(elementId: string) {
    const element = document.getElementById(elementId);

    if (element) {
      html2canvas(element).then((canvas) => {
        const image = canvas.toDataURL('image/png');
        const link = document.createElement('a');
        link.href = image;
        link.download = 'area.png';
        link.click();
      });
    }
  }

  //other neccessary functions

    //cal minutes
    calculateTimeDifference(startTime: string, endTime: string) {
      const startTimeParts = startTime.split(":");
      const startHours = parseInt(startTimeParts[0], 10);
      const startMinutes = parseInt(startTimeParts[1], 10);

      const endTimeParts = endTime.split(":");
      const endHours = parseInt(endTimeParts[0], 10);
      const endMinutes = parseInt(endTimeParts[1], 10);

      const totalStartMinutes = startHours * 60 + startMinutes;
      const totalEndMinutes = endHours * 60 + endMinutes;

      let timeDifferenceInMinutes = totalEndMinutes - totalStartMinutes;
      if (timeDifferenceInMinutes < 0) {
        timeDifferenceInMinutes += 24 * 60;
      }
      return timeDifferenceInMinutes;
    }

    //12 hr format for date
    convertTo12HourFormat(time: string) {
      const timeParts = time.split(":");
      const hours = parseInt(timeParts[0], 10);
      const minutes = parseInt(timeParts[1], 10);

      let convertedHours = hours % 12;
      if (convertedHours === 0) {
        convertedHours = 12;
      }

      const period = hours < 12 ? 'AM' : 'PM';
      const convertedTime = `${convertedHours}:${minutes.toString().padStart(2, '0')} ${period}`
      return convertedTime
    }

    ngOnDestroy() {
    }

}


export interface data {
  Starttime: string,
  Endtime: string,
  Minute: number,
  Taskdesc: string,
  date: string;
  id?: string;
}

