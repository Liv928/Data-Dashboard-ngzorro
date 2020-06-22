import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { HighchartsChartModule } from 'highcharts-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';

import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { MatNativeDateModule } from '@angular/material/core';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatGridListModule} from '@angular/material/grid-list';
import { MatDialogModule} from '@angular/material/dialog';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';

import { HomeComponent } from './pages/home/home.component';
import { MiscComponent } from './pages/misc/misc.component';
import { FnbComponent } from './pages/fnb/fnb.component';
import { OhrComponent } from './pages/ohr/ohr.component';
import { MsbComponent } from './pages/msb/msb.component';
import { WssbComponent } from './pages/wssb/wssb.component';
import { AddEventComponent } from './dialog/add-event/add-event.component';
import { AddMetadataComponent } from './dialog/add-metadata/add-metadata.component';
import { EditEventComponent } from './dialog/edit-event/edit-event.component';
import { EditMetadataComponent } from './dialog/edit-metadata/edit-metadata.component';
import { DeleteEventComponent } from './dialog/delete-event/delete-event.component';
import { DeleteMetadataComponent } from './dialog/delete-metadata/delete-metadata.component';
import { AddSensorsComponent } from './dialog/add-sensors/add-sensors.component';



registerLocaleData(en);

@NgModule({
  declarations: [
    AppComponent,
    MiscComponent,
    HomeComponent,
    FnbComponent,
    OhrComponent,
    MsbComponent,
    WssbComponent,
    AddEventComponent,
    AddMetadataComponent,
    EditEventComponent,
    EditMetadataComponent,
    DeleteEventComponent,
    DeleteMetadataComponent,
    AddSensorsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    IconsProviderModule,
    NzLayoutModule,
    NzMenuModule,
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    HighchartsChartModule,
    NzGridModule,
    MatToolbarModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    HighchartsChartModule,
    MatDialogModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatCheckboxModule,
    MatGridListModule,
    NzDropDownModule,
    NzSelectModule 
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }],
  bootstrap: [AppComponent]
})
export class AppModule { }
