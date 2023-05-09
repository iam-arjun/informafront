import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { BehaviorSubject, Subject, catchError, tap } from 'rxjs';

import { LeaveModel } from '../user-dash/leave-form/LeaveModel';

import { User } from '../admin-login/User.model';
import { EmployeModel } from '../admin-login/admindash/parties-info/ClientModel';
import { OfficeModel } from '../admin-login/admindash/parties-info/OfficeEmpModel';

@Injectable({
  providedIn: 'root'
})
export class MyserviceService {
  // Backend Url to get official_emp_data and Individual emp data



  // SIGNUP AND LOGIN ERR MESSAGE////

  errMsg = {
    UNKNOWN: "An unknown error occured.Please reopen the application",
    EMAIL_EXISTS: "Your email already exists. You may sign in with such email.",
    EMAIL_NOT_FOUND: "The provided email is not found.Please enter correct email to sign in!",
    INVALID_PASSWORD: "The provided password is incorrect.Try again!"
  }
  atlasuri = "http://mongodb+srv://phuyelarjun38:fucku%40143@cluster0.yaemeeq.mongodb.net/?retryWrites=true&w=majority/informa_user";
  // office_emp_url = "http://localhost:8000/Allemp/officeemp"
  // all_emp_url = "http://localhost:8000/Allemp"
  // emp_leave_url = "http://localhost:8000/Allemp/leaveform"
  // emp_chat_url = "http://localhost:8000/Allemp/chatLogin"
    office_emp_url = "https://informaback.onrender.com/officeemp"
  all_emp_url = "https://informaback.onrender.com/Allemp"
  emp_leave_url = "https://informaback.onrender.com/leaveform"
  emp_chat_url = "https://informaback.onrender.com/chatLogin"
  apikey = "AIzaSyAUUEKTPqFNokxvHmpG6sDxCNGfHmnXUEE"
  Signupurl = "https://identitytoolkit.googleapis.com/v1/accounts:signUp?key="
  Signinurl = "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key="
  // LoginTimeUrl = "http://localhost:8000/Allemp/userloginTime"
  // SalarySheetUrl = "http://localhost:8000/Allemp/userSalarydetails"
  LoginTimeUrl = "https://informaback.onrender.com/userloginTime"
  SalarySheetUrl = "https://informaback.onrender.com/userSalarydetails"
  showSignup = new BehaviorSubject(false)


  // CV DETAILS .................................................................

  Ename = new BehaviorSubject("");
  Ephone = new BehaviorSubject("");
  Eemail = new BehaviorSubject("");
  Eaddress = new BehaviorSubject("");
  Eguard = new BehaviorSubject("");
  Ebank = new BehaviorSubject("");
  Eacc = new BehaviorSubject("");
  Epan = new BehaviorSubject("");
  Esalary = new BehaviorSubject("");
  Ejoin = new BehaviorSubject("");
  Eleave = new BehaviorSubject("");
  EppUrl = new BehaviorSubject("");
  TOTAL_WORKING_DAYS = new BehaviorSubject('')

  //......................................................................................

  //ADMIN VARIABLES

  showLogin = new BehaviorSubject(true);
  showUser = new BehaviorSubject(false);
  showAdmin = new BehaviorSubject(false);
  showTask = new BehaviorSubject(false);

  show_popup_req = new BehaviorSubject(false)

  show_empDetails = new BehaviorSubject(false)
  LEAVE_REQ_ACCEPTED = new BehaviorSubject(false);
  LEAVE_REQ_REJECTED = new BehaviorSubject(false);
  LEAVE_REQ_HOLD = new BehaviorSubject(false);

  LEAVE_APPROVAL = new BehaviorSubject(null)






  PARTIES_STATUS = new BehaviorSubject(false);

  EMP_DETAILS = new BehaviorSubject(false);
  EMP_DETAILS_ARRAY = new BehaviorSubject({})
  PARTIES_DETAILS = new BehaviorSubject({})
  PARTIES_DETAILS_FORM = new BehaviorSubject({})
  LEAVE_FORM_ARRAY = new BehaviorSubject<any>({})
  LOGOUT_USEREMAIL = new BehaviorSubject<any>({})
  Newarray = new BehaviorSubject<any>({})
  user = new Subject<User>()


