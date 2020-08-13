import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { CategoryService } from 'src/app/services/parameters/category.service';
import { Router } from '@angular/router';
import { CategoryModel } from 'src/app/models/parameters/category.model';
declare const showMessage:any;
@Component({
  selector: 'app-category-creation',
  templateUrl: './category-creation.component.html',
  styleUrls: ['./category-creation.component.css']
})
export class CategoryCreationComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;



  constructor(
    private fb:FormBuilder, 
    private service: CategoryService,
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
      let model = this.getCategoryData();
      this.service.saveNewRecord(model).subscribe(
        data =>{
          showMessage(" Record save succesfuly");
          this.router.navigate(['/parameters/category-list']);
        },
        error => {
          showMessage("Error saving.");
        }
      );
  
    }
  
  }
  
  getCategoryData(): CategoryModel{
    let model = new CategoryModel();
    model.name = this.fgv.name.value;
    model.code = this.fgv.code.value;
  
    return model;
  }
  get fgv(){
    return this.fgValidator.controls;
  }
}
  