import { Inject, Input, NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './layout/layout.component';
import { DashboardRoutingModule } from './dashboard-routing.module';
import { ListTasksComponent } from './tasks/components/list-tasks/list-tasks.component';



@NgModule({
  declarations: [
    LayoutComponent,
    
    
  ],
  imports: [
    CommonModule,
    DashboardRoutingModule,

  ]
})
export class DashboardModule { }
