import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import {FormBuilder, FormControl, FormGroup, ReactiveFormsModule, FormsModule} from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { EuropaAuswahlComponent } from './europa-auswahl/europa-auswahl.component';
import { WorldComponent } from './world/world.component';
import { GermanyComponent } from './germany/germany.component';
import { EuropaComponent } from './europa/europa.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { TestGroundComponent } from './test-ground/test-ground.component';
import { ScriptService } from './script.service';
import { GeoDataService } from './geodata.service';
import { HttpClientModule} from '@angular/common/http'
import { HelperService } from './helper.service';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    EuropaAuswahlComponent,
    WorldComponent,
    GermanyComponent,
    EuropaComponent,
    PageNotFoundComponent,
    TestGroundComponent,
    FooterComponent,
    HeaderComponent,
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule
    
  ],
  providers: [
    ScriptService,
    GeoDataService,
    HelperService,
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
