import { Component, Input, ViewEncapsulation } from '@angular/core';
import { Store } from '@ngrx/store';
import { SnackbarService } from 'src/app/services/snackbar/snackbar.service';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class HeaderComponent {
  @Input({ required: true }) public title!: string;

  constructor(
    public pokemonService: PokemonService,
    private router: Router,
    public dialog: MatDialog
    ) {}

  openDialog() {
    this.dialog.open(ConfirmDialogComponent, {
      width: '50%'
    });
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
    } else {
      this.pokemonService.offset = this.pokemonService.offset-50;
    }
    this.pokemonService.reloadPokemonList.next(true);
  }
}
