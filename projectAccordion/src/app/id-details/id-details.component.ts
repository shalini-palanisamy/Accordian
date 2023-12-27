import { Component, Input } from '@angular/core';


@Component({
  selector: 'app-accordion-item',
  standalone: true,
  imports: [],
  templateUrl: './id-details.component.html',
  styleUrl: './id-details.component.css'
})
export class AccordionItemComponent {


  ngOnInit() {
    // Assume you get the new content dynamically
    const newContent = 'New content for ID details';

  }
}
