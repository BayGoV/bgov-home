import { Component, Input, OnInit } from '@angular/core';
import { Preference } from '../model/preference.model';
import { PreferencesService } from '../preferences.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-preferencecard',
  templateUrl: './preferencecard.component.html',
  styleUrls: ['./preferencecard.component.scss'],
})
export class PreferencecardComponent implements OnInit {
  @Input() preference$: Observable<Preference>;
  editBackupEmail;

  constructor(private preferenceService: PreferencesService) {}

  ngOnInit() {}

  change(preference) {
    delete preference.s;
    this.preferenceService.update(preference);
  }
}
