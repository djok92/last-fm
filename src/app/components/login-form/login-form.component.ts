import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormControl, FormGroup, FormBuilder} from '@angular/forms'

@Component({
  selector: 'app-login-form',
  templateUrl: './login-form.component.html',
  styleUrls: ['./login-form.component.scss']
})
export class LoginFormComponent implements OnInit {

  

  @Input() login: boolean;
  

  constructor(private formBuilder: FormBuilder) { 
    
  }

  ngOnInit() {
  }

}
