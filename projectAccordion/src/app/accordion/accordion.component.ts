import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-accordion',
  standalone: true,
  imports: [CommonModule],
  styleUrls: ['./accordion.component.css'], // Use styleUrls (plural) for styles
  templateUrl: './accordion.component.html',
})
export class AccordionComponent {
  items: { title: string; content?: string; active?: boolean }[] = [];

  ngOnInit() {
    // Initialize or update items based on the form value
    this.items = [
      { title: 'IDP' },
      { title: 'SERVICES PROVIDED' },
      { title: 'IELTS'},
      { title: 'IELTS Information' },
    ];
  }
  itemClicked(i: number) {
    console.log('Before toggling:', this.items[i]);
  this.items[i].active = !this.items[i].active;
  console.log('After toggling:', this.items[i]);
  }
}
