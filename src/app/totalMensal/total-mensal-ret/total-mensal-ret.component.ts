import {TotalMensal} from '../totalMensal';
import {AfterViewChecked, Component, Input, OnChanges} from '@angular/core';
import {TotalMensalService} from '../total-mensal.service';
import {Contrato} from '../../contratos/contrato';
import {ContratosService} from '../../contratos/contratos.service';
import {ConfigService} from '../../_shared/config.service';
import {ListaTotalMensalData} from '../lista-total-mensal-data';

@Component({
    selector: 'app-total-mensal-ret',
    templateUrl: './total-mensal-ret.component.html'
})
export class TotalMensalRetComponent {
    calculos: ListaTotalMensalData[];
    contratos: Contrato[];
    tmService: TotalMensalService;
    contratoService: ContratosService;
    private config: ConfigService;
    codContrato: number;
    @Input() contratoSelecionado: number;
    constructor(tmService: TotalMensalService, contratoService: ContratosService, config: ConfigService) {
        this.contratoService = contratoService;
        this.config = config;
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
        this.tmService = tmService;
        this.tmService.getValoresCalculados(this.codContrato, this.config.user.id).subscribe(res => {
            this.calculos = res;
        });
    }
    onChange(value: number) {
       this.codContrato = value;
       this.tmService.getValoresCalculados(this.codContrato, this.config.user.id).subscribe(res => {
            this.calculos = res;
        });
    }
}
