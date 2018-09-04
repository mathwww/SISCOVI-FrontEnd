import {Component} from '@angular/core';
import {Contrato} from '../../contratos/contrato';
import {FeriasService} from '../ferias.service';
import {ContratosService} from '../../contratos/contratos.service';

@Component({
    selector: 'app-ferias-calculos-pendentes',
    templateUrl: './ferias-calculos-pendentes.component.html'
})
export class FeriasCalculosPendentesComponent {
    contratos: Contrato[];
    codigoContrato: number;
    constructor(private feriasService: FeriasService, private contratoService: ContratosService) {
        this.contratoService.getContratosDoUsuario().subscribe(res => {
           this.contratos = res;
        });
    }
}
