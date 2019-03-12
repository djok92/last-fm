import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'


@Component({
  selector: 'app-registration-form',
  templateUrl: './registration-form.component.html',
  styleUrls: ['./registration-form.component.scss']
})
export class RegistrationFormComponent implements OnInit {

  private registrationForm: FormGroup;

  @Input() registration: boolean;
  @Output() emitFormValues = new EventEmitter();

  constructor(private formBuilder: FormBuilder) { 

    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      name: ['', Validators.required],
      lastName: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(10)]]
    })
  }

  ngOnInit() {
    // this.registrationForm.valueChanges.subscribe(res => {
    //   console.log(this.registrationForm.controls.email)
    // })
  }

  sendFormValues() {
    this.emitFormValues.emit(this.registrationForm.value);
  }

}
