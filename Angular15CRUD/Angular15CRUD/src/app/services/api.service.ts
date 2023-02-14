import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from '../models/user.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private baseUrl:string = 'http://localhost:3000/enquiry'
  constructor(private httpClient:HttpClient) { }

  postRegistration(registerObj:User){
    return this.httpClient.post<User>(`${this.baseUrl}`,registerObj);
  }

  getRegistrations(){
    return this.httpClient.get<User[]>(`${this.baseUrl}`);
  }

  updateRegisteredUser(registerObj:User,id:number){
    return this.httpClient.put<User>(`${this.baseUrl}/${id}`,registerObj);
  }

  deleteRegisteredUser(id:number){
    return this.httpClient.delete<User>(`${this.baseUrl}/${id}`);
  }

  getRegisteredByUserId(id:number){
    return this.httpClient.get<User>(`${this.baseUrl}/${id}`)
  }
}
