import {TotalMensal} from '../totalMensal';
import {Component} from '@angular/core';
import {TotalMensalService} from '../total-mensal.service';
import {Contrato} from '../../contratos/contrato';
import {ContratosService} from '../../contratos/contratos.service';

@Component({
    selector: 'app-total-mensal-ret',
    templateUrl: './total-mensal-ret.component.html'
})
export class TotalMensalRetComponent {
    calculos: TotalMensal[];
    contratos: Contrato[];
    tmService: TotalMensalService;
    contratoService: ContratosService;
    codContrato: number;
    constructor(tmService: TotalMensalService, contratoService: ContratosService) {
        this.contratoService = contratoService;
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
        this.tmService = tmService;
        if (this.codContrato) {
            this.tmService.getValoresCalculados(this.codContrato).subscribe(res => {
                this.calculos = res;
            });
        }
    }
    onChange(value: number) {
        this.codContrato = value;
        this.tmService.getValoresCalculados(this.codContrato).subscribe(res => {
            this.calculos = res;
        });
    }
}
