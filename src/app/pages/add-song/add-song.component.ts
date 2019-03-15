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
import { BehaviorSubject, ReplaySubject, Observable } from 'rxjs';

@Component({
  selector: 'app-add-song',
  templateUrl: './add-song.component.html',
  styleUrls: ['./add-song.component.scss']
})
export class AddSongComponent implements OnInit {
  private addSongForm: FormGroup;
  tagNames: string[] = [];

  private _addedTracks$: BehaviorSubject<Track[]> = new BehaviorSubject<
    Track[]
  >([]);

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
    private validationService: ValidationService
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
  }

  getTags() {
    this.musicService.getTags().subscribe((res: string[]) => {
      this.tagNames = res;
      this.addCheckboxes(res);
    });
  }

  private checkSubmit() {
    if (this.addSongForm.valid) {
      this.addTrack();
    } else {
      this.validationService.validateAllFormFields(this.addSongForm);
    }
  }

  addTrack() {
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
    const newSong = [];
    newSong.push(track);
    // this.musicService._tracks$.next([...this.musicService._tracks$.value, ...newSong]);
    // console.log(this.musicService._tracks$);
  }

  private addCheckboxes(res: any[]) {
    res.forEach((tag: string) => {
      const control = new FormControl(false);
      (this.addSongForm.controls.tags as FormArray).push(control);
    });
  }
}

// stao si ovde, vidi sta sa ovim responseom i sta dalje, da li ide u servis i gde se kreira nova instance trake
// i gde se cuva ta novokreirana traka
