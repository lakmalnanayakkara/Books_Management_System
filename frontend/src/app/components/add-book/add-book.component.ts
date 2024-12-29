import { Component } from '@angular/core';
import { BookDetails, BookService } from '../../service/book.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-add-book',
  standalone: false,

  templateUrl: './add-book.component.html',
  styleUrl: './add-book.component.css',
})
export class AddBookComponent {
  book: BookDetails = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: undefined,
  };

  private subscriptions: Subscription = new Subscription();

  errorMessage: string = '';
  popupTitle: string = '';
  showErrorPopup: boolean = false;

  constructor(private bookService: BookService, private router: Router) {}

  addBook() {
    const sub = this.bookService.addBook(this.book).subscribe(
      (data) => {
        this.book = {
          id: 0,
          title: '',
          author: '',
          isbn: '',
          publicationDate: undefined,
        };
        this.popupTitle = 'Success';
        this.showErrorDialog(`Book added successfully`);

        setTimeout(() => {
          this.router.navigate(['']);
        }, 2000);
      },
      (error) => {
        this.popupTitle = 'Error';
        this.showErrorDialog(`Error adding book`);
      }
    );
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  showErrorDialog(message: string) {
    this.errorMessage = message;
    this.showErrorPopup = true;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }
}
