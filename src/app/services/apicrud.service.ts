import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { User,Users,Clase, Asignatura, Justificativo } from 'src/interfaces/users';
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
  getClase():Observable<Clase[]>{
    return this.httpclient.get<Clase[]>(`${environment.apiUrl}/clases`);
  }
  getAsignatura():Observable<Asignatura[]>{
    return this.httpclient.get<Asignatura[]>(`${environment.apiUrl}/Asignaturareg`);
  }
  getJustificativo():Observable<Justificativo[]>{
    return this.httpclient.get<Justificativo[]>(`${environment.apiUrl}/Justificativos`);
  }
  deleteJustificativo(Justificativo:any):Observable<Justificativo>{
    return this.httpclient.delete<Justificativo>(`${environment.apiUrl}/Justificativos/${Justificativo.id}`);
  }
  putJustificativo(Justificativo:any):Observable<Justificativo>{
    return this.httpclient.put<Justificativo>(`${environment.apiUrl}/Justificativos/${Justificativo.id}`, Justificativo);
  }
  postJustificativo(newJustificativo:Justificativo):Observable<Justificativo>{
    return this.httpclient.post<Justificativo>(`${environment.apiUrl}/Justificativos`, newJustificativo);
  }
}
