import {Component, Input, OnInit} from '@angular/core';
import {Preference} from '../model/preference.model';
import {PreferencesService} from '../preferences.service';

@Component({
  selector: 'app-preferencecard',
  templateUrl: './preferencecard.component.html',
  styleUrls: ['./preferencecard.component.scss'],
})
export class PreferencecardComponent implements OnInit {
  @Input() preference: Preference;

  constructor(private preferenceService: PreferencesService) {
  }

  ngOnInit() {
  }

  change() {
    this.preferenceService.update(this.preference);
  }
}
