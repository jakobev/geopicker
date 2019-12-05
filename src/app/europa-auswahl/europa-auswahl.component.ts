import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-europa-auswahl',
  templateUrl: './europa-auswahl.component.html',
  styleUrls: ['./europa-auswahl.component.scss']
})
export class EuropaAuswahlComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  goToEuropa(){
    this._router.navigateByUrl('europa');
  }
  goToGermany(){
    this._router.navigateByUrl('germany');
  }

}
