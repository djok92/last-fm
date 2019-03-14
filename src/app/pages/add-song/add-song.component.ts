import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { MusicService } from 'src/app/services/music.service';
@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  private addSongForm: FormGroup;
  tagNames: string[] = [];
  checkBoxes: FormArray[] = [];

  get songNameControl() {
    return this.addSongForm.controls.songName;
  }

  get artistNameControl() {
    return this.addSongForm.controls.artistName;
  }

  get tagsControl() {
    return this.addSongForm.controls.tags;
  }

  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService
  ) {
    this.addSongForm = this.formBuilder.group({
      songName: ['', [Validators.required]],
      artistName: ['', [Validators.required]],
      tags: new FormArray([])
    });
  }

  ngOnInit() {
    this.getTags();
  }

  getTags() {
    this.musicService.getTags().subscribe((res: string[]) => {
      this.tagNames = res;
      this.addCheckboxes(res);
    });
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

  private checkSubmit() {
    if (this.addSongForm.valid) {
      const response = {
        songName: this.addSongForm.value.songName,
        artistName: this.addSongForm.value.artistName,
        tags: this.tagNames.filter((item, index) => {
          if (this.addSongForm.value.tags[index]) {
            return item;
          }
        })
      };
      console.log(response);
    } else {
      this.validateAllFormFields(this.addSongForm);
    }
  }

  private addCheckboxes(res) {
    res.forEach((tag: string) => {
      const control = new FormControl(false);
      (this.addSongForm.controls.tags as FormArray).push(control);
    });
    console.log(this.addSongForm.controls.tags);
  }
}
