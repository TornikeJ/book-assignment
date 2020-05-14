import { Component, OnInit, OnDestroy } from '@angular/core';
import { IBookModel } from '../../model/bookModel';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookService } from '../book.service';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import * as BookActions from '../store/book.actions';

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss', '../book-list.component.scss']
})
export class FavoritesComponent implements OnInit, OnDestroy {

  books: IBookModel[];
  subscription: Subscription;

  constructor(private bookService: BookService, private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.subscription = this.store
      .select('books')
      .pipe(map(booksState => booksState.books))
      .subscribe(
        (books: IBookModel[]) => {
          this.books = books;
        });
  }

  RemoveFromFavorites(id: string) {
    this.store.dispatch(new BookActions.RemoveFromFavorite(id));
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
