import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';

import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';

@NgModule({
  declarations: [AppComponent, GameComponent],
  imports: [BrowserModule, FormsModule, MatButtonModule],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
