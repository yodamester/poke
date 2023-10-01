import { Action } from "@ngrx/store";
import { Pokemon } from "src/app/models/pokemon.model";
import { PokemonListActionType, PokemonVoteAction } from "../actions/pokemonList.action";

const initialStateList: Array<Pokemon> = [];

export function pokemonListReducer(
    state: Pokemon[] = initialStateList,
    action: Action) {
  switch (action.type) {
    case PokemonListActionType.POKEMON_VOTED:
        const selectedPokemon = Object.assign({}, (action as PokemonVoteAction).payload);
        let newState = JSON.parse(JSON.stringify(state));
        let ifExisting = false;
        for(let votedPokemon of newState) {
          if(votedPokemon.id === selectedPokemon.id) {
            votedPokemon.voteCount++;
            ifExisting = true;
          }
        }
        if(!ifExisting) {
          selectedPokemon.voteCount++;
          newState = [...state, selectedPokemon];
        }

        return newState;
    default:
        return state;
  }
}
