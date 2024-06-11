import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-miniorder',
  standalone: true,
  imports: [],
  templateUrl: './miniorder.component.html',
  styleUrl: './miniorder.component.scss'
})
export class MiniorderComponent {
  @Input() tableNum!:number;

  
}
