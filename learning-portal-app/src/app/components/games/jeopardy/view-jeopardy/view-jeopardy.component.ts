import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JeopardyService } from '../../../../services/jeopardy.service';
import { Jeopardy } from '../../../../interfaces/jeopardy';
import { TableModule } from 'primeng/table';
import { CardModule } from 'primeng/card';
import { MessageModule } from 'primeng/message';
import { HeaderComponent } from '../../../header/header.component';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'app-view-jeopardy',
  standalone: true,
  imports: [
    HeaderComponent,
    ButtonModule,
    TableModule,
    CardModule,
    DropdownModule,
    MessageModule,
    FormsModule,
  ],
  templateUrl: './view-jeopardy.component.html',
  styleUrls: ['./view-jeopardy.component.css'],
})
export class ViewJeopardyComponent implements OnInit {
  jeopardyId: string | null = null;
  jeopardyData: Jeopardy | null = null;
  errorMessage: string | null = null;

  selectedTeams: number = 0;
  teamOptions = [
    { label: '1 Hold', value: 1 },
    { label: '2 Hold', value: 2 },
    { label: '3 Hold', value: 3 },
    { label: '4 Hold', value: 4 },
    { label: '5 Hold', value: 5 },
    { label: '6 Hold', value: 6 },
  ];

  constructor(
    private router: Router,
    private route: ActivatedRoute, 
    private jeopardyService: JeopardyService
  ) {}
  

  ngOnInit() {
    this.jeopardyId = this.route.snapshot.paramMap.get('id');
    if (this.jeopardyId) {
      this.loadJeopardyDetails(this.jeopardyId);
    }
  }

  loadJeopardyDetails(id: string) {
    this.jeopardyService.getJeopardyById(id).subscribe({
      next: (data) => {
        this.jeopardyData = data.jeopardy;
        console.log('Jeopardy Data:', this.jeopardyData);
      },
      error: (err) => {
        this.errorMessage = 'Kunne ikke hente Jeopardy-detaljer.';
        console.error('Error fetching Jeopardy details:', err);
      },
    });
  }

  startGame() {
    if (this.jeopardyId && this.jeopardyData) {
      this.router.navigate([`/jeopardy/${this.jeopardyId}/play`], {
        state: { 
          jeopardyData: this.jeopardyData, 
          selectedTeams: this.selectedTeams 
        }
      });
    } else {
      console.error('Jeopardy ID eller data mangler!');
    }
  }
  

  onTeamChange(event: any) {
    console.log('Antal hold valgt:', this.selectedTeams);
  }
}
