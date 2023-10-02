import { Action } from '@ngrx/store';
import { Pokemon } from 'src/app/models/pokemon.model';

export enum PokemonListActionType {
    POKEMON_VOTED = '[POKEMONLIST] Pokemon vote',
    LIST_CLEARED = '[POKEMONLIST] List cleared'
}

export class PokemonVotedAction implements Action {
    readonly type = PokemonListActionType.POKEMON_VOTED
    constructor(public payload: Pokemon) {}
}
export type PokemonVoteAction = PokemonVotedAction;

export class ListClearedAction implements Action {
    readonly type = PokemonListActionType.LIST_CLEARED
    constructor() {}
}
export type ListClearAction = ListClearedAction;