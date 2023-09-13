import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MaterialModule } from './shared/material.module';
import { EmployeeCreateUpdateComponent } from './components/employee/employee-create-update/employee-create-update.component';
import { EmployeeListComponent } from './components/employee/employee-list/employee-list.component';
import { AvatarPipe } from './configs/pipe/avatar.pipe';
import { EmployeeDetailsComponent } from './components/employee/employee-details/employee-details.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeCreateUpdateComponent,
    EmployeeListComponent,
    AvatarPipe,
    EmployeeDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
