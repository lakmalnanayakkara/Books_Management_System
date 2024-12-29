import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-error-popup',
  standalone: false,

  templateUrl: './error-popup.component.html',
  styleUrl: './error-popup.component.css',
})
export class ErrorPopupComponent {
  @Input() message: string = '';
  @Input() title: string = '';
  @Output() close = new EventEmitter<void>();

  onClose() {
    this.close.emit();
  }
}
