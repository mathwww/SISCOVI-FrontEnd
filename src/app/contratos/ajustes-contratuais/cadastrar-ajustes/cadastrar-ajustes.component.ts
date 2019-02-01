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
import {EventoContratual} from '../evento-contratual';
import {TipoEventoContratual} from '../tipo-evento-contratual';

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
  cadastroAjuste = new EventEmitter();
  tiposEventosContratuais: TipoEventoContratual[] = [];

  constructor(private contratoService: ContratosService, private userService: UserService, private config: ConfigService, private  fb: FormBuilder, private percentService: PercentualService,
              private convService: ConvencaoService, private ref: ChangeDetectorRef, private cargoService: CargoService) {
    this.contratoService.getContratosDoUsuario().subscribe(res => {
      this.contratos = res;
    });
    this.percentService.getPercentuaisFerias().subscribe(res => {
      if (!res.error) {
        this.percentuaisFerias = res;
      }
    });
    this.percentService.getPercentuaisDecimoTerceiro().subscribe(res => {
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
    } else {
      userService.getGestores().subscribe(res3 => {
        this.usuarios = res3;
      });
    }

    this.cargoService.getAllCargos().subscribe(res => {
      this.cargosCadastrados = res;
    }, error2 => {
      console.log(error2);
    });
    this.contratoService.getTiposEventosContratuais().subscribe(res => {
      this.tiposEventosContratuais = res;
    });
  }

  enableField(codigo: number) {
    this.field = false;
    this.contratoService.getNomeDoGestor(codigo).subscribe(res => {
      if (res === 'Este contrato não existe !') {
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
      prorrogacao: new FormControl('N', [Validators.required]),
      gestor: new FormControl('', [Validators.required]),
      primeiroSubstituto: new FormControl(''),
      segundoSubstituto: new FormControl(''),
      assinatura: new FormControl('', [Validators.required]),
      inicioVigencia: new FormControl('', [Validators.required]),
      fimVigencia: new FormControl('', [Validators.required]),
      assunto: new FormControl(''),
      percentualFerias: new FormControl('', [Validators.required]),
      percentualDecimoTerceiro: new FormControl('', [Validators.required]),
      percentualIncidencia: new FormControl(''),
      numeroContrato: new FormControl('', [Validators.required]),
      nomeEmpresa: new FormControl('', [Validators.required]),
      cnpj: new FormControl('', [Validators.required]),
      ativo: new FormControl('', [Validators.required]),
      objeto: new FormControl('')
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
      this.myForm.controls.cnpj.setValue(this.formaCNPJ(this.contrato.cnpj));
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
          addCtrl.controls.dataBase.setValue(this.dateToString(funcao.convencao.dataBase));
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

  protected selectConvencao(codConvencao: number, indexForm: number): void {
    const i: number = this.convencoesColetivas.findIndex(item => item.codigo === Number(codConvencao));
    if (i !== -1) {
      this.getFormArrayItems()[indexForm].get('dataBase').setValue(this.dateToString(this.convencoesColetivas[i].dataBase));
    }
  }

  private dateToString(value: any): string {
    const date: string[] = value.split('-');
    return date[2] + '/' + date[1] + '/' + date['0'];
  }

  private formaCNPJ(value: string): string {
    const firstString: string = value.substring(0, 2);
    const secondString: string = value.substring(2, 5);
    const thirdString: string = value.substring(5, 8);
    const fourthString: string = value.substring(8, 12);
    const fifthString: string = value.substring(12);
    return firstString + '.' + secondString + '.' + thirdString + '/' + fourthString + '-' + fifthString;
  }

  verificaAjusteASerCadastrado() {
    const contrato: Contrato = this.contrato;
    const eventoContratual: EventoContratual = new EventoContratual();
    const index: number = this.tiposEventosContratuais.findIndex(item => item.cod === Number(this.myForm.get('tipoAjuste').value));
    if (index !== -1) {
      eventoContratual.tipo = this.tiposEventosContratuais[index];
    }
    eventoContratual.assunto = this.myForm.get('assunto').value;
    eventoContratual.prorrogacao = this.myForm.get('prorrogacao').value;
    eventoContratual.dataInicioVigencia = this.myForm.get('inicioVigencia').value;
    eventoContratual.dataFimVigencia = this.myForm.get('fimVigencia').value;
    eventoContratual.dataAssinatura = this.myForm.get('assinatura').value;

    this.getFormArrayItems().forEach(control => {
        const funcao: Cargo = this.contrato.funcoes.find(item => item.nome === control.value);
        if (funcao) {
          /*if (control.parent.get('remuneracao').value === ) {

          }*/
        }
    });
  }

  public findInvalidControls() {
    const invalid = [];
    const controls = this.myForm.controls;
    for (const name in controls) {
      if (controls[name].invalid) {
        invalid.push({nome: name, error: [controls[name].errors]});
      }
    }
    return invalid;
  }
}
