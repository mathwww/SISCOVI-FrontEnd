import {Component} from '@angular/core';

@Component({
    selector: 'app-total-mensal',
    templateUrl: './total-mensal.component.html',
    styleUrls: ['./total-mensal.component.scss']
})
export class TotalMensalComponent {
    view = true;
    constructor() {}

    toggleCalculo() {
        this.view = true;
    }
    toggleRet() {
        this.view = false;
    }
}
