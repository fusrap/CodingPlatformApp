import { Component } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { CardModule } from 'primeng/card';
import { RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';

interface JeopardyCell {
  value: number;
  question: string;
  answer: string;
}

@Component({
  selector: 'app-create-jeopardy',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    CardModule,
    RouterLink,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule
  ],
  templateUrl: './create-jeopardy.component.html',
  styleUrl: './create-jeopardy.component.css'
})
export class CreateJeopardyComponent {
  rows: number = 3; 
  columns: number = 3; 
  grid: JeopardyCell[][] = [];
  subjects: string[] = []; 

  visible: boolean = false;
  selectedRow: number = -1;
  selectedCol: number = -1;
  selectedCell: JeopardyCell | null = null;

  constructor() {
    this.initializeGrid();
  }

  initializeGrid() {
    this.grid = Array.from({ length: this.rows }, () =>
      Array.from({ length: this.columns }, () => ({
        value: 0,
        question: '',
        answer: '',
      }))
    );
    this.subjects = Array.from({ length: this.columns }, () => ''); 
  }

  editCell(rowIndex: number, colIndex: number) {
    this.selectedRow = rowIndex;
    this.selectedCol = colIndex;
    this.selectedCell = this.grid[rowIndex][colIndex];
    this.visible = true;
  }

  saveCell(rowIndex: number, colIndex: number) {
    console.log('Cell saved:', this.grid[rowIndex][colIndex]);
    this.visible = false;
  }

  createJeopardy() {}
}