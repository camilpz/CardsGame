import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Card } from '../interfaces/models';
import { DeckService } from '../services/deck.service';

@Component({
  selector: 'app-blackjack-game',
  imports: [CardComponent],
  templateUrl: './blackjack-game.component.html',
  styleUrl: './blackjack-game.component.css'
})
export class BlackjackGameComponent implements OnInit {
  blackjackDeck: Card[] = [];
  selectedBack: string = "Waves.png";
  hiddenCard: Card | null = null;
  userHand: Card[] = [];
  dealerHand: Card[] = [];

  constructor(private deckService: DeckService) { }


  ngOnInit() {
    this.blackjackDeck = this.deckService.generateBlackjackDeck();
    this.hiddenCard = this.blackjackDeck.pop()!;
  }

  drawCard() {
    if (this.getHandValue() > 21) {
      console.log("Derrota");
    }
    else {
      this.userHand.push(this.blackjackDeck.pop()!);
      console.log("Mano de jugador", this.userHand);
    }

  }

  getHandValue() {
    let value = 0;
    for (let card of this.userHand) {
      value += card.value;
    }

    console.log("Valor de la mano", value);

    return value;
  }
}
