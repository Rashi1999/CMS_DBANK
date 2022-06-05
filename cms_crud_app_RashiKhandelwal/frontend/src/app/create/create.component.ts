import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiServiceService } from '../apiservice.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit {
  getParamId:any;
  errormsg:any;
  sucessmsg:any;
  blogForm=new FormGroup({
    'blogid':new FormControl('',Validators.required),
    'authid':new FormControl('',Validators.required),
    'authname':new FormControl('',Validators.required),
    'category':new FormControl('',Validators.required),
    'content':new FormControl('',Validators.required),
  });

  constructor(private service:ApiServiceService, private router:ActivatedRoute){}

  ngOnInit(): void {
    this.getParamId=this.router.snapshot.paramMap.get('id');
    if(this.getParamId){
      this.service.getSingleData(this.getParamId).subscribe((res)=>{
        this.blogForm.patchValue({
          authid:res.data[0].authid,
          authname:res.data[0].authname,
          category:res.data[0].category,
          content:res.data[0].content
        });
      });
    }
  }

  blogSubmit(){
    if(this.blogForm.value){
      this.service.createData(this.blogForm.value).subscribe((res)=>{
        console.log(res,"res=>=>");
        this.blogForm.reset();
        this.sucessmsg="Blog Successfully Enterred !!"
      })
      console.log(this.blogForm.value);
    }
    else
      this.errormsg="All fields are required !!"
  }

  blogUpdate(){
    console.log(this.getParamId);
    if(this.blogForm.value){
      this.service.updateData(this.blogForm.value, this.getParamId).subscribe((res)=>{
        console.log(res,"Updated !!");
        this.blogForm.reset();
        this.sucessmsg="Blog Successfully Updated !!"
      });
    }
    else{
      this.errormsg="All fields are required !!";
    } 
  }

}
