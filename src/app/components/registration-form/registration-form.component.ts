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

  get userNameControl() {
    return this.registrationForm.controls.userName;
  }

  constructor(private formBuilder: FormBuilder) { 

    this.registrationForm = this.formBuilder.group({
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(20)]],
      name: ['', [Validators.required, Validators.minLength(1)]],
      lastName: ['', [Validators.required, Validators.minLength(1)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(20)]],
      age: ['', [Validators.required, Validators.min(10)]]
    })
  }

  ngOnInit() {

  }

  //Custom function for looping trough all form controls
  private validateAllFormFields(formGroup: FormGroup) {        
    Object.keys(formGroup.controls).forEach(field => { 
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {             
        control.markAsTouched({ onlySelf: true });
      } else if (control instanceof FormGroup) {       
        this.validateAllFormFields(control);           
      }
    });
  }

  private sendFormValues() {
    this.emitFormValues.emit(this.registrationForm.value);
  }

  private checkRegisterUser() {
    if(this.registrationForm.valid) {
      this.sendFormValues()
    } else {
      this.validateAllFormFields(this.registrationForm);
    }
  }

}
