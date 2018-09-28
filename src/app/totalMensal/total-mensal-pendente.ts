import {ListaTotalMensalData} from './lista-total-mensal-data';

export class TotalMensalPendente {
    private _totaisMensais: ListaTotalMensalData;
    private _status: string;

    constructor(totaisMensais: ListaTotalMensalData, status: string) {
        this._totaisMensais = totaisMensais;
        this._status = status;
    }
    get status(): string {
        return this._status;
    }
    get totaisMensais(): ListaTotalMensalData {
        return this._totaisMensais;
    }
}
