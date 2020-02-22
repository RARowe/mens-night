import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { ReadFileComponent } from './read-file/read-file.component';
import { ContestantGridComponent } from './contestant-grid/contestant-grid.component';
import { GameService } from './game.service';
import { BillboardComponent } from './billboard/billboard.component';
import { ConfigService } from './config.service';
import { SettingsControlComponent } from './settings-control/settings-control.component';

@NgModule({
  declarations: [
    AppComponent,
    ReadFileComponent,
    ContestantGridComponent,
    BillboardComponent,
    SettingsControlComponent
  ],
  imports: [
    BrowserModule
  ],
  providers: [
      GameService,
      ConfigService
    ],
  bootstrap: [AppComponent]
})
export class AppModule { }
