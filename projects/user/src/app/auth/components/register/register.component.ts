import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormGroup, ValidationErrors, ValidatorFn, Validators } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { CreateAccount } from '../constant/DTOs';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
})
export class RegisterComponent implements OnInit {

  constructor(
    private fb :FormBuilder ,
    private service : LoginService
  ) { }

  registeForm!:FormGroup
  ngOnInit(): void {
    this.createForm()
  }

  createForm(){
this.registeForm = this.fb.group({
  email:['' , Validators.required],
  username:['' , Validators.required],
  password:['' , Validators.required],
  confirmPAssword:['' , Validators.required],

} , {validators:this.checkPassword})
  }
  createAccount(){
    const MODEL:CreateAccount ={
      email:this.registeForm.value['email'],
      password:this.registeForm.value['password'],
      username:this.registeForm.value['username'],
      role:'user',
    }
    this.service.createUser(MODEL).subscribe(res=>{

    })
    console.log(this.registeForm);

  }
  checkPassword:ValidatorFn = (group:AbstractControl):ValidationErrors | null =>{
    let password = group.get('password')?.value;
    let confirmPAssword = group.get('confirmPAssword')?.value;
    console.log(password);
    
    return password ===confirmPAssword ? null :{notSame : true}

  }

}
