import {Component, OnInit} from '@angular/core';
import { FormControl, FormGroup, Validators} from '@angular/forms';
import {BookService} from './book.service';
import {Subscription} from 'rxjs';


export interface Book {
  id?: number;
  title: string;
  description?: string;
  author: string;
  year: number;
  category: string;
}


@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'book-app';
  total = 10;
  bookForm: FormGroup;
  books: Book[] = [];
  book: Book = {author: '', category: '', title: '', year: 2021};
  categories: string[] = [ 'Fantasy', 'Sci-Fi', 'Mystery', 'Thriller', 'Romance', 'Westerns', 'Dystopian', 'Contemporary' ];
  constructor(private bookService: BookService) {}

  ngOnInit(): void {
    this.bookForm = new FormGroup({
      title: new FormControl(this.book.title, Validators.required),
      description: new FormControl(this.book.description),
      author: new FormControl(this.book.author, Validators.required),
      year: new FormControl(this.book.year, [Validators.required, Validators.maxLength(4), Validators.min(301), Validators.max(2021)] ),
      category: new FormControl(this.book.category, Validators.required),
    });
    this.getBooks();
  }

  getBooks() {
    this.bookService.get()
      .subscribe(books => {
        this.books = books;
      });
  }

  edit(book) {
    this.book = book;
    this.bookForm.setValue({
      author: book.author,
      category: book.category,
      title: book.title,
      year: book.year,
      description: book.description || ''});
  }
  delete(book) {
    this.bookService.delete(book)
      .subscribe(() => {
        this.getBooks();
      });
  }
  submit() {
    let req = this.bookService.post(this.bookForm.value);

    if (this.book && this.book.id) {
      req = this.bookService.patch(this.bookForm.value, this.book.id);
    }
    req
      .subscribe((book) => {
        this.getBooks();
        this.book = {author: '', category: '', title: '', year: 2021};
        this.bookForm.setValue({author: '', category: '', title: '', year: 2021});
      });
  }
}
