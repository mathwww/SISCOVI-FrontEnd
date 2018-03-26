import { Injectable } from '@angular/core';
import { ConfigService } from '../_shared/config.service';
import { Http, Headers } from '@angular/http';

@Injectable()
export class RubricasService {
  private headers: Headers;
  constructor(private config: ConfigService, private http: Http) {
    this.headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );
  }
  getAllrubricas() {
    const url = this.config.myApi + '/rubricas/getAll';
    return this.http.get(url).map(res => res.json());
  }
  getPercnetuaisEstaticos() {
    const url = this.config.myApi + '/rubricas/getStaticPercent';
    return this.http.get(url).map(res => res.json());
  }
}
