import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormsConfig} from '../../../config/forms-config';

declare const showMessage:any;

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  fgValidator: FormGroup;
  usernameMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;

  
    constructor(private fb:FormBuilder) { }
  
    ngOnInit(): void {
      this.FormBuilding();
    }
    FormBuilding(){
      this.fgValidator = this.fb.group({
        username: ['', [Validators.required, Validators.minLength(this.usernameMinLength)]],
        password: ['', [Validators.required]]
      });
    }
  
    UserloginFn(){
      if(this.fgValidator.invalid){
        showMessage("invalid form");
   
      }else{
        showMessage("Registering");
      }
  
    }
    get fgv(){
      return this.fgValidator.controls;
    }

}
