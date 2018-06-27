import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutes } from './app.routes';

// Modules
import { MaterialModule } from './shared/modules/material.module';

// Services
import { AuthGuard } from './shared/guards/auth.guard';
import { PanelService } from './panel/panel.service';
import { AuthService } from './shared/services/auth.service';
import { LoginService } from './login/login.service';
import { SchedulerService } from './scheduler/scheduler.service';
import { AddJobService } from './shared/components/add-job/addJob.service';
import { EditJobService } from './shared/components/edit-job/edit-job.service';
import { AddNewPositionService } from './shared/components/add-new-position/add-new-position.service';
import { ClientService } from './client/client.service';

// Pipes
import { FilterPipe } from './shared/pipes/filter.pipe';

// Components
import { PanelComponent } from './panel/panel.component';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LanguagesComponent } from './languages/languages.component';
import { SchedulerComponent } from './scheduler/scheduler.component';
import { DeleteDialog } from './shared/dialogs/delete-dialog/delete-dialog.component';
import { AddJobComponent } from './shared/components/add-job/add-job.component';
import { EditJobComponent } from './shared/components/edit-job/edit-job.component';
import { AddNewPositionComponent } from './shared/components/add-new-position/add-new-position.component';
import { ClientComponent } from './client/client.component';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ContentComponent,
    HomeComponent,
    LoginComponent,
    LanguagesComponent,
    FilterPipe,
    SchedulerComponent,
    DeleteDialog,
    AddJobComponent,
    EditJobComponent,
    AddNewPositionComponent,
    ClientComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutes,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    PanelService, AuthGuard, AuthService, LoginService, SchedulerService, AddJobService, EditJobService, AddNewPositionService,ClientService
  ],
  entryComponents: [
    DeleteDialog
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
