import { NgModule  , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ToastrModule } from 'ngx-toastr';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './material/material.module';
import { RouterModule } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { UsersComponent } from './dashboard/manage-users/components/users/users.component';
import { NgxSpinnerModule } from "ngx-spinner";
import { CoreModule } from './core/core.module';
import {NgxPaginationModule} from 'ngx-pagination'; 
import { ListTasksComponent } from 'projects/user/src/app/dashboard/tasks/components/list-tasks/list-tasks.component';


@NgModule({
  declarations: [
    AppComponent,
    ListTasksComponent,
    
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),
    NgxSpinnerModule.forRoot({ type: 'ball-scale-multiple' }),
    CoreModule,
    
    BrowserAnimationsModule,
    NgxPaginationModule
  ],


  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
