import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { Router } from '@angular/router';
import { FormsConfig } from 'src/app/config/forms-config';
import { PasswordResetModel} from '../../../models/security/password-reset.model';


declare const showMessage:any;

@Component({
  selector: 'app-password-reset',
  templateUrl: './password-reset.component.html',
  styleUrls: ['./password-reset.component.css']
})
export class PasswordResetComponent implements OnInit {

  fgValidator: FormGroup;
usernameMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;

  
  constructor(
    private fb:FormBuilder,
    private service: SecurityService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.FormBuilding();
  }
  FormBuilding(){
    this.fgValidator = this.fb.group({
      username: ['', [Validators.required, Validators.minLength(this.usernameMinLength)]],
      type: ['', [Validators.required]]
    });
  }
  
  PasswordResetFn(){
    if(this.fgValidator.invalid){
      showMessage("invalid form");
 
    }else{
      //showMessage("Registering");
      let model = this.getPasswordData();
      this.service.PasswordReset(model).subscribe(
        data =>{          
          showMessage("your password has been reset successfuly, please check your email inbox or you phone.");
          this.router.navigate(['/home']);
        },
        error => {
          showMessage("Invalid data.");
        }
      );

    }

  }
  /**
   * Get user data in Model
   */
  getPasswordData(): PasswordResetModel{
    let model = new PasswordResetModel();
    model.username = this.fgv.username.value;
    model.type = parseInt(this.fgv.type.value);
    ;
    return model;
  }

  get fgv(){
    return this.fgValidator.controls;
  }
}
