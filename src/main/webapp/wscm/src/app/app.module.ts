import { ClassLoadingCategoriesService } from './class-loading-categories/class-loading-categories.service';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule, Routes } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { HttpModule } from '@angular/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { AppRoutes } from './app.routes';

import 'hammerjs';


// Modules
import { MaterialModule } from './shared/modules/material.module';

// Services
import { AuthGuard } from './shared/guards/auth.guard';
import { PanelService } from './panel/panel.service';
import { AuthService } from './shared/services/auth.service';
import { LoginService } from './login/login.service';
import { EventsService } from './events/events.service';
import { ClientService } from './client/client.service';
import { SocketService } from './shared/services/socket.service';
import { EditEventService } from './shared/dialogs/edit-event-dialog/edit-event-dialog.service';
import { AddEventService } from './shared/dialogs/add-event-dialog/add-event-dialog.service';
import { JobsService } from './jobs/jobs.service';
import { AddJobService } from './shared/dialogs/add-job-dialog/add-job-dialog.service';
import { EditJobService } from './shared/dialogs/edit-job-dialog/edit-job-dialog.service';

// Pipes
import { FilterPipe } from './shared/pipes/filter.pipe';

// Components
import { PanelComponent } from './panel/panel.component';
import { AppComponent } from './app.component';
import { ContentComponent } from './content/content.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { LanguagesComponent } from './languages/languages.component';
import { EventsComponent } from './events/events.component';
import { DeleteDialog } from './shared/dialogs/delete-dialog/delete-dialog.component';
import { ClientComponent } from './client/client.component';
import { JobsComponent } from './jobs/jobs.component';
import { EditEventDialogComponent } from './shared/dialogs/edit-event-dialog/edit-event-dialog.component';
import { AddContentDialogComponent } from './shared/dialogs/add-content-dialog/add-content-dialog.component';
import { EditContentDialogComponent } from './shared/dialogs/edit-content-dialog/edit-content-dialog.component';
import { AddEventDialogComponent } from './shared/dialogs/add-event-dialog/add-event-dialog.component';
import { MailRedirectComponent } from './mail-redirect/mail-redirect.component';
import { ClassLoadingComponent } from './class-loading/class-loading.component';
import { ClassLoadingCategoriesComponent } from './class-loading-categories/class-loading-categories.component';
import { AddCategoryDialogComponent } from './shared/dialogs/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './shared/dialogs/edit-category-dialog/edit-category-dialog.component';
import { AddJobDialogComponent } from './shared/dialogs/add-job-dialog/add-job-dialog.component';
import { AddClassDialogComponent } from './shared/dialogs/add-class-dialog/add-class-dialog.component';
import { EditClassDialogComponent } from './shared/dialogs/edit-class-dialog/edit-class-dialog.component';
import { EditJobDialogComponent } from './shared/dialogs/edit-job-dialog/edit-job-dialog.component';
import { ReportsComponent } from './reports/reports.component';


@NgModule({
  declarations: [
    AppComponent,
    PanelComponent,
    ContentComponent,
    HomeComponent,
    LoginComponent,
    LanguagesComponent,
    FilterPipe,
    EventsComponent,
    DeleteDialog,
    ClientComponent,
    JobsComponent,
    EditEventDialogComponent,
    AddContentDialogComponent,
    EditContentDialogComponent,
    AddEventDialogComponent,
    MailRedirectComponent,
    ClassLoadingComponent,
    ClassLoadingCategoriesComponent,
    AddCategoryDialogComponent,
    EditCategoryDialogComponent,
    AddJobDialogComponent,
    EditJobDialogComponent,
    AddClassDialogComponent,
    EditClassDialogComponent,
    ReportsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutes,
    BrowserAnimationsModule,
    HttpModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    MaterialModule
  ],
  providers: [
    PanelService,
    AuthGuard,
    AuthService,
    LoginService,
    EventsService,
    ClientService,
    SocketService,
    EditEventService,
    AddEventService,
    JobsService,
    ClassLoadingCategoriesService,
    AddJobService,
    EditJobService
  ],
  entryComponents: [
    DeleteDialog,
    EditEventDialogComponent,
    AddContentDialogComponent,
    EditContentDialogComponent,
    AddEventDialogComponent,
    AddCategoryDialogComponent,
    AddClassDialogComponent,
    EditCategoryDialogComponent,
    AddJobDialogComponent,
    EditJobDialogComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
