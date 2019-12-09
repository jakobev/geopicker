import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { TestGroundComponent } from './test-ground/test-ground.component';
import { EuropaAuswahlComponent } from './europa-auswahl/europa-auswahl.component';
import { WorldComponent } from './world/world.component';
import { EuropaComponent } from './europa/europa.component';
import { GermanyComponent } from './germany/germany.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent},
  { path: 'test', component: TestGroundComponent},
  { path: 'europa-auswahl', component: EuropaAuswahlComponent},
  {path: 'world', component: WorldComponent},
  { path: 'europa', component: EuropaComponent},
  { path: 'germany', component: GermanyComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent },
];
/**
 * {onSameUrlNavigation: 'reload'}
 */
@NgModule({
  imports: [RouterModule.forRoot(routes, )],
  exports: [RouterModule]
})
export class AppRoutingModule { }
