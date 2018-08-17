import {Component} from '@angular/core';
import {ContratosService} from '../../contratos/contratos.service';
import {Contrato} from '../../contratos/contrato';
import {TerceirizadoFeriasMovimentacao} from '../TerceirizadoFeriasMovimentacao';
import {FeriasService} from '../ferias.service';

@Component({
    selector: 'app-calculo-ferias-component',
    templateUrl: './calculo-ferias.component.html'
})
export class CalculoFeriasComponent {
    protected contratos: Contrato[];
    protected terceirizados: TerceirizadoFeriasMovimentacao[];
    codigoContrato: number;
    tipoRestituicao: string;
    constructor(private contratoService: ContratosService, private feriasService: FeriasService) {
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
    }
    defineCodigoContrato(codigoContrato: number) {
        this.codigoContrato = codigoContrato;
        if (this.codigoContrato && this.tipoRestituicao) {
            this.feriasService.getFuncionariosFerias(this.codigoContrato, this.tipoRestituicao).subscribe(res => {
                this.terceirizados = res;
            });
        }
    }
    defineTipoMovimentacao(tipoMovimentacao: string) {
        this.tipoRestituicao = tipoMovimentacao;
        if (this.codigoContrato && this.tipoRestituicao) {
            this.feriasService.getFuncionariosFerias(this.codigoContrato, this.tipoRestituicao).subscribe(res => {
                this.terceirizados = res;
            });
        }
    }
}