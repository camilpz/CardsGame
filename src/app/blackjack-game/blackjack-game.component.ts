import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Card } from '../interfaces/models';
import { DeckService } from '../services/deck.service';
import { AudioService } from '../services/audio.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../services/config.service';

@Component({
  selector: 'app-blackjack-game',
  imports: [CardComponent, CommonModule],
  templateUrl: './blackjack-game.component.html',
  styleUrl: './blackjack-game.component.css'
})
export class BlackjackGameComponent implements OnInit {
  //Atributos
  blackjackDeck: Card[] = [];
  selectedBack: string = "Waves.png";
  hiddenCard: boolean = true;
  userHand: Card[] = [];
  dealerHand: Card[] = [];

  constructor(
    private readonly deckService: DeckService,
    private readonly audioService: AudioService,
    private readonly configService: ConfigService
  ) { }


  ngOnInit() {
    this.blackjackDeck = this.deckService.generateBlackjackDeck();
    this.dealerHand.push(this.blackjackDeck.pop()!);
    this.selectedBack = this.configService.getCardBack();
  }

  //------------------------------------Metodos------------------------------------//
  drawCard() {
    if (this.getUserHandValue() < 21) {
      this.audioService.playCardDealRandom()
      this.userHand.push(this.blackjackDeck.pop()!);
      console.log("Mano de jugador", this.userHand);
    }

    if (this.getUserHandValue() >= 21) {
      this.dealerDrawCard();
      this.audioService.playCardFlipRandom();
    }
  }

  async dealerDrawCard() {
    this.hiddenCard = false;
    while (this.getDealerHandValue() < 17) {
      await this.delay(1500); //Delay de 1.5s
      this.dealerHand.push(this.blackjackDeck.pop()!);
    }

    await this.delay(1500); //Delay de 1.5s
    this.checkScore();
  }

  getUserHandValue() {
    let value = 0;
    for (let card of this.userHand) {
      value += card.value;
    }

    console.log("Valor de la mano del usuario", value);

    return value;
  }

  getDealerHandValue() {
    let value = 0;
    for (let card of this.dealerHand) {
      value += card.value;
    }

    console.log("Valor de la mano del dealer", value);

    return value;
  }

  checkScore() {
    let userScore = this.getUserHandValue();
    let dealerScore = this.getDealerHandValue();
    let result: string = "";

    if (userScore > 21) {
      result = "Perdiste";
    } else if (dealerScore > 21) {
      result = "Ganaste";
    } else if (userScore > dealerScore) {
      result = "Ganaste";
    } else if (userScore < dealerScore) {
      result = "Perdiste";
    } else {
      result = "Empate";
    }

    console.log(result);
    alert(result);
  }

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

}
