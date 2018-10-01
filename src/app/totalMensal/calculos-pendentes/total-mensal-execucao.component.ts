import {Component, Input, OnInit} from '@angular/core';
import {FormArray, FormControl, FormGroup, FormBuilder} from '@angular/forms';
import {Contrato} from '../../contratos/contrato';
import {TotalMensalPendente} from '../total-mensal-pendente';
import {ConfigService} from '../../_shared/config.service';
import {ContratosService} from '../../contratos/contratos.service';
import {TotalMensalService} from '../total-mensal.service';

@Component({
    selector: 'app-total-mensal-execucao-component',
    templateUrl: './total-mensal-execucao.component.html',
    styleUrls: ['../total-mensal.component.scss']
})
export class TotalMensalExecucaoComponent implements OnInit {
    @Input() codigoContrato: number;
    contratos: Contrato[];
    totais: TotalMensalPendente[];
    totalMensalForm: FormGroup;
    config: ConfigService;
    isSelected = false;
    constructor (private contratoService: ContratosService, private totalMensalService: TotalMensalService, private fb: FormBuilder, config: ConfigService) {
        this.config = config;
        if (this.codigoContrato) {
            this.totalMensalService.getTotaisPendentesExecucao(this.codigoContrato).subscribe(res => {
                this.totais = res;
                if (this.totais) {
                    this.formInit();
                }
            });
        }
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
            if (this.totais) {
                this.formInit();
            }
        });
    }
    ngOnInit() {
        this.formInit();
    }
    formInit() {
        this.totalMensalForm = this.fb.group({
            avaliacaoDeCalculo: this.fb.array([])
        });
        if (this.totais) {
            if (this.totais.length > 0) {
                const control = <FormArray>this.totalMensalForm.controls.avaliacaoDeCalculo;
                this.totais.forEach(() => {
                    const addCtrl = this.fb.group({
                        avaliacao: new FormControl(),
                        selected: new FormControl(false)
                    });
                    control.push(addCtrl);
                });
            }
        }
    }
    defineCodigoContrato(codigo: number) {
        this.codigoContrato = codigo;
        this.totalMensalService.getTotaisPendentesExecucao(codigo).subscribe(res => {
            this.totais = res;
            if (this.formInit()) {
                this.formInit();
            }
        });
    }
}
