import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-configs',
  imports: [CommonModule, FormsModule],
  templateUrl: './configs.component.html',
  styleUrl: './configs.component.css'
})
export class ConfigsComponent implements OnInit {
  //Atributos
  cardBacks: string[] = [
    "Cats.png",
    "Flowers.png",
    "Japan.png",
    "Panter.png",
    "Waves.png"
  ]

  constructor(private readonly configService: ConfigService) { }

  selectedCardBack: string = "Waves.png";

  //------------------------------------Metodos------------------------------------//

  ngOnInit() {
    this.selectedCardBack = this.configService.getCardBack();
  }

  changeCardBack() {
    this.configService.setCardBack(this.selectedCardBack);
    console.log("Cambiando carta trasera a", this.selectedCardBack);
    
  }
}
