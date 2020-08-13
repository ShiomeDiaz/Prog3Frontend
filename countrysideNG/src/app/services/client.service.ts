import { Injectable } from '@angular/core';
import { ClientModel } from '../models/client.model';
import { HttpClient, HttpHeaders }  from '@angular/common/http';
import { ServiceConfig } from '../config/service-config';
import { Observable } from 'rxjs';
@Injectable({
  providedIn: 'root'
})
export class ClientService {

entity = 'customer';
  
  constructor(

    private http: HttpClient
  ) { }
/**
 * Method to call client post to backend
 * @param customer client data to save
 */
  ClientRegistering(customer: ClientModel): Observable<ClientModel> {
    return this.http.post<ClientModel>(`${ServiceConfig.BASE_URL}${this.entity}`, customer, {headers: new HttpHeaders({})
  });
  }
}
