export class FeriasCalcular {
    private codTerceirizadoContrato: number;
    private tipoRestituicao: string;
    private diasVendidos: number;
    private inicioFerias: Date;
    private fimFerias: Date;
    private inicioPeriodoAquisitivo: Date;
    private fimPeriodoAquisitivo: Date;
    private valorMovimentado: number;
    private proporcional: string;
    private nomeTerceirizado: string;

    constructor(codTerceirizadoContrato: number,
                tipoRestituicao: string,
                diasVendidos: number,
                inicioFerias: Date,
                fimFerias: Date,
                inicioPeriodoAquisitivo: Date,
                fimPeriodoAquisitivo: Date,
                valorMovimentado: number,
                proporcional: string) {
        this.codTerceirizadoContrato = codTerceirizadoContrato;
        this.tipoRestituicao = tipoRestituicao;
        this.diasVendidos = diasVendidos;
        this.inicioFerias = inicioFerias;
        this.fimFerias = fimFerias;
        this.inicioPeriodoAquisitivo = inicioPeriodoAquisitivo;
        this.fimPeriodoAquisitivo = fimPeriodoAquisitivo;
        this.valorMovimentado = valorMovimentado;
        this.proporcional = proporcional;
    }

    getCodTerceirizadoContrato(): number {
        return this.codTerceirizadoContrato;
    }

    getTipoRestituicao(): string {
        return this.tipoRestituicao;
    }
    getDiasVendidos(): number {
        return this.diasVendidos;
    }

    getInicioFerias(): Date {
        return this.inicioFerias;
    }

    getFimFerias(): Date {
        return this.fimFerias;
    }

    getInicioPeriodoAquisitivo(): Date {
        return this.inicioPeriodoAquisitivo;
    }

    getFimPeriodoAquisitivo(): Date {
        return this.fimPeriodoAquisitivo;
    }

    getValorMovimentado(): number {
        return this.valorMovimentado;
    }

    getProporcional(): string {
        return this.proporcional;
    }
    setInicioFerias(inicioFerias: Date): void {
        this.inicioFerias = inicioFerias;
    }
    setFimFerias(fimFerias: Date) {
        this.fimFerias = fimFerias;
    }
    setNomeTerceirizado(nomeTerceirizado: string): void {
        this.nomeTerceirizado = nomeTerceirizado;
    }
    getNomeTercerizado(): string {
        return this.nomeTerceirizado;
    }
    setInicioPeriodoAquisitivo(inicioPeriodoAquisitivo: Date): void {
       this.inicioPeriodoAquisitivo = inicioPeriodoAquisitivo;
    }
    setFimPeriodoAquisitivo(fimPeriodoAquisitivo: Date): void {
        this.fimPeriodoAquisitivo = fimPeriodoAquisitivo;
    }
}
