import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { lastValueFrom, Observable } from 'rxjs';

import { environment } from '../../environments/environment';
import { IObjetctContact, IContact } from '../models/contact';

@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(public http: HttpClient) {}

  api_url = environment.backend;

  public async postContact(contact: IContact) {
    await lastValueFrom(
      this.http.post<IContact>(`${this.api_url}/contacts`, contact)
    );
  }

  public async updateContact(id:number, contact: IContact) {
    await lastValueFrom(
      this.http.put<IContact>(`${this.api_url}/contacts/${id}`, contact)
    );
  }

  public getAllContact(): Observable<IObjetctContact>{
    return this.http.get<IObjetctContact>(`${this.api_url}/contacts`);
  }

  public findContactsById(id:number): Observable<IContact> {
    return this.http.get<IContact>(`${this.api_url}/contacts/${id}`);
  }

  public deleteContact(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/contacts/${id}`);
  }

}
