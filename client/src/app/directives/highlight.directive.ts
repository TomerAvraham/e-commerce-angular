import {
  Directive,
  Input,
  ElementRef,
  SimpleChanges,
  OnChanges,
  AfterViewInit,
} from '@angular/core';

@Directive({
  selector: '[appHighlight]',
})
export class HighlightDirective implements OnChanges, AfterViewInit {
  @Input() appHighlight = '';
  constructor(private el: ElementRef) {}

  ngOnChanges(changes: SimpleChanges) {
    this.ngAfterViewInit();
  }

  ngAfterViewInit() {
    const value = this.el.nativeElement?.innerText.split('\n').join('');
    if (!value) return;
    const re = new RegExp(this.appHighlight, 'gi');
    const match = value.match(re);
    if (!match || match.some((x) => !x)) {
      this.el.nativeElement.innerText = value;
    } else {
      this.el.nativeElement.innerHTML = value.replace(
        re,
        '<mark>' + match[0] + '</mark>'
      );
    }
  }
}
