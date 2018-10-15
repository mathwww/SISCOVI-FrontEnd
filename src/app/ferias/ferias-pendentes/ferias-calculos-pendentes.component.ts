import {ChangeDetectorRef, Component, Input, OnInit} from '@angular/core';
import {Contrato} from '../../contratos/contrato';
import {FeriasService} from '../ferias.service';
import {ContratosService} from '../../contratos/contratos.service';
import {FeriasCalculosPendentes} from './ferias-calculos-pendentes';
import {ConfigService} from '../../_shared/config.service';
import {FormArray, FormBuilder, FormControl, FormGroup} from '@angular/forms';

@Component({
    selector: 'app-ferias-calculos-pendentes',
    templateUrl: './ferias-calculos-pendentes.component.html',
    styleUrls: ['./ferias-calculos-pendentes.component.scss']
})
export class FeriasCalculosPendentesComponent implements OnInit {
    contratos: Contrato[];
    @Input() codigoContrato = 0;
    isSelected = false;
    calculosPendentes: FeriasCalculosPendentes[];
    config: ConfigService;
    feriasForm: FormGroup;
    constructor(private feriasService: FeriasService, private contratoService: ContratosService, config: ConfigService, private fb: FormBuilder, private ref: ChangeDetectorRef) {
        this.config = config;
        this.contratoService.getContratosDoUsuario().subscribe(res => {
           this.contratos = res;
           if (this.codigoContrato) {
              this.feriasService.getCalculosPendentes(this.codigoContrato).subscribe(res2 => {
                  this.calculosPendentes = res2;
                  if (this.calculosPendentes.length === 0) {
                      this.calculosPendentes = null;
                  }else {
                      this.formInit();
                  }
              });
           }
        });
    }
    ngOnInit() {
        this.formInit();
    }
    formInit() {
        if (this.calculosPendentes ) {
            this.feriasForm = this.fb.group({
                avaliacaoCalculoFerias: this.fb.array([])
            });
            if (this.calculosPendentes) {
                const control = <FormArray>this.feriasForm.controls.avaliacaoCalculoFerias;
                this.calculosPendentes.forEach(item => {
                    const addControl = this.fb.group({
                        selected: new FormControl(),
                        avaliacao: new FormControl('S')
                    });
                    control.push(addControl);
                });
            }
            this.ref.markForCheck();
        }
    }
    defineCodigoContrato(codigoContrato: number): void {
        this.codigoContrato = codigoContrato;
        if (this.codigoContrato) {
            this.feriasService.getCalculosPendentes(this.codigoContrato).subscribe(res2 => {
                this.calculosPendentes = res2;
                if (this.calculosPendentes.length === 0) {
                    this.calculosPendentes = null;
                }else {
                    this.formInit();
                }
            });
        }
    }
}
