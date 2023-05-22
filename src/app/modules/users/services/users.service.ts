import { HttpClient, HttpParams } from '@angular/common/http';

import { Injectable } from '@angular/core';
import { Users } from '../interfaces/users.interfaces';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  public usersList: Users[] = [];

  private serviceUrl: string = 'https://jsonplaceholder.typicode.com';
  
  constructor(  private http: HttpClient ) { }

  public getUsers(): Observable<Users[]> {
    return this.http.get<Users[]>(`${this.serviceUrl}/users`);
  }

  public getPostsByUser(id: number): Observable<any> {
    return this.http.get<any>(`${this.serviceUrl}/users/${id}/posts`);
  }

  public createPost(title: string, body: string, userId: number): Observable<any> {

    const bodyParams = {
      title,
      body,
      userId
    };

    return this.http.post(`${this.serviceUrl}/posts`, bodyParams);
  }
}
