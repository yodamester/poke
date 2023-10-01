import { Component } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/app.state';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-poke-list',
  templateUrl: './poke-list.component.html',
  styleUrls: ['./poke-list.component.scss']
})
export class PokeListComponent {
  pokemonListObservable!: Observable<any>;
  
  constructor(private store: Store<AppState>) {
    this.pokemonListObservable = this.store.select((store) => store.pokemonList);
  }

}
