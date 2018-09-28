import {Component, Input, OnInit} from '@angular/core';
import {Contrato} from '../../contratos/contrato';
import {TotalMensalService} from '../total-mensal.service';
import {TotalMensalPendente} from '../total-mensal-pendente';
import {ContratosService} from '../../contratos/contratos.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';
import {ConfigService} from '../../_shared/config.service';

@Component({
    selector: 'app-total-mensal-pendente-component',
    templateUrl: './total-mensal-pendente.component.html',
    styleUrls: ['./total-mensal-pendente.component.scss']
})
export class TotalMensalPendenteComponent implements OnInit {
    @Input() codigoContrato: number;
    contratos: Contrato[];
    totais: TotalMensalPendente[];
    totalMensalForm: FormGroup;
    config: ConfigService;
    constructor (private contratoService: ContratosService, private totalMensalService: TotalMensalService, private fb: FormBuilder, config: ConfigService) {
        this.config = config;
        if (this.codigoContrato) {
            this.totalMensalService.getTotaisPendentes(this.codigoContrato).subscribe(res => {
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
                            avaliacao: new FormControl()
                        });
                        control.push(addCtrl);
                    });
                }
            }
    }
    defineCodigoContrato(codigo: number) {
        this.codigoContrato = codigo;
        this.totalMensalService.getTotaisPendentes(codigo).subscribe(res => {
            this.totais = res;
            if (this.formInit()) {
                this.formInit();
            }
        });
    }
}
