import { NgModule , CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashboardRoutingModule } from './dashboard-routing.module';
import { LayoutComponent } from './layout/layout.component';

import {NgxPaginationModule} from 'ngx-pagination';

@NgModule({
  declarations: [
    LayoutComponent,
    
  ],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
  
  imports: [
    CommonModule,
    DashboardRoutingModule,
    NgxPaginationModule
  ]
})
export class DashboardModule { }
