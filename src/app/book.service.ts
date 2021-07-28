import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Book} from './app.component';

@Injectable({
  providedIn: 'root'
})
export class BookService {

  constructor(private http: HttpClient) { }

  get(): Observable<Book[]> {
    return this.http.get<Book[]>('http://localhost:3000/books');
  }

  post(book: Book): Observable<Book> {
    return this.http.post<Book>('http://localhost:3000/books', book);
  }

  patch(book, id): Observable<Book> {
    return this.http.patch<Book>(`http://localhost:3000/books/${id}`, book);
  }
  delete(book): Observable<any>{
    return this.http.delete<Book>(`http://localhost:3000/books/${book.id}`);
  }
}
