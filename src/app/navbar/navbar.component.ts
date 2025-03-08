import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-navbar',
  imports: [RouterLink],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent {
  //Atributos
  
  
  //------------------------------------Metodos------------------------------------//
  toggleTheme() {
    const htmlElement = document.documentElement;
    const currentTheme = htmlElement.getAttribute("data-bs-theme");
    htmlElement.setAttribute("data-bs-theme", currentTheme === "light" ? "dark" : "light");
  }
  
}
