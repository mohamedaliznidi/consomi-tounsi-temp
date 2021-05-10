import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Publicity } from './publicity';

@Injectable({
  providedIn: 'root'
})
export class PublicityService {
  httpClient: any;

  constructor(private http : HttpClient) { }
  public publicities(): Observable<Publicity[]> {
    return this.http.get<Publicity[]>(`http://localhost:8080/publicity/currentpublicities`);
  }
}
