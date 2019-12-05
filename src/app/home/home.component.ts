import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router'; 

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(
    private _router: Router,
  ) { }

  ngOnInit() {
  }

  goToWorld(){
    this._router.navigateByUrl('world');
  }
  goToEuropeAuswahl(){
    this._router.navigateByUrl('europa-auswahl');
  }
}
