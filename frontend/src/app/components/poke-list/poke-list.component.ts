import { Component, ViewEncapsulation } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';
import { Pokemon } from 'src/app/models/pokemon.model';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class PokeListComponent {
  pokemonListObservable!: Observable<any>;
  pokemonList: Array<Pokemon> = [];
  displayedColumns: string[] = ['position', 'name', 'voteCount'];
  
  constructor(private store: Store<AppState>) {
    this.store.select((store) => store.pokemonList).subscribe(data => {
      if(data) {
        let pokeArray = [...data];
        pokeArray.sort(
          (p1, p2) => (p1.voteCount < p2.voteCount) ? 1 : (p1.voteCount > p2.voteCount) ? -1 : 0);
        this.pokemonList = pokeArray.slice(0,10);
      }
    });
  }

}
