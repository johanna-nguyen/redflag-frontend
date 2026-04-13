import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class Api {
  //private baseUrl = 'http://localhost:8080/api';

  private baseUrl = 'https://redflag-backend-production.up.railway.app/api/reports';

  constructor(private http: HttpClient) {}

  
  getAll() {
    return this.http.get(this.baseUrl);
  }

  search(name: string) {
    return this.http.get(`${this.baseUrl}/search?name=${name}`);
  }

  create(data: any) {
    return this.http.post(this.baseUrl, data);
  }
  


}
