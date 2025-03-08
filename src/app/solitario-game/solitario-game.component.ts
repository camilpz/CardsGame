import { Component, OnInit } from '@angular/core';
import { Card } from '../interfaces/models';
import { DeckService } from '../services/deck.service';
import { AudioService } from '../services/audio.service';
import { ConfigService } from '../services/config.service';
import { CardComponent } from '../card/card.component';

@Component({
  selector: 'app-solitario-game',
  imports: [CardComponent],
  templateUrl: './solitario-game.component.html',
  styleUrl: './solitario-game.component.css'
})
export class SolitarioGameComponent implements OnInit {
  //Atributos
  pilasCartas: Card[][] = [];
  solitarioDeck: Card[] = [];
  availableCards: Card[] = [];
  selectedBack: string = "Waves.png";

  constructor(
    private readonly deckService: DeckService,
    private readonly audioService: AudioService,
    private readonly configService: ConfigService
  ) { }

  //------------------------------------Metodos------------------------------------//
  ngOnInit(): void {
    this.selectedBack = this.configService.getCardBack();
    this.solitarioDeck = this.deckService.generateBlackjackDeck();
    this.generatePilasCartas();
    console.log(this.pilasCartas);
    
  }
  
  getAvailableCards() {
    this.audioService.playCardFlipRandom();
    this.availableCards = [];
    for (let i = 0; i < 3; i++) {
      if (this.solitarioDeck.length > 0) {
        this.availableCards.push(this.solitarioDeck.pop()!);
      }
    }
  }

  async generatePilasCartas() {
    this.audioService.playDeckShuffle();
    for (let i = 0; i < 7; i++) {
      this.pilasCartas.push([]);
      for (let j = 0; j <= i; j++) {
        await this.delay(30); // Espera 1 segundo
        this.pilasCartas[i].push(this.solitarioDeck.pop()!);
      }
    }
  }
  


  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
