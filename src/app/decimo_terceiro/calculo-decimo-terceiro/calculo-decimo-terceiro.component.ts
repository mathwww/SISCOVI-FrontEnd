import {Component, EventEmitter, Output} from '@angular/core';
import {Contrato} from '../../contratos/contrato';

@Component({
    selector: 'app-calculo-decimo-terceiro-component',
    templateUrl: './calculo-decimo-terceiro.component.html'
})
export class CalculoDecimoTerceiroComponent {
    protected contratos: Contrato[];
    protected terceirizados: Object[];
    codigo: number;
    tipoRestituicao: string;
    @Output() navegaParaViewDeCalculos = new EventEmitter();
}