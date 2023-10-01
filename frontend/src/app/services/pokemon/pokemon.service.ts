import { Injectable } from '@angular/core';
import { Apollo, gql, QueryRef } from 'apollo-angular';
import { Observable } from 'rxjs';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Pokemon } from 'src/app/models/pokemon.model';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  public pokemonQuery: QueryRef<{bookingDetails: [Pokemon]}, { offset: number}>;

  constructor(
    private http: HttpClient,
    private apollo: Apollo
    ) {
      this.pokemonQuery = this.apollo.watchQuery({
        query: gql`query gql {
          pokemons {
            id
            name
            weight
            height
            img
            abilities {
              name
            }
            stats {
              name
              value
            }
          }
        }`
      });
   }

  getPokemons(): Observable<any> {
    return this.http.get<any>('http://localhost:4000/getPokemons');
  }

  getPokemon(): Observable<any> {
    return this.http.get<any>('https://pokeapi.co/api/v2/pokemon/1/');
  }
}
