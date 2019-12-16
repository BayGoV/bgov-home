import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  private links = ['DGob', 'Datenschutz', 'Impressum', 'Kontakt'];

  constructor() {
  }

  ngOnInit() {
  }

}
