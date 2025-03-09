import { Injectable } from '@angular/core';
import { Card } from '../interfaces/models';

@Injectable({
  providedIn: 'root'
})
export class DeckService {

  cardsSuits: string[] = ['spades','clubs','diamonds','hearts'];
  blackjackDeck: Card[] = [];
  
  //Genera un arreglo de cartas de un palo
  generateSwit(suit : string) : Card[]{
    let cards: Card[] = [];
    
    for (let index = 2; index <= 10; index++) {
      let card : Card = { value: index, name: index.toString(), suit: suit, isHidden: false};
      cards.push(card);
    }
    
    let figures = ['J','Q','K'];
    for (let index = 0; index < figures.length; index++) {
      let card : Card = { value: 10, name: figures[index], suit: suit, isHidden: false};
      cards.push(card);
    }
    
    let cardA : Card = { value: 11, name: 'A', suit: suit, isHidden: false};
    cards.push(cardA);

    return cards;
  }
  
  //Genera un mazo entero de cartas sin incluir jokers
  generateBlackjackDeck() : Card[]{
    let cards: Card[] = [];
    
    for (let index = 0; index < this.cardsSuits.length; index++) {
      cards.push(...this.generateSwit(this.cardsSuits[index]));
    }
    console.log("MAZO ", cards);
    
    return this.shuffleDeck(cards);
  }

  //Baraja las cartas de un mazo
  shuffleDeck(deck: Card[]) : Card[]{
    for (let index = deck.length - 1; index > 0; index--) {
      const j = Math.floor(Math.random() * (index + 1));
      [deck[index], deck[j]] = [deck[j], deck[index]];
    }
    
    return deck;
  }
}
