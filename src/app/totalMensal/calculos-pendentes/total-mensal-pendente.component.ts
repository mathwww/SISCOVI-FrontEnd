import {Component, Input} from '@angular/core';
import {Contrato} from '../../contratos/contrato';
import {TotalMensal} from '../totalMensal';
import {TotalMensalService} from '../total-mensal.service';

@Component({
    selector: 'app-total-mensal-pendente-component',
    templateUrl: './total-mensal-pendente.component.html'
})
export class TotalMensalPendenteComponent {
    @Input() codigoContrato: number;
    contratos: Contrato[];
    totais: TotalMensal[];
    constructor (private totalMensalService: TotalMensalService) {
        if (this.codigoContrato) {
            this.totalMensalService.getTotaisPendentes(this.codigoContrato).subscribe(res => {
                this.totais = res;
            });
        }
    }
    defineCodigoContrato(codigo: number) {
        this.totalMensalService.getTotaisPendentes(codigo).subscribe(res => {
            this.totais = res;
        });
    }
}
