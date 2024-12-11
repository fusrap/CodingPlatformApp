import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { JeopardyService } from '../../../../services/jeopardy.service';

@Component({
  selector: 'app-view-jeopardy',
  standalone: true,
  imports: [],
  templateUrl: './view-jeopardy.component.html',
  styleUrl: './view-jeopardy.component.css'
})
export class ViewJeopardyComponent implements OnInit {
  jeopardyId: string | null = null;

  constructor(private route: ActivatedRoute, private jeopardyService: JeopardyService) {}

  ngOnInit() {
    this.jeopardyId = this.route.snapshot.paramMap.get('id');
    console.log('Jeopardy ID:', this.jeopardyId);
  }
}
