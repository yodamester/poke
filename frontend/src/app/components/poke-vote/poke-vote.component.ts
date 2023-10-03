import { Component, ViewEncapsulation } from '@angular/core';
import { PokemonService } from '../../services/pokemon/pokemon.service';
import { Observable, take } from 'rxjs';
import { Pokemon } from '../../models/pokemon.model';
import { MatDialog } from '@angular/material/dialog';
import { PokeDetailsComponent } from '../poke-details/poke-details.component';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { PokemonVotedAction } from 'src/app/store/actions/pokemonList.action';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

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
  pokemonList: Array<Pokemon> = [];

  constructor(
    private pokemonService: PokemonService,
    public dialog: MatDialog,
    private store: Store<AppState>,
    private snackbarService: SnackbarService,
    private router: Router
    ) {
    this.getPokemons();

    this.pokemonService.reloadPokemonList.subscribe(res => {
      if(res) {
        this.pokemonService.pokemonQuery.refetch({ limit: this.pokemonService.limit, offset: this.pokemonService.offset}).then(result => {
          this.pokemonList = result.data.pokemons;
          this.generateRandomPairs(result.data.pokemons);
          this.pokemonService.reloadPokemonList.next(false);
          this.snackbarService.openSnackBar('Pokemon list refreshed');
          this.router.navigate(['/poke-vote']);
        });
      }
    });
  }

  openDialog(pokemon: Pokemon) {
    const dialogRef = this.dialog.open(PokeDetailsComponent, {
      data: pokemon
    },);
    dialogRef.afterClosed().subscribe(res => {
      if(res?.voted) {
        this.generateRandomPairs(this.pokemonList);
      }
    })
  }

  voteForPokemon(pokemon: Pokemon) {
    this.store.dispatch(new PokemonVotedAction(pokemon));
    this.generateRandomPairs(this.pokemonList);
    this.snackbarService.openSnackBar('You voted for '+pokemon.name);
  }

  getPokemons() {
    this.pokemonService.pokemonQuery.valueChanges.pipe(take(1)).subscribe((result: any) => {
      this.pokemonList = result.data.pokemons;
      this.generateRandomPairs(result.data.pokemons);
      this.pokemonService.reloadPokemonList.next(false);
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
