import { Component, OnInit } from '@angular/core';
import { ButtonModule } from 'primeng/button';
import { HeaderComponent } from '../header/header.component';

@Component({
  selector: 'app-help',
  standalone: true,
  imports: [
    ButtonModule,
    HeaderComponent
  ],
  templateUrl: './help.component.html',
  styleUrl: './help.component.css'
})
export class HelpComponent implements OnInit {

  constructor() {}

  ngOnInit(): void {}

  scrollToSection(sectionId: string): void {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  }
}
