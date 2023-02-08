import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {lastValueFrom, Observable} from 'rxjs';
import {IObjetctUser, IUser} from '../models/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor( public http: HttpClient ) { }

  api_url = environment.backend;

  public async postUser(user: IUser) {
    await lastValueFrom(
      this.http.post<IUser>(`${this.api_url}/user`, user)
    );
  }

  public async updateUser(id:number, user: IUser) {
    await lastValueFrom(
      this.http.put<IUser>(`${this.api_url}/user/${id}`, user)
    );
  }

  public getAllUsers(): Observable<IObjetctUser> {
    return this.http.get<IObjetctUser>(`${this.api_url}/user`);
  }

  public findUserById(id:number): Observable<IUser> {
    return this.http.get<IUser>(`${this.api_url}/user/${id}`);
  }

  public findUserByUsername(username:string): Observable<IUser> {
    return this.http.get<IUser>(`${this.api_url}/user/${username}`);
  }

  public delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.api_url}/user/${id}`);
  }

}
