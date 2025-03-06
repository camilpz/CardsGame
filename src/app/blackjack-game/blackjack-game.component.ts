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
export class BlackjackGameComponent implements OnInit{
  blackjackDeck : Card[] = [];
  hiddenCard : Card | null = null;
  userHand : Card[] = [];

  constructor(private deckService : DeckService){}


  ngOnInit() {
    this.blackjackDeck = this.deckService.generateBlackjackDeck();
    this.hiddenCard = this.blackjackDeck.pop()!;
  }

  drawCard(){
    console.log(this.blackjackDeck);
    
    this.userHand.push(this.blackjackDeck.pop()!);
    console.log(this.userHand);
    
  }
}
