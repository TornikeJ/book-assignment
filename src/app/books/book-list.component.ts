import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { IBookModel } from '../model/bookModel';
import * as fromApp from '../store/app.reducer';
import { Store, createAction } from '@ngrx/store';
import { take } from 'rxjs/operators';
import * as BookActions from './store/book.actions';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';
import { BookService } from './book.service';
import { BookListResolver } from './book-list.resolver.service';

@Component({
  selector: 'app-book-list',
  templateUrl: './book-list.component.html',
  styleUrls: ['./book-list.component.scss']
})

export class BookListComponent implements OnInit, OnDestroy {

  books: IBookModel[] = [];
  isInFavorites: boolean[] = [];
  subscription: Subscription;
  booksOnPage: number = 0;

  constructor(
    private bookListResolver: BookListResolver,
    private bookService: BookService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>,
    private router: Router) { }

  ngOnInit(): void {
    this.route.snapshot.data['bookList'].items.forEach(response => {
      this.handleBooks(response);
    });

    this.subscription = this.store
      .select('books')
      .pipe(map(booksState => booksState.books))
      .subscribe(
        (favoriteBooks: IBookModel[]) => {
          if (favoriteBooks.length < 1) {
            this.isInFavorites = this.isInFavorites.map(book => book = false);
          } else {
            this.isInFavorites = this.isInFavorites.map(book => book = false);
            favoriteBooks.forEach(favoriteBook => {
              const index = this.books.findIndex(book => book.id === favoriteBook.id);
              this.isInFavorites[index] = true;
            });
          }
        });
  }

  chooseAction(isInFavorites: boolean, book: IBookModel) {
    if (isInFavorites) {
      this.RemoveFromFavorites(book.id);
    } else {
      this.AddToFavorites(book);
    }
  }

  AddToFavorites(book: IBookModel) {
    this.store.dispatch(new BookActions.AddToFavorite(book));
  }

  RemoveFromFavorites(id: string) {
    this.store.dispatch(new BookActions.RemoveFromFavorite(id));
  }

  loadMore() {
    this.booksOnPage += 10;
    this.bookService.getBooks(this.booksOnPage).pipe(take(1)).subscribe(response => {
      const items = response['items'];
      items.forEach(response => {
        this.handleBooks(response);
      });
      this.store.dispatch(new BookActions.ReloadState());
    });

  }

  handleBooks(response) {
    const volumeInfo = response['volumeInfo'];

    const book: IBookModel = {
      id: response['id'],
      title: volumeInfo['title'],
      description: volumeInfo['description'],
      authors: volumeInfo['authors'],
      publishedDate: volumeInfo['publishedDate'],
      categories: volumeInfo['categories'],
      imageLinks: volumeInfo['imageLinks'],
      pageCount: volumeInfo['pageCount']
    };

    this.books.push(book);
    this.isInFavorites.push(false);
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
