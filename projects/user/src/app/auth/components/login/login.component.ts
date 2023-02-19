import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginService } from '../../services/login.service';
import { Login,  } from '../constant/DTOs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  constructor( 
    private fb :FormBuilder ,
    private service : LoginService,
    private router : Router,
    private toaster:ToastrService
  ) { }
  loginForm!:FormGroup;
  createForm(){
    this.loginForm =  this.fb.group({
      email:['',[Validators.required , Validators.email]],
      password:['',[Validators.required]],
      role:['user']
    })

  }
  login(){
    this.service.login(this.loginForm.value).subscribe((res:any)=>{
      localStorage.setItem('token' , res.token)
      this.router.navigate(['/tasks'])
      this.toaster.success('Login success',"Success")

    })
  }

  ngOnInit(): void {
    this.createForm()
  }

 
}
