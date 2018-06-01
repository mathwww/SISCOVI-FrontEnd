import {Cargo} from '../../cargos/cargo';

export class FormularioCadastroContrato {
    nome: string;
    empresa: string;
    cnpj: string;
    numeroContrato: number;
    inicioVigencia: string;
    fimVigencia: string;
    dataAssinatura: string;
    diaConvencao: number;
    mes: number;
    percentualFerias: number;
    percentualDecTer: number;
    percentualIncidencia: number;
    cargos: Cargo[];
}
