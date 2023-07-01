import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatMenuModule} from '@angular/material/menu';
import { HttpClientModule, HTTP_INTERCEPTORS } from "@angular/common/http";
import {MatTabsModule} from '@angular/material/tabs';
import {MatIconModule} from '@angular/material/icon';
import { CardComponent } from './card/card.component';
import { ElectronicEducationalResourcesComponent } from './electronic-educational-resources/electronic-educational-resources.component';
import { FeedbackComponent } from './feedback/feedback.component';
import { MainComponent } from './main/main.component';
import { MethodComponent } from './method/method.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { PhotoComponent } from './photo/photo.component';

import { RecordComponent } from './record/record.component';
import { AppRoutingModule } from './app-routing.module';
import { EnterComponent } from './enter/enter.component';
import { TokenInterceptor } from './_tools/token.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { AdminComponent } from './admin/admin.component';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { TempComponent } from './temp/temp.component';
import {FormsModule} from '@angular/forms';
import {TextFieldModule} from '@angular/cdk/text-field';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';





@NgModule({
  declarations: [
    AppComponent,
    CardComponent,
    ElectronicEducationalResourcesComponent,
    FeedbackComponent,
    MainComponent,
    MethodComponent,
    NotFoundComponent,
    PhotoComponent,

    RecordComponent,
    EnterComponent,
    AdminComponent,
    TempComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MatIconModule,
    MatMenuModule,
    HttpClientModule,
    ReactiveFormsModule,
    MatTabsModule,
    MatProgressSpinnerModule,
    FormsModule,
    TextFieldModule,
    MatSidenavModule,
    MatListModule
  ],
  providers: [{
    provide:HTTP_INTERCEPTORS,
    multi:true,
    useClass:TokenInterceptor
}],
  bootstrap: [AppComponent]
})
export class AppModule { }
