import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RegistrationService {

  constructor(private http: HttpClient) { }

  private baseUrl = 'https://localhost:7107/api/';

  newRegistration(formData: FormData): Observable<HttpResponse<string>> {
    return this.http.post<string>(this.baseUrl + 'Registration/NewRegistration', formData, { observe: 'response' });
  }
}
