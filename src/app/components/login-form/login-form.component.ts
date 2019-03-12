import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder, Validators} from '@angular/forms'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private loginForm: FormGroup;

  @Input() login: boolean;
  @Output() emitFormValues = new EventEmitter();
  

  constructor(private formBuilder: FormBuilder) { 
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: ['', Validators.compose([Validators.required, Validators.minLength(6), Validators.maxLength(20)])]
    });
  }

  ngOnInit() {
  }

  private sendFormValues() {
    this.emitFormValues.emit(this.loginForm.value);
  }

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

  private checkLoginUser() {
    if(this.loginForm.valid) {
      this.sendFormValues()
    } else {
      this.validateAllFormFields(this.loginForm);
    }
  }


}
