import { ButtonModule } from 'primeng/button';
import { InputTextareaModule } from 'primeng/inputtextarea';
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-text-element',
  imports: [
    ButtonModule,
    InputTextareaModule,
    FormsModule
  ],
  templateUrl: './text-element.component.html',
  styleUrls: ['./text-element.component.css'],
  standalone: true,
})
export class TextElementComponent {
  @Input() id!: number; // Receive the ID from the manager
  @Input() text: string = ''; // Text content of the element
  @Output() textChange = new EventEmitter<string>(); // Emit changes to text
  @Output() onDelete = new EventEmitter<void>(); // Emit delete event

  isEditing: boolean = true; // Default to edit mode

  toggleMode() {
    this.isEditing = !this.isEditing;

    // Emit the updated text when leaving edit mode
    if (!this.isEditing) {
      this.textChange.emit(this.text);
    }
  }

  onDeleteClick() {
    this.onDelete.emit(); // Notify the manager
  }
}