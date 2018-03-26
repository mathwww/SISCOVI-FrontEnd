import {Component} from '@angular/core';
import {ContratosService} from './contratos.service';
import {Contrato} from './contrato';

@Component({
  selector: 'app-contrato',
  templateUrl: './contratos.component.html',
  styleUrls: ['./contrato.component.scss']
})
export class ContratosComponent {
  contratos: Contrato[];
  constructor(contServ: ContratosService) {
    if (contServ.contratos.length === 0) {
      contServ.getContratosDoUsuario().subscribe( res => {
        contServ.contratos = res;
        this.contratos = res;
      });
    } else {
      this.contratos = contServ.contratos;
    }
  }

}
