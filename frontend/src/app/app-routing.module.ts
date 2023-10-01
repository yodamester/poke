import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PokeVoteComponent } from './components/poke-vote/poke-vote.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';

const routes: Routes = [
  {path: "", pathMatch: "full",redirectTo: "poke-vote"},
  {path: "poke-vote", component: PokeVoteComponent},
  {path: "poke-list", component: PokeListComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
