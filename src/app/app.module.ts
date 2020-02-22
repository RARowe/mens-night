import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReadFileComponent } from './read-file/read-file.component';
import { ContestantGridComponent } from './contestant-grid/contestant-grid.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadFileComponent,
    ContestantGridComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
