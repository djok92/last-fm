import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators
} from '@angular/forms';
@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  private addSongForm: FormGroup;

  get songNameControl() {
    return this.addSongForm.controls.songName;
  }

  get artistNameControl() {
    return this.addSongForm.controls.artistName;
  }

  get tagsControl() {
    return this.addSongForm.controls.tags;
  }

  get genreControl() {
    return this.addSongForm.controls.genre;
  }

  constructor(private formBuilder: FormBuilder) {
    this.addSongForm = this.formBuilder.group({
      songName: ['', [Validators.required]],
      artistName: ['', [Validators.required]],
      tags: ['', [Validators.required]],
      genre: ['', [Validators.required]]
    });
  }

  ngOnInit() {}

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

  private checkSubmit() {
    if (this.addSongForm.valid) {
      console.log('all ok!');
    } else {
      this.validateAllFormFields(this.addSongForm);
    }
  }
}
