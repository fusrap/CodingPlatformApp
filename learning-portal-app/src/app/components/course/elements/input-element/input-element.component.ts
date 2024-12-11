import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { FloatLabelModule } from 'primeng/floatlabel';
import { InputTextModule } from 'primeng/inputtext';



@Component({
  selector: 'app-input-element',
  standalone: true,
  imports: [
    FormsModule,
    InputTextModule,
    ButtonModule,
    FloatLabelModule
  ],
  templateUrl: './input-element.component.html',
  styleUrl: './input-element.component.css'
})
export class InputElementComponent {
  @Input() id!: number;
  @Input() label: string = '';
  @Input() answer: string = '';
  @Input() isEditing: boolean = true;

  @Output() labelChange = new EventEmitter<string>();
  @Output() answerChange = new EventEmitter<string>();
  @Output() editModeChange = new EventEmitter<boolean>();
  @Output() onDelete = new EventEmitter<void>();

  toggleMode() {
    this.isEditing = !this.isEditing;
    this.editModeChange.emit(this.isEditing);
    if (!this.isEditing) {
      this.labelChange.emit(this.label);
      this.answerChange.emit(this.answer);
    }
  }

  onDeleteClick() {
    this.onDelete.emit(); 
  }
}