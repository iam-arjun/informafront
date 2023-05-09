import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { MyserviceService } from '../Services/myservice.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { EmailserviceService } from '../Services/emailservice.service';

import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { MatDialog } from '@angular/material/dialog'
import { ForgotPassComponent } from './forgot-pass/forgot-pass.component';


@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.component.html',
  styleUrls: ['./admin-login.component.css']
})
export class AdminLoginComponent implements OnInit, AfterViewInit {
  show_login: boolean = true;
  Office_emp: any = []
  all_emp: any = []
  Input_email = ""
  Input_pass = ""
  AdminId = "r"
  AdminPass = "r"
  show_confirm_pass: boolean = false;
  show_signUp: boolean;
  LoginBtn = "Login"
  LoginUser: FormGroup;
  tempArra: any[];
  errMsgs: any;
  afterLogin: boolean = false;

  loginErr: any;
  tempuserarray: any = []
  forgot_pass: boolean = false;

  constructor(private _service: MyserviceService, private fb: FormBuilder, private _eservice: EmailserviceService, private http: HttpClient, private router: Router, private dialogRef: MatDialog) { }
  ngAfterViewInit(): void {
    this.errMsgs = this._service.errMsg;

  }

  ngOnInit(): void {
    this._service.showSignup.subscribe(res => {
      this.show_signUp = res
    })

    let temp = JSON.parse(sessionStorage.getItem('ADMINLOGIN-01'));
    if (temp) {
      this._service.showAdmin.next(true)
      this._service.showUser.next(false)
      this._service.showLogin.next(false)
    }

    // let tempuser = JSON.parse(sessionStorage.getItem('USERPANEL-0'))
    let tempuserarray = JSON.parse(sessionStorage.getItem('USER_PANEL_ARRAY'))
    let jsonuser = JSON.parse(sessionStorage.getItem('USERPANEL-0'))
    if (tempuserarray) {
      let tempuser = tempuserarray.find(obj => obj.email === jsonuser.email)


      if (tempuser) {
        this._service.showUser.next(true)
        this._service.showAdmin.next(false)
        this._service.showLogin.next(false)
        console.log(JSON.parse(sessionStorage.getItem('USER_PANEL_ARRAY')))


        console.log(tempuser)
      }
    }




    this.LoginUser = this.fb.group({
      _id: [''],

      email: ['', [Validators.required, Validators.email]],

      password: ['', [Validators.required, Validators.min(8)]],
    })




  }


  Login() {


    console.log('hello')
    let email = this.LoginUser.value.email;
    let password = this.LoginUser.value.password;
    // if (this.LoginUser.valid) {

    //   this._service.getEmployee().subscribe(res => {
    //     this.Office_emp = res
    //     console.log(this.Office_emp)
    //     console.log(email)
    //     if (this.Office_emp!=undefined) {

    //       for (let i = 0; i < this.Office_emp.length; i++) {
    //         let temp_email = this.Office_emp[i].email;
    //         let temp_pass = this.Office_emp[i].password;
    //         let temp_name = this.Office_emp[i].name;
    //         let temp_id = this.Office_emp[i].empid;
    //         let temp_proff = this.Office_emp[i].profession;
    //         let temp_worktime = this.Office_emp[i].worktime
    //         let temp_ppurl = this.Office_emp[i].PPURL;
    //         console.log(temp_worktime)
    //         console.log(temp_email)
    //         console.log(email)
    //         if (temp_email == email && temp_pass == password) {

    //           sessionStorage.setItem('USERPANEL-0', JSON.stringify(this.LoginUser.value))


    //           this._service.showUser.next(true)
    //           this._service.showLogin.next(false)
    //           this._service.showAdmin.next(false)

    //           sessionStorage.setItem('username', temp_name);
    //           sessionStorage.setItem('userid', temp_id);
    //           sessionStorage.setItem('useremail', temp_email);
    //           sessionStorage.setItem('userproff', temp_proff)
    //           sessionStorage.setItem('WORKTIME', temp_worktime)
    //           sessionStorage.setItem('PPURL', String(temp_ppurl))

    //           this.tempuserarray.push(this.LoginUser.value)

    //           sessionStorage.setItem('USER_PANEL_ARRAY', JSON.stringify(this.tempuserarray))


    //         }
    //         else {

    //           console.log(email)
            
    //           this._service._signin(email, password).subscribe(res => {
    //             console.log(res)

    //             this.LoginUser.reset()

    //             this._service.showLogin.next(false)
    //             this._service.showAdmin.next(true)
    //             this._service.showUser.next(false)
    //             sessionStorage.setItem('ADMINLOGIN-01', JSON.stringify(this.LoginUser.value))
    //             let SlicedEmail = email.slice(0, email.indexOf('@'))
    //             sessionStorage.setItem('ADMIN_NAME', SlicedEmail)




    //           }, err => {
    //             console.log(err)

    //             this.loginErr = this.errMsgs[err.error.error.message]

    //           })
    //         }
    //       }


    //     }
    //     else {
    //       console.log('thre it isa')
    //       console.log(email)
    //       this._service._signin(email, password).subscribe(res => {
    //         console.log(res)

    //         this.LoginUser.reset()

    //         this._service.showLogin.next(false)
    //         this._service.showAdmin.next(true)
    //         this._service.showUser.next(false)
    //         sessionStorage.setItem('ADMINLOGIN-01', JSON.stringify(this.LoginUser.value))
    //         let SlicedEmail = email.slice(0, email.indexOf('@'))
    //         sessionStorage.setItem('ADMIN_NAME', SlicedEmail)




    //       }, err => {
    //         console.log(err)

    //         this.loginErr = this.errMsgs[err.error.error.message]

    //       })
    //     }





    //     // only for the admin ......................................................................................

    //     // ends here ..............................................................................................




    //   })


    // }
    this._service.showAdmin.next(true)
    this._service.showLogin.next(false)
    this._service.showUser.next(false)



  }

  forgotPass() {
    this.forgot_pass = true;
    this.dialogRef.open(ForgotPassComponent)


  }




}
