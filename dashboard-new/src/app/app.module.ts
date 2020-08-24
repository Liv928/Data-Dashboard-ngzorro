import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IconsProviderModule } from './icons-provider.module';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NZ_I18N } from 'ng-zorro-antd/i18n';
import { en_US } from 'ng-zorro-antd/i18n';
import { registerLocaleData } from '@angular/common';
import en from '@angular/common/locales/en';

import { HighchartsChartModule } from 'highcharts-angular';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzModalRef, NzModalService } from 'ng-zorro-antd/modal';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzInputModule } from 'ng-zorro-antd/input';
import { FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { NzRadioModule } from 'ng-zorro-antd/radio';
import { NZ_ICONS } from 'ng-zorro-antd/icon';
import { IconDefinition } from '@ant-design/icons-angular';
import * as AllIcons from '@ant-design/icons-angular/icons';
import { NzPopconfirmModule } from 'ng-zorro-antd/popconfirm';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCardModule } from 'ng-zorro-antd/card';

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

const antDesignIcons = AllIcons as {
  [key: string]: IconDefinition;
};
const icons: IconDefinition[] = Object.keys(antDesignIcons).map(key => antDesignIcons[key])

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
    HttpClientModule,  
    HighchartsChartModule,
    NzDropDownModule,
    NzSelectModule,
    NzButtonModule,
    NzFormModule,
    NzInputModule,
    FormsModule,
    ReactiveFormsModule,
    NzDatePickerModule,
    NzRadioModule,
    NzPopconfirmModule,
    NzCollapseModule,
    NzStatisticModule,
    NzCardModule
  ],
  providers: [{ provide: NZ_I18N, useValue: en_US }, NzModalService, { provide: NZ_ICONS, useValue: icons }],
  bootstrap: [AppComponent]
})
export class AppModule { }
