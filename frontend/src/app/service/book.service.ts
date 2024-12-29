import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

export interface BookDetails {
  id: number;
  title: string;
  author: string;
  isbn: string;
  publicationDate: Date;
}

@Injectable({
  providedIn: 'root',
})
export class BookService {
  private apiUrl = 'https://localhost:7056/api/v1/book';

  constructor(private http: HttpClient) {}

  getBooks(pageSize: number): Observable<any> {
    return this.http.get<BookDetails[]>(
      `${this.apiUrl}/get-all-books?pageSize=${pageSize}`
    );
  }

  addBook(book: BookDetails): Observable<BookDetails> {
    return this.http.post<BookDetails>(`${this.apiUrl}/add-book`, book);
  }

  getBookById(id: number): Observable<any> {
    return this.http.get<BookDetails>(`${this.apiUrl}/get-book-by-id?id=${id}`);
  }

  updateBook(id: number, book: BookDetails): Observable<any> {
    return this.http.put<BookDetails>(
      `${this.apiUrl}/update-book?id=${id}`,
      book
    );
  }

  deleteBook(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/delete-book?id=${id}`);
  }

  getBookByName(position: string, pageSize: number): Observable<any> {
    return this.http.get<BookDetails>(
      `${this.apiUrl}/get-books-by-name?position=${position}&pageSize=${pageSize}`
    );
  }
}
