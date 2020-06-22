import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {MiscComponent} from './pages/misc/misc.component';
import { HomeComponent } from './pages/home/home.component';
import { WssbComponent } from './pages/wssb/wssb.component';
import { MsbComponent } from './pages/msb/msb.component';
import { OhrComponent } from './pages/ohr/ohr.component';
import { FnbComponent } from './pages/fnb/fnb.component';

const routes: Routes = [ 
  { path: 'home', component: HomeComponent},
  { path: 'misc', component: MiscComponent },
  { path: 'fnb', component: FnbComponent },
  { path: 'ohr', component: OhrComponent },
  { path: 'msb', component: MsbComponent},
  { path: 'wssb', component:WssbComponent},
  { path: '', redirectTo: '/home', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
