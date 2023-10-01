import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { take } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokeDetailsComponent } from '../poke-details/poke-details.component';

@Component({
  selector: 'app-poke-vote',
  templateUrl: './poke-vote.component.html',
  styleUrls: ['./poke-vote.component.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class PokeVoteComponent {
  voteArray: Array<Pokemon> = [];
  votedPokemons: Array<Pokemon> = [];

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog
    ) {
    /*this.pokemonService.getPokemons().subscribe(data => {
      console.log(data);
    });

    this.pokemonService.getPokemon().subscribe(data => {
      console.log(data);
    });*/

    this.getPokemons();
    
  }

  openDialog(pokemon: Pokemon) {
    this.dialog.open(PokeDetailsComponent, {
      data: pokemon,
    });
  }

  voteForPokemon(pokemon: Pokemon) {
    const selectedPokemon = Object.assign({}, pokemon);;
    let ifExisting = false;
    for(let votedPokemon of this.votedPokemons) {
      if(votedPokemon.id === selectedPokemon.id) {
        votedPokemon.voteCount++;
        ifExisting = true;
      }
    }
    if(!ifExisting) {
      selectedPokemon.voteCount++;
      this.votedPokemons = [...this.votedPokemons, selectedPokemon];
    }
    console.log(this.votedPokemons);
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
