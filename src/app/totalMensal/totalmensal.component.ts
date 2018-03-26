import {Component, OnInit} from '@angular/core';
import {ContratosService} from '../contratos/contratos.service';
import {Contrato} from '../contratos/contrato';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {validate} from 'codelyzer/walkerFactory/walkerFn';

@Component({
  templateUrl: './totalmensal.component.html',
  selector: 'app-total-mensal',
  styleUrls: ['./totalmensal.component.scss']
})
export class TotalmensalComponent implements OnInit{
  contratos: Contrato[] = [];
  meses = [
      {valor: 1, mes: 'Janeiro'},
      {valor: 2, mes: 'Fevereiro'},
      {valor: 3, mes: 'Março'},
      {valor: 4, mes: 'Abril'},
      {valor: 5, mes: 'Maio'},
      {valor: 6, mes: 'Junho'},
      {valor: 7, mes: 'Julho'},
      {valor: 8, mes: 'Agosto'},
      {valor: 9, mes: 'Setembro'},
      {valor: 10, mes: 'Outubro'},
      {valor: 11, mes: 'Novembro'},
      {valor: 12, mes: 'Dezembro'}
    ];
  years: number[] = [];
  currentYear: number;
  anoDoContratoMaisAntigo: number;
  anoDoContratoMaisRecente: number;
  myForm;
  codigoContrato: number;
  validate = true;
  constructor(contServ: ContratosService) {
    if (contServ.contratos.length === 0) {
      contServ.getContratosDoUsuario().subscribe((res) => {
        contServ.contratos = res;
        this.contratos = res;
        this.currentYear = (new Date().getFullYear());
        this.anoDoContratoMaisAntigo = this.getAnoDoContratoMaisAntigo(this.contratos);
        this.anoDoContratoMaisRecente = this.getAnoDoContratoMaisRecente(this.contratos);
        this.years = this.preencheListaDeAnos(this.anoDoContratoMaisAntigo, this.anoDoContratoMaisRecente);
      });
    }else {
      this.contratos = contServ.contratos;
      this.currentYear = (new Date().getFullYear());
      this.anoDoContratoMaisAntigo = this.getAnoDoContratoMaisAntigo(this.contratos);
      this.anoDoContratoMaisRecente = this.getAnoDoContratoMaisRecente(this.contratos);
      this.years = this.preencheListaDeAnos(this.anoDoContratoMaisAntigo, this.anoDoContratoMaisRecente);
    }
    // this.normalizaDataFim();
  }
  ngOnInit(): void {
    this.myForm = new FormGroup({
      'name_contrato': new FormControl(this.codigoContrato, [Validators.required])
    });
  }
  getAnoDoContratoMaisAntigo(contratos: Contrato[]): number {
    let anoDoCMA: number;
    if (contratos.length > 1) {
      for (let i = 1; i < contratos.length; i++) {
        if (contratos[i].anoDoContrato < contratos[i - 1].anoDoContrato) {
          anoDoCMA = contratos[i].anoDoContrato;
        } else {
          anoDoCMA = contratos[i - 1].anoDoContrato;
        }
      }
    } else {
      anoDoCMA = contratos[0].anoDoContrato;
    }
    return anoDoCMA;
  }
  getAnoDoContratoMaisRecente(contratos: Contrato[]): number {
    let anoDOCMR: number;
    if (contratos.length > 1) {
      for (let i = 1; i < contratos.length; i++) {
        if (contratos[i].anoDoContrato > contratos[i - 1].anoDoContrato) {
          anoDOCMR = contratos[i].anoDoContrato;
        } else {
          anoDOCMR = contratos[i - 1].anoDoContrato;
        }
      }
    } else {
      anoDOCMR = contratos[0].anoDoContrato;
    }
    return anoDOCMR;
  }
  preencheListaDeAnos(anoDoContratoMaisAntigo: number, anoDoContratoMaisRecente: number): number[] {
    let currentYear: number = (new Date().getFullYear());
    const years: number[] = [];
    if (anoDoContratoMaisRecente === anoDoContratoMaisAntigo) {
      for (let i = 0; i < 10; i++) {
        years[i] = anoDoContratoMaisAntigo;
        anoDoContratoMaisAntigo = anoDoContratoMaisAntigo + 1;
      }
      return years;
    }
    for (let i = 0; currentYear > anoDoContratoMaisAntigo; i++) {
      currentYear = currentYear - 1;
      years[i] = currentYear;
    }
    currentYear = (new Date().getFullYear());
    for (let i = years.length; currentYear < (anoDoContratoMaisRecente + 6); i++) {
      years[i] = currentYear;
      currentYear = currentYear + 1;
    }
    years.sort((a, b) => (a - b));
    return years;
  }
  onChange(value): void {
    this.codigoContrato = value;
     if (value) {
       this.validate = false;
     }
  }
  /*normalizaDataFim() {
    this.contratos.forEach( contrato => {
      if (contrato.dataFim === null) {
        contrato.dataFim = '-';
      }
    });
  }*/
}
