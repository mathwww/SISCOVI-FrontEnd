import {Injectable} from '@angular/core';
import {Http, Headers} from '@angular/http';
import {ConfigService} from '../_shared/config.service';
import {Contrato} from '../contratos/contrato';

@Injectable()
export class CargoService {
  http: Http;
  config: ConfigService;
  headers: Headers;
  constructor(http: Http, config: ConfigService) {
    this.http = http;
    this.config = config;
    this.headers = new Headers(
      {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    );
  }
  getAllCargos() {
    const url = this.config.myApi + '/cargo/getAllCargos';
    return this.http.get(url, {headers: this.headers}).map(res => res.json());
  }
  getCargosDosContratos(contrato: Contrato[]) {
    const url = this.config.myApi + '/cargo/getCargosDosContratos';
    const data = contrato;
    return this.http.post(url, data).map(res => res.json());
  }
  getCargosFuncionarios (codigo: number) {
    const url = this.config.myApi + '/funcionarios/getFuncioECargos=' + codigo;
    return this.http.get(url).map(res => res.json());
  }
}
