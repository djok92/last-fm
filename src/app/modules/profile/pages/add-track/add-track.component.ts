import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray
} from '@angular/forms';
import { MusicService } from 'src/app/services/music.service';
import { Track } from 'src/app/classes/track';
import { ValidationService } from 'src/app/services/validation.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-track',
  templateUrl: './add-track.component.html',
  styleUrls: ['./add-track.component.scss']
})
export class AddTrackComponent implements OnInit {
  addSongForm: FormGroup;
  tagNames: string[] = [];

  uploading = false;

  get songNameControl() {
    return this.addSongForm.controls.songName;
  }

  get artistNameControl() {
    return this.addSongForm.controls.artistName;
  }

  get tagsControl() {
    return this.addSongForm.controls.tags;
  }

  get durationControl() {
    return this.addSongForm.controls.duration;
  }

  get artistUrlControl() {
    return this.addSongForm.controls.artistUrl;
  }

  constructor(
    private formBuilder: FormBuilder,
    private musicService: MusicService,
    private validationService: ValidationService,
    private router: Router
  ) {
    this.addSongForm = this.formBuilder.group({
      songName: ['', [Validators.required]],
      artistName: ['', [Validators.required]],
      tags: new FormArray([]),
      duration: [''],
      artistUrl: ['']
    });
  }

  ngOnInit() {
    this.getTags();
    console.log(this.addSongForm);
  }

  getTags() {
    this.musicService.getTags().subscribe((res: string[]) => {
      this.tagNames = res;
      this.addCheckboxes(res);
    });
  }

  checkSubmit() {
    if (this.addSongForm.valid) {
      this.addTrack();
    } else {
      this.validationService.validateAllFormFields(this.addSongForm);
    }
  }

  addTrack() {
    this.uploading = true;
    const track = new Track({
      name: this.addSongForm.value.songName,
      artist: this.addSongForm.value.artistName,
      tags: this.tagNames.filter((item: string, index: number) => {
        if (this.addSongForm.value.tags[index]) {
          return item;
        }
      }),
      link: this.addSongForm.value.artistUrl,
      duration: this.addSongForm.value.duration
    });
    this.musicService.addTrack(track).subscribe((uploaded: boolean) => {
      console.log('track uploaded?', uploaded);
      this.uploading = !uploaded;
      this.router.navigate(['/home']);
    });
  }

  private addCheckboxes(res: any[]) {
    res.forEach((tag: string) => {
      const control = new FormControl(false);
      (this.addSongForm.controls.tags as FormArray).push(control);
    });
  }
}
