import { Component } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { PokemonService } from './services/pokemon/pokemon.service';
import { take } from 'rxjs';
import { Pokemon } from './models/pokemon.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'poke-app';
}
