import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EuropaAuswahlComponent } from './europa-auswahl.component';

describe('EuropaAuswahlComponent', () => {
  let component: EuropaAuswahlComponent;
  let fixture: ComponentFixture<EuropaAuswahlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EuropaAuswahlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EuropaAuswahlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
