import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { BookListComponent } from './books/book-list.component';
import { BookListResolver } from './books/book-list.resolver.service';
import { BookDetailsComponent } from './books/book-details/book-details.component';
import { FavoritesComponent } from './books/favorites/favorites.component';


const routes: Routes = [
  { path: 'books', pathMatch: 'full', component: BookListComponent, resolve: { bookList: BookListResolver } },
  { path: 'books/:bookId', component: BookDetailsComponent },
  { path: 'favorites', component: FavoritesComponent },
  { path: '', pathMatch: 'full', redirectTo: '/books' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
