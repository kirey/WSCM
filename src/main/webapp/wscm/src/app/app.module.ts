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
import { MaterialModule } from './material.module';

// Services
import { ClassLoadingCategoriesService } from './admin-panel/class-loading-categories/class-loading-categories.service';
import { AuthGuard } from './admin-panel/shared/guards/auth.guard';
import { PanelService } from './admin-panel/panel/panel.service';
import { AuthService } from './admin-panel/shared/services/auth.service';
import { LoginService } from './admin-panel/login/login.service';
import { EventsService } from './admin-panel/events/events.service';
import { ClientService } from './client/client-home/client-home.service';
import { SocketService } from './client/shared/services/socket.service';
import { EditEventService } from './admin-panel/shared/dialogs/edit-event-dialog/edit-event-dialog.service';
import { AddEventService } from './admin-panel/shared/dialogs/add-event-dialog/add-event-dialog.service';
import { JobsService } from './admin-panel/jobs/jobs.service';
import { AddJobService } from './admin-panel/shared/dialogs/add-job-dialog/add-job-dialog.service';
import { EditJobService } from './admin-panel/shared/dialogs/edit-job-dialog/edit-job-dialog.service';
// import { EventHistoryService } from './shared/dialogs/event-history-dialog/event-history-dialog.service';



// Pipes
import { FilterPipe } from './admin-panel/shared/pipes/filter.pipe';

// Components
import { PanelComponent } from './admin-panel/panel/panel.component';
import { AppComponent } from './app.component';
import { ContentComponent } from './admin-panel/content/content.component';
import { HomeComponent } from './admin-panel/home/home.component';
import { LoginComponent } from './admin-panel/login/login.component';
import { LanguagesComponent } from './admin-panel/languages/languages.component';
import { EventsComponent } from './admin-panel/events/events.component';
import { DeleteDialog } from './admin-panel/shared/dialogs/delete-dialog/delete-dialog.component';
import { ClientHomeComponent } from './client/client-home/client-home.component';
import { JobsComponent } from './admin-panel/jobs/jobs.component';
import { EditEventDialogComponent } from './admin-panel/shared/dialogs/edit-event-dialog/edit-event-dialog.component';
import { AddContentDialogComponent } from './admin-panel/shared/dialogs/add-content-dialog/add-content-dialog.component';
import { EditContentDialogComponent } from './admin-panel/shared/dialogs/edit-content-dialog/edit-content-dialog.component';
import { AddEventDialogComponent } from './admin-panel/shared/dialogs/add-event-dialog/add-event-dialog.component';
import { MailRedirectComponent } from './client/mail-redirect/mail-redirect.component';
import { ClassLoadingComponent } from './admin-panel/class-loading/class-loading.component';
import { ClassLoadingCategoriesComponent } from './admin-panel/class-loading-categories/class-loading-categories.component';
import { AddCategoryDialogComponent } from './admin-panel/shared/dialogs/add-category-dialog/add-category-dialog.component';
import { EditCategoryDialogComponent } from './admin-panel/shared/dialogs/edit-category-dialog/edit-category-dialog.component';
import { AddJobDialogComponent } from './admin-panel/shared/dialogs/add-job-dialog/add-job-dialog.component';
import { AddClassDialogComponent } from './admin-panel/shared/dialogs/add-class-dialog/add-class-dialog.component';
import { EditClassDialogComponent } from './admin-panel/shared/dialogs/edit-class-dialog/edit-class-dialog.component';
import { EditJobDialogComponent } from './admin-panel/shared/dialogs/edit-job-dialog/edit-job-dialog.component';
import { ReportsComponent } from './admin-panel/reports/reports.component';
import { EventHistoryComponent } from './admin-panel/shared/dialogs/event-history-dialog/event-history.component';
import { EditParameterDialogComponent } from './admin-panel/shared/dialogs/edit-parameter-dialog/edit-parameter-dialog.component';
import { JobsHistoryDialogComponent } from './admin-panel/shared/dialogs/jobs-history-dialog/jobs-history-dialog.component';


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
    ClientHomeComponent,
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
    ReportsComponent,
    EventHistoryComponent,
    EditParameterDialogComponent,
    JobsHistoryDialogComponent
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
    ClassLoadingCategoriesComponent,
    EditCategoryDialogComponent,
    AddJobDialogComponent,
    EditJobDialogComponent,
    EventHistoryComponent,
    EditParameterDialogComponent,
    JobsHistoryDialogComponent,
    EditClassDialogComponent
  ],
  bootstrap: [AppComponent],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class AppModule { }
