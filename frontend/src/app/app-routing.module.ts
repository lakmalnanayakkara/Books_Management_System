import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BookListComponent } from './components/book-list/book-list.component';
import { AddBookComponent } from './components/add-book/add-book.component';
import { UpdateBookComponent } from './components/update-book/update-book.component';

const routes: Routes = [
  { path: '', component: BookListComponent },
  { path: 'add-book', component: AddBookComponent },
  { path: 'update-book/:id', component: UpdateBookComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