  // Profile page some details variable





  name = new BehaviorSubject("");
  show_modal = new BehaviorSubject(false);
  SALARY_SPECIFIC_USER = new BehaviorSubject('')

  constructor(private http: HttpClient) { }


  // ... genuine employee................................................
  SaveAllEmp(allEmp: EmployeModel) {
    return this.http.post(this.all_emp_url, allEmp)
  }
  getAllEmployee() {
    return this.http.get(this.all_emp_url);
  }
  DeleteEmp(id) {
    return this.http.delete(`${this.all_emp_url}/${id}`)


  }
  UpdateEmp(emp: any) {
    return this.http.put(`${this.all_emp_url}/${emp._id}`, emp)
  }



  //official employee  ....................................
  SaveEmployee(emp: OfficeModel) {
    return this.http.post(this.office_emp_url, emp)
  }

  getEmployee() {
    return this.http.get(this.office_emp_url);
  }

  DeleteOfficeEmp(id) {
    return this.http.delete(`${this.office_emp_url}/${id}`)
  }

  UpdateOfficeEmp(emp: OfficeModel) {
    console.log('here')
    console.log(emp._id);
    return this.http.put(`${this.office_emp_url}/${emp._id}`, emp)
  }

  saveLeave(leave: LeaveModel) {
    return this.http.post(this.emp_leave_url, leave)


  }
  getLeave() {
    return this.http.get(this.emp_leave_url);

  }

  delLeave(id) {
    return this.http.delete(`${this.emp_leave_url}/${id}`)
  }






  _signup(email, password,) {
    return this.http.post(`${this.Signupurl}${this.apikey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(error => {
        console.log(error)
        return error;

      }),
      tap(res => {

        this.authenicatedUser(res['email'], res['localId'], res['idToken'], res['expiresIn'])


      })
    )




  }

  _signin(email, password,) {
    return this.http.post(`${this.Signinurl}${this.apikey}`, {
      email: email,
      password: password,
      returnSecureToken: true
    }).pipe(
      catchError(error => {
        console.log(error)
        return error;

      }),
      tap(res => {

        this.authenicatedUser(res['email'], res['localId'], res['idToken'], +res['expiresIn'])


      })
    )


  }

  _getuser() {
    return this.http.get(`${this.Signinurl}${this.apikey}`)



  }

  private authenicatedUser(email, userid, token, token_expires) {

    const expiresToken = new Date(new Date().getTime() + token_expires * 1000)
    console.log(expiresToken)
    let user = new User(email, userid, token, expiresToken)
    console.log(" Signin user details : " + JSON.stringify(user));
    let temp = []

    this.user.next(user)
    this.user.subscribe(res => {
      console.log(res)
      localStorage.setItem('ADMINLOGIN-0', JSON.stringify(res))



    })




  }


  empLoginTime(loginObj: any) {
    return this.http.post(this.LoginTimeUrl, loginObj);

  }
  getEmpLoginTimeDetails() {
    return this.http.get(this.LoginTimeUrl);
  }
  saveEmpSalary(SalaryObj: any) {
    return this.http.post(this.SalarySheetUrl, SalaryObj)

  }
  getEmpSalary() {
    return this.http.get(this.SalarySheetUrl)
  }


  UpdateOfficeSal(emp: any) {
    console.log('here')
    console.log(emp._id);
    return this.http.put(`${this.SalarySheetUrl}/${emp._id}`, emp)
  }
  DeleteOfficesal(id) {
    return this.http.delete(`${this.SalarySheetUrl}/${id}`)
  }


  ForgotPassword(data) {
    return this.http.post(`https://identitytoolkit.googleapis.com/v1/accounts:sendOobCode?key=${this.apikey}`, {
      requestType: 'PASSWORD_RESET', email: data.email
    })

  }

}
