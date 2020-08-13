import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { Router } from '@angular/router';
import { BrandService } from 'src/app/services/parameters/brand.service';
import { BrandModel } from 'src/app/models/parameters/brand.model';

declare const showMessage: any;

@Component({
  selector: 'app-brand-creation',
  templateUrl: './brand-creation.component.html',
  styleUrls: ['./brand-creation.component.css']
})
export class BrandCreationComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;



  constructor(
    private fb:FormBuilder, 
    private service: BrandService,
    private router: Router) { }
  
  ngOnInit(): void {
    this.FormBuilding();
  }
  FormBuilding(){
    this.fgValidator = this.fb.group({
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['',[Validators.required, Validators.minLength(this.nameMinLength)]]

    });
  }
  
  saveNewRecordFn(){
    if(this.fgValidator.invalid){
      showMessage("invalid form");
   
    }else{
      let model = this.getBrandData();
      this.service.saveNewRecord(model).subscribe(
        data =>{
          showMessage(" Record save succesfuly");
          this.router.navigate(['/parameters/brand-list']);
        },
        error => {
          showMessage("Error saving.");
        }
      );
  
    }
  
  }
  
  getBrandData(): BrandModel{
    let model = new BrandModel();
    model.name = this.fgv.name.value;
    model.code = this.fgv.code.value;
  
    return model;
  }
  get fgv(){
    return this.fgValidator.controls;
  }
}
  