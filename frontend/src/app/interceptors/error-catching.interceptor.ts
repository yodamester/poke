import { Injectable } from '@angular/core';
import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from "rxjs/operators";
import { SnackbarService } from '../services/snackbar/snackbar.service';

@Injectable()
export class ErrorCatchingInterceptor implements HttpInterceptor {

  constructor(private snackbarService: SnackbarService) {}

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
     return next.handle(request)
           .pipe(
                 catchError((error: HttpErrorResponse) => {
                    let errorMsg = '';
                    if (error.error instanceof ErrorEvent) {
                       errorMsg = `Error: ${error.error.message}`;
                    } else {
                       errorMsg = `Error Code: ${error.status},  Message: ${error.message}`;
                    }
                    this.snackbarService.openSnackBar(errorMsg);
                    return throwError(() => errorMsg);
                 })
           )
  }
}