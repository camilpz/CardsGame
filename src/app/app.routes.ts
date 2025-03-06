import { Routes } from '@angular/router';
import { BlackjackGameComponent } from './blackjack-game/blackjack-game.component';
import { ConfigsComponent } from './configs/configs.component';
import { GamesComponent } from './games/games.component';
import { AppComponent } from './app.component';

export const routes: Routes = [
    {
        path: '',
        redirectTo: 'home',
        pathMatch: 'full'
    },
    {
        path: 'home',
        children: [
            {
                path: '',
                redirectTo: 'games',
                pathMatch: 'full'
            },
            {
                path: 'games',
                component: GamesComponent
            },
            {
                path: 'blackjack',
                component: BlackjackGameComponent
            },
            {
                path: 'configs',
                component: ConfigsComponent
            }
        ]
    }
];
