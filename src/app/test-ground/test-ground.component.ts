import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-test-ground',
  templateUrl: './test-ground.component.html',
  styleUrls: ['./test-ground.component.scss']
})
export class TestGroundComponent implements OnInit {

  constructor(
    private _router: Router
  ) { }

  ngOnInit() {
  }


  test(){
    this._router.navigateByUrl('europa-auswahl');
  }

  clickWorld(){
    this._router.navigateByUrl('world');
  }

  clickEuropa(){
    this._router.navigateByUrl('europa-auswahl');
  }

}
