import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {FormsConfig} from '../../../config/forms-config';
import { ClientService } from '../../../services/client.service'
import { ClientModel } from '../../../models/client.model';
import { Router } from '@angular/router';


declare const showMessage:any;

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

fgValidator: FormGroup;
documentMinLength = FormsConfig.DOCUMENT_MIN_LENGTH;
nameMinLength = FormsConfig.NAME_MIN_LENGTH;
lastnameMinLength = FormsConfig.LASTNAME_MIN_LENGTH;
numberMinLength = FormsConfig.NUMBER_PHONE_MIN_LENGTH;
numberMaxLength = FormsConfig.NUMBER_PHONE_MAX_LENGTH;
addressMinLength = FormsConfig.ADDRESS_MIN_LENGTH;
cityMinLength = FormsConfig.CITY_MIN_LENGTH;

  constructor(
    private fb:FormBuilder, 
    private service: ClientService,
    private router: Router) { }

  ngOnInit(): void {
    this.FormBuilding();
  }
  FormBuilding(){
    this.fgValidator = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(this.documentMinLength)]],
      name: ['',[Validators.required, Validators.minLength(this.nameMinLength)]],
      lastName: ['',[Validators.required, Validators.minLength(this.lastnameMinLength)]],
      phone:['',[Validators.required, Validators.minLength(this.numberMinLength), Validators.maxLength(this.numberMaxLength)]],
      email:['',[Validators.required, Validators.email]],
      address:['',[Validators.required, Validators.minLength(this.addressMinLength)]],
      city:['',[Validators.required, Validators.minLength(this.cityMinLength)]]
    });
  }

  ClientRegisterFn(){
    if(this.fgValidator.invalid){
      showMessage("invalid form");
 
    }else{
      //showMessage("Registering");
      let model = this.getClientData();
      this.service.ClientRegistering(model).subscribe(
        data =>{
          showMessage(" Register succesfull, you can find your password in your email inbox.");
          this.router.navigate(['/security/login']);
        },
        error => {
          showMessage("Error registering.");
        }
      );

    }

  }

  getClientData(): ClientModel{
    let model = new ClientModel();
    model.document = this.fgv.document.value;
    model.name = this.fgv.name.value;
    model.lastname = this.fgv.lastName.value;
    model.phone = this.fgv.phone.value;
    model.email = this.fgv.email.value;
    model.address = this.fgv.address.value;
    model.city = this.fgv.city.value;
    return model;
  }
  get fgv(){
    return this.fgValidator.controls;
  }
}
