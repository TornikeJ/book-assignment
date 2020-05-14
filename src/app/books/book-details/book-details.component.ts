import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { BookService } from '../book.service';
import { IBookModel } from '../../model/bookModel';
import * as fromApp from '../../store/app.reducer';
import { Store } from '@ngrx/store';
import * as BookActions from '../store/book.actions';
import { Subscription } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-book-details',
  templateUrl: './book-details.component.html',
  styleUrls: ['./book-details.component.scss']
})

export class BookDetailsComponent implements OnInit, OnDestroy {

  book: IBookModel = null;
  id: string;
  subscription: Subscription;
  isInFavorites = false;


  constructor(
    private bookService: BookService,
    private route: ActivatedRoute,
    private store: Store<fromApp.AppState>) { }

  ngOnInit(): void {
    this.route.params.subscribe(param => {
      this.id = param['bookId'];

      this.bookService.getVolume(this.id).subscribe((response) => {
        const volumeInfo = response['volumeInfo'];

        this.book = {
          id: response['id'],
          title: volumeInfo['title'],
          description: volumeInfo['description'],
          authors: volumeInfo['authors'],
          publishedDate: volumeInfo['publishedDate'],
          categories: volumeInfo['categories'],
          imageLinks: volumeInfo['imageLinks'],
          pageCount: volumeInfo['pageCount']
        };
      });
    });

    this.subscription = this.store
      .select('books')
      .pipe(map(booksState => booksState.books))
      .subscribe(
        (favoriteBooks: IBookModel[]) => {
          this.isInFavorites = !!favoriteBooks.find(book => {
            return book.id === this.id;
          });
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

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
