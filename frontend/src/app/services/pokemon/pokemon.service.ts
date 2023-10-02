import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemonQuery: QueryRef<{pokemons: [Pokemon]}, { limit: number, offset: number}>;
  public reloadPokemonList: BehaviorSubject<boolean>;
  public limit = 50;
  public offset = 0;

  constructor(
    private http: HttpClient,
    private apollo: Apollo
    ) {
      this.pokemonQuery = this.apollo.watchQuery({
        query: gql`query gql($limit: Int!, $offset: Int!) {
          pokemons(limit: $limit, offset: $offset) {
            id
            name
            weight
            height
            img
            voteCount
            abilities {
              name
            }
            stats {
              name
              value
            }
          }
        }`,
        variables: {
          limit: this.limit,
          offset: this.offset
        }
      });

      this.reloadPokemonList = new BehaviorSubject<boolean>(false);
   }

  getPokemons(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/getPokemons');
  }

  getPokemon(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/1/');
  }
}
