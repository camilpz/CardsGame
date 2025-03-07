import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-configs',
  imports: [CommonModule, FormsModule],
  templateUrl: './configs.component.html',
  styleUrl: './configs.component.css'
})
export class ConfigsComponent {
  cardBacks: string[] = [
    "Cats.png",
    "Flowers.png",
    "Japan.png",
    "Panter.png",
    "Waves.png"
  ]
  selectedCardBack: string = "Waves.png";
  
  
}
