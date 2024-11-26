import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User,Users } from 'src/interfaces/users';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApicrudService {

  constructor(private httpclient: HttpClient) { }


  getUsers():Observable<Users[]>{
    return this.httpclient.get<Users[]>(`${environment.apiUrl}/usuarios`);
  }

  postUsers(newUser:User):Observable<User>{
    return this.httpclient.post<User>(`${environment.apiUrl}/usuarios`, newUser);
  }

  putUsers(User:any):Observable<Users>{
    return this.httpclient.put<Users>(`${environment.apiUrl}/usuarios/${User.id}`, User);
  }

  deleteUsers(User:any):Observable<Users>{
    return this.httpclient.delete<Users>(`${environment.apiUrl}/usuarios/${User.id}`);
  }

}
