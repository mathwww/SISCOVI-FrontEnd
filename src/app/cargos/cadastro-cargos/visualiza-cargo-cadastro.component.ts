import {AfterViewChecked, AfterViewInit, ChangeDetectorRef, Component, DoCheck, Input, OnChanges} from '@angular/core';
import {Cargo} from '../cargo';
import {CargoService} from '../cargo.service';

@Component({
    selector: 'app-visualiza-cargo-cadastro',
    templateUrl: './visualiza-cargo-cadastro.component.html'
})
export class VisualizaCargoCadastroComponent implements OnChanges {
    @Input()
    cargos: Cargo[];
    constructor(private cargoService: CargoService, private cdr: ChangeDetectorRef) {}
    ngOnChanges() {
        setTimeout(() => {
            this.cargoService.loading = false;
        });
    }
}
