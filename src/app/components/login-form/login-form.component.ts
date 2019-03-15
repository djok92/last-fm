import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
import { ValidationService } from 'src/app/services/validation.service';

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {
  private loginForm: FormGroup;

  @Input() login: boolean;
  @Output() emitFormValues = new EventEmitter();

  constructor(
    private formBuilder: FormBuilder,
    private validationService: ValidationService
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, Validators.email])],
      password: [
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(20)
        ])
      ]
    });
  }

  ngOnInit() {}

  private sendFormValues() {
    this.emitFormValues.emit(this.loginForm.value);
  }

  private checkLoginUser() {
    if (this.loginForm.valid) {
      this.sendFormValues();
    } else {
      this.validationService.validateAllFormFields(this.loginForm);
    }
  }
}
