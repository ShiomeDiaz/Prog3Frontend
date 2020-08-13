import { Component, OnInit } from '@angular/core';
import {CategoryModel} from '../../../../models/parameters/category.model';
import {CategoryService} from '../../../../services/parameters/category.service';

import { FormsConfig } from 'src/app/config/forms-config';
import { NgxSpinnerService } from 'ngx-spinner';
import { Router, ActivatedRoute } from '@angular/router';

declare const showMessage: any;
declare const showRemoveConfirmationWindow: any;
declare const closeModal: any;

@Component({
  selector: 'app-category-list',
  templateUrl: './category-list.component.html',
  styleUrls: ['./category-list.component.css']
})
export class CategoryListComponent implements OnInit {
  page: number = 1;
  itemsPageAmount: number = FormsConfig.ITEMS_PER_PAGE;
  recordList: CategoryModel[];
  idToRemove: String = '';

  constructor(
    private service: CategoryService,
    private spinner: NgxSpinnerService,
    private router: Router,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.spinner.show();
    this.fillRecords();

  }

  fillRecords(){
    this.service.getAllRecords().subscribe(
      data =>{
        this.recordList = data;
        console.log(this.recordList);
        setTimeout(() => {
          /** spinner ends after 5 seconds */
          this.spinner.hide();
        }, 1000);
      },
      error =>{
        showMessage("There is an error with backend communication.");
      }
    );

  }
  RemoveConfirmation(id){
    this.idToRemove = id;
    showRemoveConfirmationWindow();

  }
  RemoveRecord(){
    closeModal('removeConfirmationModal');
    if(this.idToRemove){
      this.service.DeleteRecord(this.idToRemove).subscribe(
        data =>{
          this.idToRemove = '';
          showMessage(" Record update succesfuly");
          this.fillRecords();

        },
        error =>{
          showMessage("There is an error with backend communication.");
        }
      );
    }

  }

}
