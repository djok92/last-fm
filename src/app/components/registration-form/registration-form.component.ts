import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms'


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  private regForm: FormGroup;
  private userName: FormControl;
  private name: FormControl;
  private lastName: FormControl;
  private email: FormControl;
  private password: FormControl;
  private age: FormControl;

  @Input() registration: boolean;
  @Output() emitFormValues = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { 
    this.userName = new FormControl();
    this.name = new FormControl();
    this.lastName = new FormControl();
    this.email = new FormControl();
    this.password = new FormControl();
    this.age = new FormControl();

    this.regForm = this.formBuilder.group({
      userName: this.userName,
      name: this.name,
      lastName: this.lastName,
      email: this.email,
      password: this.password,
      age: this.age
    })
  }

  ngOnInit() {
  }

  sendFormValues() {
    this.emitFormValues.emit(this.regForm.value);
  }

}
