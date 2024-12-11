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
  @Input() id!: number;
  @Input() text: string = '';
  @Input() isEditing: boolean = true;

  @Output() textChange = new EventEmitter<string>();
  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<void>();

  toggleMode() {
    this.isEditing = !this.isEditing;
    this.editModeChange.emit(this.isEditing);
    if (!this.isEditing) {
      this.textChange.emit(this.text);
    }
  }

  onDeleteClick() {
    this.onDelete.emit(); 
  }
}