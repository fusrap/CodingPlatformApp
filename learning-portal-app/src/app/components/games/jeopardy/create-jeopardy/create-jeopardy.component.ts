import { Component, inject, Injectable } from '@angular/core';
import { HeaderComponent } from "../../../header/header.component";
import { CardModule } from 'primeng/card';
import { Router, RouterLink } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { DialogModule } from 'primeng/dialog';
import { InputTextModule } from 'primeng/inputtext';
import { FloatLabelModule } from 'primeng/floatlabel';
import { JeopardyCell, Jeopardy } from '../../../../interfaces/jeopardy';
import { JeopardyService } from '../../../../services/jeopardy.service';

@Component({
  selector: 'app-create-jeopardy',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    FormsModule,
    CardModule,
    ButtonModule,
    DialogModule,
    InputTextModule,
    FloatLabelModule,
    RouterLink
  ],
  templateUrl: './create-jeopardy.component.html',
  styleUrl: './create-jeopardy.component.css'
})
export class CreateJeopardyComponent {

  title: string = '';
  description: string = ''; 
  rows: number = 3; 
  columns: number = 3; 
  grid: JeopardyCell[][] = [];
  subjects: string[] = []; 

  visible: boolean = false;
  selectedRow: number = -1;
  selectedCol: number = -1;
  selectedCell: JeopardyCell | null = null;

  constructor(private jeopardyService: JeopardyService,
    private router: Router 
  ) {
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

  createJeopardy() {
    const jeopardyData: Jeopardy = {
      id: -1,
      title: this.title,
      description: this.description,
      subjects: this.subjects,
      grid: this.grid
    };

    this.jeopardyService.saveJeopardy(jeopardyData).subscribe({
      next: (response) => {
        console.log('Jeopardy saved successfully:', response);
        this.router.navigate(['/home']);
      },
      error: (err) => {
        console.error('Error saving Jeopardy:', err);
      }
    })
  }
}