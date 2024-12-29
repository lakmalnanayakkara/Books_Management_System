import { Component, OnInit } from '@angular/core';
import { BookDetails, BookService } from '../../service/book.service';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-book-list',
  standalone: false,
  templateUrl: './book-list.component.html',
  styleUrl: './book-list.component.css',
})
export class BookListComponent implements OnInit {
  books: BookDetails[] = [];
  isLoading: boolean = false;
  totalBooks: number = 0;
  currentPage = 1;
  pageSize: number = 5;

  private subscriptions: Subscription = new Subscription();

  errorMessage: string = '';
  popupTitle: string = '';
  showErrorPopup: boolean = false;

  positionFilter: string = '';
  isSearch: boolean = false;

  constructor(private bookService: BookService, private router: Router) {}

  ngOnInit(): void {
    this.loadBooks(this.pageSize);
  }

  loadBooks(pageSize: number): void {
    this.isLoading = true;
    const sub = this.bookService.getBooks(pageSize).subscribe(
      (data) => {
        this.books = data.data.addBookDTOs;
        this.totalBooks = data.data.count;
        this.isLoading = false;
      },
      (error) => {
        this.showErrorDialog(`There was an error fetching the books!`);
      }
    );
    this.subscriptions.add(sub);
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  editBook(id: number) {
    this.router.navigate([`/update-book/${id}`]);
  }

  deleteBook(id: number) {
    const confirmDelete = window.confirm(
      'Are you sure you want to delete this employee?'
    );
    if (confirmDelete) {
      const sub = this.bookService.deleteBook(id).subscribe(
        () => {
          this.books = this.books.filter((book) => book.id !== id);

          this.popupTitle = 'Success';
          this.showErrorDialog(`Book deleted successfully`);
          setTimeout(() => {
            window.location.reload();
          }, 2000);
        },
        (error) => {
          this.showErrorDialog(`There was an error deleting the employee!`);
          this.popupTitle = 'Error';
        }
      );
      this.subscriptions.add(sub);
    }
  }

  loadMoreBooks() {
    if (this.pageSize >= 5 && this.pageSize <= this.totalBooks) {
      this.loadBooks(this.pageSize);
    } else {
      this.popupTitle = 'Error';
      this.showErrorDialog(
        `Please enter a number greater than 5 and less than or equal to ${this.totalBooks}.`
      );
    }
  }

  showErrorDialog(message: string) {
    this.errorMessage = message;
    this.showErrorPopup = true;
  }

  closeErrorPopup() {
    this.showErrorPopup = false;
  }

  searchByName() {
    this.isSearch = true;
    const sub = this.bookService
      .getBookByName(this.positionFilter, this.pageSize)
      .subscribe(
        (data) => {
          this.books = data.data.addBookDTOs;
          this.totalBooks = data.data.count;
        },
        (error) => {
          this.popupTitle = 'Error';
          this.showErrorDialog(`There was an error searching the employees!`);
        }
      );
    this.subscriptions.add(sub);
  }
  resetSearch() {
    this.positionFilter = '';
    this.isSearch = false;
    this.loadBooks(5);
  }
}
