import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private httpClient: HttpClient) {
  }

  getBooks(startIndex: number = 0) {
    return this.httpClient.get('https://www.googleapis.com/books/v1/volumes?q=subject:&startIndex=' + startIndex);
  }

  getVolume(id: string) {
    return this.httpClient.get(`https://www.googleapis.com/books/v1/volumes/${id}`);
  }

}
