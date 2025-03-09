import { Component, Inject, OnInit } from '@angular/core';
import { CardComponent } from "../card/card.component";
import { Card } from '../interfaces/models';
import { DeckService } from '../services/deck.service';
import { AudioService } from '../services/audio.service';
import { CommonModule } from '@angular/common';
import { ConfigService } from '../services/config.service';
import Swal from 'sweetalert2';
import { AlertService } from '../services/alert.service';
import { Router } from '@angular/router';


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
  userHand: Card[] = [];
  dealerHand: Card[] = [];
  gameFinished: boolean = false;
  gameResult: string = "";

  constructor(
    private readonly deckService: DeckService,
    private readonly audioService: AudioService,
    private readonly configService: ConfigService,
    private readonly alertService: AlertService,
    private readonly router: Router
  ) { }

  ngOnInit() {
    this.selectedBack = this.configService.getCardBack();
    this.startGame();
  }

  //------------------------------------Inicio------------------------------------//

  async startGame() {
    this.userHand = [];
    this.dealerHand = [];
    this.blackjackDeck = this.deckService.generateBlackjackDeck();
    this.gameFinished = false;
    this.gameResult = "";

    await this.drawCard(300);
    await this.dealerDrawCard(false, 300);
    await this.drawCard(300);
    await this.dealerDrawCard(true, 1000);

    if(this.getUserHandValue() == 21 || this.getDealerHandValue() == 21){
      await this.endGame();
    }
  }

  //------------------------------------Toma de cartas------------------------------------//

  async drawCard(delay: number = 0) {
    this.audioService.playCardDealRandom();
    this.userHand.push(this.blackjackDeck.pop()!);
    await this.delay(delay);

    console.log("Mano de jugador", this.userHand);
  }
  
  async usersTurn() {
    await this.drawCard(600);

    if (this.getUserHandValue() >= 21) {
      await this.dealersTurns();
    }
  }

  async dealerDrawCard(isHidden: boolean = false, delay: number = 0) {
    let card = this.blackjackDeck.pop()!;
    card.isHidden = isHidden;

    this.dealerHand.push(card);
    await this.delay(delay);

    console.log("Mano del dealer", this.dealerHand);
  }
  
  async dealersTurns() {
    this.revealDealerHand();
    //TODO: AGREGAR DELAY CUANDO EL DEALER NO TIENE QUE TOMAR CARTAS
    while (this.getDealerHandValue() < 17) {
      await this.dealerDrawCard(false, 1000);
    }
    
    this.endGame();
  }

  //------------------------------------Calculos------------------------------------//

  getUserHandValue() {
    let value = 0;
    for (let card of this.userHand) {
      value += card.value;
    }
    return value;
  }

  getDealerHandValue() {
    let value = 0;
    for (let card of this.dealerHand) {
      value += card.value;
    }
    return value;
  }


  async endGame() {
    if (!this.gameFinished) {
      let userScore = this.getUserHandValue();
      let dealerScore = this.getDealerHandValue();

      this.delay(1000);
      if (userScore == 21 && dealerScore == 21 && this.userHand.length == 2 && this.dealerHand.length == 2) {
        this.revealDealerHand();
        this.gameResult = "Empate, ambos tienen Blackjack!";
      } else if (userScore == 21 && this.userHand.length == 2) {
        this.gameResult = "Ganaste, tienes Blackjack!";
      } else if (dealerScore == 21 && this.dealerHand.length == 2) {
        this.revealDealerHand();
        this.gameResult = "Perdiste, el dealer tiene Blackjack!";
      } else if (userScore > 21) {
        this.gameResult = "Perdiste";
      } else if (dealerScore > 21) {
        this.gameResult = "Ganaste";
      } else if (userScore > dealerScore) {
        this.gameResult = "Ganaste";
      } else if (userScore < dealerScore) {
        this.gameResult = "Perdiste";
      } else {
        this.gameResult = "Empate";
      }

      this.gameFinished = true;

      this.showAlert();
    }
  }

  //------------------------------------Otros------------------------------------//

  delay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  async revealDealerHand() {
    this.dealerHand.map(card => card.isHidden = false);
    this.audioService.playCardFlipRandom();
    await this.delay(1500);
  }

  showAlert(){
    if (this.gameResult) {
      this.alertService.showAlert(this.gameResult, "¿Desea jugar otra partida?").then((result) => {
        if(result.isConfirmed){
          this.startGame();
        }
        else{
          this.router.navigate(['/home/games']);
        }
      })
    }
  }
}
