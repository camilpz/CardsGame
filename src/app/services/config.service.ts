import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ConfigService {

  constructor() { }
  
  setCardBack(cardBack: string) {
    localStorage.setItem("cardBack", cardBack);
  }
  
  getCardBack() : string {
    let cardBack = localStorage.getItem("cardBack");
    if (cardBack === null) {
      this.setCardBack("Waves.png");
      return "Waves.png";
    }
    
    return cardBack;
  }
  
  
}
