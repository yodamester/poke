import { Component, Input, ViewEncapsulation } from '@angular/core';
import { PokemonService } from 'src/app/services/pokemon/pokemon.service';
import { Router, NavigationEnd } from '@angular/router';
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
  isPaginationActive = true;

  constructor(
    public pokemonService: PokemonService,
    private router: Router,
    public dialog: MatDialog
    ) {
      this.router.events.subscribe((event) => {
        if(event instanceof NavigationEnd && event.url === '/poke-list') {
          this.isPaginationActive = false;
        } else if(event instanceof NavigationEnd) {
          this.isPaginationActive = true;
        }
      });
    }

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
