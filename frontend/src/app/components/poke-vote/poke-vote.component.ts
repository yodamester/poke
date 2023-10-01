import { Component, ViewEncapsulation } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Observable, take } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { PokeDetailsComponent } from '../poke-details/poke-details.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PokemonVotedAction } from 'src/app/store/actions/pokemonList.action';

@Component({
  selector: 'app-poke-vote',
  templateUrl: './poke-vote.component.html',
  styleUrls: ['./poke-vote.component.scss'],
  encapsulation: ViewEncapsulation.None  
})
export class PokeVoteComponent {
  voteArray: Array<Pokemon> = [];
  votedPokemons: Array<Pokemon> = [];
  pokemonListObservable!: Observable<any>;

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private store: Store<AppState>
    ) {
    this.getPokemons();
  }

  openDialog(pokemon: Pokemon) {
    this.dialog.open(PokeDetailsComponent, {
      data: pokemon,
    });
  }

  voteForPokemon(pokemon: Pokemon) {
    this.store.dispatch(new PokemonVotedAction(pokemon));
    //this.pokemonListObservable = this.store.select((store) => store.pokemonList);
    //console.log(this.votedPokemons);
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
