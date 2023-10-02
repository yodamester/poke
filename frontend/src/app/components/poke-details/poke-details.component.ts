import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { Pokemon } from 'src/app/models/pokemon.model';
import { Store } from '@ngrx/store';
import { PokemonVotedAction } from 'src/app/store/actions/pokemonList.action';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';

@Component({
  selector: 'app-poke-details',
  templateUrl: './poke-details.component.html',
  styleUrls: ['./poke-details.component.scss']
})
export class PokeDetailsComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: Pokemon,
    private store: Store,
    public dialogRef: MatDialogRef<PokeDetailsComponent>,
    private snackbarService: SnackbarService
    ) {}

  voteForPokemon(pokemon: Pokemon) {
    this.store.dispatch(new PokemonVotedAction(pokemon));
    this.snackbarService.openSnackBar('You voted for '+pokemon.name);
    this.dialogRef.close({ voted: true });
  }
}
