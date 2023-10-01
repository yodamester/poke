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
  voteArray: Array<Pokemon> = [];

  constructor(private pokemonService: PokemonService) {
    /*this.pokemonService.getPokemons().subscribe(data => {
      console.log(data);
    });

    this.pokemonService.getPokemon().subscribe(data => {
      console.log(data);
    });*/

    this.getPokemons();
    
  }

  getPokemons() {
    this.pokemonService.pokemonQuery.valueChanges.pipe(take(1)).subscribe((result: any) => {
      this.generateRandomPairs(result.data.pokemons);
    });
  }

  generateRandomPairs(pokemons: Array<Pokemon>) {
    this.voteArray = [];
    const randomElement = pokemons[Math.floor(Math.random() * pokemons.length)];
    const randomElement2 = pokemons[Math.floor(Math.random() * pokemons.length)];
    this.checkPokemonPairs(randomElement, randomElement2, pokemons);
  }

  checkPokemonPairs(element1: Pokemon, element2: Pokemon, pokemons: Array<Pokemon>) {
    if(element1 !== element2) {
      this.voteArray.push(element1, element2);
    } else {
      this.generateRandomPairs(pokemons);
    }
  }

}
