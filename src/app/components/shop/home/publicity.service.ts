import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Publicity } from './publicity';

@Injectable({
  providedIn: 'root'
})
export class PublicityService {
  private apiserverUrl=environment.apiBaseUrl;


  constructor(private httpclient: HttpClient) { }
  public publicities(): Observable<Publicity[]> {
    return this.httpclient.get<Publicity[]>(`${this.apiserverUrl}/publicity/currentpublicities`);
  }
}
