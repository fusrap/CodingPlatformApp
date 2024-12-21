import { Component } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { Jeopardy, JeopardyCell } from '../../../../interfaces/jeopardy';
import { HeaderComponent } from '../../../header/header.component';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { DialogModule } from 'primeng/dialog';
import { CommonModule } from '@angular/common';

interface JeopardyCellExtended extends JeopardyCell {
  answered: boolean;
}

@Component({
  selector: 'app-play-jeopardy',
  standalone: true,
  imports: [
    HeaderComponent,
    CommonModule,
    ButtonModule,
    CardModule,
    DialogModule,
    RouterLink
  ],
  templateUrl: './play-jeopardy.component.html',
  styleUrls: ['./play-jeopardy.component.css'],
})
export class PlayJeopardyComponent {
  jeopardyData: {
    title: string;
    description: string;
    subjects: string[];
    grid: JeopardyCellExtended[][];
  } | null = null;

  selectedTeams: number = 0;
  teams: { name: string; score: number }[] = [];
  currentTurn: number = 0;

  displayDialog: boolean = false;
  selectedQuestion: JeopardyCellExtended | null = null;
  showAnswer: boolean = false;

  endGameDialogVisible: boolean = false;
  winningTeams: { name: string; score: number }[] = [];

  endGame() {
    const maxScore = Math.max(...this.teams.map(team => team.score));
    this.winningTeams = this.teams.filter(team => team.score === maxScore);
    this.endGameDialogVisible = true;
  }

  closeEndGameDialog() {
    this.endGameDialogVisible = false;
  }


  constructor(private router: Router) {
    const navigation = this.router.getCurrentNavigation();
    const state = navigation?.extras.state as { jeopardyData: Jeopardy; selectedTeams: number };

    if (state) {
      this.jeopardyData = {
        title: state.jeopardyData.title,
        description: state.jeopardyData.description,
        subjects: state.jeopardyData.subjects,
        grid: state.jeopardyData.grid.map(row =>
          row.map(cell => ({
            ...cell,
            answered: false,
          }))
        ),
      };
      this.selectedTeams = state.selectedTeams;
      this.initializeTeams(this.selectedTeams);
    } else {
      console.error('Data mangler i navigation state!');
    }
  }

  initializeTeams(count: number) {
    this.teams = Array.from({ length: count }, (_, i) => ({
      name: `Team ${i + 1}`,
      score: 0,
    }));
  }

  openQuestion(cell: JeopardyCellExtended) {
    if (cell.answered) {
      console.warn('Spørgsmålet er allerede blevet besvaret.');
      return;
    }
    this.selectedQuestion = cell;
    this.displayDialog = true;
    this.showAnswer = false;
  }

  revealAnswer() {
    this.showAnswer = true;
  }

  assignPoints(value: number | undefined) {
    if (value !== undefined) {
      this.teams[this.currentTurn].score += value;
    }
    this.markQuestionAsAnswered();
    this.nextTurn();
    this.closeDialog();
  }

  markQuestionAsAnswered() {
    if (this.selectedQuestion) {
      this.selectedQuestion.answered = true;
    }
  }

  nextTurn() {
    this.currentTurn = (this.currentTurn + 1) % this.teams.length;
    this.markQuestionAsAnswered();
  }

  closeDialog() {
    this.displayDialog = false;
    this.selectedQuestion = null;
  }

}
