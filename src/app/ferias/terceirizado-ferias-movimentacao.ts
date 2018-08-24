export class TerceirizadoFeriasMovimentacao {
    private _codigoTerceirizadoContrato: number;
    private _nomeTerceirizado: string;
    private _inicioPeriodoAquisitivo: Date;
    private _fimPeriodoAquisitivo: Date;
    private _existeCalculoAnterior: boolean;

    get existeCalculoAnterior(): boolean {
        return this._existeCalculoAnterior;
    }

    get codigoTerceirizadoContrato(): number {
        return this._codigoTerceirizadoContrato;
    }

    get nomeTerceirizado(): string {
        return this._nomeTerceirizado;
    }

    get inicioPeriodoAquisitivo(): Date {
        return this._inicioPeriodoAquisitivo;
    }

    get fimPeriodoAquisitivo(): Date {
        return this._fimPeriodoAquisitivo;
    }
}
