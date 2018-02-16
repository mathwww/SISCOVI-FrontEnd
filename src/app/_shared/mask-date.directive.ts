import {Directive, HostListener, ElementRef, OnInit} from '@angular/core';
import {DatePipe} from '@angular/common';

@Directive({
  selector: '[maskDate]'
})
export class MaskDateDirective implements OnInit {
  private el: HTMLInputElement;
  constructor(
    private elementRef: ElementRef,
    private pipe: DatePipe
  ) {
    this.el = this.elementRef.nativeElement;
  }
  ngOnInit() {
    this.el.value = this.pipe.transform(this.el.value, 'dd/MM/YYYY');
  }
  @HostListener('focus', ['$event.target.value'])
  onFocus(value) {}
  @HostListener('blur', ['$event.target.value'])
  onBlur(value) {
    this.el.value = this.pipe.transform(value, 'dd/MM/YYYY');
  }
}
