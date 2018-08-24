export class FeriasCalcular {
    private _codTerceirizadoContrato: number;
    private _tipoRestituicao: string;
    private _diasVendidos: number;
    private _inicioFerias: Date;
    private _fimFerias: Date;
    private _inicioPeriodoAquisitivo: Date;
    private _fimPeriodoAquisitivo: Date;
    private _valorMovimentado: number;
    private _proporcional: string;

    constructor(codTerceirizadoContrato: number,
                tipoRestituicao: string,
                diasVendidos: number,
                inicioFerias: Date,
                fimFerias: Date,
                inicioPeriodoAquisitivo: Date,
                fimPeriodoAquisitivo: Date,
                valorMovimentado: number,
                proporcional: string) {
        this._codTerceirizadoContrato = codTerceirizadoContrato;
        this._tipoRestituicao = tipoRestituicao;
        this._diasVendidos = diasVendidos;
        this._inicioFerias = inicioFerias;
        this._fimFerias = fimFerias;
        this._inicioPeriodoAquisitivo = inicioPeriodoAquisitivo;
        this._fimPeriodoAquisitivo = fimPeriodoAquisitivo;
        this._valorMovimentado = valorMovimentado;
        this._proporcional = proporcional;
    }

    get codTerceirizadoContrato(): number {
        return this._codTerceirizadoContrato;
    }

    get tipoRestituicao(): string {
        return this._tipoRestituicao;
    }

    get diasVendidos(): number {
        return this._diasVendidos;
    }

    get inicioFerias(): Date {
        return this._inicioFerias;
    }

    get fimFerias(): Date {
        return this._fimFerias;
    }

    get inicioPeriodoAquisitivo(): Date {
        return this._inicioPeriodoAquisitivo;
    }

    get fimPeriodoAquisitivo(): Date {
        return this._fimPeriodoAquisitivo;
    }

    get valorMovimentado(): number {
        return this._valorMovimentado;
    }

    get proporcional(): string {
        return this._proporcional;
    }

}
