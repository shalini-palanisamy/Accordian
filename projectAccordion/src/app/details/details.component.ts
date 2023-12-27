import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';



@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, MatDatepickerModule,
    MatInputModule,
    MatFormFieldModule,
    ReactiveFormsModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent {
    myForm: FormGroup;

    constructor() {
      this.myForm = new FormGroup({
        date: new FormControl(null, Validators.required),
      });
    }
}
