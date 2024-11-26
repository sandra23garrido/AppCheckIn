import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApidatosService {

  apiUrl='https://jsonplaceholder.typicode.com/posts';

  constructor(private httpclient: HttpClient) { }

  /*método que consume un servicio web - petición get*/
  getPosts():Observable<any>{
    return this.httpclient.get<any>(this.apiUrl);
  }


}
