import {Component} from '@angular/core';
import {ContratosService} from '../../contratos/contratos.service';
import {Contrato} from '../../contratos/contrato';

@Component({
    selector: 'app-calculo-ferias-component',
    templateUrl: './calculo-ferias.component.html'
})
export class CalculoFeriasComponent {
    protected contratos: Contrato[];
    constructor(private contratoService: ContratosService) {
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
    }
}