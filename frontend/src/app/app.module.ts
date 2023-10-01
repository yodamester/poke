import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { APOLLO_OPTIONS, ApolloModule } from 'apollo-angular';
import { HttpLink } from 'apollo-angular/http';
import { InMemoryCache } from '@apollo/client/core';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ApolloModule
  ],
  providers: [
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
