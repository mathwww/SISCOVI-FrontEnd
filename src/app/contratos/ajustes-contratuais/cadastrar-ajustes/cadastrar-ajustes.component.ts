import {Component} from '@angular/core';
import {Contrato} from '../../contrato';
import {ContratosService} from '../../contratos.service';
import {UserService} from '../../../users/user.service';
import {ConfigService} from '../../../_shared/config.service';
import {Usuario} from '../../../usuarios/usuario';
import {Cargo} from '../../../cargos/cargo';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PercentualService} from '../../../percentuais/percentual.service';
import {Percentual} from "../../../percentuais/percentual";
import {Convencao} from "../../../convencoes-coletivas/convencao";
import {ConvencaoService} from "../../../convencoes-coletivas/convencao.service";

@Component({
    selector: 'app-cadastrar-ajustes',
    templateUrl: './cadastrar-ajustes.component.html',
    styleUrls: ['./cadastrar-ajustes.component.scss']
})
export class CadastrarAjustesComponent {
    contratos: Contrato[];
    field = false;
    usuarios: Usuario[];
    cargosCadastrados: Cargo[];
    myForm: FormGroup;
    fb: FormBuilder;
    nomeGestorContrato: string;
    primeiroSubstituto: string;
    segundoSubstituto: string;
    percentualDecimoTerceiro: number;
    percentualFerias: number;
    percentualIncidencia: number;
    percentuaisFerias: Percentual[] = [];
    percentuaisDecimoTerceiro: Percentual[] = [];
    convencoesColetivas: Convencao[] = [];
    contrato: Contrato;
    constructor(private contratoService: ContratosService, private userService: UserService, private config: ConfigService, fb: FormBuilder, private percentService: PercentualService,
                private convService: ConvencaoService) {
        this.fb = fb;
        this.percentService.getPercentuaisFerias().subscribe(res => {
            if (!res.error) {
               this.percentuaisFerias = res;
               console.log(this.percentuaisFerias);
            }
        });
        this.percentService.getPercentuaisDecimoTerceiro().subscribe( res => {
           if (!res.error) {
               this.percentuaisDecimoTerceiro = res;
           }
        });
        this.contratoService.getContratosDoUsuario().subscribe(res => {
            this.contratos = res;
        });
        this.convService.getAll().subscribe(res => {
            if (!res.error) {
               this.convencoesColetivas = res;
            }
        });
        if (userService.user.perfil.sigla === 'ADMINISTRADOR') {
            userService.getUsuarios().subscribe(res2 => {
                this.usuarios = res2;
            });
        }else {
            userService.getGestores().subscribe(res3 => {
                this.usuarios = res3;
            });
        }
    }
    adicionaCargo(): void {
        const control = <FormArray>this.myForm.controls.cargos;
        const addCtrl = this.initCargos();
        control.push(addCtrl);
    }
    removeCargo(i: number) {
        const control = <FormArray>this.myForm.controls.cargos;
        control.removeAt(i);
    }
    initCargos() {
        return this.fb.group({
            nome: new FormControl('', [Validators.required]),
            remuneracao: new FormControl('', [Validators.required]),
            descricao: new FormControl(''),
            trienios: new FormControl(''),
            adicionais: new FormControl(''),
            convencao: new FormControl('')
            // mes: new FormControl('', [Validators.required])
        });
    }
    enableField(codigo: number) {
        this.field = true;
        this.contratoService.getNomeDoGestor(codigo).subscribe(res => {
            if ( res === 'Este contrato não existe !') {

            } else {
                this.nomeGestorContrato = res;
            }
        });
        this.contratoService.getContratoCompletoUsuario(codigo).subscribe(res => {
            if (!res.error) {
               this.contrato = res;
            }
        });

        this.contratos.forEach(contrato => {
            if (Number(codigo) === Number(contrato.codigo)) {
                // this.myForm.controls.numeroContrato.setValue(contrato.numeroDoContrato);
                // this.myForm.controls.nomeEmpresa.setValue(contrato.nomeDaEmpresa);
               // this.myForm.controls.cnpj.setValue(contrato.cnpj);
                this.myForm = this.fb.group({
                    cargos: this.fb.array([]),
                    tipoAjuste: new FormControl('', [Validators.required]),
                    prorrogacao: new FormControl('Não', [Validators.required]),
                    gestor: new FormControl('', [Validators.required]),
                    primeiroSubstituto: new FormControl(''),
                    segundoSubstituto: new FormControl(''),
                    assinatura: new FormControl('', [Validators.required]),
                    inicioVigencia: new FormControl('', [Validators.required]),
                    fimVigencia: new FormControl('', [Validators.required]),
                    assunto: new FormControl(''),
                    percentualFerias: new FormControl(''),
                    percentualDecimoTerceiro: new FormControl(''),
                    percentualIncidencia: new FormControl(''),
                    numeroContrato: new FormControl('' + contrato.numeroDoContrato),
                    nomeEmpresa: new FormControl('' + contrato.nomeDaEmpresa),
                    cnpj: new FormControl('' + contrato.cnpj),
                    ativo: new FormControl(''),
                    objeto: new FormControl('')
                });
                this.adicionaCargo();
                /* this.cargoService.getAllCargos().subscribe(resposta => {
                    this.cargosCadastrados = resposta;
                    this.initCargos();
                }); */
                this.initCargos(); // deixar assim por enquanto
               if (contrato.seAtivo === 'S' || contrato.seAtivo === 'SIM' || contrato.seAtivo.toLowerCase() === 'sim') {
                   this.myForm.controls.ativo.setValue('Sim');
               }else {
                   this.myForm.controls.ativo.setValue('Não');
               }
               this.myForm.controls.objeto.setValue(contrato.objeto);
               this.myForm.controls.gestor.setValue(this.nomeGestorContrato);
               if (this.contrato) {
                   this.contrato.percentuais.forEach(percentual => {
                       if (percentual.nome.includes('Férias')) {
                           this.percentualFerias = percentual.percentual;
                           this.myForm.controls.percentualFerias.setValue(percentual.percentual);
                       }
                       if (percentual.nome.includes('Décimo terceiro')) {
                           this.percentualDecimoTerceiro = percentual.percentual;
                           this.myForm.controls.percentualDecimoTerceiro.setValue(percentual.percentual);
                       }
                   });
               }
            }
        });
    }
    getFormArrayItems() {
        const control = <FormArray>this.myForm.controls.cargos;
        return control.controls;
    }
    formArrayLength() {
        const control = <FormArray>this.myForm.controls.cargos;
        return control.length;
    }
}
