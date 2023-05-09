import { coerceStringArray } from '@angular/cdk/coercion';
import { AfterViewChecked, AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { setLines } from '@angular/material/core';
import { MyserviceService } from 'src/app/Services/myservice.service';
import { EmployeModel } from '../parties-info/ClientModel';

@Component({
  selector: 'app-emp-salary-sheet',
  templateUrl: './emp-salary-sheet.component.html',
  styleUrls: ['./emp-salary-sheet.component.css']
})
export class EmpSalarySheetComponent implements OnInit, AfterViewInit {
  @ViewChild('previousDues') _dues: ElementRef;
  @ViewChild('bonus') _bonus: ElementRef;
  @ViewChild('advance') _advance: ElementRef;
  @ViewChild('final_sal') _finalSal: ElementRef;
  @ViewChild('totalAddition') _totalAdd: ElementRef;
  @ViewChild('username') _username: ElementRef;
  @ViewChild('workdays') _workdays: ElementRef;
  @ViewChild('sal') _fullsal: ElementRef;
  @ViewChild('basic') _basicsal: ElementRef;
  @ViewChild('allowance') _allow: ElementRef;
  @ViewChild('tax') _tax: ElementRef;
  @ViewChild('net') _netsal: ElementRef;




  datesearch: any = ".._arju_.."
  SalarySheet_details: any = []
  currentDate: any;
  emp_work_days: any;
  Sal_temp_arr: any = []
  final_salary: any;
  sal_save_alert: boolean = false;
  Invalid_alert: boolean = false;
  AllEmpSalarySheet: any = []
  SALARY_SHEET_EMP: any = []
  SALARY_USER: any;

  TOTAL_ATTENDANCE: any = []
  TotalAtt: any = null;
  tempArr: any = [];
  SAL_slip_arr: any = []

  constructor(private _service: MyserviceService) { }


  ngOnInit(): void {
    console.log(JSON.parse(localStorage.getItem('SALARY_SLIPS_ARRAY')))
    this.SAL_slip_arr = JSON.parse(localStorage.getItem('SALARY_SLIPS_ARRAY'))

    if (JSON.parse(localStorage.getItem('SALARY_SLIPS_ARRAY')) == undefined) {


      this.AllEmpSalarySheet = this.SAL_slip_arr;
      for (let i = 0; i < this.AllEmpSalarySheet.length; i++) {
        console.log(this.AllEmpSalarySheet[i]._sal_month)
        if (this.AllEmpSalarySheet[i]._sal_month == '0') {
          this.AllEmpSalarySheet[i]._sal_month = 'January'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '1') {
          this.AllEmpSalarySheet[i]._sal_month = 'Febraury'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '2') {
          this.AllEmpSalarySheet[i]._sal_month = 'March'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '3') {
          this.AllEmpSalarySheet[i]._sal_month = 'April'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '4') {
          this.AllEmpSalarySheet[i]._sal_month = 'May'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '5') {
          this.AllEmpSalarySheet[i]._sal_month = 'June'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '6') {
          this.AllEmpSalarySheet[i]._sal_month = 'July'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '7') {
          this.AllEmpSalarySheet[i]._sal_month = 'August'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '8') {
          this.AllEmpSalarySheet[i]._sal_month = 'September'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '9') {
          this.AllEmpSalarySheet[i]._sal_month = 'October'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '10') {
          this.AllEmpSalarySheet[i]._sal_month = 'November'
        }
        if (this.AllEmpSalarySheet[i]._sal_month == '11') {
          this.AllEmpSalarySheet[i]._sal_month = 'December'
        }



      }


    }
    else {
      this._service.getAllEmployee().subscribe(res => {
        console.log('hello')

        console.log(res); this.AllEmpSalarySheet = res
        for (let i = 0; i < this.AllEmpSalarySheet.length; i++) {
          console.log(this.AllEmpSalarySheet[i]._sal_month)
          if (this.AllEmpSalarySheet[i]._sal_month == '0') {
            this.AllEmpSalarySheet[i]._sal_month = 'January'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '1') {
            this.AllEmpSalarySheet[i]._sal_month = 'Febraury'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '2') {
            this.AllEmpSalarySheet[i]._sal_month = 'March'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '3') {
            this.AllEmpSalarySheet[i]._sal_month = 'April'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '4') {
            this.AllEmpSalarySheet[i]._sal_month = 'May'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '5') {
            this.AllEmpSalarySheet[i]._sal_month = 'June'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '6') {
            this.AllEmpSalarySheet[i]._sal_month = 'July'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '7') {
            this.AllEmpSalarySheet[i]._sal_month = 'August'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '8') {
            this.AllEmpSalarySheet[i]._sal_month = 'September'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '9') {
            this.AllEmpSalarySheet[i]._sal_month = 'October'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '10') {
            this.AllEmpSalarySheet[i]._sal_month = 'November'
          }
          if (this.AllEmpSalarySheet[i]._sal_month == '11') {
            this.AllEmpSalarySheet[i]._sal_month = 'December'
          }



        }




      })


    }



    this.getEmpSalary()
    this.currentDate = new Date();
    this._service.TOTAL_WORKING_DAYS.subscribe(res => {
      this.emp_work_days = res

      console.log(res)

    })



  }


  ngAfterViewInit(): void {

    this.AllEmpSalarySheet = JSON.parse(localStorage.getItem('ALLEmpSalarySheet'))



  }

  getEmpSalary() {

    this._service.getEmpSalary().subscribe(res => {
      console.log(res)
      this.SalarySheet_details = res


    }, err => {
      console.log(err)
    })
  }

  clearSal(index,id) {
    console.log("clearing the salary ")


    if (confirm("WANT TO CLEAR THIS USER?")) {
      this._service.DeleteEmp(id).subscribe(res => {
        console.log(res)
        this.AllEmpSalarySheet.splice(this.AllEmpSalarySheet.indexOf(res), 1)
        localStorage.setItem('ALLEmpSalarySheet', JSON.stringify(this.AllEmpSalarySheet))
        this.AllEmpSalarySheet = JSON.parse(localStorage.getItem('ALLEmpSalarySheet'))

      }, error => {
        console.log(error)
      })

   

    }

  }



  saveData(_DUE, _BONUS, _ADVANCE, _FINALAMOUNT, salMonth, index) {

    console.log(typeof (_DUE))
    let floatDue = parseFloat(_DUE)
    let floatBonus = parseFloat(_BONUS)

    let floatad = parseFloat(_ADVANCE)
    let floatFinal = parseFloat(_FINALAMOUNT)
    console.log(floatad)

    if (Number.isNaN(floatDue)) {
      floatDue = 0;
    }
    if (Number.isNaN(floatBonus)) {
      floatBonus = 0;
    }
    if (Number.isNaN(floatad)) {
      floatad = 0;
    }

    if (floatDue == 0 && floatad == 0 && floatBonus == 0) {
      this.Invalid_alert = true;
      setTimeout(() => {
        this.Invalid_alert = false;
      }, 2000);

    }
    else {
      this.final_salary = floatFinal + floatBonus + floatDue - floatad


      console.log(typeof (this.final_salary))
      console.log(this.final_salary)
      console.log(this.AllEmpSalarySheet[index].Finalpay)

      this.AllEmpSalarySheet[index].Finalpay = this.final_salary;
      localStorage.setItem('ALLEmpSalarySheet', JSON.stringify(this.AllEmpSalarySheet))





      let SALARY_SLIPOB = {
        date: "",
        name: "",
        workingdays: 0,
        salary: 0,
        basic_sal: "",
        allowance: "",
        dues: "",
        bonus: "",
        total_add: 0,
        tax: 0,
        advance: "",
        netsal: 0,
        finalpay: ""



      }
      SALARY_SLIPOB.date = salMonth
      SALARY_SLIPOB.name = this.AllEmpSalarySheet[index].fullname
      SALARY_SLIPOB.workingdays = parseFloat(this.AllEmpSalarySheet[index].workingdays)
      SALARY_SLIPOB.salary = parseFloat(this._fullsal.nativeElement.innerText)
      SALARY_SLIPOB.basic_sal = this._basicsal.nativeElement.innerText;
      SALARY_SLIPOB.allowance = this._allow.nativeElement.innerText;
      SALARY_SLIPOB.dues = _DUE
      console.log(SALARY_SLIPOB.dues)
      SALARY_SLIPOB.bonus = _BONUS
      SALARY_SLIPOB.total_add = (SALARY_SLIPOB.salary / 30) * SALARY_SLIPOB.workingdays;
      SALARY_SLIPOB.tax = SALARY_SLIPOB.total_add * 0.01;
      SALARY_SLIPOB.advance = _ADVANCE
      SALARY_SLIPOB.netsal = SALARY_SLIPOB.total_add - SALARY_SLIPOB.tax;
      SALARY_SLIPOB.finalpay = this.AllEmpSalarySheet[index].Finalpay
      console.log(SALARY_SLIPOB)



      this._service.UpdateEmp(SALARY_SLIPOB).subscribe(res => {
        console.log(res)
      }, error => {
        console.log(error)
      })
      this.SAL_slip_arr.push(SALARY_SLIPOB)
      console.log(this.SAL_slip_arr)




      localStorage.setItem('SALARY_SLIPS_ARRAY', JSON.stringify(this.SAL_slip_arr))









    }




  }

  show_workdays(index, name) {
    let tempMon = new Date().getMonth()
    console.log(tempMon)

    this._service.getEmpLoginTimeDetails().subscribe(res => {
      this.SALARY_SHEET_EMP = res




      let Sal_obj = this.SALARY_SHEET_EMP

      let temMon2 = Sal_obj.filter(obj => new Date(obj.date).getMonth() === tempMon)
      console.log(temMon2)


      for (let i = 0; i < Sal_obj.length; i++) {


        this.TOTAL_ATTENDANCE.push(parseFloat(Sal_obj[i].day_attendance))

      }

      for (let j = 0; j < this.TOTAL_ATTENDANCE.length; j++) {

        this.TotalAtt = this.TotalAtt + this.TOTAL_ATTENDANCE[j]



      }

      let TempObj = {
        name: name,
        workDays: this.TotalAtt,
        _month: tempMon + 1
      }
      this._service.saveEmpSalary(TempObj).subscribe(res => {
        console.log(res); this.tempArr.push(res)
        console.log(this.tempArr)
        console.log(name)
        let TO = this.tempArr.find(obj => obj.name === name)
        console.log(TO)
        console.log(TO.workDays)
        this.AllEmpSalarySheet[index].workingdays = TO.workDays;
        if (TO.month == '0') {
          this.AllEmpSalarySheet[index]._sal_month = 'January'

        }
        if (TO.month == '1') {
          this.AllEmpSalarySheet[index]._sal_month = 'Febrauary'

        }

        if (TO.month == '2') {
          this.AllEmpSalarySheet[index]._sal_month = 'March'

        }
        if (TO.month == '3') {
          this.AllEmpSalarySheet[index]._sal_month = 'April'

        }
        if (TO.month == '4') {
          this.AllEmpSalarySheet[index]._sal_month = 'May'

        }
        if (TO.month == '5') {
          this.AllEmpSalarySheet[index]._sal_month = 'Jun'

        }
        if (TO.month == '6') {
          this.AllEmpSalarySheet[index]._sal_month = 'July'

        }
        if (TO.month == '7') {
          this.AllEmpSalarySheet[index]._sal_month = 'August'

        }
        if (TO.month == '8') {
          this.AllEmpSalarySheet[index]._sal_month = 'September'

        }
        if (TO.month == '9') {
          this.AllEmpSalarySheet[index]._sal_month = 'October'

        }
        if (TO.month == '10') {
          this.AllEmpSalarySheet[index]._sal_month = 'November'

        }
        if (TO.month == '11') {
          this.AllEmpSalarySheet[index]._sal_month = 'December'

        }


        localStorage.setItem('ALLEmpSalarySheet', JSON.stringify(this.AllEmpSalarySheet))
      })




    }, err => {
      console.log(err);
    })



  }



}
