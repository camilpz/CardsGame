import { Component, Input } from '@angular/core';
import { Card } from '../interfaces/models';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-card',
  imports: [CommonModule],
  templateUrl: './card.component.html',
  styleUrl: './card.component.css'
})
export class CardComponent{
  @Input() card!: Card;

  getNumber() : number{
    return this.card.value;
  }

  getIcon() : string{
    switch(this.card.suit){
      case 'hearts':
        return 'bi-suit-heart-fill';
      case 'diamonds':
        return 'bi-suit-diamond-fill';
      case 'clubs':
        return 'bi-suit-club-fill';
      case 'spades':
        return 'bi-suit-spade-fill';
      default:
        return '';
  }}
}
