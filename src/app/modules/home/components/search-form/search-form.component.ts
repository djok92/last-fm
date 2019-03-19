import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-search-form',
  templateUrl: './search-form.component.html',
  styleUrls: ['./search-form.component.scss']
})
export class SearchFormComponent implements OnInit {
  regForm: FormGroup;
  private country: FormControl;

  constructor(private formBuilder: FormBuilder) {
    this.country = new FormControl();
    this.regForm = formBuilder.group({
      country: this.country
    });
  }

  @Output() emitFormValues = new EventEmitter();

  ngOnInit() {}

  sendFormValues() {
    // ovako, ne praviti novi objekat
    this.emitFormValues.emit(this.regForm.value);
  }
}
