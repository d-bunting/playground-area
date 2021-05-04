import { NgModule, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { IdeaCreateComponent } from './components/idea-create/idea-create.component';
import { IdeaItemComponent } from './components/idea-item/idea-item.component';
import { IdeaListComponent } from './components/idea-list/idea-list.component';
import { IdeaBoardComponent } from './components/idea-board/idea-board.component';
import { IdeaActionsComponent } from './components/idea-actions/idea-actions.component';
import { ShowForDurationDirective } from './directives/show-for-duration.directive';

@NgModule({
  declarations: [
    AppComponent,
    IdeaCreateComponent,
    IdeaItemComponent,
    IdeaListComponent,
    IdeaBoardComponent,
    IdeaActionsComponent,
    ShowForDurationDirective,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  schemas: [
    CUSTOM_ELEMENTS_SCHEMA
  ],
})
export class AppModule { }
