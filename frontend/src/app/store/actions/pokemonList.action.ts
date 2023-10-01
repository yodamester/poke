import { Action } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';

export enum PokemonListActionType {
    POKEMON_VOTED = '[POKEMONLIST] Pokemon vote'
}

export class PokemonVotedAction implements Action {
    readonly type = PokemonListActionType.POKEMON_VOTED
    constructor(public payload: Pokemon) {}
}
export type PokemonVoteAction = PokemonVotedAction;