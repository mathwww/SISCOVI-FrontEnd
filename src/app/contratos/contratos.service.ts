import {Injectable} from '@angular/core';
import {ConfigService} from '../_shared/config.service';
import {Http, Headers} from '@angular/http';
import {Contrato} from './contrato';
import {FormularioCadastroContrato} from './cadastro-contrato/formulario.cadastro.contrato';

@Injectable()
export class ContratosService {
  private headers: Headers;
  contratos: Contrato[] = [];
  formValido = false;
  formCadContr: FormularioCadastroContrato;
  constructor(private config: ConfigService, private  http: Http) {}

  getContratosDoUsuario() {
    const url = this.config.myApi + '/contrato/getContrato/usuario=' + this.config.user.username;
    return this.http.get(url).map(res => res.json());
  }
  getNomeDoGestor(codigo: number) {
      const url = this.config.myApi + '/contrato/getGestorContrato=' + codigo;
      return this.http.get(url).map(res => res.json());
  }
  cadastrarContrato(contrato: Contrato) {
    const url = this.config.myApi + '/contrato/cadastrarContrato/' + this.config.user.username;
    const historico = [];
    const percentuais = [];
    contrato.historicoGestao.forEach(item => {
       const hist = {
        gestor: item.gestor,
        codigoPerfilGestao: item.codigoPerfilGestao,
        inicio: this.convertDate(item.inicio),
        fim: this.convertDate(item.fim)
       };
       historico.push(hist);
    });
    contrato.percentuais.forEach(item => {
        const perc = {
            percentual: Number(item.percentual),
            dataInicio: this.convertDate(item.dataInicio),
            dataAditamento: this.convertDate(item.dataAditamento),
            rubrica: item.rubrica
        };
        percentuais.push(perc);
    });
    const data = {
       cnpj: contrato.cnpj,
       dataInicio: this.convertDate(contrato.dataInicio),
       nomeDaEmpresa: contrato.nomeDaEmpresa,
       numeroDoContrato: contrato.numeroDoContrato,
       objeto: contrato.objeto,
       seAtivo: contrato.seAtivo,
       historicoGestao: historico,
       funcoes: contrato.funcoes,
       dataAssinatura: this.convertDate(contrato.dataAssinatura),
       percentuais: percentuais,
       numeroProcessoSTJ: contrato.numeroProcessoSTJ,
    };
    console.log(data);
    return this.http.post(url, data).map(res => res.json());
  }

  private convertDate(date: Date) {
      const value = date.toISOString();
      const temp = value.split('T');
      return temp[0];
  }
}
