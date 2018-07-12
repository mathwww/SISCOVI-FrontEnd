export class TotalMensal {
    private _cod: number;
    private _codTerceirizado: number;
    private _codFuncaoTerceirizado: number;
    private _ferias: number;
    private _tercoConstitucional: number;
    private _decimoTerceiro: number;
    private _multaFGTS: number;
    private _total: number;
    private _dataReferencia: Date;
    private _loginAtualizacao: String;
    private _dataAtualizacao: Date;

    get cod(): number {
        return this._cod;
    }

    get codTerceirizado(): number {
        return this._codTerceirizado;
    }

    get codFuncaoTerceirizado(): number {
        return this._codFuncaoTerceirizado;
    }

    get ferias(): number {
        return this._ferias;
    }

    get tercoConstitucional(): number {
        return this._tercoConstitucional;
    }

    get decimoTerceiro(): number {
        return this._decimoTerceiro;
    }

    get multaFGTS(): number {
        return this._multaFGTS;
    }

    get total(): number {
        return this._total;
    }

    get dataReferencia(): Date {
        return this._dataReferencia;
    }

    get loginAtualizacao(): String {
        return this._loginAtualizacao;
    }

    get dataAtualizacao(): Date {
        return this._dataAtualizacao;
    }
}
