import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConfigService} from '../_shared/config.service';

@Injectable()
export class FeriasService {
    constructor(private http: Http, private config: ConfigService) {}
    getFuncionariosFerias(codigoContrato: number, tipoRestituicao: string) {
        const url = this.config.myApi + '/ferias/getTerceirizadosFerias=' + codigoContrato + '/' + tipoRestituicao;
        return this.http.get(url).map(res => res.json());
    }
}
