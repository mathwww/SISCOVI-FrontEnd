import {ContratosService} from '../contratos/contratos.service';
import {Contrato} from '../contratos/contrato';
import {PercentualService} from './percentual.service';
import {Component} from '@angular/core';
import {ListaDePercentuais} from './lista.de.percentuais';
@Component({
  selector: 'app-percentuais-do-contrato',
  templateUrl: './percentuais.component.html',
  styleUrls: ['./percentuais.component.scss']
})
export class PercentuaisComponent {
  contratos: Contrato[] = [];
  listaPercentuais: ListaDePercentuais[];
   constructor (constServ: ContratosService, percentServ: PercentualService) {
     if (constServ.contratos.length === 0) {
       constServ.getContratosDoUsuario().subscribe(res => {
         this.contratos = res;
         percentServ.getPercentuaisDosContratos(this.contratos).subscribe(res2 => {
           this.listaPercentuais = res2;
         });
       });
     }else {
       this.contratos = constServ.contratos;
       percentServ.getPercentuaisDosContratos(this.contratos).subscribe(res => {
         this.listaPercentuais = res;
       });
     }

   }
}
