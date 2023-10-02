import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListClearedAction } from 'src/app/store/actions/pokemonList.action';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input({ required: true }) public title!: string;

  constructor(
    private store: Store,
    private snackbarService: SnackbarService,
    public pokemonService: PokemonService,
    private router: Router
    ) {}

  clearVotes() {
    this.store.dispatch(new ListClearedAction());
    this.snackbarService.openSnackBar('Votes cleared');
  }

  goToPokemonList() {
    this.router.navigate(['/poke-list']);
  }

  goToPokemonVote() {
    this.router.navigate(['/poke-vote']);
  }

  changePagination(data: any) {
    if(data.increase) {
      this.pokemonService.offset = this.pokemonService.offset+50;
      this.pokemonService.limit = this.pokemonService.limit+50;
    } else {
      this.pokemonService.offset = this.pokemonService.offset-50;
      this.pokemonService.limit = this.pokemonService.limit-50;
    }
    this.pokemonService.reloadPokemonList.next(true);
  }
}
