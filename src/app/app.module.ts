import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';

import {MatTabsModule} from '@angular/material/tabs';
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {MatDialogModule} from '@angular/material/dialog';
import {MatIconModule} from '@angular/material/icon';
import { NgxWhastappButtonModule } from "ngx-whatsapp-button";
import {MatGridListModule} from '@angular/material/grid-list';
import {MatCardModule} from '@angular/material/card';

import {Home} from "../components/home/Home";
import {Modal_perfil} from "../components/Modal/Modal_perfil";
import {HttpClientModule} from "@angular/common/http";
import {MatInputModule} from "@angular/material/input";
import {FormsModule} from "@angular/forms";
import {MatPaginatorModule} from "@angular/material/paginator";
import {Pokemodal} from "../components/PokeModal/Pokemodal";

@NgModule({
  declarations: [
    AppComponent,
    Home,
    Modal_perfil,
    Pokemodal
  ],
  imports: [
    BrowserModule,
    MatTabsModule,
    BrowserAnimationsModule,
    MatDialogModule,
    MatIconModule,
    NgxWhastappButtonModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatInputModule,
    FormsModule,
    MatPaginatorModule
  ],
  entryComponents:[Modal_perfil],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
