import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';
import { PokeVoteComponent } from './components/poke-vote/poke-vote.component';
import { HeaderComponent } from './components/header/header.component';
import { PokeListComponent } from './components/poke-list/poke-list.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogModule } from '@angular/material/dialog';
import { PokeDetailsComponent } from './components/poke-details/poke-details.component';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from "@ngrx/store-devtools";
import { pokemonListReducer } from './store/reducers/pokemonList.reducer';
import { MatTableModule}  from '@angular/material/table';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { ErrorCatchingInterceptor } from './interceptors/error-catching.interceptor';
import { metaReducers } from './store/reducers/pokemonList.metareducer';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoaderComponent } from './components/loader/loader.component';
import { LoaderInterceptor } from './interceptors/loader.interceptor';

@NgModule({
  declarations: [
    AppComponent,
    PokeVoteComponent,
    HeaderComponent,
    PokeListComponent,
    PokeDetailsComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule,
    BrowserAnimationsModule,
    MatCardModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    StoreModule.forRoot({
      pokemonList: pokemonListReducer
    },
    { 
      metaReducers: metaReducers
    }),
    StoreDevtoolsModule.instrument({
      maxAge: 25
    })
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoaderInterceptor,
      multi: true,
    },
    {
			provide: HTTP_INTERCEPTORS,
			useClass: ErrorCatchingInterceptor,
			multi: true
		 },
    {
			provide: APOLLO_OPTIONS,
			useFactory(httpLink: HttpLink) {
				return {
					cache: new InMemoryCache(),
					link: httpLink.create({
						uri: 'http://localhost:4000/api'
					}),
				};
			},
			deps: [HttpLink],
		}
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
