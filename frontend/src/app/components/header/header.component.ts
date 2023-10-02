import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListClearedAction } from 'src/app/store/actions/pokemonList.action';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input({ required: true }) public title!: string;

  constructor(
    private store: Store,
    private snackbarService: SnackbarService,
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
}
