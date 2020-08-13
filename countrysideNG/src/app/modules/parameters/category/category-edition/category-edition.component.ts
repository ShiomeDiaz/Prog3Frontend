import { Component, OnInit } from '@angular/core';
import { CategoryModel } from 'src/app/models/parameters/category.model';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { FormsConfig } from 'src/app/config/forms-config';
import { CategoryService } from 'src/app/services/parameters/category.service';
import { Router, ActivatedRoute } from '@angular/router';
declare const showMessage:any;
@Component({
  selector: 'app-category-edition',
  templateUrl: './category-edition.component.html',
  styleUrls: ['./category-edition.component.css']
})
export class CategoryEditionComponent implements OnInit {

  fgValidator: FormGroup;
  nameMinLength = FormsConfig.PARAM_NAME_MIN_LENGTH;
  codeMinLength = FormsConfig.PARAM_CODE_MIN_LENGTH;
  id: String;
  


  constructor(
    private fb:FormBuilder, 
    private service: CategoryService,
    private router: Router,
    private route: ActivatedRoute) { 
    this.id = this.route.snapshot.params["id"];

    }
  
  ngOnInit(): void {
    this.FormBuilding();
    this.getDataOfRecord();
    
  }
  FormBuilding(){
    this.fgValidator = this.fb.group({
      id: ['', [Validators.required]],
      code: ['', [Validators.required, Validators.minLength(this.codeMinLength)]],
      name: ['',[Validators.required, Validators.minLength(this.nameMinLength)]]

    });
  }
  
  getDataOfRecord(){
    if(this.id){
      this.service.getRecordById(this.id).subscribe(
        data =>{
          this.fgv.id.setValue(data.id);
          this.fgv.code.setValue(data.code);
          this.fgv.name.setValue(data.name);
        },
        error => {
          showMessage("Record not found");
          this.router.navigate(["/parameters/category-list"]);
        }
      );
    }else{
      this.router.navigate(["/parameters/category-list"]);
    }
    this.fgv.id.setValue(this.id);
  }

  EditRecordFn(){
    if(this.fgValidator.invalid){
      showMessage("invalid form");
   
    }else{
      let model = this.getCategoryData();
      this.service.EditRecord(model).subscribe(
        data =>{
          showMessage(" Record update succesfuly");
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
    model.id = this.fgv.id.value;
    model.name = this.fgv.name.value;
    model.code = this.fgv.code.value;
  
    return model;
  }
  get fgv(){
    return this.fgValidator.controls;
  }
}
  