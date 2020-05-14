import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';


import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { BookListComponent } from './books/book-list.component';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { StoreModule } from '@ngrx/store';
import * as fromApp from './store/app.reducer';
import { FavoritesComponent } from './books/favorites/favorites.component';
import { DescriptionLimitPipe } from './pipes/description-limit.pipe';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    BookListComponent,
    BookDetailsComponent,
    FavoritesComponent,
    DescriptionLimitPipe
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    StoreModule.forRoot(fromApp.appReducer)
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
