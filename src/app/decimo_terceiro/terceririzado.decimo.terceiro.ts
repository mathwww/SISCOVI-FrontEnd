export class TerceririzadoDecimoTerceiro {
    codigoTerceirizadoContrato: number;
    nomeTerceirizado: string;
    inicioContagem: Date;
    valorDisponivel: number;
    tipoRestituicao: string;
    valorMovimentado: number;
    parcelas: number;
    constructor(codigoTerceirizadoContrato: number, nomeTerceirizado: string, inicioContagem: Date, valorMovimentado: number, parcelas: number) {
        this.codigoTerceirizadoContrato = codigoTerceirizadoContrato;
        this.nomeTerceirizado = nomeTerceirizado;
        this.inicioContagem = inicioContagem;
        this.valorMovimentado = valorMovimentado;
        this.parcelas = parcelas;
    }
    public setNomeTerceirizado(nomeTerceirizado: string) {
        this.nomeTerceirizado = nomeTerceirizado;
    }
}
