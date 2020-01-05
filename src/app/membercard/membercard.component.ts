import { Component, Input, OnInit } from '@angular/core';
import { Member } from '../model/member.model';

@Component({
  selector: 'app-membercard',
  templateUrl: './membercard.component.html',
  styleUrls: ['./membercard.component.scss'],
})
export class MembercardComponent implements OnInit {
  @Input() member: Member;

  constructor() {}

  ngOnInit() {}
}
