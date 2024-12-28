import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GamificationService } from '../../services/gamification.service';
import { ChartModule } from 'primeng/chart';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-my-page',
  standalone: true,
  imports: [
    CommonModule,
     ChartModule,
     HeaderComponent, 
    ],
  templateUrl: './my-page.component.html',
  styleUrls: ['./my-page.component.css']
})
export class MyPageComponent implements OnInit {
  private gamificationService = inject(GamificationService);

  totalXP: number = 0;
  remainingXP: number = 0;
  currentLevel: number = 0;
  chartData: any;
  chartOptions: any;

  ngOnInit() {
    this.fetchUserXP();
  }

  fetchUserXP() {
    this.gamificationService.getCurrentUserTotalXP().subscribe({
      next: (response) => {
        this.totalXP = response['total_xp'] || 0;
        this.currentLevel = Math.floor(this.totalXP / 1000);
        this.remainingXP = this.totalXP % 1000;

        this.updateChart();
      },
      error: (err) => {
        console.error('Error fetching user XP:', err);
      },
    });
  }

  updateChart() {
    this.chartData = {
      labels: ['XP Earned', 'XP Remaining'],
      datasets: [
        {
          data: [this.remainingXP, 1000 - this.remainingXP],
          backgroundColor: ['#42A5F5', '#D6D6D6'],
          hoverBackgroundColor: ['#64B5F6', '#E0E0E0']
        }
      ]
    };

    this.chartOptions = {
      cutout: '70%',
      animation: {
        animateRotate: true,
        animateScale: true
      },
      plugins: {
        tooltip: {
          callbacks: {
            label: (context: any) => {
              const label = context.label || '';
              const value = context.raw;
              return `${label}: ${value} XP`;
            }
          }
        },
        legend: {
          display: true
        }
      }
    };
  }
}
