import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

fgValidator: FormGroup;

  constructor(private fb:FormBuilder) { }

  ngOnInit(): void {
    this.fgValidator = this.fb.group({
      document: ['', [Validators.required, Validators.minLength(7)]],
      name: ['',[Validators.required, Validators.minLength(2)]],
      lastname: ['',[Validators.required, Validators.minLength(2)]]
    });
  }

}
