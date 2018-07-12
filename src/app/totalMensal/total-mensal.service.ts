import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConfigService} from '../_shared/config.service';

@Injectable()
export class TotalMensalService {
    private http: Http;
    private configService: ConfigService;
    constructor(http: Http, config: ConfigService) {
        this.configService = config;
       this.http = http;
    }
    public getValoresCalculados(codigo: number) {
        const url = this.configService.myApi + '/total-mensal-a-reter/getValoresRetidos=' + codigo;
        return this.http.get(url).map(res => res.json());
    }
}