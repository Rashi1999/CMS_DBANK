import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.css']
})
export class LoginPageComponent implements OnInit {

  public loginForm!: FormGroup

  constructor(private formbuilder: FormBuilder,private http: HttpClient, private router: Router) { }

  ngOnInit(): void {
    this.loginForm = this.formbuilder.group({
      usercategory: ['', Validators.required],
      email: [''],
      password: ['', Validators.required]
    })
  }
  login(){
    let category:any=document.getElementById("usercategory");

    if(category.value=="Reader")
      this.http.get<any>("http://localhost:3123/readersList")
    else if(category=="Admin")
      this.http.get<any>("http://localhost:3123/adminList")
    else if(category=="Super Admin")
      this.http.get<any>("http://localhost:3123/adminList")
    .subscribe(res=>{
      const user = res.find((a:any)=>{
        return a.email === this.loginForm.value.email && a.password === this.loginForm.value.password 
      });
      if(user){
        alert('Login Succesful');
        this.loginForm.reset()
      this.router.navigate(["read"])
      }else{
        alert("Wrong Credentials")
      }
    },err=>{
      alert("Contact Admin")
    })
  }

}
