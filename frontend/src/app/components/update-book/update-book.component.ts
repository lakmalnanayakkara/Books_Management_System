import { Component, OnInit } from '@angular/core';
import { BookDetails, BookService } from '../../service/book.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-update-book',
  standalone: false,

  templateUrl: './update-book.component.html',
  styleUrl: './update-book.component.css',
})
export class UpdateBookComponent implements OnInit {
  book: BookDetails = {
    id: 0,
    title: '',
    author: '',
    isbn: '',
    publicationDate: undefined,
  };

  bookId: number;
  private subscriptions: Subscription = new Subscription();

  errorMessage: string = '';
  popupTitle: string = '';
  showErrorPopup: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private bookService: BookService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.bookId = Number(this.route.snapshot.paramMap.get('id'));
    if (this.bookId) {
      const sub = this.bookService.getBookById(this.bookId).subscribe(
        (data) => {
          this.book = data.data;
        },
        (error) => {
          this.popupTitle = 'Error';
          this.showErrorDialog(`Error fetching employee details`);
        }
      );
      this.subscriptions.add(sub);
    }
  }

  updateBook() {
    if (this.book) {
      const sub = this.bookService.updateBook(this.bookId, this.book).subscribe(
        () => {
          this.popupTitle = 'Success';
          this.showErrorDialog(`Book updated successfully`);
          setTimeout(() => {
            this.router.navigate(['']);
          }, 2000);
        },
        (error) => {
          this.popupTitle = 'Error';
          this.showErrorDialog(`Error updating employee`);
        }
      );
      this.subscriptions.add(sub);
    }
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
