import {ChangeDetectorRef, Component, EventEmitter, Input, Output} from '@angular/core';
import {Contrato} from '../../contrato';
import {ContratosService} from '../../contratos.service';
import {UserService} from '../../../users/user.service';
import {ConfigService} from '../../../_shared/config.service';
import {Usuario} from '../../../usuarios/usuario';
import {Cargo} from '../../../cargos/cargo';
import {FormArray, FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {PercentualService} from '../../../percentuais/percentual.service';
import {Percentual} from '../../../percentuais/percentual';
import {Convencao} from '../../../convencoes-coletivas/convencao';
import {ConvencaoService} from '../../../convencoes-coletivas/convencao.service';
import {CargoService} from '../../../cargos/cargo.service';

@Component({
    selector: 'app-cadastrar-ajustes',
    templateUrl: './cadastrar-ajustes.component.html',
    styleUrls: ['./cadastrar-ajustes.component.scss']
})
export class CadastrarAjustesComponent {
    @Input() contratos: Contrato[];
    field = false;
    usuarios: Usuario[];
    cargosCadastrados: Cargo[];
    myForm: FormGroup;
    nomeGestorContrato: string;
    percentualDecimoTerceiro: number;
    percentualFerias: number;
    percentualIncidencia: number;
    percentuaisFerias: Percentual[] = [];
    percentuaisDecimoTerceiro: Percentual[] = [];
    convencoesColetivas: Convencao[] = [];
    contrato: Contrato;
    primeiroSubstituto: string;
    segundoSubstituto: string;
    @Output() cadastroAjuste = new EventEmitter();
    constructor(private contratoService: ContratosService, private userService: UserService, private config: ConfigService, private  fb: FormBuilder, private percentService: PercentualService,
                private convService: ConvencaoService, private ref: ChangeDetectorRef, private cargoService: CargoService) {
        this.percentService.getPercentuaisFerias().subscribe(res => {
            if (!res.error) {
               this.percentuaisFerias = res;
            }
        });
        this.percentService.getPercentuaisDecimoTerceiro().subscribe( res => {
           if (!res.error) {
               this.percentuaisDecimoTerceiro = res;
           }
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

        this.cargoService.getAllCargos().subscribe(res => {
            this.cargosCadastrados = res;
        }, error2 => {
            console.log(error2);
        });
    }
    enableField(codigo: number) {
        this.field = false;
        this.contratoService.getNomeDoGestor(codigo).subscribe(res => {
            if ( res === 'Este contrato não existe !') {
            } else {
                this.nomeGestorContrato = res;
                this.field = true;
            }
        });
      this.contratoService.getContratoCompletoUsuario(codigo).subscribe(res => {
          this.contrato = res;
        },
        error => {
          console.log(error);
        },
        () => {
          this.startView();
        }
      );
      this.initForm();
    }
  getFormArrayItems() {
    const control = <FormArray>this.myForm.controls.cargos;
    return control.controls;
  }
  formArrayLength() {
    const control = <FormArray>this.myForm.controls.cargos;
    return control.length;
  }
  initForm() {
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
      numeroContrato: new FormControl('', [Validators.required]),
      nomeEmpresa: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      ativo: new FormControl('', [Validators.required]),
      objeto: new FormControl('', [Validators.required])
    });
    this.initCargos();
  }
  adicionaCargo(): void {
    const control = <FormArray>this.myForm.controls.cargos;
    const addCtrl = this.initCargos();
    control.push(addCtrl);
  }
  /*removeCargo(i: number) {
    const control = <FormArray>this.myForm.controls.cargos;
    control.removeAt(i);
  }*/
  initCargos() {
    return this.fb.group({
      nome: new FormControl('', [Validators.required]),
      remuneracao: new FormControl('', [Validators.required]),
      descricao: new FormControl(''),
      trienios: new FormControl('0'),
      adicionais: new FormControl('', [Validators.required]),
      convencao: new FormControl(''),
      dataBase: new FormControl('')
    });
  }
  startView() {
    if (this.contrato) {
      this.myForm.controls.numeroContrato.setValue(this.contrato.numeroDoContrato);
      this.myForm.controls.nomeEmpresa.setValue(this.contrato.nomeDaEmpresa);
      this.myForm.controls.cnpj.setValue(this.contrato.cnpj);
      this.myForm.controls.objeto.setValue(this.contrato.objeto);
      if (this.contrato.seAtivo === 'S' || this.contrato.seAtivo === 'SIM') {
        this.myForm.controls.ativo.setValue('Sim');
      } else {
        this.myForm.controls.ativo.setValue('Não');
      }
      this.myForm.controls.objeto.setValue(this.contrato.objeto);
      this.myForm.controls.gestor.setValue(this.nomeGestorContrato);
      if (this.contrato.percentuais) {
        for (let i = 0; i < this.contrato.percentuais.length; i++) {
          const percentual: Percentual = this.contrato.percentuais[i];
          if (percentual.nome.includes('Férias')) {
            this.percentualFerias = percentual.percentual;
            this.myForm.controls.percentualFerias.setValue(percentual.percentual);
          }
          if (percentual.nome.includes('Décimo terceiro')) {
            this.percentualDecimoTerceiro = percentual.percentual;
            this.myForm.controls.percentualDecimoTerceiro.setValue(percentual.percentual);
          }
          if (percentual.nome.includes('Incidência')) {
            this.percentualIncidencia = percentual.percentual;
            this.myForm.controls.percentualIncidencia.setValue(percentual.percentual);
          }
        }
      }
      if (this.contrato.historicoGestao.length > 1) {
        if (this.contrato.historicoGestao[1]) {
          this.primeiroSubstituto = this.contrato.historicoGestao[1].gestor;
          this.myForm.controls.primeiroSubstituto.setValue(this.primeiroSubstituto);
        }
        if (this.contrato.historicoGestao[2]) {
          this.segundoSubstituto = this.contrato.historicoGestao[2].gestor;
          this.myForm.controls.segundoSubstituto.setValue(this.segundoSubstituto);
        }
      }
      this.contrato.funcoes.forEach(funcao => {
        const control = <FormArray>this.myForm.controls.cargos;
        const addCtrl = this.initCargos();
        addCtrl.controls.nome.setValue(funcao.nome);
        addCtrl.controls.nome.disable();
        addCtrl.controls.remuneracao.setValue(funcao.remuneracao);
        addCtrl.controls.descricao.setValue(funcao.descricao);
        addCtrl.controls.trienios.setValue(funcao.trienios);
        addCtrl.controls.adicionais.setValue(funcao.adicionais);
        if (funcao.convencao) {
          addCtrl.controls.convencao.setValue(funcao.convencao.codigo);
          addCtrl.controls.dataBase.setValue(funcao.convencao.dataBase);
        }
        control.push(addCtrl);
      });
      this.myForm.updateValueAndValidity();
      this.ref.markForCheck();
      this.ref.detectChanges();
    }
  }
  checkValidity() {
    if (this.myForm.valid) {
      this.cadastroAjuste.emit('Chamando Evento');
    }
  }
}
