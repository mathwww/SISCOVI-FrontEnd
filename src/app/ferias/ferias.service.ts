import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {ConfigService} from '../_shared/config.service';
import {FeriasCalcular} from './ferias-calcular';


@Injectable()
export class FeriasService {
    constructor(private http: Http, private config: ConfigService) {}
    getFuncionariosFerias(codigoContrato: number, tipoRestituicao: string) {
        const url = this.config.myApi + '/ferias/getTerceirizadosFerias=' + codigoContrato + '/' + tipoRestituicao;
        return this.http.get(url).map(res => res.json());
    }
    calculaFeriasTerceirizados(feriasCalcular: FeriasCalcular[]) {
        const url = this.config.myApi + '/ferias/calculaFeriasTerceirizados';
        const data = feriasCalcular;
        const headers = new Headers({'Content-type': 'application/json'});
        return this.http.post(url, data, headers).map(res => res.json());
    }
    getValoresFeriasTerceirizado(feriasCalcular: FeriasCalcular) {
        const url = this.config.myApi + '/ferias/getValorRestituicaoFeriasModel';
        const inicioFerias = this.encapsulaDatas(feriasCalcular.getInicioFerias());
        const fimFerias = this.encapsulaDatas(feriasCalcular.getFimFerias());
        const data = {
            'codTerceirizadoContrato': feriasCalcular.getCodTerceirizadoContrato(),
            'tipoRestituicao': feriasCalcular.getTipoRestituicao(),
            'diasVendidos': feriasCalcular.getDiasVendidos(),
            'inicioFerias': inicioFerias.toISOString().split('T')[0],
            'fimFerias': fimFerias.toISOString().split('T')[0],
            'inicioPeriodoAquisitivo': feriasCalcular.getInicioPeriodoAquisitivo(),
            'fimPeriodoAquisitivo': feriasCalcular.getFimPeriodoAquisitivo(),
            'valorMovimentado': feriasCalcular.getValorMovimentado(),
            'proporcional': feriasCalcular.getProporcional()
        };
        return this.http.post(url, data).map(res => res.json());
    }
    protected encapsulaDatas(value: any): Date {
            const a = value.split('/');
            const dia = Number(a[0]);
            const mes = Number(a[1]) - 1;
            const ano = Number(a[2]);
            return new Date(ano, mes, dia);
    }
}
