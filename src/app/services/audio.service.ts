import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AudioService {
  cardFlipAudios: string[] = [
    "flipCard1.mp3",
    "flipCard2.mp3",
    "flipCard3.mp3",
  ]
  
  cardDealAudios: string[] = [
    "dealCard1.mp3",
    "dealCard2.mp3",
  ]
  
  constructor() { }
  
  playAudio(audioName: string, volume: number = 0.5) {
    const audioElement = new Audio(audioName);
    audioElement.volume = volume;
    audioElement.play();
  }
  
  playCardFlipRandom() {
    let randomIndex = Math.floor(Math.random() * this.cardFlipAudios.length);
    this.playAudio(this.cardFlipAudios[randomIndex]);
  }
  
  playCardDealRandom() {
    let randomIndex = Math.floor(Math.random() * this.cardDealAudios.length);
    this.playAudio(this.cardDealAudios[randomIndex]);
  }
  
  playDeckShuffle() {
    this.playAudio("dealDeck1.mp3");
  }
  
  
}
