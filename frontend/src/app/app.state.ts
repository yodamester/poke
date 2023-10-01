import { Pokemon } from "./models/pokemon.model";

export interface AppState {
  readonly pokemonList: Array<Pokemon>;
}