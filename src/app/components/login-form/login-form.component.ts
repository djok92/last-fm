import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  private regForm: FormGroup;
  private email: FormControl;
  private password: FormControl;

  

  @Input() login: boolean;
  @Output() emitFormValues = new EventEmitter();
  

  constructor(private formBuilder: FormBuilder) { 
    this.email = new FormControl();
    this.password = new FormControl();

    this.regForm = this.formBuilder.group({
      email: this.email,
      password: this.password
    })
  }

  ngOnInit() {
  }

  sendFormValues() {
    this.emitFormValues.emit(this.regForm.value);
  }

}
