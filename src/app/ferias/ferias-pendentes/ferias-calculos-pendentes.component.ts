import {Component, Input} from '@angular/core';
import {Contrato} from '../../contratos/contrato';
import {FeriasService} from '../ferias.service';
import {ContratosService} from '../../contratos/contratos.service';
import {FeriasCalculosPendentes} from './ferias-calculos-pendentes';

@Component({
    selector: 'app-ferias-calculos-pendentes',
    templateUrl: './ferias-calculos-pendentes.component.html'
})
export class FeriasCalculosPendentesComponent {
    contratos: Contrato[];
    @Input() codigoContrato = 0;
    calculosPendentes: FeriasCalculosPendentes[];
    constructor(private feriasService: FeriasService, private contratoService: ContratosService) {
        this.contratoService.getContratosDoUsuario().subscribe(res => {
           this.contratos = res;
           if (this.codigoContrato) {
              this.feriasService.getCalculosPendentes(this.codigoContrato).subscribe(res2 => {
                  console.log(res2);
                  this.calculosPendentes = res2;
                  if (this.calculosPendentes.length === 0) {
                      this.calculosPendentes = null;
                  }
              });
           }
        });
    }
    defineCodigoContrato(codigoContrato: number): void {
        this.codigoContrato = codigoContrato;
        if (this.codigoContrato) {
            this.feriasService.getCalculosPendentes(this.codigoContrato).subscribe(res2 => {
                console.log(res2);
                this.calculosPendentes = res2;
                if (this.calculosPendentes.length === 0) {
                    this.calculosPendentes = null;
                }
            });
        }
    }
}
