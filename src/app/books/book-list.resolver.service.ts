import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { BookService } from './book.service';

@Injectable({ providedIn: 'root' })

export class BookListResolver implements Resolve<any>{
  
    constructor(private booksService: BookService) { }

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        return this.booksService.getBooks();
    }
}