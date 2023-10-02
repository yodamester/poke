import { Component, Input } from '@angular/core';
import { Store } from '@ngrx/store';
import { ListClearedAction } from 'src/app/store/actions/pokemonList.action';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Input({ required: true }) public title!: string;

  constructor(private store: Store) {}

  clearVotes() {
    this.store.dispatch(new ListClearedAction());
  }
}
