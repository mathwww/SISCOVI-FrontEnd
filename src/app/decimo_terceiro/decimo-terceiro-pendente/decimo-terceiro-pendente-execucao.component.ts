import {Component, Input} from '@angular/core';

@Component({
    selector: 'app-decimo-terceiro-execucao-component',
    templateUrl: './decimo-terceiro-pendente-execucao.component.html',
    styleUrls: ['../decimo-terceiro.component.scss']
})
export class DecimoTerceiroPendenteExecucaoComponent{
    @Input() codigoContrato: number;
}